# REZIIZI

Social app MVP — **React + Vite + TypeScript** + **Supabase**.

## Quick start

```bash
npm install
cp .env.example .env   # add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
npm run dev
```

**Tests:** `npm test` (Vitest once) · `npm run test:watch` (watch mode).

## GitHub Actions (CI)

On **push** and **pull requests** to `main` / `master`, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs `npm ci` → `npm test` → `npm run build`. Fix failures locally before merging.

**Deploy:** hosting stays on **Vercel** (import repo, env vars) — see **Production deployment** below. CI does not replace Vercel; it blocks broken code from merging with confidence.

## Layout

- **App code:** `src/` → `pages/`, `components/`, `lib/`.
- **Docs at repo root:** `project.md` (spec), `AGENTS.md` (handoff), `JOURNAL.md` (log). Full tree: [**AGENTS.md**](AGENTS.md) (section „ფოლდერების განლაგება“).

## Docs

| File | Purpose |
|------|---------|
| [**AGENTS.md**](AGENTS.md) | **Start here in a new chat** — context, doc map, folder tree, run commands, next steps. |
| [project.md](project.md) | Full spec: features, MVP scope, **CURRENT WORK**, **`### NEXT STEPS`**. |
| [JOURNAL.md](JOURNAL.md) | Project log. |
| [supabase/SCHEMA.md](supabase/SCHEMA.md) | DB tables, RPCs, Storage buckets, rate-limit triggers. |
| [supabase/ACCOUNT_DELETION_DESIGN.md](supabase/ACCOUNT_DELETION_DESIGN.md) | Account deletion flow (Edge Function + deploy checklist). |
| [.cursor/rules/reziizi.mdc](.cursor/rules/reziizi.mdc) | Cursor rules + **v1 implementation order**. |

## Production deployment (GitHub + Vercel + Supabase)

End-to-end checklist for hosting the app. **Never commit `.env`** — secrets live in Vercel only (and your local `.env`).

### Prerequisites

