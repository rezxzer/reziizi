# Messages & chat (`/messages`, `/messages/:peerId`) — scope for polish (Cowork / AI)

Read this before changing UI. **DM chat** (v2); not email/Push.

## Routes & feature flag

- **`/messages`** — conversation list (`MessagesPage`). Gated by `FEATURE_FLAG_KEYS.navMessages` (`nav_messages`). If disabled → `Navigate` to `/`.
- **`/messages/:peerId`** — thread (`ChatThreadPage`). Same flag; `peerId` must be a valid UUID and not the current user’s id.

## What exists today

| Piece | Location | Notes |
|-------|----------|--------|
| List page | `src/pages/MessagesPage.tsx` | `fetchMyConversations`, local state (not React Query); `<ul className="conversation-list">` |
| Thread | `src/pages/ChatThreadPage.tsx` | `getOrCreateConversation`, `fetchMessages`, `subscribeToNewMessages`, `sendMessage`; bubbles `chat-bubble`, `chat-bubble--mine` / `--theirs` |
| API | `src/lib/chat.ts` | Do not change RPC contracts without spec |
| Styles | `src/styles.css` — `/* ============= CHAT` + `/* ============= CONVERSATION LIST` | `.conversation-list`, `.chat-thread__*`, `.chat-bubble` (mine/theirs), composer |
| Bubbles | Markup uses `--mine` / `--theirs` | Aligned via flex; bubble body/time styling |

## Do **not** change without `project.md` + design discussion

- Supabase `conversations`, `chat_messages`, RLS, RPCs in `chat.ts`
- Realtime subscription wiring (`subscribeToNewMessages`) except fixing obvious bugs with spec
- Feature flag key or redirect behavior
- `fetchMyConversations` / `fetchMessages` / `sendMessage` signatures and payloads

## Safe polish directions

- **CSS:** conversation list container (`.conversation-list`), row/link layout (peer + time on one row — link may need `display: flex` + `align-items` if layout looks broken), separators, hover/focus, mobile stacking
- **CSS:** thread header alignment (mirror notifications header pattern if desired), message scroller height/rhythm, bubble max-width and **mine vs theirs** alignment, composer row (textarea + button) on narrow screens
- **A11y:** `focus-visible` on list links and send button; keep `aria-live="polite"` on message list unless you have a strong reason to change
- **Copy:** only via `src/i18n/messages.ts` (`pages.messages.*`, `pages.chat.*`) — en / ka / ru + types

## Optional TSX (only if spec allows small structure fixes)

- Relative time for `last_message_at` / bubble times — needs i18n-friendly formatting; treat as **non-trivial**; prefer CSS-only pass first.

## Innovation — invent and embed (AI-led micro-interactions)

**Intent:** **Invent** micro-interactions for conversation **links** (hover / focus / `:active`), **composer** (send button, textarea focus ring), optional **bubble** polish beyond existing animation — always subordinate to readability.

**Off-limits without spec:** `chat.ts`, Realtime unsubscribe/subscribe logic, feature flag.

**Motion:** `prefers-reduced-motion: reduce`.

**Summary:** Bullets for invented ideas. **“No extra inventions — polish only.”** if nothing added.

## Files you may touch

- `src/styles.css` — primary
- `src/pages/MessagesPage.tsx` / `ChatThreadPage.tsx` — only for a11y/markup if needed; keep data flow intact
- `src/i18n/messages.ts` — new strings only

## Verify

```bash
npm test
npm run build
```

## Docs sync

After changes, add a short line to `JOURNAL.md` (Georgian).
