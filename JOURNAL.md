# REZIIZI — პროექტის ჟურნალი

აქ იწერება **ერთიანი ისტორია**: რა გაკეთდა, რა გადაწყვიტე, რა დარჩა. ახალი ჩანაწერი ყოველთვის **ზედა ნაწილში** (უახლესი ზემოთ) ან თარიღის სექციის ქვეშ — როგორც გეხერხება.

**დადასტურება ჩატში:** როცა წერს „მუშაობს“ / „დადასტურებულია“ (ფიჩა ან მიგრაცია) — AI ჩაამატებს აქ **მოკლე ხაზს** (რა დადასტურდა, თარიღი), რომ მომავალში სწრაფად ჩანდეს რა იყო შემოწმებული ცოცხალ გარემოში.

**შემდეგი ნაბიჯების რიგი (ერთი წყარო):** `project.md` → **`## CURRENT WORK`** + **`### NEXT STEPS`**; მოკლე მიმართულება — `AGENTS.md` „სად ვართ ახლა“.

---

## ფორმატი (რეკომენდებული)

```
### YYYY-MM-DD — მოკლე სათაური

- რა შეიცვალა / რა დაიწყო
- შემდეგი ნაბიჯი (სურვილისამებრ)
```

---

## ჩანაწერები

### 2026-04-10 — Production auth/domain confirmation + login/signup UX hardening

- **Domain live (confirmed):** production domain is now **`https://www.metafeed.it.com`** (Vercel + Namecheap DNS fixed). App is reachable directly via custom domain.
- **Supabase Auth config (confirmed):** `Site URL` + redirect URL configured for `https://www.metafeed.it.com/*`; email confirmation flow tested end-to-end.
- **Signup UX updates:** confirm-password added; post-signup panel now replaces form fields with clear “check email / confirm account” instructions; resend confirmation button added with **60s cooldown**.
- **Login UX updates:** invalid credentials now show an inline form error (not only bottom toast), so users immediately see what failed.
- **Navigation/access:** logout action exposed from global header and profile toolbar for faster sign-out discovery.
- **Working mode note (team/AI safety):** when using external assistants (Claude/ChatGPT/etc.), treat repo docs (`project.md`, `JOURNAL.md`, `AGENTS.md`, `.cursor/rules/reziizi.mdc`) as source of truth; no out-of-scope refactors, no DB-breaking renames, and no migration history rewrites without explicit plan.

### 2026-04-10 — Brand rename to Metafeed (metafeed.it.com)

- **UI/SEO rename:** runtime app brand switched to **Metafeed** (`Layout` brand text, `SITE_NAME`, `index.html` title/meta/OG, i18n copy in `messages.ts` across `en/ka/ru`).
- **Domain-format copy:** major descriptive metadata now references **metafeed.it.com** where domain context is needed (SEO descriptions / legal contact wording).
- **Runtime keys/events:** client-side keys renamed from `reziizi-*` to `metafeed-*` (`theme`, `locale`, notifications broadcast/event, motion debug localStorage, logger prefix) to remove old name from runtime surfaces.
- **Billing default label:** Stripe checkout fallback product name updated to **Metafeed Premium**.
- **Verification:** `npm run build` passed; lint diagnostics clean.

### 2026-04-10 — Mobile navigation parity fix: hamburger drawer + accessibility close actions

- **Responsive nav fix:** მობილურზე (`max-width: 768px`) `layout` ნავიგაცია აღარ არის დამალული „უსაფუძვლოდ“ — დაემატა dedicated hamburger toggle (`Layout`) და გახსნადი ვერტიკალური მენიუ ყველა ძირითად route-ზე წვდომით.
- **Drawer UX:** დაემატა backdrop overlay; მენიუ იკეტება backdrop click-ზე და route ცვლილებაზე.
- **Accessibility:** დაემატა `aria-expanded` / `aria-controls` / localized `aria-label` (`mobileMenuOpen`, `mobileMenuClose` en/ka/ru) და **Escape key**-ით დახურვა (`keydown` listener მხოლოდ გახსნილ მდგომარეობაში).
- **Verification:** app build passed (`npm run build`), lint diagnostics clean edited files-ზე.

### 2026-04-09 — Discoverability + Moderation expansion (Claude): trending tags RPC, admin queues, post edit

- **DB (Supabase):** ახალი migration `20260401352200_add_trending_tags_rpc.sql` დაემატა და **წარმატებით გაშვებულია** live Supabase-ზე (მომხმარებლის დადასტურება).
- **Trending tags:** SQL RPC `public.trending_tags(p_limit)` (7 დღის ფანჯარა, `not is_flagged` პოსტები) + აპში `src/lib/trendingTags.ts`; მთავარზე (`HomePage`) sidebar-ში რეალური trending tags გამოდის query-ით.
- **Admin moderation queues:** დაემატა გვერდები **`/admin/user-reports`** და **`/admin/blocks`** (`AdminUserReportsPage`, `AdminBlocksPage`) შესაბამისი data-fetch/delete ოპერაციებით; `AdminPage` overview/nav და `adminStats` გაფართოვდა blocks/user-reports მეტრიკებით.
- **Post edit:** დაემატა პოსტის ტექსტის რედაქტირება `PostCard`-იდან (`src/lib/editPost.ts`, `updatePostBody`) — anti-spam recheck მუშაობს არსებული DB trigger-ით; UI-ში „edited“/save/cancel და flagged-hint შეტყობინებები.
- **i18n/UI wiring:** განახლდა `messages.ts`, routes (`App.tsx`, `lazy/chunks.ts`), chat/search/profile/user pages და `styles.css` შესაბამისი ბლოკებით.
- **საერთო სტატუსი:** ამ ეტაპის **ყველა არსებული Supabase migration წარმატებითაა გაშვებული** production/live გარემოზე (მომხმარებლის დადასტურება).

### 2026-04-09 — Profile page "Luminous" visual redesign (Claude)

- **Hero card:** glassmorphism background + gradient accent top-line (hero-gradient-shift keyframe) + focus-within glow
- **Avatar ring:** conic-gradient rotating border (avatar-ring-rotate keyframe), hover pulse+glow micro-interaction
- **Name:** gradient reveal on hover (text → accent gradient via background-clip)
- **Bio:** left accent border + tinted background, entrance fade animation
- **Stats:** staggered pop entrance (stat-pop keyframe, 3 stagger classes), divider lines, hover glow on link items
- **Tabs:** pill-style redesign (rounded, filled accent gradient for selected, uppercase/letter-spacing)
- **Posts section:** entrance animation (profile-posts-enter), dashed-border empty state
- **Premium badge:** 3-color gradient shimmer, box-shadow glow
- **Light theme:** dedicated overrides for hero bg, bio accent, stat hover, tab hover/active
- **Accessibility:** keyboard focus-visible на ყველა interactive element, prefers-reduced-motion global block respected
- TSX ცვლილება: avatar-ring wrapper (`profile-hero__avatar-ring`), stagger classes stats-ზე
- Verified: `tsc --noEmit` clean, CSS brace balance OK

### 2026-04-09 — Social privacy/moderation გაუმჯობესებები (Claude): private profile, requests, blocks, user reports, last seen

- **DB migrations დამატებული და გაშვებული Supabase-ზე (დადასტურებული):** `20260401351800_add_private_profiles_and_follow_requests.sql`, `20260401351900_add_blocks_table.sql`, `20260401352000_add_user_reports.sql`, `20260401352100_add_last_seen.sql`.
- **Privacy + follow flow:** `profiles.is_private` + `follow_requests`; private პროფილზე follow მიდის request-ად, მიღება ხდება RPC-ით `accept_follow_request`.
- **Blocks:** `blocks` ცხრილი + ტრიგერი `block_user_cleanup` — ბლოკის დროს ორივე მიმართულებით იშლება `follows` და `follow_requests`.
- **User moderation:** `user_reports` ცხრილი (user-to-user რეპორტები, admin read/delete policy).
- **Presence:** `profiles.last_seen_at` + RPC `update_last_seen`; აპში დამატებულია `lastSeen.ts` helper-ები („online / last seen ...“ ფორმატირება).
- **აპის მხარე:** ახალი მოდულები `src/lib/followRequests.ts`, `src/lib/blocks.ts`, `src/lib/userReports.ts`, `src/lib/lastSeen.ts` და შესაბამისი გვერდების/სტილების განახლებები (Profile/Settings/UserProfile/Messages/Notifications/Search/Layout).
- **სტატუსი:** კოდი და migrations **წარმატებით გაშვებულია live Supabase-ზე** (მომხმარებლის დადასტურება).

### 2026-04-09 — Motion + დიზაინი: ოფიციალური პრიორიტეტი (Claude-ის ხაზი) — ერთიანი დადასტურება

**სტატუსი:** ეს სექცია არის **ერთადერთი ცოცხალი წყარო** იმავე თემაზე. წინა დღიური სათაურები იმ თემაზე (2026-04-08 motion სერია + ცალკე „უკუკავშირი“) **გაერთიანდა აქ** — ძველი ჩანაწერები აღარ უნდა იკითხებოდეს როგორც პარალელური სტატუსი.

- **პრიორიტეტი:** გარე ასისტენტის (Claude) შემოთავაზებული **motion + sound + route transitions** მიმართულება არის **ტალღა 2 UI polish-ის ოფიციალური პრიორიტეტი**. შემდგომი ვიზუალური/motion ცვლილებები უნდა **ემთხვეოდეს** **`MOTION_SOUND_POLISH.md`**-ს (Tier 1/2/3, route map, sound profiles, QA); შემთხვევითი ეფექტების დაყრა სპეკის გარეთ — არა.
- **პროდუქტის დადასტურება:** ვიზუალური იერი **მოსწონს**; **გვერდებს შორის გადასვლა** (`LayoutOutlet`, route transitions) დადასტურებულია როგორც სწორი ხარისხი; **`prefers-reduced-motion`** დაცვა უცვლელია.

**იმპლემენტაციის მიმოხილვა (2026-04-08, ტექნიკური):**

- **Pilot → სისტემა:** Home↔Search `page-turn` + gesture-gated ხმა; **`MOTION_SOUND_POLISH.md`** + `AGENTS.md` / `project.md` სინქი.
- **Cleanup:** page-turn დახვეწა (მაგ. duration **820ms → 540ms**, keyframe-ები ნაკლებად აგრესიული), **`route-fold-heart` / გულის motif ამოღებული**, `--ease-route`, ხმის softening.
- **Tier 3:** `LayoutOutlet` — `route-glide`, `route-card`, Admin/Legal/Security → `route-minimal`; direction-aware კლასები (`NAV_ORDER`); transition-ის მიხედვით sound map.
- **Tier 1–2:** გლობალური micro-interactions (`layout__nav-link`, `.btn`, `.card`, …); შერჩეულ კონტროლებზე მსუბუქი 3D (nav, ტაბები, primary CTA); RPC/URL ლოგიკა უცვლელი.

**დოკუმენტები:** სრული სპეკი — **`MOTION_SOUND_POLISH.md`**; სპეკში ჩაწერა — **`project.md` → CURRENT WORK** + „შემდეგი განვითარების გეგმა“ #16; სწრაფი კონტექსტი — **`AGENTS.md`**.

### 2026-04-08 — ინფინიტი სქროლი + CSS პოლირების ტალღა

- **ინფინიტი სქროლი:** `src/hooks/useInfiniteScroll.ts` (`IntersectionObserver`, `rootMargin` ~200px). **Load More** ღილაკი მოხსნილი: **`HomePage`**, **`ProfilePage`** (Commented), **`UserProfilePage`** (Commented), **`UserFollowListPage`** — სენტინელი ბოლოში + ჩატვირთვის ინდიკატორი; `fetchNextPage` / იგივე ლოგიკა უცვლელი.
- **მთავარი (`/`):** პოსტების cascade stagger, composer focus-glow, sidebar trending slide, feed ტაბები **`aria-selected`** (არა `.active`); `messages.ts` — `sidebarTrendingTitle` / `sidebarTrendingAria` (en/ka/ru).
- **Notifications / Search / Messages:** notif row stagger + unread pulse; search form glow + profile row slide; conversation row slide + chat composer glow + send press (`styles.css`).

### 2026-04-07 — Profile გვერდის პოლირება: ტაბები, სტატისტიკა, hero, premium

- **ბაგფიქსი:** ტაბების აქტიური სტილი — `.active` არ გამოიყენება JSX-ში; სტილები გადატანილია **`[aria-selected="true"]`** + `::after` underline (ცენტრიდან გაშლა hover-ზე 25–75%, არჩეულზე სრული სიგანე).
- **Stat ლინკები:** `.profile-stats__item--link` — hover `translateY(-2px)` + `surface-raised`; `:active` `scale(0.97)`; `focus-visible` ring.
- **Hero:** `.profile-hero:focus-within` — accent border + რბილი გარე glow; toolbar ღილაკი `:active` `scale(0.93)`.
- **Premium ბეიჯი:** `premium-shimmer` keyframes (გრადიენტის `background-position`), 3s loop.
- **TSX:** უცვლელი; მხოლოდ `styles.css` + ჟურნალი. `prefers-reduced-motion` — გლობალური წესი.

### 2026-04-07 — Settings გვერდის პოლირება: მიკრო-ინტერაქციები

- **ბარათები:** `translateY(-2px)` + ჩრდილი hover-ზე; `focus-within` — accent border.
- **ღილაკები:** primary/danger `:active` — `scale(0.95)` + inset shadow; logout — `scale(0.96)`; `focus-visible` — `--focus-ring`.
- **Delete zone:** `.settings-delete-zone` — სუსტი წითელი border, hover-ზე ინტენსივობა + danger-tint shadow (`SettingsPage.tsx`-ში კლასი).
- **Checkbox:** `.form__label--checkbox` hover — `surface-raised`.
- **Locale select:** hover-ზე accent border.
- **წარმატების შეტყობინება:** `settings-fade-in` keyframes (opacity + translateY); გლობალური `prefers-reduced-motion` უკვე აჩერებს ანიმაციას/transition-ს.
- **ლოგიკა:** უცვლელი (auth, delete, checkout, query keys).

### 2026-04-07 — ინოვაცია: განმარტება (მიკრო-ინტერაქცია) + SETTINGS/PROFILE სკოპ-დოკები

- **ინოვაცია polish-ში:** AI **თავად გამოიგონოს და ჩაამბედოს** მიკრო-ინტერაქციები — hover / `:active` / `focus-visible` (ღილაკები, ლინკები, ტაბები), მაუსის რეაქცია; **არა** მხოლოდ ფერების/დაშორების გადახატვა. **`AGENTS.md`:** ქართული ახსნა ცხრილში + განახლებული ინგლისური **INNOVATION** ბლოკი.
- **`HOME_PAGE_POLISH` / `NOTIFICATIONS` / `MESSAGES` / `SEARCH`:** „Innovation“ სექციები — **invent and embed** (ინგლისური).
- **ახალი:** **`SETTINGS_POLISH.md`**, **`PROFILE_POLISH.md`**.

### 2026-04-07 — ყველა გვერდი: innovation pass (CSS micro-interactions + a11y)

- **Home:** feed tab `focus-visible` ring; sidebar widget hover lift (`translateY(-1px)` + `box-shadow`); premium CTA `prefers-reduced-motion` guard.
- **Notifications:** unread dot indicator (accent `::before` pseudo); row transition `prefers-reduced-motion` guard.
- **Messages/Chat:** bubble fade-in keyframe (`chat-bubble-in`, 200ms); scroller `overscroll-behavior: contain`; conversation link + bubble `prefers-reduced-motion` guards.
- **Search:** submit button press micro-interaction (`scale(0.97)` on `:active`); `prefers-reduced-motion` guard.
- **ყველგან:** ახალი ანიმაცია/transition → `prefers-reduced-motion: reduce` ბლოკი. ლოგიკა/RPC/URL უცვლელი.

### 2026-04-03 — Polish დოკები: ინოვაციის სექცია + საერთო Cowork ბლოკი

- **`HOME_PAGE_POLISH.md`**, **`NOTIFICATIONS_POLISH.md`**, **`MESSAGES_POLISH.md`**, **`SEARCH_POLISH.md`:** დაემატა **„Innovation — propose and (if safe) implement“** (შეჯამებაში 1–3 იდეა; იმპლემენტაცია მხოლოდ უსაფრთხო სკოპში; `prefers-reduced-motion`).
- **`AGENTS.md`:** `*_POLISH.md` საერთო წესი ცხრილში + ინგლისური **INNOVATION** ბლოკი ჩასასმელად ყველა polish პრომპტში.

### 2026-04-07 — Search: ვიზუალური polish (CSS-only)

- **Search form:** `.search-form` horizontal layout (input + button ერთ ხაზზე), `focus-visible` ring input-სა და button-ზე; mobile column stacking 480px.
- **Results region:** gap გადიდებული `space-lg`; focus outline ამოღებული (tabIndex container).
- **Empty state:** dashed border, padding გადიდებული, font-size 15px — უფრო ძლიერი ვიზუალური იერარქია.
- **Profile list:** კონტეინერი `.search-profile-list` (list reset); row-ები border-top/bottom, hover background (transition, `prefers-reduced-motion: reduce` პატივისცემა), email/id ellipsis overflow, actions `focus-visible` ring; mobile wrap 600px.
- **ლოგიკა/RPC/URL:** უცვლელი; მხოლოდ `styles.css`.

### 2026-04-07 — Messages / Chat: ვიზუალური polish (CSS-only)

- **Conversation list:** კონტეინერი `.conversation-list` (list reset, flex column); link-row layout — avatar + peer + time ერთ ხაზზე, `border-top/bottom`, hover background, `focus-visible` ring; mobile stacking 600px.
- **Chat thread:** bubble alignment — `.chat-bubble--mine` flex-end (accent background, თეთრი ტექსტი), `.chat-bubble--theirs` flex-start (surface bg); tail-radius (sm) ქვედა კუთხეში; scroller `radius-lg`.
- **Composer:** `align-items: flex-end`, mobile-ზე column stacking; send button `focus-visible` ring.
- **Header:** `justify-content: space-between`, title overflow ellipsis.
- **ლოგიკა/data flow:** უცვლელი; მხოლოდ `styles.css`.

### 2026-04-07 — Notifications: ვიზუალური polish (CSS-only)

- **Notification list:** კონტეინერი `.notification-list` + `.notification-list__item` — row padding, border-bottom separators, hover background, mobile stacking (`@media max-width: 600px`).
- **Unread highlight:** მარცხენა accent border (3px) + accent tint background (`color-mix`); unread msg `font-weight: 600`.
- **Header:** `justify-content: space-between`, title margin ამოღებული (`.card__title` margin: 0 head-ის შიგნით).
- **Focus:** `.btn:focus-visible` — `box-shadow: var(--focus-ring)` notification row-ში.
- **ლოგიკა/query/URL:** უცვლელი; მხოლოდ `styles.css`.

### 2026-04-03 — Messages: Cowork სკოპ-დოკი

- **`MESSAGES_POLISH.md`:** `/messages` + `/messages/:peerId` — სია + chat thread; რა არ შეიცვალოს (`lib/chat.ts`, RLS, feature flag); უსაფრთხო polish (CSS, a11y); `AGENTS.md`-ში ლინკი.

### 2026-04-03 — Search: Cowork სკოპ-დოკი

- **`SEARCH_POLISH.md`:** `/search` — ფორმა, შედეგები, პროფილების სია; **Optional innovation** (მიკრო-ანიმაცია, empty state, `prefers-reduced-motion`); არა ახალი RPC/პარამეტრები; `AGENTS.md`.

### 2026-04-03 — Notifications: Cowork სკოპ-დოკი

- **`NOTIFICATIONS_POLISH.md`:** `/notifications` — რა არის სისტემაში, რა არ შეიცვალოს (DB, query keys, mark read), უსაფრთხო polish (CSS, a11y, i18n); `AGENTS.md`-ში ლინკი.

### 2026-04-07 — Home: ვიზუალური polish (CSS-only)

- **Feed tabs:** ტაბები full-width, ცენტრალური ტექსტი, underline inset-ით (radius 1px), `letter-spacing: 0.02em`.
- **Composer card:** `margin-top: space-md`, `margin-bottom: space-lg` — უკეთესი რიტმი toolbar→composer→feed.
- **Sidebar widget:** `border-radius: radius-lg`, trend-item separator (`border-bottom`), tag ფერი accent, hover underline.
- **Premium CTA:** `radius-lg`, hover opacity transition (0.55 → 0.85), actions gap გადიდებული.
- **feed__more:** padding შემცირებული (`space-lg 0 space-xl`).
- **ლოგიკა/query/URL:** უცვლელი; მხოლოდ `styles.css` შეიცვალა.

### 2026-04-07 — Home: Cowork handoff + პატარა polish

- **`HOME_PAGE_POLISH.md`:** ინგლისური სკოპი — რა არის გაკეთებული, რა არ დაირღვეს, უსაფრთხო მიმართულებები (`AGENTS.md` ცხრილში ლინკი).
- **`HomePage`:** საიდბარის სათაური/aria — `pages.home.sidebarTrendingTitle` / `sidebarTrendingAria` (`en`/`ka`/`ru`); Premium CTA wrapper — კლასი `.home-premium-cta-wrap` (`styles.css`), inline style ამოღებული.
- **ლოგიკა/query/URL:** უცვლელი.

### 2026-04-07 — Admin pages: სრული რედიზაინი + ფუნქციონალის გაფართოება

- **AdminPage (Dashboard):** ტექსტური ლინკების ნაცვლად — ვიზუალური nav კარტები (emoji icon + accent border), 4 სტატ-ბლოკი (profiles/posts/comments/reactions) + 4 extra metric, responsive grid (2-col mobile), promote hint ქვემოთ.
- **AdminUsersPage:** დამატებულია **search bar** (email/ID/ban_reason), **filter chips** (All/Banned/Admins/Premium counts), **pagination** (25/page), **mobile card layout** (ცხრილის ნაცვლად კარტები <768px-ზე), status **badges** (Admin ლურჯი, Banned წითელი), banned row highlight.
- **AdminModerationPage:** დამატებულია **media preview** — პოსტის `image_url` და `video_url` ჩანს moderation-ის კარტში, **filter chips** (All/Flagged/Clean + counts), flagged item-ების **left-border accent** (წითელი), **spam score** ცალკე styled, flagged count badge სათაურში.
- **AdminReportsPage:** დამატებულია **report count per post** (ნაჩვენებია "3x reported" badge-ით), **hot report highlight** (3+ reports = orange left-border), **moderation ლინკი** (reports → moderation სწრაფი გადასვლა), total count badge სათაურში.
- **AdminStatsPage:** metric კარტებს დაემატა **emoji icons**, hover effect, rounded corners, formatted numbers (K/M).
- **AdminFeatureFlagsPage:** სტილი **`styles.css`**-ში (`.admin-feature-flags__item:hover` და სხვ.) — TSX უცვლელი; ვიზუალური polish.
- **არ შეცვლილა ამ commit-ში:** `AdminAdsPage.tsx`, `AdminApiPage.tsx` (მხოლოდ Dashboard-ის nav ბმულები იგივე რჩება).
- **CSS:** ახალი კლასები — `admin-dashboard*`, `admin-stat-card*`, `admin-nav-card*`, `admin-extra-stat*`, `admin-users-toolbar*`, `admin-filter-chip*`, `admin-user-card*` (mobile), `admin-pagination*`, `admin-moderation-count*`, `admin-moderation-list__media/image/video`, `admin-reports-list__count/post-id/item--hot`. Responsive: admin pages mobile padding, users table→cards, dashboard grid 2-col.
- **TypeScript:** `npm run build` (`tsc -b`) — passes (0 errors).

### 2026-04-07 — UI: ფაილის ინფუტის overlap (Settings) + კომპონენტური CSS + dev `431`

- **პრობლემა:** `.post-form__file-input` (იგივე კლასი **`PostForm`**-სა და **`AvatarUploadSection`**-ში) ძველ კონფიგში იყო **`position: absolute; inset: 0; opacity: 0; cursor: pointer`** — უხილავი „დიდი“ დაჭერის ზონა შეიძლება გადაფარავდეს სხვა კონტროლებს (მაგ. ენის `select` Settings-ზე), თუ მშობელი არ არის სწორად `position: relative`.
- **შეფასება (პატერნი):** გადაყვანა **`position: fixed; left/top: -9999px`**, `width/height: 0`, **`pointer-events: none`**, `overflow: hidden` — გახსნა მხოლოდ **`fileRef.current?.click()`** ღილაკიდან — **სწორი მიდგომაა** (არ იჭერს კლიკებს სხვა ელემენტებზე; პროგრამული `.click()` რჩება).
- **CSS დაფარვა:** Instagram-inspired redesign-ის შემდეგ დამატებულია/გაფართოვებული კომპონენტული ბლოკები (`report-post`, კომენტარების/ლენტის chrome, sticky toolbar და სხვ.) — „გამოტოვებული კლასების“ შევსება ვიზუალური რეგრესიისთვის.
- **Dev `431 Request Header Fields Too Large`:** `package.json` → `dev` სკრიპტი **`node --max-http-header-size=65536`** + `vite` — დიდი Cookie header-ები localhost-ზე (იხილე Vite troubleshooting).
- **Git სინქი:** სანამ **`git commit` + `git push`** არ გაკეთდება, **GitHub-ის `main`-ზე** შეიძლება კვლავ ძველი `.post-form__file-input` წესი იყოს — **დაკომიტება რეკომენდებულია** ლოკალური `src/styles.css` / `package.json` ცვლილებებისთვის.

### 2026-04-03 — ტალღა 2: UI polish (rz tokens, Layout, Home grid, feed tabs, PostCard/PostForm, feed ad)

- **`styles.css`:** `--rz-*` design tokens; `avatar-gradient` (+ `b` / `c`); navbar (`theme-pill`, `layout__user-avatar`, `notif-dot`); dark `html[data-theme="dark"] body`; post card + composer + **`feed-tabs`** / **`feed-tabs__tab`**; home layout (**`home-page`** grid, **`home-feed`**, **`home-sidebar`**, trending placeholder); **`feed-ad`** — rz ტოკენები, კომპაქტური ბლოკი, label + dot (`::before`).
- **`Layout.tsx`**, **`PostCard.tsx`**, **`PostForm.tsx`**, **`HomePage.tsx`** — კლასები/სტრუქტურა; ბიზნეს-ლოგიკა და query-ები უცვლელი.
- **შემოწმება:** `npm run build`, `npm test` — OK. Production UI: Vercel-ზე ვიზუალური audit ხელით (navbar, sticky tabs, cards, composer, sidebar, sponsored).

### 2026-04-03 — Admin feature flags: `feature_flags` + `/admin/features`

- Migration `20260401351500_add_feature_flags.sql`: public `SELECT`, admin `UPDATE`; seed `feed_trending_tab`, `feed_ads`. Home: hides Trending tab and `FeedAdSlot` when off (no disabled message). **Production:** გაუშვი migration Supabase-ზე სანამ UI-ს დაყვანდები.
- Admin overview + layout nav: ლინკი „Features“ / ფლაგები.
- Migration `20260401351600_add_feature_flags_comments_nav.sql`: `post_comments` (PostCard `CommentSection`), `nav_search` (Layout + `/search` redirect), `nav_messages` (Layout + `/messages` routes redirect). `useAppFeatureFlags` hook — ერთი query მთელ აპში.
- **ფიქსი:** `queryKeys.featureFlags` გაყოფილია `map` vs `adminRows` — იგივე key-ზე სხვა `queryFn` (ობიექტი vs მასივი) იწვევდა `/admin/features`-ზე `listQuery.data.map is not a function`.
- Migration `20260401351700`: `home_premium_cta` — მთავარი ლენტის პრემიუმის ბარათი (Settings / Sign in); ადმინში გამორთვა. უკვე Premium მომხმარებელს არ ეჩვენება.
- **Home Premium CTA polish:** `profileFlagsLoading`-ით ბარათი აღარ იმალება შესულ მომხმარებლებზე; `VITE_BILLING_CHECKOUT_ENABLED=true`-ზე მთავარზე **Continue to checkout** + ლინკი Settings; `?checkout=` success/cancel იგივე ლოგიკით რაც Settings.
- **Premium plan preview (checkout გამორთული):** Settings → Account — სია უპორტოები (5000/1000 სიმბოლო, თეგები 8/4, ვიდეო), 30 დღის გახანგრძლივება, ფასი TBD, როდის ჩაირთვება checkout; მთავარზე `premiumCtaBodyNoBilling`.

### 2026-04-05 — Billing: `VITE_BILLING_CHECKOUT_ENABLED` (ნაგულისხმევად გამორთული)

- **`src/lib/billingFlags.ts`:** checkout ღილაკი Settings-ში მხოლოდ `=== "true"`-ზე; სანამ Stripe არ ჩაირთვება — ინფო ტექსტი (`premiumCheckoutDisabledHint`).
- **`.env.example`**, **`README.md`**, **`project.md`** P1.

### 2026-04-05 — P1: Stripe Checkout (Settings) + Edge `create-checkout-session`

- **`supabase/functions/create-checkout-session`:** JWT → Stripe Checkout Session (`metadata.user_id`, `premium_days`); `STRIPE_PRICE_ID` ან `STRIPE_PRICE_UNIT_AMOUNT_CENTS`; `SITE_URL` ოფციონალური.
- **`src/lib/createCheckoutSession.ts`**, **`SettingsPage`:** ღილაკი, `?checkout=success|cancelled`, invalidate `queryKeys.profile.flags`.
- **`README.md`**, **`SCHEMA.md`**, **`.env.example`**, **`project.md`** P1 სტატუსი.
- **Production:** `supabase functions deploy create-checkout-session` + იგივე Stripe secrets რაც webhook-ს; ტესტი Stripe test mode.

### 2026-04-05 — `project.md`: რეკლამა (#23 baseline) vs ბიზნეს P1/P2

- **`#### ბიზნესი / §24`:** დაემატა პარაგრაფი **„რეკლამის განთავსება და ბიზნეს გეგმა“** — ადმინისტრაციული `ad_slots` / `FeedAdSlot` (უკვე baseline) გამიჯნულია **P1** (Stripe Premium)-სგან; **P2** — გადახდიანი პრომოცია იმავე მოდელთან დაკავშირებით.

### 2026-04-03 — `styles.css`: Problems (CSS linter) გასწორება

- **`.post-card__video` / `.mod-list__video`:** `vertical-align` ამოღებული — `display: block`-ზე უქმია და linter აფრთხილებდა.
- **`.post-card__body--clamped`:** დამატებულია სტანდარტული `line-clamp: 1` (ერთად `-webkit-line-clamp`-თან).

### 2026-04-03 — ბიზნესი / §24: ოფიციალური გადაწყვეტილება + Cursor წესი „პროექტის დაცვა“

- **`project.md`:** `#### ბიზნესი / §24 — განვითარების გადაწყვეტილება და რისკების დაზღვევა` — P1 (Stripe + in-app Checkout), P1+, P2, გადადებული; დაზღვევის ხაზები (არ ავურიოთ პარალელურად რამდენიმე გადახდის დიდი ფიჩა; RLS/secrets).
- **`.cursor/rules/reziizi.mdc`:** სექცია **„პროექტის დაცვა — არ გავაფუჭოთ / არ გავტეხოთ REZIIZI“** — წყარო `project.md`, ერთი სკოპი, გარე ჩატი ≠ სპეკი, Stripe რიგი.

### 2026-04-03 — §33: `not-found-page` + `card__title` (ფაზა E)

- **`styles.css`:** `.not-found-page .card__title` დაემატა იმავე §33 პირველადი სათაურის სელექტორთან (font-weight/letter-spacing), როგორც სხვა გვერდებზე.

### 2026-04-03 — 404 გვერდი (catch-all `*`)

- **`NotFoundPage`:** `pages.notFoundPage.*` (`en`/`ka`/`ru`); lazy `lazy/chunks.ts`.
- **`App.tsx`:** `path="*"` — ჩუმი რედირექტის ნაცვლად UI + ბმული მთავარზე.
- **`seo.ts`:** არარსებული მარშრუტი → `pageFromRouteKey(..., "notFound", "noindex,nofollow")`; **`seo.test.ts`** განახლებული.
- **შემოწმება:** `npm test`, `npm run build` — OK.

### 2026-04-03 — Search: `prefers-reduced-motion` + SEO `?q=`

- **`prefersReducedMotion`:** სქროლი შედეგებზე — `auto` vs `smooth`.
- **`seo.ts` / `messages.*`:** `searchWithQueryTitle` / `searchWithQueryDescription`; `getSeoForPath` / `applyPageSeo` / `getRouteAnnouncement` — მესამე არგუმენტი `search`; canonical ჩათვლით query.
- **`RouteSeo` / `RouteAnnouncer`:** `useLocation().search`.
- **`seo.test.ts`** — დინამიკური ძიება + მოკლე `q`.
- **შემოწმება:** `npm test`, `npm run build` — OK.

### 2026-04-03 — Search: შედეგებზე სქროლი + ფოკუსი (`#search-results`)

- **`SearchPage`:** ვალიდური `q`-ისთვის შედეგების ბლოკი `aria-label`; ძიების დასრულებისას (ერთხელ თითო `q`) — `scrollIntoView` + `focus({ preventScroll })`; **`messages.*`** `resultsRegionLabel`; **`styles.css`** `.search-page__results-region:focus-visible`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Search UX (ფაზა B): ინტრო + ერთიანი ცარიელი შედეგი

- **`SearchPage`:** `pages.search.introHint` როცა `q` არაა; `noResultsAny` როცა ვალიდური ძიება და 0 პოსტი + 0 პროფილი (`en`/`ka`/`ru`).
- **`project.md`:** ფაზა B ცხრილი — Search polish ნაწილობრივ; §14 Implementation.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — ტეგები ტირით: უფასო 4 / პრემიუმი+ადმინი 8

- **SQL:** `20260401351400_post_tags_tier_limit.sql` — `post_tags_enforce_tier_limit` BEFORE INSERT.
- **აპი:** `tagParse.ts` (`getMaxTagsPerPost`, `parseTagsFromInput(…, maxTags)`), `PostForm`, `messages.*` `tagsHint` / `tagsTierLimit`.
- **დოკი:** `project.md` (Premium ცხრილი, §15), `SCHEMA.md`, `verify_schema.sql`, **`reziizi.mdc`** migrations #38.
- **Production:** migration გაშვება სავალდებულოა live Supabase-ზე.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — PostForm: ტეგების slug-ების live preview

- **`PostForm.tsx`:** `parseTagsFromInput` → ჩიპები „შეინახება როგორც“; ცარიელი შედეგი — გაფრთხილება არა-ლათინური მხოლოდ ინფუთზე.
- **`messages.ts`:** `tagsPreviewLabel`, `tagsPreviewInvalid` (en/ka/ru); **`styles.css`:** `.post-form__tags-preview`, `.tag-chip--preview`, `.form__hint--warning`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — ტეგები: პროდუქტის გადაწყვეტილება B (ცალკე ველი; body `#` არა)

- **`project.md` §15:** ვარიანტები A–D, რატომ MVP-ზე მხოლოდ **B**, edge case-ები, მომავალი ტრიგერი (ანალიტიკა), optional **live preview** polish.
- **CURRENT WORK** — ერთი ბულეტი იმავე თემაზე.

### 2026-04-03 — Free vs Premium პოსტი: ტექსტი 1000/5000, ვიდეო მხოლოდ პრემიუმზე

- **SQL:** `20260401351300_posts_tier_free_premium.sql` — `posts_enforce_tier_limits` (INSERT/UPDATE); Storage `post-videos` insert/update — `premium_until` ან `is_admin`.
- **აპი:** `postBodyLimits.ts` (`getPostBodyMaxLength`), `PostForm.tsx` (კონტერი, სურათი/ვიდეო UI), `messages.ts` `en`/`ka`/`ru`.
- **დოკი:** `project.md` (Premium vs free ცხრილი), `SCHEMA.md`, `verify_schema.sql`, **`reziizi.mdc`** #37.
- **შემოწმება:** `npm run build`, `npm test` — OK. **Production:** migration გაშვება სავალდებულოა.

### 2026-04-03 — პოსტის `body` მაქს. სიგრძე 5000 (იყო 10000)

- **SQL:** `20260401351200_posts_body_max_5000.sql` — `posts_body_length_check` 1..5000; წინა inline CHECK მოიხსნება დინამიურად.
- **აპი:** `src/lib/postBodyLimits.ts` (`POST_BODY_MAX_LENGTH`), `PostForm.tsx`; `SCHEMA.md`, **`reziizi.mdc`** #36.
- **შემოწმება:** `npm run build`, `npm test` — OK. **Production:** migration სავალდებულია; თუ უკვე არსებობს `body` >5000, ჯერ მოკლე DB-ში ან წაშლა.

### 2026-04-03 — Anti-spam ტუნინგი: 7 წთ ფანჯარა, მინ. სიგრძე 15 (`20260401351100`)

- **SQL:** `20260401351100_antispam_tune_window_7_min_len_15.sql` — `spam_duplicate_eligible` ≥ 15; duplicate-within-window **7 minutes** (INSERT + UPDATE paths); `SCHEMA.md`, `project.md` (CURRENT WORK + სპეკის ცხრილები), **`reziizi.mdc`** migrations #35.
- **შემოწმება:** `npm run build`, `npm test` — OK. **Production:** migration გაშვება სავალდებულოა live-ზე.

### 2026-04-03 — სპამის დახვეწა (ფაზა A): `spam_duplicate_eligible` + toast

- **SQL:** `20260401351000_antispam_duplicate_min_body_length.sql` — `spam_duplicate_eligible` (ნორმალიზებული სიგრძე ≥ 12); duplicate ევრისტიკა INSERT/UPDATE-ზე მხოლოდ ამის შემდეგ; `SCHEMA.md`, `verify_schema.sql`; **`reziizi.mdc`** migrations #34.
- **აპი:** `PostForm` / `CommentSection` — info toast თუ `is_flagged` შექმნისას; `messages.ts` `en`/`ka`/`ru`.
- **`project.md` CURRENT WORK** — ბულეტი; **შემოწმება:** `npm run build`, `npm test` — OK. **Production Supabase:** migration გაშვება სავალდებულოა.

### 2026-04-03 — ფაზა A/B/C: სკოპი, წესები, სტატუსის ცხრილი (`project.md`, `AGENTS.md`)

- **`project.md`:** `### შემდეგი ფაზა` გადაკეთებული — ცალკე ცხრილი „რას ნიშნავს A vs B vs C“, **შედის / არ შედის სკოპში**; **5 წესი** მომხმარებელი+AI; ცხრილი **რა ✅ vs რა 🔄 გახსნილი**; **§49** სტატუსი: MVP ✅, გაფართოება 🔄.
- **`AGENTS.md`:** მიმართება იმავე სექციაზე.

### 2026-04-03 — ტალღა 1–4+ + MASTER 1–51 ცხრილი (`project.md`, `AGENTS.md`)

- **`project.md` `## CURRENT WORK`:** ცხრილი ტალღების განსაზღვრება (1=baseline … 4+=ops·Future); **MASTER 1–51** ორ სვეტად — ტალღა 1 ✅ vs მომავალი ტალღა; **შემდეგი განვითარების გეგმა** — A11Y/Rate: „v3/v2“ → **ტალღა 2+**.
- **`AGENTS.md`:** ერთიანი ბულეტი ტალღებზე + მიმართება იმავე ცხრილზე.

### 2026-04-03 — `FEATURE BREAKDOWN` § სათაურები — 🟡 → ✅ (MASTER სინქი)

- **`project.md`:** §4, 5, 10–11, 30–32, 36–37, 41–44, 48 — სათაური **✅ baseline**; §45, §49 — **✅/🔄** როგორც MASTER LIST-ში; §50 — „კატეგორია“ (არა ❌ როგორც „ფიჩა ჩავარდნილი“); **ლეგენდა** გაფართოვებული — `FEATURE BREAKDOWN` სინქი MASTER-თან.

### 2026-04-03 — MASTER FEATURE LIST (1–51) სინქი `VERSIONS` + CURRENT WORK

- **`project.md`:** თითო პუნქტს სტატუსი ✅/🔄/❌ ან კატეგორია (50); ლეგენდა; **v1** შენიშვნა (4, 5, 10–11, 38 baseline); **v3** დამატებითი baseline პარაგრაფი (4–5, 10–11, 42–49, 33–35 polish). ძველი 🟡 MASTER სიაში ამოღებულია (იყო უთანხვედრო v3 დასრულებასთან).

### 2026-04-03 — `project.md` / `AGENTS.md`: ტალღა 1→2, §33/§34/§35 სინქი

- **`project.md`:** ახალი ბლოკი **CURRENT WORK**-ში — „ტალღები“ (baseline vs გაფართოება, ფუნდამენტი რომ არ მოგვიწიოს მთლიანი გადაწერა); **§33** განახლებული რეალური სტატუსით + Future; **§34** — v2 baseline ცალკე (თემა არა მხოლოდ „Future“); **§35** — v3+ რეალური polish + Future.
- **`AGENTS.md`:** მიმართება იმავე სექციაზე.

### 2026-04-03 — PlaceholderCard i18n (`pages.common.scaffoldInProgress*`)

- **`messages.ts`:** `pages.common.scaffoldInProgress`, `scaffoldInProgressHint` — `en` / `ka` / `ru`; **`PlaceholderCard.tsx`** — `useI18n` (ბეიჯი + `title`).
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Root ErrorBoundary i18n (`errors.appBoundaryBody`, `errors.reload`)

- **`messages.ts`:** `errors.appBoundaryBody`, `errors.reload` — `en` / `ka` / `ru`; **`ErrorBoundary.tsx`** — სტრინგები props-ით; **`main.tsx`** — `AppErrorBoundary` (`useI18n`), სათაური/ტექსტი/გადატვირთვა/მთავარი `t()`-ით; მთავარი ბმული `inline-link`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Feed: FeedAdSlot i18n (`pages.home.feedAd*`)

- **`messages.ts`:** `pages.home.feedAdSponsored`, `feedAdSponsoredContent` — `en` / `ka` / `ru`; **`FeedAdSlot.tsx`** — `useI18n` (სათაური-ფოლბექი, ეტიკეტი, `aria-label`).
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Settings: AvatarUploadSection i18n (`settings.avatar*`)

- **`messages.ts`:** `avatarSectionTitle`, `avatarFormatHint`, `avatarChooseAria`, `avatarUpload`, `avatarRemove`, toast/confirm, `avatarUserFallback` — `en` / `ka` / `ru`; **`AvatarUploadSection.tsx`** — `useI18n` / `t()`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — §35 მობილური: პროფილის ტაბები + Legal ნავი

- **`styles.css`** `@media (max-width: 600px)`: **`profile-tabs` / `profile-tabs__tab`** — ტაბები სრულ სიგანეზე, თანაბარი `flex`; **`legal-page__nav a`** — `min-height: var(--touch-compact)`, `inline-flex` (Legal + Security ზედა ნავი).
- **`project.md`** — **CURRENT WORK** ერთი ხაზით; **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — §33 (E): Legal ნავი + შეცდომის მდგომარეობები

- **`styles.css`:** `.legal-page .legal-page__nav` — `margin-bottom` (იგივე რაც Security-ზე); **`ChatThreadPage`** — არასწორი peer → `stack chat-page`, ბმული `inline-link`; **`UserProfilePage`** — არასწორი UUID → `stack profile-page`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — §33 (E): Legal გვერდის სათაურები

- **`styles.css`:** `.legal-page .legal-page__title`, `.legal-page .legal-section__title` — `font-weight` / `letter-spacing` იგივე ხმა რაც სხვა primary ზედაპირებზე; სტატიის **შიგთავსი** ჯერ ინგლისურია (`project.md`).
- **შემოწმება:** `npm run build` — OK.

### 2026-04-03 — `/banned` — i18n (`pages.bannedPage`)

- **`BannedPage`:** `useI18n` / `t()` — `en` / `ka` / `ru` (`messages.ts`); **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Supabase: ყველა migration live

- **`supabase/migrations/`** — რეპოში ჩამოწერილი SQL migration-ების სრული თანმიმდევრობა გაშვებულია **production Supabase-ზე** (დადასტურებული მომხმარებლის მიერ), მათ შორის **`20260401350600_antispam_recheck_on_body_update.sql`** (ხაზი 14 `project.md` ცხრილში → ✅).
- **`project.md`** — `CURRENT WORK` + პრიორიტეტების ცხრილი განახლებულია.

### 2026-04-03 — §33 (E): დამატებითი გვერდები `card__title`-ზე

- **`styles.css` §33:** `messages-page`, `banned-page`, `follow-list-page`, `admin-page`, `admin-moderation-page`, `admin-reports-page`, `chat-page`; **`MessagesPage`**, **`BannedPage`**, **`UserFollowListPage`** — შესაბამისი wrapper `stack`-ზე.
- **შემოწმება:** `npm run build` — OK.

### 2026-04-03 — Supabase: `20260401350900` live

- **D++** RPC `user_commented_post_ids` — მიგრაცია გაშვებულია წარმატებით production Supabase-ზე (დადასტურებული მომხმარებლის მიერ).

### 2026-04-03 — Profile D++: Posts / Commented ტაბები

- **Migration:** `20260401350900_add_user_commented_post_ids_rpc.sql` — RPC `user_commented_post_ids`; **აპი:** `ProfilePage` / `UserProfilePage` — `useSearchParams` (`tab=commented`), `useInfiniteQuery`, i18n `tabPosts` / `tabCommented` / `sectionCommented` / `emptyCommented*`; **`SCHEMA.md`**, **`verify_schema.sql`**, **`reziizi.mdc`**, **`project.md`** განახლებული.
- **შემოწმება:** `npm run build`, `npm test` — OK. **Supabase:** migration უნდა გაეშვას production-ზე (CLI ან SQL Editor).

### 2026-04-03 — §33 გაგრძელება: card__title ერთიანი სტილი

- **გვერდები:** `login-page`, `home-page`, `settings-page`, `notifications-page` (wrapper class); **`styles.css`** — საერთო სელექტორი §33 ბლოკში; **შემოწმება:** `npm run build` — OK.

### 2026-04-03 — §33 ფოკუსირებული pass (კრიტიკული ზედაპირი)

- **D++ (წინა შენიშვნა):** იმ დღეს Replies არ იყო განსაზღვრული; **შემდეგ** დაემატა **Posts / Commented** + RPC `user_commented_post_ids` — იხილე ზემოთ **2026-04-03 — Profile D++**.
- **`styles.css`:** `home-feed-toolbar--sticky` → `top: env(safe-area-inset-top)`; `.feed__more .btn` — `min-width: min(100%, 14rem)`; `.profile-page .card__title` — `font-weight` / `letter-spacing`.
- **`project.md`** — ჩანაწერი roadmap **E**; **შემოწმება:** `npm run build` — OK.

### 2026-04-03 — Profile D+: Copy public profile link

- **`copyToClipboard.ts`** — `getPublicProfileAbsoluteUrl`, `copyToClipboard`; **`ProfilePage`** / **`UserProfilePage`** — `profile-hero__toolbar` + toast; i18n `pages.profile.copyProfileLink*`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Profile ფაზა D: display_name + bio (DB + UI)

- **SQL:** `20260401350800_add_profiles_display_name_bio.sql` — `profiles.display_name` (≤80), `profiles.bio` (≤500); RLS უცვლელი (`profiles_update_own`).
- **აპი:** `profileAbout.ts` (`fetchProfileDisplay`, `updateProfileAbout`); `profileView.ts` / `fetchPublicProfile`; **Settings** სექცია; **ProfilePage** / **UserProfilePage**; `UserFollowListPage` `PublicProfileView` stub.
- **დოკი:** `SCHEMA.md`, `verify_schema.sql` (სვეტების შემოწმება), `reziizi.mdc` migrations ცხრილი, `project.md` roadmap.
- **Production:** migration Supabase-ში SQL Editor / `db push` — სანამ არ გაეშვება, პროფილის query შეიძლება დაერხილოს (სვეტები არ არსებობს).

### 2026-04-03 — Profile: post list skeleton (ფაზა C)

- **`ProfilePostListSkeleton`** — სამი მიმდევრული პლეისჰოლდერი (header/avatar + body + footer strip), `styles.css` — `profile-post-skeleton*`; **`ProfilePage`** / **`UserProfilePage`** — `postsQuery.isPending` / `postsLoading`; a11y: `role="status"` + `sr-only` + `aria-busy`; `prefers-reduced-motion` იგივე პრინციპით რაც `profile-skeleton`.
- **`project.md`** — roadmap ფაზა C ✅; **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Profile UX: roadmap + skeleton + empty-state CTA

- **გეგმა:** `project.md` → **„Profile UX — roadmap (polish)“** (ფაზა A/B დასრულებული; C–E მომავალი).
- **კოდი:** `profile-skeleton` (a11y: `sr-only` + `aria-hidden`), `emptyPostsCta` / `emptyPostsOther` (`en`/`ka`/`ru`); `ProfilePage` ცარიელი პოსტების ბმული `/`-ზე; `UserProfilePage` — სხვისი ცარიელი ტექსტი.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Profile UI polish (hero + stats grid)

- **`ProfilePage` / `UserProfilePage`:** `profile-hero__layout`, `profile-stats` (რიცხვები + მოკლე ლეიბლები), `profile-empty` ცარიელი feed-ისთვის; **`styles.css`** ტოკენებზე დაფუძნებული სტილი; **`messages.ts`** — `statsPosts`, `statsFollowers`, `statsFollowing`.
- **შემოწმება:** `npm run build`, `npm test` — OK.

### 2026-04-03 — Premium: migration live; Stripe live — მომავალი ფაზა (ლანჩი)

- **დადასტურება:** `20260401350700_allow_service_role_premium_update.sql` **წარმატებით გაშვებულია** Supabase-ზე.
- **პროდუქტი:** რეალური Stripe (webhook deploy, secrets, Checkout) **არ იწყება** სანამ საიტი რეალურად არ გაიშვება — დოკი განახლებულია (`project.md` CURRENT WORK, `README.md`, `SCHEMA.md`, `AGENTS.md`).

### 2026-04-03 — Rate limit API + Stripe premium webhook (baseline)

- **SQL:** `20260401350700_allow_service_role_premium_update.sql` — `profiles_enforce_premium_only_admin`: `service_role` JWT-ით `premium_until` შეცვლა (Stripe).
- **Vercel:** `api/lib/rateLimitByIp.ts` + `api/delete-account.ts` (429, env `DELETE_ACCOUNT_RATE_LIMIT_*`).
- **Edge:** `supabase/functions/stripe-webhook` — `checkout.session.completed`, metadata `user_id` / `premium_days`; secrets `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- **დოკი:** `README.md`, `SCHEMA.md`, `project.md` §24/§48/CURRENT WORK, `reziizi.mdc`.
- **Production:** migration + `supabase functions deploy stripe-webhook --no-verify-jwt` + Stripe webhook URL.

### 2026-04-03 — Anti-spam: body UPDATE → იგივე ევრისტიკა

- **SQL:** `20260401350600_antispam_recheck_on_body_update.sql` — `prevent_user_editing_spam_columns_posts/comments`: `body` შეცვლისას score/flag ხელახლა; `abuse_flags` AFTER UPDATE (unflag→flag), `skip_spam_guard`-ზე არ იმეორებს report-threshold ჩანაწერს.
- **დოკი:** `SCHEMA.md`, `verify_schema.sql`, `reziizi.mdc`, `project.md` CURRENT WORK (ხაზი 14).
- **Production:** migration **გასაშვებია** Supabase-ზე.

### 2026-04-03 — Email (45): password reset — UI ტესტები მომავალში

- **შენიშვნა:** Vitest/RTL `ForgotPasswordPage` / `ResetPasswordPage` (mock Auth) — **დაგეგმილია** — `project.md` §45 / §41 Notes.

### 2026-04-03 — Email (45): password reset (Supabase Auth)

- **აპი:** `ForgotPasswordPage`, `ResetPasswordPage`, `getAuthRecoveryRedirectTo()` → `/reset-password`; `supabaseClient` PKCE + `detectSessionInUrl`; `LoginPage` ბმული; `seo` + i18n `en`/`ka`/`ru` (`forgotPassword` / `resetPassword`).
- **დოკი:** `project.md` §45 + CURRENT WORK, `README.md` (Redirect URLs + recovery email), `.env.example` შენიშვნა.
- **Ops:** Supabase Dashboard — **Redirect URLs**-ში production/dev `…/reset-password`; სურვილისამებრ **SMTP**.
- **ტესტი:** `npm run build`, `npm test` — OK (ლოკალურად); **forgot/reset UI ტესტები** — ცალკე ტალღა (იხილე ზემოთ).

### 2026-04-03 — მოდერაციის ავტომატიზაცია: report threshold → auto-flag

- **SQL:** `20260401350500_add_report_threshold_auto_flag.sql` — `reports_after_insert_auto_flag_post`: ≥3 report იმავე `post_id`-ზე → `posts.is_flagged`, `spam_score ≥ 5`, `abuse_flags` (`report_threshold`); `prevent_user_editing_spam_columns_posts` იღებს `reziizi.skip_spam_guard`.
- **აპი:** `AdminModerationPage` + `pages.admin.moderation.autoFlagHint` (en/ka/ru).
- **დოკი:** `SCHEMA.md`, `verify_schema.sql`, `reziizi.mdc`, `project.md` CURRENT WORK.
- **Production:** migration `20260401350500` **წარმატებით გაშვებულია Supabase-ზე** (მომხმარებლის დადასტურება).

### 2026-04-03 — Search v2: ranked RPCs + app

- **SQL:** `20260401350400_add_search_v2_rpcs.sql` — `search_post_ids`, `search_profile_ids`, `posts_search_fts_idx` (GIN).
- **აპი:** `search.ts` → RPC; `feed.ts` exports `fetchFeedPostsByIdsOrdered`; `SearchPage` + `pages.search.rankingHint` (en/ka/ru); `registry.ts`, `verify_schema.sql`.
- **დოკი:** `SCHEMA.md`, `reziizi.mdc`, `project.md` §14 + CURRENT WORK.
- **Production:** migration `20260401350400` **წარმატებით გაშვებულია Supabase-ზე** (მომხმარებლის დადასტურება).

### 2026-04-03 — Feed tuning: trending RPC (recency + comments)

- **SQL:** `20260401350300_improve_feed_trending_ranking.sql` — `feed_trending_post_ids`: `(net reactions + 0.15 × visible comment count) / (age_h + 2)^1.5`, `SECURITY DEFINER`, მხოლოდ `not is_flagged` პოსტები; კომენტარების რაოდენობა `not is_flagged`.
- **დოკი:** `SCHEMA.md`, `reziizi.mdc`, `project.md` CURRENT WORK.
- **Production:** migration **გაშვებულია Supabase-ზე** (მომხმარებლის დადასტურება, იგივე დღე).

### 2026-04-03 — Notifications v2: preferences + cross-tab sync

- **SQL:** `20260401350200_add_notification_preferences.sql` — `profiles.notify_on_comment|reaction|follow` (default true); notification triggers skip insert when opted out.
- **აპი:** `notificationPreferences.ts`, Settings section (checkboxes + save), `ProfileRow` + admin/search `select`; `dispatchNotificationsChanged` posts to `BroadcastChannel("reziizi-notifications")`; `useUnreadNotificationCount` invalidates `queryKeys.notifications.list` on cross-tab message.
- **დოკი:** `SCHEMA.md`, `reziizi.mdc` migrations table, `project.md` CURRENT WORK.

### 2026-04-03 — Anti-spam: `regexp_count` არ იღებს `g` ფლაგს

- **შეცდომა:** `regexp_count() does not support the "global" option` — კომენტარის/პოსტის INSERT ტრიგერზე.
- **გამოსავალი:** ფლაგები `'i'` მხოლოდ (არა `'gi'`). განახლება: `20260401350000_...sql` + ახალი migration `20260401350100_fix_count_url_indicators_regexp_flags.sql` უკვე გაშვებული DB-სთვის.

### 2026-04-03 — Anti-spam migration: `regexp_count` არგუმენტები (Supabase SQL Editor)

- **`20260401350000_add_anti_spam_flags.sql`:** `regexp_count(..., 'gi')` — PG-ში მესამე არგუმენტი არის `start` (int), არა flags; გასწორება: `regexp_count(..., 1, 'gi')`. იხილე `SCHEMA.md` შენიშვნა.

### 2026-04-03 — Anti-spam (49) MVP: migration + აპი

- **SQL:** `supabase/migrations/20260401350000_add_anti_spam_flags.sql` — `abuse_flags`, `posts`/`comments` სვეტები, RLS (soft hide), ტრიგერები (5 წთ დუბლიკატი, ლინკების ლიმიტი), admin UPDATE approve. **PostgreSQL 15+** (`regexp_count`).
- **აპი:** `feed.ts` / `search.ts` / `comments.ts` select; `adminModeration.ts` approve + სორტი; `AdminModerationPage`; `PostCard` — ავტორს hint; `messages.ts` en/ka/ru; `types/db.ts`; `registry.ts` `abuse_flags`.
- **დოკი:** `SCHEMA.md`, `verify_schema.sql`.

### 2026-04-03 — Anti-spam (49): დოკი ერთიანებული, იმპლემენტაციისთვის მზად (`project.md`, `AGENTS.md`, `JOURNAL.md`)

- **`project.md`:** **ერთი სპეკი** — `#### Anti-spam (49)` (locked outline + default-ები + კონფიგის ცხრილი + migration checklist + ინგლისური Appendix); დუბლირებული ქართული GPT ბლოკი ამოღებული; **§49 FEATURE BREAKDOWN** — მხოლოდ მიმართება; **CURRENT WORK** ცხრილში რიგი #9; Media §-ში ბმული განახლებული.
- **`AGENTS.md`:** გარე AI — მიმართება ერთ სექციაზე.
- **ამ ჩანაწერმა ჩაანაცვლა:** წინა სამი ცალკე anti-spam ჩანაწერი ერთით.

### 2026-04-03 — `project.md`: შემდეგი ფაზის გეგმა (ChatGPT roadmap + რეპოს რეალობა)

- **`## CURRENT WORK`:** ქვესექცია **„შემდეგი ფაზა — გეგმის მიმართულება“** — ფაზა A/B/C, ცხრილი (Anti-spam, Notifications v2, Feed/Search/Moderation, Email, Premium+billing), განსაკუთრებული შენიშვნები: `premium_until` უკვე არსებობს, Legal i18n = პროდუქტის არჩევანი, `reziizi.mdc` რიგი არ ირღვევა.

### 2026-04-03 — ანგარიშის წაშლა production: დადასტურებული მუშაობს

