# Account deletion — technical design (Supabase)

Goal: let a signed-in user **permanently delete their account** and related data, without leaving orphaned **Storage** objects or inconsistent `public` rows.

This document is the implementation blueprint. UI copy and legal text belong in **Settings** + **Legal** (separate task).

---

## 1. Why the client alone is not enough

- **`auth.users`** rows can only be removed with **Admin** privileges (`service_role` / Auth Admin API or Dashboard). The anon key cannot delete the auth user.
- **`public.*`** data: many FKs already use **`ON DELETE CASCADE`** from `auth.users` (see §2). After a successful auth user delete, Postgres removes dependent rows automatically.
- **Storage** (`storage.objects`) is **not** wired to `auth.users` with a FK. Deleting `auth.users` does **not** delete files in `avatars` / `post-images` / `post-videos`. You must **explicitly delete** (or batch-delete by prefix) objects in those buckets.

---

## 2. Database: cascade map (current migrations)

When `auth.users.id = u` is **deleted**, PostgreSQL cascades as follows (summary):

| Relation | Behavior |
|----------|----------|
| `public.profiles.id` | CASCADE → profile row gone |
| `public.posts.user_id` | CASCADE → posts gone |
| `public.post_tags` | CASCADE via `posts` |
| `public.reactions` (user_id) | CASCADE |
| `public.comments` (user_id) | CASCADE |
| `public.reports.reporter_id` | CASCADE |
| `public.notifications` (`user_id`, `actor_id`) | CASCADE |
| `public.conversations` (`user_a`, `user_b`) | CASCADE → entire conversation row if either participant is deleted |
| `public.chat_messages` (sender_id, and via conversations) | CASCADE |

**Implications**

- **DM threads:** If user A deletes their account, conversations where A is a participant are removed; the peer loses that thread history. Acceptable for MVP; document in Terms / Privacy.
- **Content authored by the user:** posts, comments, reactions, reports filed by them disappear with the cascade.
- **No orphan rows** in `public` for this user, assuming delete originates from **`auth.users`**.

---

## 3. Required order of operations (recommended)

1. **Authenticate** the request as the user who will be deleted (JWT in `Authorization` header).
2. **Optional but recommended:** confirm intent (e.g. type `DELETE` or re-enter password) — **app/UI only**; still enforce server-side identity from JWT.
3. **Storage cleanup** (service role), before or bundled with auth delete in one trusted server path:
   - **Bucket `avatars`:** delete all objects under prefix `avatars/{user_id}/` (or derive paths from `profiles.avatar_url` if you prefer explicit list).
   - **Bucket `post-images`:** delete all objects under prefix `posts/{user_id}/` (matches migration path pattern).
   - **Bucket `post-videos`:** same prefix `posts/{user_id}/` (video files for posts).
4. **Delete auth user** via **Admin API**: `auth.admin.deleteUser(user_id)` — same `user_id` as JWT `sub`.
5. **Client:** sign out locally (`supabase.auth.signOut()`), clear caches, redirect to home/login.

**Why Storage before delete:** after `auth.users` is gone, CASCADE removes `posts`/`profiles`; you still *can* delete by prefix without DB, but doing Storage first avoids relying on URLs still in DB and keeps ordering obvious.

---

## 4. Implementation surface (choose one)

### Option A — Supabase Edge Function (recommended)

- **Route:** e.g. `POST /functions/v1/delete-account` (or `DELETE` with body).
- **Auth:** validate JWT; `user_id` to delete **must** equal `sub` from JWT (never trust a client-supplied id).
- **Runtime:** use **service role** only inside the function (env `SUPABASE_SERVICE_ROLE_KEY`), never expose to the browser.
- **Steps:** Storage cleanup (see §3) → `supabase.auth.admin.deleteUser(sub)`.

### Option B — Backend you control (Node, etc.)

Same logic: verify JWT, service role client, Storage delete + delete user.

### Not recommended

- RPC-only `DELETE` on `public.profiles` without removing `auth.users` — leaves a login without app row or vice versa.
- Client-only `supabase.from('profiles').delete()` — does not remove auth and does not bypass RLS for full cleanup.

---

## 5. Storage deletion (API)

Use the **Storage Admin API** with service role:

- List objects under prefix for `avatars/{user_id}/` and `posts/{user_id}/`, then remove in batch; or use Storage `remove` with an array of paths if your API version supports listing.

If listing is expensive, **document** the prefix convention and delete by prefix in a single maintenance pattern (Supabase Storage supports listing with a prefix filter).

---

## 6. Security checklist

| Item | Note |
|------|------|
| JWT `sub` must match deleted user | Prevents deleting someone else’s account |
| Service role only server-side | Never in Vite `VITE_*` bundle |
| Rate limit | Optional: limit Edge invocations per IP/user to prevent abuse |
| Admin users | Same flow; if you must **prevent** self-deletion of last admin, add a check in the function before delete |

---

## 7. Product / compliance (non-SQL)

- **Privacy policy / Terms:** link from Settings; describe deletion scope (DM partner loses thread, etc.).
- **Export (GDPR):** optional later — not part of minimal delete path.

---

## 8. App changes (implemented)

- `SettingsPage`: confirm flow (type `DELETE`) → `deleteAccountViaEdgeFunction()` → `queryClient.clear()` → `signOut()` → `/`.
- `src/lib/deleteAccount.ts`: **Production:** same-origin `POST /api/delete-account` (Vercel serverless) with `Authorization` + optional `apikey`; **fallback:** `supabase.functions.invoke('delete-account')` (Edge). See `README.md` → *Account deletion*.

**Status (verified):** End-to-end deletion works on **Vercel + Supabase** when `SUPABASE_SERVICE_ROLE_KEY` and `VITE_*` are set and the deployment includes the latest `api/delete-account` build (relative imports use `.js` extensions for Vercel/Node16; see repo `JOURNAL.md`).

---

## 8b. Deploy Edge Function (required)

From repo root, with Supabase CLI linked to the project:

```bash
supabase functions deploy delete-account
```

Without this step, the app returns **404** (or an error) when the user confirms deletion. See **`README.md`** → *Supabase Edge Function — account deletion*.

---

## 9. Verification

- After implementation: create test user, upload avatar + post image, delete account, confirm:
  - `auth.users` row absent
  - no `profiles` / `posts` rows for that id
  - no `storage.objects` under the two prefixes for that id
- Add a short note in `JOURNAL.md` when shipped.

---

## 10. References in this repo

- FK behavior: `supabase/migrations/20260401120000_init_posts_reactions_profiles.sql` and later migrations.
- Buckets / paths: `supabase/SCHEMA.md` → **Storage**.
- UI: `src/pages/SettingsPage.tsx` + `src/lib/deleteAccount.ts`; function: `supabase/functions/delete-account/index.ts`.
