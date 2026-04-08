# Notifications page (`/notifications`) — scope for polish (Cowork / AI)

Read this before changing UI. **In-app notifications** (not Push — see `project.md` §46).

## What exists today

| Piece | Location | Notes |
|-------|----------|--------|
| Page | `src/pages/NotificationsPage.tsx` | `ProtectedRoute`; TanStack Query `queryKeys.notifications.list` |
| Data | `src/lib/notifications.ts` | `fetchNotifications`, `markNotificationRead`, `markAllNotificationsRead`; joins `profiles` for actor email/avatar |
| Types | `notifications.type`: `comment` \| `reaction` \| `follow` | Copy from `pages.notifications.*` in `messages.ts` (en/ka/ru) |
| Cross-tab unread | `NOTIFICATIONS_BROADCAST_CHANNEL`, `useUnreadNotificationCount` | Do not break without spec |
| Styles | `src/styles.css` — search `/* ============= NOTIFICATIONS` | `.notifications-page__head`, `.notification-list`, unread highlight, header row |

## Do **not** change without `project.md` + migration discussion

- Supabase `notifications` table, RLS, triggers
- `fetchNotifications` select fields / limit / order
- Mutation contracts (`markRead`, `markAllRead`)
- `queryKeys.notifications.*`
- Adding new notification **types** (needs DB + app)

## Safe polish directions

- **CSS only:** list container (`.notification-list`), row cards/separators, unread state (left border or background), spacing, header row alignment, mobile stacking
- **A11y:** ensure list is `ul`/`li` (already), focus styles on buttons, `aria-live` for empty/error (optional)
- **Copy:** only via `messages.ts` + type in `PagesBundle` — all three locales
- **Optional UX (small TSX, still safe):** relative time instead of `toLocaleString()` — needs i18n-friendly formatter; or “View post” link when `post_id` is set — must not break RLS (link to home or post URL pattern already used elsewhere)

## Innovation — invent and embed (AI-led micro-interactions)

**Intent:** **Invent** 1–3 tasteful interactions for this page — not only restyle. Think **pointer + keyboard**: hover / `:active` / `focus-visible` on list rows and buttons (e.g. “Mark all read”), subtle feedback on interactive elements.

**Examples:** Row hover lift; `:active` on primary actions; link underline animation — all **CSS-first**; guard with `prefers-reduced-motion: reduce`.

**Off-limits without spec:** New notification types, RPCs, `queryKeys`, mutation contracts.

**Summary:** List what you **invented** (done or skipped). If only baseline polish: **“No extra inventions — polish only.”**

## Files you may touch

- `src/styles.css` — primary for visual polish
- `src/pages/NotificationsPage.tsx` — only for a11y/structure if needed; keep queries/mutations as-is
- `src/i18n/messages.ts` — new strings only with type updates

## Verify

```bash
npm test
npm run build
```

## Docs sync

After changes, add a short line to `JOURNAL.md` (Georgian) and optionally one bullet under `project.md` → **CURRENT WORK** if the polish is worth tracking.
