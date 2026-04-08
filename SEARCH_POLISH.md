# Search page (`/search`) — scope for polish (Cowork / AI)

Read this before changing UI. **Client-side search** uses Supabase RPCs (`search_post_ids`, `search_profile_ids`); privacy via `profiles.searchable`.

## Route & feature flag

- **`/search`**, query **`?q=`** — `SearchPage`. Gated by `FEATURE_FLAG_KEYS.navSearch` (`nav_search`). If disabled → `Navigate` to `/`.
- **TanStack Query:** `queryKeys.search.results(pattern, viewerId)` — pattern from sanitized `q`.

## What exists today

| Piece | Location | Notes |
|-------|----------|--------|
| Page | `src/pages/SearchPage.tsx` | Form `role="search"`; results region `#search-results` with `tabIndex={-1}` + scroll-into-view after load |
| Data | `src/lib/search.ts` | `sanitizeSearchQuery`, `isSearchQueryValid` (min 2 chars), `searchPostsByBody`, `searchProfilesByEmail` |
| Posts UI | `PostCard` in `.post-list` | Same as feed |
| Users | `.search-profile-list` / `__row` / `__actions` | Avatar, email, id, View / Message links |
| Motion | `prefersReducedMotion()` | Used for scroll behavior — respect for any new transitions |

## Do **not** change without `project.md` + spec

- RPCs, `RESULT_LIMIT`, `MIN_QUERY_LEN` / `MAX_QUERY_LEN`, privacy rules in SQL
- `queryKeys.search.*` shape
- URL contract: `?q=` only (no new params without spec)
- `PostCard` reaction/comment contracts

## Safe polish directions

- **CSS:** `.search-form` layout (input + submit row), spacing, focus-visible on inputs/buttons; results region gap; empty state `.search-page__empty-all`; profile list rows (hover, separators, mobile wrap for actions)
- **A11y:** keep `aria-labelledby`, `aria-label` on results region; do not remove focus management without testing
- **Copy:** only via `src/i18n/messages.ts` (`pages.search.*`) — en / ka / ru

## Innovation — invent and embed (AI-led micro-interactions)

**Intent:** **Invent** interactions for the **search form** (input + submit hover/active/focus), **profile result rows**, empty state — e.g. `:active` scale on Search (already a pattern elsewhere), row hover, link affordances.

**Off-limits:** New RPCs, `?q=` semantics, `queryKeys.search.*`, flags.

**Motion:** `prefers-reduced-motion: reduce`.

**Summary:** What you invented. **“No extra inventions — polish only.”** if applicable.

## Files you may touch

- `src/styles.css` — primary (`/* ============= SEARCH PAGE` and related)
- `src/pages/SearchPage.tsx` — only for minor a11y markup if needed; **no** query/logic changes
- `src/i18n/messages.ts` — new strings only

## Verify

```bash
npm test
npm run build
```

## Docs sync

After changes, add a short line to `JOURNAL.md` (Georgian).
