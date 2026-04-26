# Home page (`/`) — scope for polish (Cowork / AI)

Use this file so an assistant **sees what exists** and **does not break** feed, auth, or URL contract.

## What is already implemented (do not remove)

| Area | Implementation | Notes |
|------|----------------|--------|
| Feed data | `useInfiniteQuery` + `fetchFeedPage` | `src/lib/feed.ts`, `queryKeys.feed.*` |
| Sort / tag | `?sort=trending`, `?tag=` | `slugifyTag`, invalid tag handling |
| Tabs | `handleFeedSort`, `wantsTrending` | Active state tied to URL |
| Composer | `<PostForm onPosted={onPosted} />` | Inside `.card.home-composer` |
| Premium CTA | Feature flag `home_premium_cta`, billing checkout | Wrapped in `.home-premium-cta-wrap` |
| Ads | `FeedAdSlot` + `feed_ads` flag | |
| Sidebar | Placeholder trending tags (`#dev`, `#news`, …) | Not live RPC — cosmetic links only |
| Layout padding | `.layout__main:has(.home-page) { padding: 0 }` | Home owns horizontal spacing via `.home-page` |
| Infinite scroll | `useInfiniteScroll` + sentinel `<div>` at list end | Replaces manual **Load More**; `fetchNextPage()` when sentinel intersects — **`JOURNAL.md` → 2026-04-08** |

## Approved changes (spec-tracked)

### 2026-04-08 — Infinite scroll (replaces "Load More" button)

- **What:** Replace the manual "Load More" button with an `IntersectionObserver` sentinel at the end of the post list. When the sentinel scrolls into view → auto-trigger `fetchNextPage()`.
- **Hook:** `src/hooks/useInfiniteScroll.ts` — `{ hasMore, loading, onLoadMore, rootMargin? }`.
- **Also applies to:** `ProfilePage.tsx` (Commented tab), `UserProfilePage.tsx` (Commented), `UserFollowListPage.tsx` — same pattern; no **Load More** button on these lists.
- **Does NOT change:** `fetchFeedPage`, query keys, RLS, page size, URL params.

## Do **not** change without explicit spec update

- `fetchFeedPage` / RLS / Supabase queries
- `PostCard` reaction/comment contracts
- Feature-flag keys in `lib/featureFlags.ts`
- URL parameter semantics (`sort`, `tag`, `checkout`)

## Safe polish directions (CSS / copy / a11y)

- Spacing rhythm between toolbar → composer → premium → list → **infinite-scroll sentinel / loading** strip
- `feed-tabs` underline style vs pill (keep one system; current: underline + `::after`)
- Sidebar: i18n strings live in `messages.ts` under `pages.home.*`
- Empty/loading states: already use `t()` — only adjust classes
- Mobile: `.home-sidebar { display: none }` in media query — do not assume sidebar on small screens

## Innovation — invent and embed (AI-led micro-interactions)

**Intent:** **Invent** 1–3 interactions — **hover** on feed tabs / sidebar links / premium CTA / **feed bottom (sentinel area)**; **`:active`** press on buttons; **focus-visible** for keyboard. Goal: navigation and feed controls feel responsive to pointer and keyboard (subtle, not heavy motion).

**Off-limits without spec:** `fetchFeedPage`, RLS, URL params (`sort`, `tag`, `checkout`), feature flags.

**Motion:** `prefers-reduced-motion: reduce` — disable transitions/keyframes when needed.

**Summary:** What you invented (implemented or skipped). **“No extra inventions — polish only.”** if applicable.

## Files to touch for visual-only work

- `src/styles.css` — search `/* ============= HOME PAGE`
- `src/pages/HomePage.tsx` — structure; **preserve** `useInfiniteScroll` + sentinel wiring when editing markup
- `src/i18n/messages.ts` — new copy only with type updates

## Verification

```bash
npm test
npm run build
```

## Project rules

- `project.md` + `reziizi.mdc` — scope order; large redesign → update `project.md` / `JOURNAL.md` first.
