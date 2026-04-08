# Settings page (`/settings`) — scope for polish (Cowork / AI)

Read before changing UI. **Account, profile text, privacy, notifications, theme, locale, Premium checkout, delete account.**

## Route & access

- **`/settings`** — `SettingsPage`; `ProtectedRoute`. Query `?checkout=` may appear for billing return — **do not** change param semantics without `project.md`.

## What exists today

| Piece | Location | Notes |
|-------|----------|--------|
| Layout | `stack settings-page` | Multiple `.card` sections: language, theme, profile (display name / bio), account + Premium, password, notifications, privacy (`searchable`), avatar upload (`AvatarUploadSection`), delete account |
| Data | `supabase.auth`, `lib/profileAbout.ts`, `profilePrivacy.ts`, `notificationPreferences.ts`, `deleteAccountViaEdgeFunction`, `createPremiumCheckoutRedirectUrl` | |
| Styles | `src/styles.css` — `.settings-page`, `.settings-premium-*`, forms | |

## Do **not** change without `project.md` + spec

- Password update / signOut / delete-account **contracts** (Edge + API + `DELETE` confirm phrase)
- `queryKeys` invalidation patterns, Stripe checkout URL builder
- Privacy / notification **field names** and RPCs behind `profilePrivacy` / `notificationPreferences`
- `MIN_PASSWORD_LENGTH`, `DELETE_CONFIRM_PHRASE`

## Safe polish directions

- **CSS:** Card rhythm, section titles, premium block hierarchy, form spacing, destructive zone (delete) visual separation, button rows on mobile
- **A11y:** `focus-visible` on all primary/destructive actions; keep labels and `role` attributes
- **Copy:** `settings.*` / `pages.*` in `messages.ts` — en / ka / ru

## Innovation — invent and embed (AI-led micro-interactions)

**Intent:** **Invent** hover / `:active` / `focus-visible` on **Save**, **Premium**, **Logout**, **Delete** flow buttons, locale select, and section cards — so settings feels as polished as Search/Home **without** changing behavior.

**Off-limits:** Auth flows, API shapes, confirm strings.

**Motion:** `prefers-reduced-motion: reduce`.

**Summary:** What you invented. **“No extra inventions — polish only.”** if applicable.

## Files you may touch

- `src/styles.css` — primary (search `.settings-page`, `.settings-premium`)
- `src/pages/SettingsPage.tsx` — only minor a11y/class hooks if needed
- `src/components/AvatarUploadSection.tsx` / `ThemePreferenceControls.tsx` — CSS via parent or existing classes only unless trivial `className`
- `src/i18n/messages.ts` — new strings only

## Verify

```bash
npm test
npm run build
```

## Docs sync

Short line in `JOURNAL.md` (Georgian).
