# Own profile page (`/profile`) — scope for polish (Cowork / AI)

Read before changing UI. **Current user’s profile** — not `/u/:userId` (`UserProfilePage` — separate future doc if needed).

## Route & URL

- **`/profile`** — `ProfilePage`; requires auth (implicit via data). Tabs: **`?tab=commented`** vs default posts — **do not** change param name or tab logic without spec.

## What exists today

| Piece | Location | Notes |
|-------|----------|--------|
| Hero | `.profile-hero`, `.profile-hero__layout`, Avatar, display name, bio, copy link | |
| Stats | `.profile-stats`, `.profile-stats__item--link` | Links to followers/following |
| Tabs | `.profile-tabs`, `.profile-tabs__tab` | `posts` / `commented`; state is **`aria-selected`** on `<button>` — **not** a `.active` class (style active tab with `[aria-selected="true"]`) |
| Feed | `PostCard`, `.profile-posts`, infinite **commented** tab | `queryKeys.userPosts`, `queryKeys.profile.commentedPosts`; **load more** via **`useInfiniteScroll`** sentinel (no manual Load More button) |
| Styles | `src/styles.css` — `profile-*` | |

## Do **not** change without spec

- `fetchUserPosts`, `fetchUserCommentedPostsPage`, `queryKeys.profile.*` / `queryKeys.userPosts`
- Tab switching (`setTab`, `searchParams`)
- `PostCard` contract, follow counts query

## Safe polish directions

- **CSS:** Hero layout, stats row (hover on stat links), tab strip (active/hover/focus), empty states, “Copy link” / Settings buttons
- **A11y:** `role="tablist"` / tabs already — strengthen `focus-visible` on tab buttons
- **Copy:** `pages.profile.*` in `messages.ts`

## Innovation — invent and embed (AI-led micro-interactions)

**Intent:** **Invent** micro-interactions for **tab buttons** (hover/active/focus), **stat links** (subtle lift or underline), **Copy profile link** and **Settings** buttons, optional **hero** card hover — pointer + keyboard parity.

**Off-limits:** Query keys, infinite scroll logic, new tabs.

**Motion:** `prefers-reduced-motion: reduce`.

**Summary:** What you invented. **“No extra inventions — polish only.”** if applicable.

## Files you may touch

- `src/styles.css` — `profile-hero`, `profile-stats`, `profile-tabs`, `profile-posts`
- `src/pages/ProfilePage.tsx` — structure/classes only if needed; no data changes
- `src/i18n/messages.ts` — new strings only

## Verify

```bash
npm test
npm run build
```

## Docs sync

Short line in `JOURNAL.md` (Georgian).