- **ტესტი:** Vercel + Supabase — Settings → წაშლა წარმატებით; მომხმარებელი აღარ ჩანს Supabase **Authentication → Users** (და CASCADE / Storage cleanup დიზაინის მიხედვით).
- **კოდი/დეპლოი წინ:** `api/*` იმპორტებში `.js` (TS2835), `errorMessage`, პარალელური Storage, top-level `try/catch` — იხილე წინა ჩანაწერები.
- **დოკი:** `project.md` **CURRENT WORK** + ცხრილი (#7), `README.md` Verify, `AGENTS.md`, `ACCOUNT_DELETION_DESIGN.md` §8.

### 2026-04-03 — Vercel `FUNCTION_INVOCATION_FAILED` — api ლოკალური `errorMessage` + top-level try/catch

- **`api/lib/errorMessage.ts`:** `src/`-ზე იმპორტის გარეშე (Vercel bundler/runtime).
- **`api/delete-account.ts`:** მთელი handler `try/catch`; `errorMessage` `./lib/errorMessage`-დან.
- **`README.md`:** `FUNCTION_INVOCATION_FAILED` — ლოგები, Hobby timeout, Edge fallback.

### 2026-04-03 — Account deletion: 500 — შეცდომის ტექსტი + Storage სიჩქარე

- **`api/delete-account.ts`:** `errorMessage()` Supabase/Storage შეცდომებისთვის (არა მხოლოდ `Error.message`).
- **`accountDeletionBackend.ts`:** სამი bucket-ის წაშლა **პარალელურად** (`Promise.allSettled`) — ნაკლები wall time (Vercel Hobby ~10s).
- **`deleteAccount.ts`:** Vercel პასუხის პარსინგი — `res.text()` + JSON, `error` არა-სტრინგიც.
- **Edge `delete-account`:** იგივე პარალელური Storage + `storageErrMsg`.
- **`README.md`:** Troubleshooting 500 (ლოგები, service role, Hobby timeout, Edge fallback).

### 2026-04-03 — დოკი: §44 Localization + `AGENTS.md` — თანხვედრობა

- **`project.md`:** §44 — ძველი „Not yet: Admin…“ მოხსნილი; **Baseline (v3)** სია + **Future** + **Implementation** გასწორებული `CURRENT WORK`-თან; Notes — სერვერის შეცდომები vs `messages.ts`.
- **`AGENTS.md`:** Localization ერთი ხაზით „სად ვართ“; „კოდი vs UI ენა“ — უშუალო წინააღმდეგობის გარეშე (`messages.*`, `t()`).

### 2026-04-03 — i18n: Admin pages + `ru` admin bundle

- **`messages.ts`:** `pages.admin.*` — `ru` სრული ბლოკი; `reports.postIdPrefix` (`en`/`ka`/`ru`).
- **`AdminPage`**, **`AdminModerationPage`**, **`AdminReportsPage`**, **`AdminAdsPage`**, **`AdminStatsPage`**, **`AdminUsersPage`**, **`AdminApiPage`:** `useI18n` / `t()`; მოდერაცია/რეპორტები — `adminModeration.ts` / `reports.ts` რეალური ექსპორტები.
- **შემოწმება:** `npm test`, `npm run build` — OK.

### 2026-04-03 — i18n: Messages + Chat; sticky feed tabs

- **`messages.ts`:** `pages.messages.*`, `pages.chat.*` — `en` / `ka` / `ru`.
- **`MessagesPage`**, **`ChatThreadPage`:** `useI18n` / `t()`; თვითშეტყობინება — `t` `useEffect`-ში.
- **`HomePage`:** `home-feed-toolbar--sticky` + **`styles.css`** (sticky, ჩრდილი, სრული სიგანე card-ის შიგნით).

### 2026-04-03 — Home feed UI polish (composer vs feed)

- **`HomePage`:** `home-feed-toolbar` + **`home-composer`** (`PostForm` ცალკე ზონაში).
- **`styles.css`:** `.home-composer` — `surface-raised`, border; `post-list` gap; `post-card` box-shadow; `post-card__body` line-height/font-size.
- **`project.md`:** `CURRENT WORK` — ეს ეტაპი ჩაწერილი.

### 2026-04-03 — სესია დასრულებული (დასვენება)

- **სტატუსი:** `main` სინქი `origin/main`-თან; working tree სუფთა.
- **დოკუმენტაცია:** `project.md` **`CURRENT WORK`** — v3 Error Handling ბულეტი დაზუსტებულია (toast + `LayoutOutlet` + `RouteErrorBoundary.test.tsx`); კომიტი `docs: clarify Error Handling (32) in CURRENT WORK v3 bullet`.
- **მომავალი (არა სავალდებულო):** home feed UI polish — იდეები ჩატში (composer vs feed, ტიპო, მობილური); სრული სია — შეიძლება §33/§35 **Future** ან `CURRENT WORK` ცხრილი.
- **გახსენება:** production **ანგარიშის წაშლა** — `project.md` + `README`; პრიორიტეტები — **`## CURRENT WORK`** / „შემდეგი განვითარების გეგმა“.

### 2026-04-03 — Toast: admin + messages + reactions; RouteErrorBoundary test

- **`ReactionButtons`**, **`MessagesPage`** (ჩატვირთვის შეცდომა toast + `loadFailed` რომ „არაა საუბრები“ არ არის მცდარი), **`ChatThreadPage`** (`threadError` ინლაინში; გაგზავნის შეცდომა toast), **`AdminPage`**, **`AdminModerationPage`**, **`AdminUsersPage`**, **`AdminReportsPage`**, **`AdminAdsPage`**, **`AdminStatsPage`** — toast.
- **`RouteErrorBoundary.test.tsx`:** Vitest — fallback + „Try again“ აღდგენა.

### 2026-04-03 — Toast: feed / profile / comments / report / avatar

- **`UserProfilePage`:** follow/unfollow `onError` → `toast.error` (ინლაინი მოხსნილი).
- **`PostForm`**, **`ReportPostControl`**, **`AvatarUploadSection`:** შეცდომები და წარმატება (report, avatar) toast-ით; ინლაინი `form__error` / success ამ ბლოკებში მოხსნილი სადაც toast ჩაანაცვლებს.
- **`CommentSection`:** ჩატვირთვის შეცდომა — `loadError` ინლაინში; კომენტარის დამატება/წაშლა — `toast.error`.

### 2026-04-03 — Toast: Settings + Login

- **`SettingsPage`:** პაროლის / privacy / ანგარიშის წაშლის შეცდომები `toast.error`-ით; ინლაინ `form__error` ამ სექციებში ამოღებული (წარმატების ტექსტები რჩება).
- **`LoginPage`:** sign in / sign up / ვალიდაციის შეცდომები toast-ით; `error` state ამოღებული.

### 2026-04-03 — Error Handling (32): toast + QueryErrorResetBoundary

- **`ToastProvider` / `useToast`:** ფიქსირებული `toast-region`, ვარიანტები error/success/info, auto-dismiss; `layout.toastRegionAria` / `toastDismiss`; **`errors.*`** route შეცდომის ტექსტები.
- **`LayoutOutlet`:** `QueryErrorResetBoundary` + **`RouteErrorBoundary`** (Try again → `reset`); **`Layout`** იყენებს `LayoutOutlet`-ს.
- **`NotificationsPage`:** მუტაციის `onError` → `toast.error` (ინლაინი მუტაციის შეცდომა ამოღებული).
- **`project.md`:** v3 Error Handling ხაზი განახლებული.

### 2026-04-03 — Caching + i18n: Notifications გვერდი

- **`NotificationsPage`:** `useQuery` (`queryKeys.notifications.list`) + `useMutation` mark read / mark all; ინვალიდაცია სიაზე.
- **`messages.ts`:** `pages.notifications.*` — `en` / `ka` / `ru` (სათაური, ცარიელი, ღილაკები, comment/reaction/follow შეტყობინების ტექსტები, post / პროფილი).
- **`project.md`:** Caching (30) + Localization (44) განახლება.

### 2026-04-03 — Friends: mutual follows MVP (UserProfilePage)

- **`UserProfilePage`:** მეორე `useQuery` — `fetchIsFollowing(targetId, viewerId)` (`queryKeys.follow.relation(targetId, viewerId)`); ბეიჯი `mutualFollowBadge`; follow/unfollow → reverse relation ინვალიდაცია.
- **`messages.ts`:** `en` / `ka` / `ru`; **`styles.css`:** `.badge--mutual`, `.user-profile__mutual`.
- **`project.md`:** პრიორიტეტი **8** ✅ MVP; §5 განახლებული.

### 2026-04-03 — Friends: mutual follows — სპეკი (იმპლემენტაციამდე)

- **`project.md`:** ცხრილი პრიორიტეტი **8**; §5 „Mutual follows — planned scope“ — MVP მხოლოდ `UserProfilePage` ინდიკატორი + i18n; **არა** migration; out-of-scope: `/mutuals`, სიის ფილტრი, ცალკე ნოტიფიკაცია.
- **შემდეგი ნაბიჯი:** დადასტურების შემდეგ იმპლემენტაცია იმავე სკოპით. *(შესრულებულია — იხილე ჩანაწერი „mutual follows MVP“ ზემოთ.)*

### 2026-04-03 — Supabase: `20260401340000` live (დადასტურება)

- Migration **`20260401340000_add_follow_notifications.sql`** გაშვებულია Supabase-ზე წარმატებით; `notifications` — `type` `follow`, `notify_followed_user_on_follow` + ტრიგერი `follows`-ზე ცოცხალ პროექტში მუშაობს.

### 2026-04-03 — Caching (30): Search გვერდი TanStack Query-ზე

- **`SearchPage`:** `useQuery` + `queryKeys.search.results(pattern, viewerId)` — პოსტები/პროფილები; `onPostChanged` ინვალიდაცია search + feed.
- **`queryKeys.search`:** `all`, `results`.

### 2026-04-03 — Friends: ნოტიფიკაცია ახალ გამომწერზე

- **Migration:** `20260401340000_add_follow_notifications.sql` — `notifications.type` + `follow`, `post_id` nullable საჭიროებისამებრ; `notify_followed_user_on_follow` + ტრიგერი `follows` INSERT-ზე.
- **აპი:** `NotificationType` / `NotificationRow`; `NotificationsPage` — ტექსტი + ლინკი პროფილზე; `SCHEMA.md`, `verify_schema.sql`, `reziizi.mdc` #23.
- **Supabase:** migration production/live-ზე გაშვებულია (იხილე ჩანაწერი „`20260401340000` live (დადასტურება)“ ზემოთ).

### 2026-04-03 — Friends: გამომწერების / გამოწერების სიები (მარშრუტები)

- **Routes:** `/u/:userId/followers`, `/u/:userId/following` → `UserFollowListPage` (`lazy/chunks`); უფრო სპეციფიკური მარშრუტები `/u/:userId`-მდე.
- **SEO:** `seo.ts` `ROUTE_DEFS` — `userFollowers` / `userFollowing`; ტესტი `seo.test.ts`.
- **UI:** `UserProfilePage` + `ProfilePage` — follower/following რაოდენობები `Link`-ებით; follow/unfollow ინვალიდაცია `followList` query-ზე.

### 2026-04-03 — Friends (5): `follows` + `/u/:userId`

- **Migration:** `20260401330000_add_follows.sql` — `public.follows`, RLS, self-follow CHECK.
- **App:** `follows.ts`, `profileView.ts`, `UserProfilePage` (`/u/:userId`, lazy); `PostCard` / `SearchPage` / `ProfilePage`; `queryKeys.follow`; `registry` `follows`.
- **Docs:** `SCHEMA.md`, `verify_schema.sql`, `project.md` §5, `reziizi.mdc` #22. **Supabase:** გაუშვი migration.

### 2026-04-03 — Avatar (4): სხვა გვერდებზე

- **CommentSection:** `profiles.avatar_url` კომენტარის ავტორზე; `CommentWithAuthor.authorAvatarUrl`; TanStack `profile.display` ახალი კომენტარის ოპტიმისტურ ჩანაწერზე.
- **ChatThreadPage / MessagesPage:** თრედის ჰედერი და საუბრების სია — `Avatar` (`peer_avatar_url`, `ConversationWithPeer`).
- **NotificationsPage:** `actorAvatarUrl` (`fetchNotifications`).
- **SearchPage:** მომხმარებლის შედეგების ხაზზე `Avatar`.

### 2026-04-03 — Video (10): დადასტურება (Supabase + აპი)

- **Migration:** `20260401320000_add_post_videos_storage_and_video_url.sql` — **გაშვებულია** ცოცხალ Supabase-ზე; bucket `post-videos` + `posts.video_url` + CHECK მუშაობს.
- **აპი:** ვიდეოს გამოქვეყნება და feed-ში დაკვრა **დადასტურებულია** (ლოკალურად `localhost`, იგივე პროექტის env-ით Supabase-თან).

### 2026-04-03 — Video (10): Storage + `posts.video_url` + UI

- **Migration:** `20260401320000_add_post_videos_storage_and_video_url.sql` — bucket `post-videos` (MP4/WebM, 50 MiB), `posts.video_url`, CHECK `posts_one_media_type`.
- **App:** `postVideoStorage.ts`, `PostForm` / `PostCard` / admin moderation; i18n `addMedia` / `removeMedia`; account deletion + Edge `delete-account` წაშლის `post-videos` პრეფიქსს.
- **Docs:** `project.md` §10/§11, `SCHEMA.md`, `ACCOUNT_DELETION_DESIGN.md`.

### 2026-04-01 — ანგარიშის წაშლა: სტატუსი „მოგვიანებით“

- **Production:** ანგარიშის წაშლის სისტემა **ამ ეტაპზე სტაბილურად არ მუშაობს** — **მოგვიანებით დაბრუნება** (დიაგნოსტიკა/დეპლოი დასრულებული არა).
- **დოკუმენტაცია:** `project.md` (**CURRENT WORK** + გეგმის ცხრილი #7), `AGENTS.md` — მონიშნულია როგორც გადადებული.

### 2026-04-01 — ანგარიშის წაშლა + დოკუმენტაციის სინქი

- **Edge Function:** `supabase/functions/delete-account/index.ts` — JWT → Storage რეკურსიული წაშლა → `auth.admin.deleteUser`.
- **კლიენტი:** `src/lib/deleteAccount.ts` — `POST` `/functions/v1/delete-account`, `AbortSignal.timeout(120s)`, 404-ზე დეპლოის მინიშნება.
- **UI:** `SettingsPage` — `DELETE` დადასტურება, `queryClient.clear`, sign out, `/`.
- **Deno / TypeScript:** `supabase/functions/deno.json` (`npm:@supabase/supabase-js`), `tsconfig.json` (`paths` → `node_modules`), `deno-env.d.ts` — IDE აღარ ეძებს `https://esm.sh/...` მოდულს.
- **დოკუმენტაცია განახლებული:** `project.md` (**CURRENT WORK** + გეგმის ცხრილი), `AGENTS.md` (ხე + რუკა), `README.md` (Docs ცხრილი), `SCHEMA.md` (Storage ქვეთავი — Edge წაშლა), `ACCOUNT_DELETION_DESIGN.md` (დაკავშირებულია `README`-ის დეპლოის სექციასთან).
- **ცოცხალი Supabase:** საჭიროა **`supabase functions deploy delete-account`** — სანამ არ დაიდეპლოირებ, წაშლა 404-ს დააბრუნებს.

### 2026-04-01 — Localization v2: Home, Login, Search, PostForm

- **`messages.ts`:** `pages.common` / `home` / `login` / `search` / `postForm` (სამივე ენა).
- **კომპონენტები:** `HomePage`, `LoginPage`, `SearchPage`, `PostForm` — `useI18n().t()`.

### 2026-04-01 — Localization: `ru` + SEO/announcer ლოკალით

- **`Locale`:** `ru`; **`messages.seo`** (admin + routes + `announcer`); **`seo.ts`** `getSeoForPath`/`applyPageSeo`/`getRouteAnnouncement(path, locale)`; **`RouteSeo`/`RouteAnnouncer`** `useI18n`.
- **Settings:** `languageRu`, თარიღის `ru-RU`; **`html[lang]`** `ru`.

### 2026-04-01 — Feature 44 Localization — baseline (`en` / `ka`)

- **`I18nProvider`**, `useI18n().t()`, `src/i18n/messages.ts`, `locale.ts`, `resolveMessage.ts`, ტესტები.
- **Settings:** ენის არჩევა; **Layout** + **Theme** + **Settings** ტექსტები; `html[lang]` დინამიკური.
- **`project.md`:** §44 + `CURRENT WORK`.

### 2026-04-01 — Feature 43 A11Y — route announcer (v2)

- **`RouteAnnouncer`:** `aria-live="polite"` + `getRouteAnnouncement` (`seo.ts`); **`.sr-only`** in `styles.css`; **`Layout`**.

### 2026-04-01 — Feature 48 Rate limiting — DB baseline

- **Migration:** `20260401310000_add_rate_limit_triggers.sql` — BEFORE INSERT: `posts` (12/min), `comments` (45/min), `chat_messages` (90/min), `reports` (24/24h).
- **`SCHEMA.md`:** Rate limits ცხრილი; **`project.md`:** §48 + `CURRENT WORK`.

### 2026-04-01 — Feature 43 A11Y — baseline

- **`Layout`:** skip-to-main (`#main-content`), ბრენდი `Link` + `aria-label`, `<main tabIndex={-1}>`.
- **`styles.css`:** `.skip-link`, `#main-content` scroll-margin, `.layout__brand` ფოკუსი.
- **`project.md`:** §43 + `CURRENT WORK`.

### 2026-04-01 — Feature 42 SEO — baseline

- **`index.html`:** default `description`, Open Graph + Twitter card shell.
- **`src/lib/seo.ts`:** `getSeoForPath` / `applyPageSeo` (robots, OG, canonical); **`RouteSeo`** in `Layout`.
- **`seo.test.ts`:** `getSeoForPath` მარშრუტების ტესტები.
- **`project.md`:** §42 + `CURRENT WORK` განახლება.

### 2026-04-01 — GitHub Actions CI + Email (45) დოკში გადაცილება

- **`.github/workflows/ci.yml`:** `push`/`pull_request` → `main`/`master` — `npm ci`, `npm test`, `npm run build`; placeholder `VITE_*` build-ისთვის.
- **`README.md`:** სექცია „GitHub Actions (CI)“.
- **`project.md` / `AGENTS.md`:** Deployment v3 ცხრილი + `CURRENT WORK`; **Email (45)** — მოგვიანებით.

### 2026-04-01 — Feature 4 Avatar — baseline

- **Migration:** `20260401300000_add_profiles_avatar_url_and_storage_avatars.sql` — `profiles.avatar_url`, bucket `avatars` + policies (`avatars/{user_id}/...`).
- **კოდი:** `avatarStorage.ts`, `Avatar.tsx`, `AvatarUploadSection.tsx` (Settings); `FeedPost.authorAvatarUrl`; `feed.ts` / `search.ts` / `chat.ts` / `adminUsers` select-ები; `queryKeys.profile.display`; **PostCard** + **ProfilePage**.
- **დოკი:** `SCHEMA.md`, `reziizi.mdc` #19, `project.md` §4 + `CURRENT WORK`.

### 2026-04-01 — Feature 11: დოკი + Storage cleanup (ნაბიჯი 5)

- **`postImageStorage.ts`:** `postImagePublicUrlToStoragePath`, `removeStoredPostImageByPublicUrl` (არ აგდებს — `logger.warn` შეცდომაზე).
- **`PostCard` / `deletePostAsModerator`:** DB წაშლის შემდეგ Storage-ის ობიექტის წაშლა (თუ `image_url` იყო).
- **`postImageStorage.test.ts`:** URL-დან path-ის ტესტები.
- **`project.md`:** `CURRENT WORK` + §11 სტატუსი, გეგმის ცხრილი (11 ✅, რიგი 2 — მომდევნო იდეები); **`AGENTS.md`** მიმართება Media-ზე.

### 2026-04-01 — Feature 11: Admin Moderation — პოსტის სურათი

- **`AdminModerationPage`:** `image_url`-ის არსებობისას სურათი (იგივე პატერნი რაც feed-ში); `postImageAltFromBody`.
- **`src/lib/postImageAlt.ts`:** საერთო `alt` ტექსტი; **`PostCard`** იყენებს აქედან (დუბლიკატი ამოღებული).

### 2026-04-01 — Feature 11 Media Upload: ნაბიჯი 4 — Feed / `PostCard` სურათი

- **`PostCard.tsx`:** თუ `post.image_url` — `<img>` ჰედერის შემდეგ, `loading="lazy"`, `alt` პირველი ხაზის excerpt ან „Post image“.
- **`styles.css`:** `.post-card__media`, `.post-card__image` (responsive, `max-height`, `object-fit: contain`).
- **გამოყენება:** Home feed, Profile, Search — იგივე `PostCard`.

### 2026-04-01 — Feature 11 Media Upload: ნაბიჯი 3 — PostForm upload + preview + `image_url`

- **`src/lib/postImageStorage.ts`:** `validatePostImageFile` (JPEG/PNG/WebP/GIF, 5 MiB), `uploadPostImage` → public URL + path, `removePostImageObject` rollback; path `posts/{userId}/{postId}/{uuid}.ext`.
- **`PostForm.tsx`:** „Add image“ / ფაილის input (`accept` image only), პრევიუ, „Remove image“; ფლოუ: insert post → upload → `update` `image_url`; შეცდომაზე post `delete`; update error-ზე Storage წაშლა + post წაშლა.
- **`styles.css`:** `.post-form__*` პრევიუ/ფაილის სახელი.
- **შემდეგი ნაბიჯი:** ნაბიჯი 4 — `PostCard` / feed-ში სურათის ჩვენება.

### 2026-04-01 — Feature 11 Media Upload: ნაბიჯი 2 — `posts.image_url` + ტიპები

- **Migration:** `supabase/migrations/20260401290000_add_posts_image_url.sql` — `posts.image_url text null`.
- **ტიპები:** `src/types/db.ts` — `PostRow.image_url`.
- **Query select:** `feed.ts`, `search.ts`, `adminModeration.ts` — `image_url` ჩართულია (რომ feed/search/moderation მონაცემი სრული იყოს).
- **დოკი:** `SCHEMA.md` (`posts`); **`reziizi.mdc`** — migration #18.
- **დადასტურება:** live Supabase — `information_schema`: `posts.image_url`, `data_type` = `text`.
- **შემდეგი ნაბიჯი:** ნაბიჯი 3 — `PostForm` upload + preview + `image_url` შენახვა; ნაბიჯი 4 — `PostCard` რენდერი.

### 2026-04-01 — Feature 11 Media Upload: ნაბიჯი 1 — Supabase Storage

- **Migration:** `supabase/migrations/20260401280000_add_storage_post_images.sql` — bucket `post-images` (public, 5 MiB, MIME: jpeg/png/webp/gif); `storage.objects` პოლიტიკები: SELECT public; INSERT/UPDATE/DELETE მხოლოდ `posts/{auth.uid()}/...` prefix-ზე.
- **დოკი:** `supabase/SCHEMA.md` — Storage სექცია; **`reziizi.mdc`** — migration #17 რიგში.
- **დადასტურება:** migration გაშვებულია ცოცხალ Supabase პროექტში (bucket + policies დამატებულია).
- **შემდეგი ნაბიჯი:** ნაბიჯი 2 — `posts.image_url` (ან მსგავსი) migration + ტიპები.

### 2026-04-02 — დოკი: CURRENT WORK + შევსებადი გეგმა

- **`project.md`** — **CURRENT WORK** განახლებული: „რა გაკეთდა“, v3 ტექნიკური ცხრილი, **„შემდეგი განვითარების გეგმა (შევსებადი)“**; **`AGENTS.md`** მიმართება.

### 2026-04-01 — დოკი: README production deployment (GitHub + Vercel + Supabase)

- **`README.md`** — გაფართოებული სექცია **„Production deployment“** (Supabase keys, Vercel import/env, Auth URLs, verify, migrations შენიშვნა).
- **`AGENTS.md`** — დოკუმენტების ცხრილში `README.md`; **სად ვართ** → მიმართვა ამ სექციაზე.

### 2026-04-01 — v3: Testing (41) baseline — Vitest

- **Vitest** + **jsdom** + **Testing Library**; `vite.config.ts` `test` ბლოკი; **`src/test/setup.ts`**.
- **ტესტები:** `errors.test.ts`, `tagParse.test.ts`, `passwordPolicy.test.ts`, `InlineError.test.tsx`; **`npm test`** / **`npm run test:watch`**.

### 2026-04-01 — v3: Logging (31) baseline

- **`src/lib/logger.ts`** — `debug`/`info`/`warnDev` (მხოლოდ dev), `warn`/`error` (ყოველთვის).
- **ინტეგრაცია:** `queryClient` (TanStack `warnDev`), `ErrorBoundary`, `PostCard` წაშლა, `supabaseClient` missing env.

### 2026-04-01 — v3: Deployment (37) baseline — Vercel

- **`vercel.json`** — SPA **rewrites** (`/(.*)` → `/index.html`) + არსებული security headers.
- **`README.md`** — `Production (Vercel)` (env, Supabase redirect); **`.env.example`** — Vercel env შენიშვნა.

### 2026-04-01 — v3: Error Handling (32) baseline

- **`errorMessage`** (`src/lib/api/errors.ts`, `src/lib/errors.ts`), **`InlineError`**, **`QueryCache`/`MutationCache` onError** (dev `console.warn`, cancelled skip).
- **გვერდები/კომპონენტები** — ერთიანი `catch` (`HomePage`, `ProfilePage`, admin, chat, notifications, `CommentSection`, `PostForm`, `ReactionButtons` `formatError` alias, და სხვ.).

### 2026-04-01 — v3: Caching (30) baseline — TanStack Query

- **`@tanstack/react-query`**, **`src/lib/queryClient.ts`**, **`queryKeys.ts`**, **`QueryClientProvider`** (`main.tsx`).
- **`HomePage`:** `useInfiniteQuery` feed + invalidation post/reaction-ზე; invalid tag URL — სწორი cache key.
- **`ProfilePage`:** `useQuery` email + user posts; **`useProfileFlags`:** `useQuery` (ერთი cache მთელ აპში).

### 2026-04-01 — v3: Performance (36) baseline — route code splitting

- **`src/lazy/chunks.ts`** — `React.lazy` admin + `MessagesPage`, `ChatThreadPage`, `NotificationsPage`.
- **`src/components/RouteFallback.tsx`**, **`App.tsx`** — `<Suspense fallback={…}>` მთელ router-ზე.
- **Build:** ცალკე chunks (`dist/assets/*Page-*.js`); ინიციალური `index-*.js` უფრო მცირე.

### 2026-04-01 — v3: Database Structure (29) baseline

- **`supabase/SCHEMA.md`** — public ცხრილები, RPC, ბმულები `registry.ts` / `types/db.ts`.
- **`verify_schema.sql`** — RPC სიაში `admin_set_user_banned`; `registry.ts` კომენტარი.

### 2026-04-01 — feature: ban reason + banned_at

- **Migration:** `20260401270000_add_ban_reason.sql` — `ban_reason`, `banned_at`, `admin_set_user_banned(..., p_reason)`.
- **აპი:** `AdminUsersPage` (textarea, Reason სვეტი), `BannedPage` (Why / since), `banReason.ts`, `ProfileRow`.

### 2026-04-01 — fix: Ban / admin profile UPDATE + RLS

- **Migration:** `20260401260000_add_profiles_admin_update_policy.sql` — `profiles_update_admin` (admin-ს შეუძლია სხვა `profiles` ჩანაწერის UPDATE; რატომ: მხოლოდ `profiles_update_own` იყო, ban/premium RPC-ები სხვა მომხმარებელზე RLS-ს ვერ გადიოდა).

### 2026-04-01 — v3: API Layer (28) MVP

- **აპი:** `src/lib/api` (`TABLE`, `RPC`, `errorMessage`), `/admin/api` (admin კატალოგი), Layout/Admin ლინკები.

### 2026-04-01 — v3: Security (27) MVP

- **აპი:** `passwordPolicy.ts` (min 8), `ErrorBoundary`, `/security`, Login/Settings ვალიდაცია; Layout/Legal ლინკები.
- **Hosting:** `vercel.json` security headers (Vercel).

### 2026-04-01 — v3: Settings (25) + Privacy (26) MVP

- **Migration:** `20260401250000_add_profile_searchable.sql` — `profiles.searchable`.
- **აპი:** Settings → Privacy, `profilePrivacy.ts`, `searchProfilesByEmail` ფილტრი + self-or-visible; Search გვერდზე მოკლე ახსნა.

### 2026-04-01 — დადასტურება (მომხმარებელი): Advertisement (23)

- Ads / `ad_slots` / `/admin/ads` / `FeedAdSlot` — მუშაობს (თქვენი ტესტი).

### 2026-04-01 — v3: Monetization (24) MVP

- **Migration:** `20260401240000_add_premium_monetization.sql` — `profiles.premium_until`, trigger, `admin_set_user_premium_until`.
- **აპი:** `/admin/users` (+30d / +365d / clear), `premium.ts`, Profile/Settings UI; `useProfileFlags` — `isPremium`.

### 2026-04-01 — v3: Advertisement (23) MVP

- **Migration:** `20260401230000_add_ad_slots.sql` — `ad_slots`, RLS, seed `feed_top`.
- **აპი:** `FeedAdSlot` Home-ზე, `/admin/ads`, `ads.ts`; admin stats-ში `ad_slots` row count.

### 2026-04-01 — დადასტურება (მომხმარებელი): Ban v3

- Ban / `is_banned` / `/banned` / `/admin/users` — მუშაობს (თქვენი ტესტი).

### 2026-04-01 — v3: Statistics (22) MVP

- **აპი:** `/admin/stats`, `adminStats.ts` (`fetchPlatformMetrics`), Admin overview იგივე ფუნქციით 4 ძირითად count-ზე.

### 2026-04-01 — v3: Ban / Restriction (21) MVP

- **Migration:** `20260401220000_add_bans.sql` — `is_banned`, RLS, `admin_set_user_banned`.
- **აპი:** `/admin/users`, `/banned`, `useProfileFlags`.

### 2026-04-01 — v3: Reports (20) MVP

- **Migration:** `20260401210000_add_reports.sql` — `reports`, RLS.
- **აპი:** `ReportPostControl`, `/admin/reports`, `reports.ts`.

### 2026-04-01 — v3: Moderation (19) MVP + Admin დადასტურებული

- **დადასტურება:** `/admin` მუშაობს (counts, ნავიგაცია).
- **Migration:** `20260401200000_add_admin_moderation_delete_policies.sql` — admin `DELETE` posts/comments.
- **აპი:** `/admin/moderation`, `adminModeration.ts`.

### 2026-04-01 — fix: admin ტრიგერი + migration `20260401190000`

- `auth.uid()` null როცა (SQL Editor) — პირველი admin UPDATE აღარ იჭერება.

### 2026-04-01 — v3: Admin Panel (18) MVP

- **Migration:** `20260401180000_add_profiles_is_admin.sql` — `is_admin`, ტრიგერი.
- **აპი:** `/admin`, `AdminRoute`, `useIsAdmin`, სტატისტიკის ჯამები.

### 2026-04-01 — დოკი: თანმიმდევრობა და წესები

- **`project.md` VERSIONS:** v2-ში დაემატა **17**; v3 სიიდან ამოღებული დუბლირებული 17; **CURRENT WORK** გასუფთავებული.
- **`reziizi.mdc`:** v2 ლოგიკური რიგი, migrations ცხრილი, **იმპლემენტაციამდე** 4 ნაბიჯი (შემოწმება → დოკუმენტი → მომზადება → კოდი).
- **`AGENTS.md`:** ცხრილი + მინიმალური წესი განახლებული; დუბლირებული frontmatter მოხსნილი.

### 2026-04-01 — v2: Algorithm / Ranking (17) MVP

- **UI:** `PostCard` — წმინდა ქულა (thumbs up − down); `ReactionButtons` — შეცდომის ტექსტი.
- **Backend:** უცვლელი — Trending უკვე იყენებს `reactions` ჯამს.

### 2026-04-01 — v2: Chat / Messaging (13)

- **Migration:** `supabase/migrations/20260401170000_add_chat.sql` — `conversations`, `chat_messages`, `get_or_create_conversation`, realtime `chat_messages`.
- **აპი:** `/messages`, thread `/messages/:peerId`, Search → Message.

### 2026-04-01 — v2: Trending (16)

- **Migration:** `supabase/migrations/20260401160000_add_trending_feed_rpc.sql` — `feed_trending_post_ids` (ქულა = ჯამი `reactions.value`).
- **აპი:** Feed `Latest` / `Trending`, `?sort=trending`; ტეგის დროს მხოლოდ latest.

### 2026-04-01 — v2: Tags / Categories (15)

- **Migration:** `supabase/migrations/20260401150000_add_tags.sql` — `tags` (slug), `post_tags`, RLS, `feed_post_ids_by_tag`.
- **აპი:** პოსტის შექმნისას ტეგები (max 8); feed `/?tag=slug`; `FeedPost.tagSlugs`.

### 2026-04-01 — v2: Notifications (12)

- **Migration:** `supabase/migrations/20260401140000_add_notifications.sql` — `notifications` + RLS (select/update own); ტრიგერები კომენტარის/რეაქციის დასმაზე (არა საკუთარ პოსტზე).
- **აპი:** `/notifications`, `useUnreadNotificationCount` (poll + `reziizi-notifications-changed`), ჰედერში badge.

### 2026-04-01 — v2: Theme (34)

- **Dark / Light / Auto:** `src/lib/theme.ts`, `ThemeContext`, `ThemePreferenceControls` (header + Settings); `reziizi-theme` `localStorage`; `html[data-theme]`, light ტოკენები `styles.css`-ში; FOUC-ისთვის `index.html` სკრიპტი + `theme-color` განახლება.

### 2026-04-01 — v2: Search (14)

- **`/search`:** `?q=` — პოსტების ძებნა `body`-ში, პროფილების — `email`-ში (`ilike`, ლიმიტი 40); `sanitizeSearchQuery` (LIKE wildcards საწინააღმდეგო).
- **ფაილები:** `src/lib/search.ts`, `SearchPage.tsx`; ნავში ბმული `Search`.

### 2026-04-01 — v2: Comments (9)

- **Migration:** `supabase/migrations/20260401130000_add_comments.sql` — `comments` (1–2000 სიმბოლო), RLS (select all; insert/update/delete own).
- **აპი:** `CommentSection` (`PostCard`-ში), `fetchCommentsForPost`, ტიპი `CommentRow`.
- **შემდეგი ნაბიჯი:** SQL გაშვება Supabase SQL Editor-ში (თუ ჯერ არაა).

### 2026-04-01 — v1 დასრულება; დეპლოი გადავადებული → v2 არჩევა

- **Production deploy** სავალდებულო არ არის — გადავადებულია.
- **შემდეგი ფაზა:** `project.md` **REZIIZI v2** სიიდან პირველი ფიჩა (კომენტარები, ნოტიფიკაციები, ძებნა და ა.შ.) — რიგი და დამოკიდებულებები სპეკში.

### 2026-04-01 — v1: UI ტოკენები + მობილური ბაზისხაზი (33 / 35)

- **`styles.css`:** `:root` ტოკენები (radius, spacing, `--touch-min` 44px, `--surface-raised`, ფერები); `body` safe-area + `100dvh`; **focus-visible** ღილაკებს/ნავს/ლინკებს; ნავისა და რეაქციების touch ზონა; `prefers-reduced-motion`.
- **`index.html`:** `viewport-fit=cover`, `theme-color`.
- **`project.md`:** features **1**, **33**, **35** v1 baseline ✅; **CURRENT WORK** — v1 MVP დახურვა, შემდეგი დეპლოი/წაშლის ნაკადი სურვილისამებრ.

### 2026-04-01 — v1: Legal გვერდი + დოკუმენტების განახლება

- **`/legal`:** სტატიკური Terms of Service + Privacy Policy (ინგლისური MVP ტექსტი; Supabase-ის ხსენება privacy-ში); ნავიგაცია Home / Login.
- **დოკუმენტები:** `project.md` (**CURRENT WORK**, feature **51** ✅), `AGENTS.md` — სტატუსი; ჟურნალი აქ.
- **შემდეგი (სურვილისამებრ):** UI/responsive პოლიში, ანგარი