- GitHub repo with this code pushed (`main` or your default branch).
- [Vercel](https://vercel.com) account (sign in with GitHub is easiest).
- A [Supabase](https://supabase.com/dashboard) project with **SQL migrations** from `supabase/migrations/` already applied to that project (SQL Editor or CLI). If the DB is empty, run migrations in order before relying on production auth/feed.

### 1. Supabase — API keys (for Vercel env)

1. Supabase Dashboard → your project → **Settings** → **API**.
2. Copy **Project URL** → this will be `VITE_SUPABASE_URL`.
3. Copy **anon** **public** key → this will be `VITE_SUPABASE_ANON_KEY`.
4. Do **not** put the `service_role` key in any `VITE_*` variable (it must not ship to the browser).

### 2. Vercel — import from GitHub

1. [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. **Import** your GitHub repository (authorize Vercel if prompted).
3. Framework: **Vite** (or set manually):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Root directory: **`.`** if the app is at the repo root.

### 3. Vercel — environment variables

Before or after the first deploy, open **Settings** → **Environment Variables** and add:

| Name | Value |
|------|--------|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase **service_role** key (Dashboard → Settings → API). **Server-only** — never `VITE_*`. Required for **Settings → Delete account** via `/api/delete-account`. |

Enable them for **Production** and **Preview** (recommended so PR previews work).

`VITE_*` variables are read at **build time**. After changing them, trigger a **Redeploy**.

`SUPABASE_SERVICE_ROLE_KEY` is read at **runtime** by the Vercel serverless route `api/delete-account.ts` (not bundled into the browser). Add it and redeploy after changing it.

### 4. Deploy

1. Click **Deploy**. Wait until the build shows **Ready**.
2. Open the **Deployment** URL (e.g. `https://your-project.vercel.app`).
3. If the build fails, check logs: run `npm run build` locally and fix errors; confirm env names are exact.

### 5. Supabase — Auth URL configuration

After you know your live URL:

1. **Authentication** → **URL Configuration**.
2. Set **Site URL** to `https://your-project.vercel.app` (your real domain).
3. Under **Redirect URLs** (or **Additional Redirect URLs**), add the same origin, e.g. `https://your-project.vercel.app` and, if the UI allows, a wildcard such as `https://your-project.vercel.app/**` for path redirects. Add preview URLs if you use Supabase auth flows on Vercel previews.

Password sign-in needs a correct **Site URL**; magic links / OAuth need **Redirect URLs** to match.

**Password recovery (reset):** The app uses `resetPasswordForEmail` with redirect to `{origin}/reset-password`. Add explicit entries if your Supabase project does not accept a wildcard, for example `https://your-project.vercel.app/reset-password` and, for local dev, `http://localhost:5173/reset-password`. Under **Authentication** → **Emails**, ensure the recovery template uses `{{ .ConfirmationURL }}` (default). Optional: **Authentication** → **SMTP Settings** to send via your own provider.

### 6. Verify production

- Home and `/login` load without a blank screen.
- Open `/profile` or another route directly — should **not** 404 (`vercel.json` rewrites SPA routes to `index.html`).
- Sign up / sign in and create a post — confirms Auth + DB + RLS.
- **Settings → Delete account** (confirm `DELETE`): user removed from **Supabase → Authentication → Users**; related `public` rows CASCADE; Storage prefixes cleaned — **confirmed working** on Vercel + Supabase when env and latest deploy are applied (see *Account deletion* below if errors).
- Try another browser or incognito to confirm cold load.

### Repo layout note

`vercel.json` sets SPA **rewrites** (all routes → `index.html`) and security headers so React Router deep links and refresh work on Vercel.

### Account deletion (Vercel + optional Edge Function)

**Production (recommended):** **Settings → Delete account** uses same-origin **`POST /api/delete-account`** (see `api/delete-account.ts`). Set **`SUPABASE_SERVICE_ROLE_KEY`** in Vercel (see env table above) and redeploy. `vercel.json` excludes `/api/*` from the SPA rewrite so the route is not served as `index.html`.

**Optional / dev fallback:** **`POST /functions/v1/delete-account`** (Supabase Edge Function). Deploy it to your Supabase project if you rely on this path (e.g. local dev or when `/api` returns 404):

1. Install [Supabase CLI](https://supabase.com/docs/guides/cli) and log in (`supabase login`).
2. Link the project: `supabase link --project-ref YOUR_PROJECT_REF`.
3. From the repo root: `supabase functions deploy delete-account`.

Hosted Edge Functions receive `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` automatically. If deletion fails with **404**, the function is missing or the URL is wrong.

The Edge Function must return **`Access-Control-Allow-Methods`** (and related CORS headers) or the browser shows **“Failed to fetch”** on the deployed site. After changing the function, run **`supabase functions deploy delete-account`** again.

**Troubleshooting — `500` on “Delete account”**

1. **Vercel → Logs** (or **Runtime Logs** for the deployment): open the failed request and read the server error (Storage vs Auth).
2. **`SUPABASE_SERVICE_ROLE_KEY`** must be set for **Production** on Vercel (same Supabase project as `VITE_*`) and redeployed after changes.
3. **Hobby plan:** serverless functions are limited to **~10s** execution. Heavy Storage cleanup can exceed that → `500` / timeout. Mitigations: **Pro** (longer `maxDuration` in `vercel.json`), or rely on the **Edge Function** fallback (`supabase functions deploy delete-account`), or retry with fewer files.
4. After deploying this repo’s fixes, the error toast should show the **API error message** (not only `Request failed (500)`). If it still does, check the **Network** tab response body for `{"error":"..."}`.
5. **`FUNCTION_INVOCATION_FAILED`** (Vercel): the serverless function **crashed or timed out** before returning JSON — often **Hobby ~10s limit** on long Storage cleanup, or a **runtime error**. Check **Vercel → Logs** for the stack trace; use **Pro** (longer `maxDuration`), deploy the **Edge Function** fallback (`supabase functions deploy delete-account`), or ensure the latest `api/delete-account` handler is deployed (top-level `try/catch` returns JSON instead of crashing).

See `supabase/ACCOUNT_DELETION_DESIGN.md` for behavior (Storage + `auth.users`).

## Repo

Remote: `origin` → GitHub. Never commit `.env`.
