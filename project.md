# REZIIZI PROJECT

> **ახალი ჩატი / სწრაფი ორიენტაცია:** გადახედე **[`AGENTS.md`](AGENTS.md)**. შემდეგ აქ — **`## CURRENT WORK`** (დასრულებული + **შემდეგი განვითარების გეგმა (შევსებადი)**).

---

## MASTER FEATURE LIST

1. User System
2. Authentication
3. Profile Page
4. Avatar System
5. Friends / Following System
6. Posts System
7. Post Feed
8. Reactions System
9. Comments System
10. Video System
11. Media Upload System (images; optional short video — §10)
12. Notifications
13. Chat / Messaging System
14. Search
15. Categories / Tags
16. Trending System
17. Algorithm / Ranking
18. Admin Panel
19. Moderation System
20. Reports System
21. Ban / Restriction System
22. Statistics Dashboard
23. Advertisement System
24. Monetization System (v3 baseline)
25. Settings Page (v3: + Privacy block)
26. Privacy Settings (v3 baseline: searchable)
27. Security (v3 baseline)
28. API Layer (v3 baseline)
29. Database Structure (v3 baseline: SCHEMA.md + verify_schema)
30. Caching System ✅ (v3 baseline; polish სურვილისამებრ)
31. Logging System ✅ (v3 baseline; remote/Sentry — Future)
32. Error Handling System ✅ (v3 baseline; telemetry — Future)
33. UI Design System ✅ (v1 baseline; §33 სრული audit — ტალღა 2 / Future)
34. Theme System (Dark/Light) ✅ (v2 baseline)
35. Mobile Responsiveness ✅ (v1 baseline; სრული audit — ტალღა 2 / Future)
36. Performance Optimization ✅ (v3 baseline: lazy routes; virtualization — Future)
37. Deployment System ✅ (v3 baseline: Vercel + CI)
38. Environment Configuration (.env) ✅ (Vercel/ლოკალური; საიდუმლოება — README)
39. Backup System ❌ (პლატფორმა/ოპერაცია — იხილე §39)
40. Versioning System ❌ (Git; აპის semver — იხილე §40)
41. Testing System ✅ (v3 baseline: Vitest; E2E/coverage — Future)
42. SEO Optimization ✅ (v3 baseline; სრული audit — Future)
43. Accessibility (A11Y) ✅ (v3 baseline; სრული audit — Future)
44. Localization (Languages) ✅ (v3 baseline `en`/`ka`/`ru`; Legal სტატიის სრული თარგმანი — Future)
45. Email System ✅ (password reset MVP აპში) / 🔄 (verification, alerts, custom SMTP — later)
46. Push Notifications ❌ (იხილე §46)
47. File Storage System ✅ (Supabase Storage; §11/§47 — იხილე CURRENT WORK)
48. Rate Limiting System ✅ (v3 baseline: DB + `rateLimitByIp` delete-account; იხილე §48)
49. Anti-Spam System ✅ (MVP baseline SQL + აპი) / 🔄 (გაფართოება — იხილე §49 Future)
50. Future Features — (კატეგორია / იდეების სათავე — §50; ახალი ფიჩა → სკოპი `project.md`-ში)
51. Legal / Privacy (Terms & Privacy) ✅ (v1+ baseline: გვერდები + ლინკები auth-ზე)

**ლეგენდა (MASTER 1–51, ამ ეტაპზე):** **✅** = პროდუქტის baseline კოდში/DB-ში (დეტალები **VERSIONS** + **`## CURRENT WORK`** + შესაბამისი § **FEATURE BREAKDOWN**). **🔄** = MVP/ნაწილი მზადაა, დანარჩენი მომავალი ტალღა. **❌** = აპში არა / მხოლოდ იდეა ან პლატფორმა. **🟡** აღარ ვიყენებთ **MASTER სიაში** — იგი ძველი „ნაწილობრივი“ მარკერი იყო; **იგივე სინქი `FEATURE BREAKDOWN` § სათაურებში** (ძველი 🟡 → **✅ baseline** სადაც v3 დასრულებულია).

---

## VERSIONS

### REZIIZI v1 (MVP)

2. Authentication
1. User System
6. Posts System
7. Post Feed (pagination / load more)
8. Reactions System
3. Profile Page
25. Settings Page (password change, delete account, logout)
33. UI Design System
35. Mobile Responsiveness
51. Legal / Privacy (Terms & Privacy link on auth)

**შენიშვნა (სკოპის გაფართოება პროდუქტში):** ორიგინალური v1 სია ზემოთ. **ამ ეტაპზე** baseline-ად დასრულებულია ასევე **4** Avatar, **5** Friends, **10–11** Video/Media (ორი ერთად არა), **38** env — იხილე **`## CURRENT WORK`** და **MASTER FEATURE LIST** ლეგენდა. ეს **არ ცვლის** ნომრებს — უბრალოდ **რეალობის სინქი** v1 ტექსტთან.

---

### REZIIZI v2

9. Comments System
12. Notifications
14. Search
15. Categories / Tags
16. Trending System
17. Algorithm / Ranking (UI + Trending RPC; ახალი ცხრილი არ სჭირდება)
13. Chat / Messaging System
34. Theme System (Dark/Light)

**შენიშვნა:** დამოკიდებულების მიხედვით ლოგიკური **იმპლემენტაციის რიგი** — `reziizi.mdc` → „REZIIZI v2 — ფუნქციების რიგი და Supabase migrations“.

---

### REZIIZI v3

18. Admin Panel (baseline: `/admin`, `is_admin` + stats)
19. Moderation System (baseline: admin delete any post/comment, `/admin/moderation`)
20. Reports System (baseline: post reports, `/admin/reports`)
21. Ban / Restriction System (baseline: `is_banned`, `/admin/users`, `/banned`)
22. Statistics Dashboard (baseline: `/admin/stats`, platform row counts)
23. Advertisement System (baseline: `ad_slots`, feed-top strip, `/admin/ads`)
24. Monetization System (baseline: `profiles.premium_until`, admin grants, `/admin/users`)
25. Settings Page (baseline: `/settings`, password, theme, session, privacy toggle)
26. Privacy Settings (baseline: `profiles.searchable`, email search opt-out)
27. Security (baseline: password policy, ErrorBoundary, `/security`, `vercel.json` headers)
28. API Layer (baseline: `src/lib/api` registry, `/admin/api` catalog)
29. Database Structure (baseline: `supabase/SCHEMA.md`, `verify_schema.sql`)
30. Caching System (baseline: TanStack Query — feed infinite cache, profile posts, profile flags; `queryKeys` / `queryClient`)
31. Logging System (baseline: `src/lib/logger.ts` — `warnDev` / `debug` / `info` dev-only; `warn` / `error` always; replaces raw `console.*` in core paths)
32. Error Handling System (baseline: `errorMessage` / `lib/errors.ts`, `InlineError`, Query/Mutation cache dev logging, unified catch handling)
36. Performance Optimization (baseline: route code splitting — `React.lazy` + `Suspense`, admin + messaging chunks)
37. Deployment System (baseline: Vercel + `vercel.json` SPA rewrites; **`README.md` → „Production deployment (GitHub + Vercel + Supabase)”**)
41. Testing System (baseline: Vitest + Testing Library — `src/**/*.test.{ts,tsx}`, `npm test` / `npm run test:watch`)

**დამატებითი baseline (იგივე v3 პროდუქტის ეტაპი — არა ცალკე „ვერსიის“ სახელი):** **4** Avatar, **5** Friends, **10–11** Video/Media, **42** SEO, **43** A11Y, **44** Localization, **45** password reset (MVP), **47** File Storage (Supabase), **48** Rate limiting, **49** Anti-spam (MVP) — დეტალები **`## CURRENT WORK`** და **MASTER FEATURE LIST** (ლეგენდა). **33–35** გაძლიერებულია polish-ით (**§33**/**§35**/**CURRENT WORK** → ტალღები).

---

## CURRENT WORK

### ტალღები — პირველი ეტაპი → მეორე ეტაპი (ფუნდამენტი vs გაფართოება)

**ტერმინები:** **ტალღა 1** = პროდუქტის **baseline** (რასაც `VERSIONS` + ქვემოთ „რა გაკეთდა“ ითვლის დასრულებულად — ფუნქცია + ტექნიკური ფენა). **ტალღა 2+** = polish, ახალი იდეები, სრული UI audit, სრული Legal i18n, Stripe live — **არა** სავალდებულო იმისთვის, რომ პროდუქტი „გამოვიდეს“ baseline-ად.

**რატომ არ უნდა მოგვიწიოს საიტის/კოდის მთლიანი გადაწერა ტალღა 2-ზე:** ტალღა 1 უკვე აგებულია **გაფართოებად ფუნდამენტზე** — Supabase (RLS, migrations რიგით), `src/lib/api/registry.ts`, `queryKeys` / TanStack Query, `messages.ts` + `t()`, ერთიანი `styles.css` (კლასები/პატერნები), `Layout` + როუტინგი, error boundaries / toast, lazy routes. **ახალი ფიჩა ან იდეა:** ჯერ **`project.md`** (სკოპი, CURRENT WORK ან შესაბამისი § **Future**), მერე SQL/RLS საჭიროებისამებრ, მერე კოდი — იგივე პატერნებში (**`reziizi.mdc`**). ასე გაფართოება უმეტესშივი **ლოკალური ცვლილებაა**, არა არქიტექტურის ნულიდან დაწყება.

**ტალღა 1 — დიზაინი / UI (§33, §35) რას ნიშნავს „არ გამოგვრჩეს“:** MASTER-ში **33** და **35** v1-ისთვის = **მინიმალური, თანმიმდევრული UI** + **responsive** — ეს **baseline-ად შესრულებულია**. **არ მოითხოვს** პიქსელ-პერფექტ მოკ-აპს ან ცალკე დიზაინ-სისტემის დოკუმენტს. **დარჩენილი polish** (მაგ. ფაზა **E** — სრული საიტის §33 audit, ყველა გვერდის ერთი სიღრმის შემოწმება) განზოგადებულია როგორც **ტალღა 2 / Future** — ეს **არ არის** „ფუნდამენტის ხვრელი“, არამედ ხარისხის შემდეგი ფენა.

**რა არის ნორმალურად „გადადებული“ ტალღა 2-ზე (არა ტალღა 1-ის ჩაგდება):** Legal სტატიის სრული `ka`/`ru`; სრული A11Y/SEO audit ყველა ეკრანზე; Stripe Checkout production; ცალკე **§50** / ფიჩების **🚀 Future** სია — იხილე ქვემოთ ცხრილები და შესაბამისი §.

**ტალღების მოკლე განსაზღვრება (პროდუქტის გეგმა — არა v1/v2/v3 კოდის ვერსია):**

| ტალღა | რას ნიშნავს | მაგალითები |
|--------|----------------|------------|
| **1** | **Baseline დასრულებული** — ფუნქცია + DB/RLS + აპი ისე, რომ პროდუქტი იყოს გამოყენებადი | `VERSIONS` + **MASTER FEATURE LIST** ✅; **არა** პიქსელ-პერფექტი / სრული i18n Legal / Stripe live |
| **2** | **Polish + გაფართოება** იმავე არქიტექტურაზე — UI audit (§33/§35), Legal შიგთავსის i18n, SEO/A11Y სრული audit, ფიჩების **🚀 Future** „პატარა“ ნაწილი, სპამის/ფიდის tuning, email verification/SMTP საჭიროებისამებრ | პროფილის ფაზა **E** დასრულება; **§5** mutual მარშრუტი; **§49** ევრისტიკის გაძლიერება |
| **3** | **ბიზნეს/პლატფორმის „ლანჩი“** — რეალური გადახდა, პროდაქშენ secrets, მასშტაბის ინფრა საჭიროებისამებრ | **Stripe** live (**§24**), Premium Checkout, webhook production |
| **4+** | **დიდი ფსონი / ოპერაცია / პლატფორმის გარე** | **Push (46)**, **Backup (39)** სტრატეგია, **native** აპები, **AI** მოდერაცია, PWA — იხილე **§50**, **`#### 🚀 Future`** |

**MASTER 1–51 — იმპლემენტაცია vs მომავალი ტალღა (ამ ეტაპის სინქი):**

| # | ტალღა 1 (baseline) | მომავალი განვითარება (რომელი ტალღა / შენიშვნა) |
|---|----------------------|--------------------------------------------------|
| 1–3 | ✅ User / Auth / Profile | **2+:** §50 იდეები; პროფილი polish |
| 4 | ✅ Avatar | **2:** სხვა გვერდებზე Avatar (სურვილისამებრ) |
| 5 | ✅ Friends | **2:** **§5** `🚀 Future` — `/mutuals`, ფილტრები |
| 6–9 | ✅ Posts, Feed, Reactions, Comments | **2:** კომენტარების/ფიდის Future §-ებში |
| 10 | ✅ Video (short, ტრანსკოდინგი არა) | **3+:** ტრანსკოდინგი / §10 Future |
| 11–12 | ✅ Media, Notifications | **2:** მედია polish; ნოტიფ. Realtime polish |
| 13 | ✅ Chat | **2:** §13 Future |
| 14–17 | ✅ Search, Tags, Trending, Ranking | **2:** ranking/Search UX tuning (**შემდეგი ფაზა** B) |
| 18–24 | ✅ Admin … Monetization (`premium_until`) | **3:** **Stripe** live, Checkout (**§24**) |
| 25–29 | ✅ Settings, Privacy, Security, API, DB docs | **2:** security polish; **3:** billing-თან დაკავშირებული |
| 30–32 | ✅ Caching, Logging, Errors | **2:** Sentry/telemetry; დამატებითი ტესტები |
| 33–35 | ✅ UI, Theme, Mobile | **2:** ფაზა **E** სრული audit; ტალღა 2 polish |
| 36–38 | ✅ Perf, Deploy, Env | **2:** E2E, preview env, virtualization |
| 39–40 | ❌ აპში არა (ოპერაცია/Git) | **4+:** სტრატეგია §39/§40 |
| 41 | ✅ Vitest | **2:** E2E, coverage |
| 42–44 | ✅ SEO / A11Y / L10n baseline | **2:** სრული audit; Legal სტატია `ka`/`ru` |
| 45 | ✅ password reset MVP | **2:** verification, alerts; **3:** SMTP production |
| 46 | ❌ Push | **4+** |
| 47 | ✅ Storage | **2:** CDN/ოპტიმიზაცია სურვილისამებრ |
| 48 | ✅ DB + API rate limit | **2:** Redis/WAF გლობალური — §48 Future |
| 49 | ✅ Anti-spam MVP | **2:** გაფართოება (**შემდეგი ფაზა** A) |
| 50 | — იდეების კატეგორია | ახალი ფიჩა → `project.md` |
| 51 | ✅ Legal გვერდები + ლინკები | **2:** სტატიის სრული თარგმანი |

*ცხრილი შეიძლება იტერაციაში განახლდეს — ერთი წყარო რჩება **MASTER LIST** + **§ FEATURE BREAKDOWN** + **`## CURRENT WORK`**.*

---

### რა გაკეთდა (სტატუსი — ამ ეტაპზე)

- **v1 (MVP):** Auth, პოსტები, feed, რეაქციები, პროფილი, settings, UI/მობილური, Legal — **დასრულებული** (ლოკალურად).
- **v2:** კომენტარები, ძებნა, თემა, ნოტიფიკაციები, ტეგები, trending, chat, ranking UI — **baseline დასრულებული**.
- **v3:** Admin, moderation, reports, ban, stats, ads, premium, settings+privacy, security, API catalog, DB docs (`SCHEMA.md`, `verify_schema`), **Caching (30)** TanStack Query, **Error Handling (32)** (toast მთელ აპში მუტაციებზე/ავთენტიკაციაზე სადაც განვავრცელეთ; route-level **`QueryErrorResetBoundary`** + **`RouteErrorBoundary`** → **`LayoutOutlet`**; **`RouteErrorBoundary.test.tsx`**), **Logging (31)**, **Performance (36)** lazy routes, **Deployment (37)** Vercel + `vercel.json` + **`README.md` deployment გზამკვლევი**, **Testing (41)** Vitest — **baseline დასრულებული** კოდში.
- **Production:** აპი **ატვირთულია Vercel-ზე** (GitHub დაკავშირება, `VITE_*` env, Supabase Auth URL-ები — იხილე **`README.md` → „Production deployment (GitHub + Vercel + Supabase)”**).
- **Supabase SQL (migrations):** რეპოში `supabase/migrations/` ჩამოწერილი migration-ების სრული თანმიმდევრობა **გაშვებულია production Supabase-ზე** (დადასტურებული).
- **Admin feature flags:** `feature_flags` (`20260401351500`, `20260401351600`, `20260401351700`) — `/admin/features` + ჰედერის ადმინ მენიუ; გამორთული ფუნქცია **არ ჩანს** მომხმარებლისთვის (მაგ. Trending, feed ads, **პრემიუმის ბარათი მთავარზე**, კომენტარები, ძებნა/მესიჯების ნავი და შესაბამისი URL-ები → მთავარი) — „გამორთულია“ არ ეწერება.
- **Media Upload (11) + File Storage (47) — baseline:** Supabase Storage `post-images`, `posts.image_url`, `PostForm` სურათი, feed/admin `PostCard` / Moderation; პოსტის წაშლისას Storage cleanup (საუკეთესო ძალისხმევა).
- **Video (10) — baseline:** Storage `post-videos` (MP4/WebM, 50 MiB), `posts.video_url`, CHECK ერთ მედიაზე; `PostForm` / `PostCard` / admin; account deletion იშლის `post-videos` პრეფიქსს; **ტრანსკოდინგი არა** (იხილე §10).
- **Friends (5) — baseline:** `follows` + RLS; `/u/:userId`; `/u/:userId/followers` · `/u/:userId/following` (`UserFollowListPage`, pagination); Follow/Unfollow; პროფილზე რაოდენობები ლინკებით; **ორმხრივი გამოწერა** — `UserProfilePage`-ზე ბეიჯი `pages.userProfile.mutualFollowBadge` (ორი `queryKeys.follow.relation`); **ნოტიფიკაცია** ახალ გამომწერზე (`notifications.type` `follow`, migration `20260401340000` **live Supabase** — იხილე `JOURNAL.md`); ლინკები `PostCard` / Search (იხილე §5).
- **Avatar (4) — baseline:** `profiles.avatar_url`, bucket `avatars` (2 MiB), **Settings** → Profile photo, **Profile** + feed **PostCard** — `Avatar` კომპონენტი; ძველი სურათის წაშლა ახალი ატვირთვისას / Remove.
- **GitHub CI:** `.github/workflows/ci.yml` — `main`/`master`-ზე push/PR: `npm ci` → `npm test` → `npm run build` (იხილე **`README.md` → „GitHub Actions (CI)“**). **Vercel** დეპლოი რჩება რეპოდან იმპორტით, როგორც ადრე.
- **ანგარიშის წაშლა (სერვერული ფლოუ):** **`supabase/functions/delete-account/`** — Edge Function: JWT → Storage (`avatars/`, `post-images/`) წაშლა → `auth.admin.deleteUser`. **`api/delete-account.ts`** (Vercel) + **`src/lib/deleteAccount.ts`** — same-origin `/api/delete-account`, fallback Edge. **`SettingsPage`** — დადასტურება `DELETE`, `queryClient.clear`, sign out. **Deno/IDE:** `supabase/functions/deno.json` (import map), `tsconfig.json` + `deno-env.d.ts` — `@supabase/supabase-js` ტიპები `node_modules`-იდან. **ცოცხალი Supabase:** საჭიროა **`supabase functions deploy delete-account`** (იხილე **`README.md`** + **`supabase/ACCOUNT_DELETION_DESIGN.md`**).
- **ანგარიშის წაშლა (სტატუსი production):** **დადასტურებული მუშაობს** — Settings → წაშლა: `POST /api/delete-account` (Vercel), env (`SUPABASE_SERVICE_ROLE_KEY` + `VITE_*`), `auth.users` იშლება Supabase-ში; Storage პრეფიქსები იწმინდება. **Hobby:** ძალიან ბევრი ფაილი/ნელი Storage კვლავ შეიძლება timeout-ს მიუახლოვდეს — საჭიროებისამებრ Pro ან Edge fallback. ტექნიკური ფიქსები: `api/*` relative imports **`.js`** (TS2835 / Vercel build), `errorMessage`, პარალელური bucket cleanup, top-level `try/catch` — იხილე **`README.md`**, **`JOURNAL.md`**.
- **ნავიგაცია (ადმინი):** **`Layout`** — ადმინის ქვემენიუ ერთ **`details`** ჩამოსაშლელში (ჰედერი აღარ „იშლება“ ბევრი ბმულით). **`translate="no"`** ჰედერზე — ბრაუზერის ავტოთარგმანი არ ურევს ნავიგაციის ტექსტს.
- **Localization (გაფართოება):** `messages.ts` `pages.*` — Profile, PostCard, კომენტარები, reports, reactions, Legal (chrome), Security, **Notifications** (`pages.notifications.*`), **`MessagesPage` / `ChatThreadPage`** (`pages.messages.*`, `pages.chat.*`, `en`/`ka`/`ru`) სრულად `t()`; **`BannedPage`** — `pages.bannedPage.*`; **`AvatarUploadSection`** (Settings) — `settings.avatar*`; **`FeedAdSlot`** (ლენტის ზედა რეკლამა) — `pages.home.feedAdSponsored` / `feedAdSponsoredContent`; **`PlaceholderCard`** — `pages.common.scaffoldInProgress` / `scaffoldInProgressHint`; **ფესვის `ErrorBoundary`** (`main.tsx` → `AppErrorBoundary`) — `errors.appBoundaryBody`, `errors.reload` (+ არსებული `errors.routeTitle` / `errors.homeLink`); **ადმინ გვერდები** — `pages.admin.*` (`AdminPage`, Moderation, Reports, Ads, Stats, Users, API catalog) `en`/`ka`/`ru` + `t()`; Legal სტატიის **შიგთავსი** ჯერ კიდევ ინგლისურია (სურვილისამებრ მომავალი ტალღა).
- **Home feed UI + ტალღა 2 ვიზუალი (2026-04):** **`styles.css`** — `rz-*` design tokens (accent, surface, გრადიენტები), dark `body` ზომიერება; **`Layout`** — theme pill (`theme-pill`), gradient avatar, notification dot; **`PostCard`** / **`PostForm`** — მუქი surface, accent ზედა ხაზი, gradient ინიციალები, reaction სტილი, `btn--post-submit`; **`HomePage`** — grid (`home-page` / `home-feed` / `home-sidebar`, trending tags placeholder), **`feed-tabs`** / **`feed-tabs__tab`** Latest/Trending (URL ლოგიკა უცვლელი), **`home-feed-toolbar--sticky`** `top: 48px`; **`FeedAdSlot`** — `feed-ad` rz + კომპაქტური + წერტილი ლეიბლზე. ფიდის query/ინფინიტი უცვლელი. **დანარჩენი §33 E:** სრული საიტის audit — ⬜; **§35 (გაგრძელება):** `max-width: 600px` — პროფილის **`profile-tabs`**; **`legal-page__nav`** `min-height` / `inline-flex` (Legal/Security).
- **Profile / User profile UI:** **`ProfilePage`** / **`UserProfilePage`** — `profile-hero` (ავატარი + მეტა), **`profile-stats`** სამ სვეტად (პოსტები / გამომწერები / გამოწერები), **`profile-tabs`** (Posts / Commented, `?tab=commented`), **`profile-empty`** ცარიელი პოსტების ბლოკი; i18n `pages.profile.statsPosts` / `statsFollowers` / `statsFollowing` (`en`/`ka`/`ru`); **`profile-skeleton`** ჰეროს ჩატვირთვა; **`ProfilePostListSkeleton`** პოსტების სიის ჩატვირთვა (`profile-post-skeleton`); საკუთარი ცარიელი პოსტების CTA → მთავარი ფიდი (`emptyPostsCta`); სხვისი პროფილი — `emptyPostsOther` (მესამე პირი); **`profiles.display_name` / `profiles.bio`** — migration `20260401350800`, რედაქტირება **Settings**-ში, ჩვენება პროფილზე (`profileAbout.ts`, `fetchPublicProfile`); **საჯარო ბმული** — `copyToClipboard` + `getPublicProfileAbsoluteUrl` (`/u/:id`), `pages.profile.copyProfileLink*`; **Commented** — `feed.ts` `fetchUserCommentedPostsPage` + `queryKeys.profile.commentedPosts`.

#### Profile UX — roadmap (polish, §33 / სხვა გვერდები)

რეფერენსი: ვიზუალური იერარქია (ავატარი + იდენტობა ზედა ზონაში), აქტივობის სტატისტიკა, ძირითადი კონტენტი (პოსტების სია), მობილური პირველობა — იგივე პატერნები რაც LinkedIn/Twitter-ის ტიპის პროფილებში (მოკლე meta, არა „ფორმის სია“).

| ფაზა | რა | სტატუსი |
|------|-----|--------|
| **A** | Hero + stats grid + ცარიელი მდგომარეობა + skeleton | ✅ |
| **B** | საკუთარი ცარიელი → CTA მთავარ ფიდზე; სხვისი → `emptyPostsOther` | ✅ |
| **C** | პოსტების ბლოკში skeleton (სიის ადგილზე) — `ProfilePostListSkeleton` | ✅ |
| **D** | `display_name` + `bio` (DB + Settings + პროფილის UI) | ✅ — **გაშვება Supabase-ზე:** `20260401350800_add_profiles_display_name_bio.sql` |
| **D+** | copy profile URL (`/u/:id`) — ღილაკი + toast | ✅ |
| **D++** | ტაბები Posts / Commented (`?tab=commented`, RPC `user_commented_post_ids`) | ✅ — **გაშვებულია Supabase-ზე** (დადასტურებული) — `20260401350900_add_user_commented_post_ids_rpc.sql` |
| **E** | §33 audit — ტიპოგრაფია/სივრცეები | 🔄 **ფოკუსი (2026):** feed sticky `safe-area`, `feed__more` min-width; **`.card__title`** ერთიანი სტილი — ზემოთ ჩამოთვლილებს + **`messages-page`**, **`banned-page`**, **`follow-list-page`**, **`admin-*`**, **`chat-page`**; **`legal-page`** / **`security-page`** (სათაურები, ნავი, წაკითხვის სვეტი); სრული საიტის audit — ⬜ Future |
- **Email (45) — password reset (MVP):** `/forgot-password` · `/reset-password`, `getAuthRecoveryRedirectTo()`, Supabase `resetPasswordForEmail` + session recovery → `updateUser({ password })`; i18n `en`/`ka`/`ru`; **Dashboard:** Redirect URLs + ნებისმიერი SMTP — **`README.md`**, **`project.md` → §45**. **ტესტები:** Vitest/RTL ამ ფლოუზე — **მომავალში** (იხილე §45 / §41 Notes).
- **Anti-spam (49) — body update:** migration `20260401350600_antispam_recheck_on_body_update.sql` — **გაშვებულია Supabase-ზე** (დადასტურებული) — `body` შეცვლისას იგივე duplicate/link ევრისტიკა რაც INSERT-ზე; `abuse_flags` როცა `is_flagged` ხდება UPDATE-ით (`skip_spam_guard` — report path-თან დუბლირების გარეშე).
- **Anti-spam (49) — დახვეწა (ფაზა A):** **`20260401351000`** — ბაზის ევრისტიკა (მინ. სიგრძე 12, ფანჯარა 5 წთ); **`20260401351100_antispam_tune_window_7_min_len_15.sql`** — **მიმდინარე სპეკი:** ფანჯარა **7 წთ**, ნორმ. `body` სიგრძე ≥ **15** დუბლიკატისთვის; **აპი:** `PostForm` / `CommentSection` — info toast, თუ ჩანაწერი ავტომატურად დაიფლაგა. **Production:** ახალი migration-ის გაშვება სავალდებულოა live-ზე; `SCHEMA.md`, **`reziizi.mdc`** (#35).
- **პოსტის სიგრძე + ტირი:** **`20260401351200`** — CHECK ზედა ჭერი **5000**; **`20260401351300_posts_tier_free_premium.sql`** — უფასო **1000** სიმბოლო, პრემიუმი ან ადმინი **5000**; ვიდეო პოსტი მხოლოდ პრემიუმი/ადმინი (`video_url` + Storage `post-videos`). **`postBodyLimits.ts`** + `PostForm`. **Production:** ორივე migration; ძველი >5000 პოსტი — იხილე #512 შენიშვნა.
- **Rate limiting (48) — API ფენა:** `POST /api/delete-account` — IP-ზე best-effort window (`api/lib/rateLimitByIp.ts`); env იხილე **`README.md`**.
- **Premium + billing (§24):** migration `20260401350700` — **გაშვებულია Supabase-ზე** (დადასტურებული) — `service_role` → `premium_until` მხარდაჭერა. **რეალური Stripe** (Edge `stripe-webhook` deploy, secrets, Dashboard webhook, in-app Checkout) — **ოფიციალური განვითარების რიგი** — **`#### ბიზნესი / §24 — განვითარების გადაწყვეტილება`** ქვემოთ; ტექნიკური ნაბიჯები — **`README.md` → „Stripe Premium“**.
- **ტეგები / „ჰეშტეგი“ (პროდუქტი):** **ვარიანტი B** — მხოლოდ ცალკე ველი; **`posts.body`-დან `#` არ იკითხება.** სრული არგუმენტაცია — **`### 15`**. **Polish:** live preview — ✅ `PostForm`. **ტირი:** უფასო **4** / პრემიუმი+ადმინი **8** ტეგი — ✅ `tagParse.ts` + migration **`20260401351400_post_tags_tier_limit.sql`** (Production გაშვება სავალდებულოა). **body `#`** — მხოლოდ სკოპის + მეტრიკის შემდეგ.

#### Premium vs free — პოსტი / მედია

**სტატუსი:** ✅ **ფაზა 1 იმპლემენტირებული** — ტექსტის ტირი + ვიდეო მხოლოდ პრემიუმზე/ადმინზე (`20260401351300`, `PostForm`, Storage). **პრემიუმი:** `profiles.premium_until` აქტიური — `src/lib/premium.ts`, **§24**. **მომავალი (ფაზა 2, სურვილისამებრ):** დღიური ლიმიტი, სხვადასხვა rate წუთში, სურათის ზომა ტირებად — იხილე ქვემოთ „სამიზნე“.

| პარამეტრი | არა პრემიუმი | პრემიუმი (ან `is_admin`) | იმპლემენტაცია |
|-----------|----------------|---------------------------|----------------|
| `posts.body` მაქს. სიმბოლო | **1000** | **5000** | `posts_enforce_tier_limits` + CHECK ≤5000 (`013512`); `getPostBodyMaxLength` / `PostForm` |
| პოსტების სიხშირე (rolling) | **12 / 1 წთ** (იგივე) | **იგივე** | `20260401310000` — ტირად განსხვავება **არა** (მომავალი ფაზა) |
| სურათი — ფაილის მაქს. ზომა | **5 MiB** | **5 MiB** | `postImageStorage` — ტირად განსხვავება **არა** (მომავალი: მაგ. 2 vs 5 MiB) |
| ვიდეო — დაშვება | **არა** (`video_url` აკრძალული) | **კი** | ტრიგერი + Storage policy `post-videos`; UI-ში ვიდეო არ ჩანს უფასოზე |
| ვიდეო — ფაილის მაქს. ზომა | — | **50 MiB** | `postVideoStorage` / bucket |
| ერთ პოსტზე მედია | ერთი ტიპი | იგივე | `posts_one_media_type` |
| ტეგები პოსტზე | **4** | **8** | `tagParse.ts` `getMaxTagsPerPost`; DB `20260401351400_post_tags_tier_limit.sql` |
| დღიური ლიმიტი / ვიდეო / დღე | — | — | **არა** (სამიზნე მომავალში) |

**შემდეგი ნაბიჯი (ფაზა 2):** `project.md` / §24 განახლება რიცხვებით → migration + აპი — ერთ სკოპში.

**შენიშვნა:** **Database Structure (29)** — `supabase/SCHEMA.md`, `verify_schema.sql`; ახალი migration-ის შემდეგ ამ ფაილებიც განაახლე.

#### ბიზნესი / §24 — განვითარების გადაწყვეტილება და რისკების დაზღვევა

**რატომ არის ეს სექცია:** გარე ჩატის ბრეინშტორმი (იდეების სია) **არ არის** პროექტის სპეკი. **ოფიციალური სკოპი ბიზნესისთვის** — მხოლოდ ეს ბლოკი + **`README.md`** (Stripe deploy). ასე ვიცავთ რეპოს ერთიანობას და **ვერ „გავტეხავთ“** უგეგმო ფულოვან ფიჩებს ერთ იტერაციაში.

**რეკლამის განთავსება და ბიზნეს გეგმა:** **არ ერთიანდება Stripe-თან ერთ P1 პაკეტად** — ლოგიკურად ორი ფენაა: (1) **რეკლამის სისტემა (MASTER #23)** — baseline უკვე არის: `ad_slots`, ლენტის ზედა ზონა **`FeedAdSlot`**, ადმინი **`/admin/ads`** (ტექსტური sponsored strip, არა HTML). ეს **ადმინისტრაციული** განთავსებაა. (2) **მონეტიზაციის გაფართოება** — **P2**: გადახდიანი **self-serve** პრომოცია / „Promoted“ პოსტი იმავე **feed top / `ad_slots`** მოდელთან დაკავშირებით (ერთი სპეკი: ადმინის სლოტი vs გადახდიანი სლოტი — ქვემოთ ცხრილის **P2** ხაზი). **P1** (Stripe + Premium) რეკლამის baseline-ს **არ ცვლის** — უბრალოდ მომდევნო ტალღაში ერთად უნდა იყოს განსაზღვრული, როგორ ემთხვევა გადახდიანი სლოტი არსებულ ცხრილს/RLS-ს.

| ეტაპი | რა | სტატუსი / შენიშვნა |
|--------|-----|---------------------|
| **P1 — ფაზა C (ლანჩი)** | **Stripe live** + Edge `stripe-webhook` deploy + Supabase/Stripe secrets + Dashboard webhook + **in-app** Checkout (`create-checkout-session` + Settings, ღილაკი **`VITE_BILLING_CHECKOUT_ENABLED=true`-ით**). პროდუქტული ფოკუსი: **Premium** გახანგრძლივება — არსებული `premium_until` + ტირები. | 🔄 **კოდი რეპოში** — Stripe **ოპერაციულად** ჩართვა მომავალში; ნაგულისხმევად checkout UI გამორთულია. |
| **P1+ (იმავე ტალღის შემდეგ, ცალკე ქვე-სკოპი)** | ოფციონალური: **creator badge** პროფილზე; **მინიმალური analytics** (საკუთარი პოსტების მეტრიკები) — იმპლემენტაცია მხოლოდ migration/RLS/აპის ერთიანი სკოპით `project.md`-ში. | ⬜ მომავალი — **არა** P1-თან ერთად ერთ უსახელო „ყველაფერი ერთად“ პაკეტში. |
| **P2 — Growth** | მხოლოდ **P1-ის შემდეგ**: **ერთი** მიმართულება პირველ ტალღაში — **ტიპები (tipping)** **ან** **self-serve boosted / „Promoted“** ლენტში. **არა** ორივე პარალელურად (ორი გადახდის სისტემა + მოდერაციის ორმაგი ტვირთი). Boosted **უნდა** იყოს **ერთ სპეკში** არსებულ **feed top / `ad_slots`** მოდელთან (ადმინის რეკლამა vs გადახდიანი სლოტი — ერთი დოკუმენტირებული წესი, არა ორი ურთიერთდაუკავშირებელი პროდუქტი). | ⬜ |
| **გადადებული (არა სკოპი სანამ ცალკე არ ჩაიწერება `project.md`-ში)** | B2B ორგანიზაციები, paywall / ექსკლუზიური კონტენტი, ლოკალური ბიზნეს-დირექტორია, გადახდიანი ვერიფიკაცია — მაღალი სკოპი ან ოპერაციული ტვირთი. | **არ იწყება** იმპლემენტაცია გეგმის გარეშე. |
| **Long tail** (რეფერალი, კოსმეტიკა, ჩელენჯები ფულით, white-label, …) | იდეები — **არა** ავტომატური სპეკი. | მხოლოდ **P1 / P2** დასრულების შემდეგ და ცალკე იტერაციაში. |

**დაზღვევა (რისგან თავი — რომ არ „გავაფუჭოთ“ პროექტი):**

1. **არ ავურიოთ** პარალელურად რამდენიმე დიდი გადახდის/ფულის ფიჩა (checkout + tipping + paywall — სხვადასხვა RLS, თაღლითობა, ჩარჯბექი).
2. **არა** `profiles` / `posts` / **RLS**-ის ფართო შეცვლა **უმიგრაციოდ**; **არა** `service_role` / Stripe საიდუმლოების გაჟონვა კლიენტში ან კომიტში.
3. **გარე ჩატის ტექსტი** → კოდი **მხოლოდ** ამ სექციის ან `project.md`-ის სხვა განახლების შემდეგ (იხილე **`.cursor/rules/reziizi.mdc` → პროექტის დაცვა**).
4. **Feed ხარისხი:** გადახდიანი პრომოცია / სლოტები — **ზღვარი და ლეიბლი** (ორგანული vs Promoted), რომ ორგანული ლენტა არ „ჩანჩალეს“ (პროდუქტული წესი P2-ში, სანამ იქ მივალთ).

---

### v3 ტექნიკური სტეკი (დასრულებული baseline — ცხრილი)

| # | ფიჩა | რა გაკეთდა | მომავალი (სურვილისამებრ) |
|---|------|------------|---------------------------|
| 1 | **Caching (30)** | TanStack Query: feed, profile, `useProfileFlags`, **Search** (`queryKeys.search.results`), **Notifications** (`queryKeys.notifications.list`); `queryKeys` / `queryClient` | prefetch სურვილისამებრ |
| 2 | **Error Handling (32)** | `errorMessage`, `InlineError`, query cache dev log; **Toast** (`ToastProvider` / `useToast`); **RouteErrorBoundary** + **`QueryErrorResetBoundary`** (`LayoutOutlet`); მუტაცია/ავთენტიკაცია toast-ით (იხილე წინა სია + **`ReactionButtons`**, **`MessagesPage`**, **`ChatThreadPage`** გაგზავნა, **admin** გვერდები, **`AdminAdsPage`** save success); **`RouteErrorBoundary.test.tsx`** | დამატებითი ტესტები სურვილისამებრ |
| 3 | **Performance (36)** | `React.lazy` + `Suspense` admin/messaging | tuning, virtualization, სურათები |
| 4 | **Deployment (37)** | Vercel, SPA rewrites, README; **GitHub Actions** — `.github/workflows/ci.yml` (`npm test` + `npm run build`) | E2E, coverage thresholds, preview env |
| 5 | **Logging (31)** | `src/lib/logger.ts` | Sentry / სხვა remote |
| 6 | **Testing (41)** | Vitest + Testing Library, `*.test.ts(x)` | E2E, coverage, CI-ში `npm test` |

---

### შემდეგი განვითარების გეგმა (შევსებადი)

შეავსე ქვემოთ — **პრიორიტეტი** 1 = პირველი. სტატუსი: მაგ. `⬜ დაგეგმილი` · `🔄 მუშაობს` · `✅ დასრულებული`. განაახლე ეს ცხრილი ყოველ იტერაციაში.

| პრიორიტეტი | ფიჩა (MASTER #) | სტატუსი | ვადა / შენიშვნა |
|-------------|-------------------|---------|------------------|
| 1 | **11. Media Upload System** (+ **47. File Storage**) | ✅ baseline | სურათი ან მოკლე ვიდეო პოსტზე (ორი ერთად არა); იხილე §10 / §11 |
| 2 | **4. Avatar** — `profiles.avatar_url`, bucket `avatars`, Settings upload, feed `PostCard` | ✅ baseline | სურვილისამებრ: სხვა გვერდებზე Avatar |
| 3 | **42. SEO** — `src/lib/seo.ts`, `RouteSeo`, `index.html` defaults; public routes indexable, auth/admin noindex | ✅ baseline | **Email (45)** password reset — აპი ✅; SMTP/redirect — `README` |
| 4 | **43. A11Y** — skip link, `#main-content`, brand; **`RouteAnnouncer`** (`aria-live`, `getRouteAnnouncement`) | ✅ baseline | სრული audit — **ტალღა 2** |
| 5 | **48. Rate limiting** — DB triggers on `posts` / `comments` / `chat_messages` / `reports` (see `SCHEMA.md`) | ✅ baseline | Edge/API გლობალური ლიმიტები — **ტალღა 2+** (იხილე §48 Future) |
| 6 | **44. Localization** — `pages.*` (`en`/`ka`/`ru`), Layout, Settings, SEO, Profile, PostCard, comments, reports, reactions, Legal chrome, Security, **Notifications**, **Messages / Chat**, **Admin** (`pages.admin.*`) | ✅ baseline v3 | Legal article body ინგლისურად; სხვა გვერდები/ტექსტები სურვილისამებრ |
| 7 | **Account deletion** — Edge `delete-account`, `api/delete-account`, `src/lib/deleteAccount.ts`, Settings UI | ✅ production (დადასტურებული) | Vercel + Supabase; Hobby-ზე იშლება — მძიმე Storage-ისას იხილე `README` troubleshooting |
| 8 | **5. Friends — mutual follows** (ორმხრივი გამოწერა, UI ინდიკატორი `UserProfilePage`) | ✅ baseline (MVP) | სრული სკოპი **§5**; „მომავალი ტალღა“ იხილე **`#### 🚀 Future`** mutual-ის ქვეშ |
| 9 | **49. Anti-spam (MVP)** — `abuse_flags`, `is_flagged` / `spam_score`, ტრიგერები, RLS, admin UI, feed soft-hide | ✅ baseline (SQL + აპი) | Migrations: `20260401350000` … `20260401350100`; სპეკი: **`#### Anti-spam (49)`** |
| 10 | **Notifications v2** — ტიპზე preference (`profiles.notify_on_*`), Settings UI, unread/list სინქი ტაბებს შორის (`BroadcastChannel`) | ✅ baseline | Migration: `20260401350200_add_notification_preferences.sql`; `notificationPreferences.ts`, `notifications.ts`, `useUnreadNotificationCount` |
| 11 | **Feed tuning (trending)** — `feed_trending_post_ids` recency decay + კომენტარის წონა; flagged პოსტები გარეთ | ✅ **გაშვებულია Supabase-ზე** (დადასტურებული) | `20260401350300_improve_feed_trending_ranking.sql`; `SCHEMA.md` RPC აღწერა |
| 12 | **Search v2** — `search_post_ids` / `search_profile_ids` (ranking), `search.ts` + UI hint | ✅ **გაშვებულია Supabase-ზე** (დადასტურებული) | `20260401350400_add_search_v2_rpcs.sql`; `registry.ts`, `SCHEMA.md` |
| 13 | **მოდერაციის ავტომატიზაცია** — N report ერთ პოსტზე → `is_flagged` + `abuse_flags` | ✅ **გაშვებულია Supabase-ზე** (დადასტურებული) | `20260401350500_add_report_threshold_auto_flag.sql`; Admin Moderation hint (`pages.admin.moderation.autoFlagHint`) |
| 14 | **49. Anti-spam — რედაქტირება** — `body` UPDATE → ხელახალი duplicate/link (INSERT-ის პარიტეტი) | ✅ **გაშვებულია Supabase-ზე** (დადასტურებული) | `20260401350600_antispam_recheck_on_body_update.sql`; `SCHEMA.md`, `verify_schema.sql` |
| 15 | **48. API rate limit** + **§24 Premium** | **API:** ✅ `rateLimitByIp` / `README`; **DB:** `20260401350700` ✅ live; **Stripe (Checkout + webhook):** 🔄 კოდი რეპოში; **production deploy/keys** — ⬜ | `stripe-webhook`, `create-checkout-session`, Settings → checkout — `README` |

---

### შემდეგი ფაზა — A / B / C (ერთი წყარო: სკოპი, რიგი, „არ ავირიოთ“)

ეს ბლოკი **არ ცვლის** **MASTER FEATURE LIST**-ის ნომრებს და **reziizi.mdc** დამოკიდებულების რიგს — პრაქტიკული **პრიორიტეტი** პატარა გუნდისთვის. **ახალი ფიჩა:** ჯერ **რომელი ფაზაა (A, B თუ C)** — ქვემოთ სკოპი; მერე `project.md` სხვა ადგილას განახლება საჭიროებისამებრ; მერე SQL/RLS; მერე კოდი.

#### რას ნიშნავს A vs B vs C (ურთიერთგამომრიცხავი სკოპი)

| ფაზა | მიზანი ერთი წინადადებით | **შედის სკოპში** | **არ შედის სკოპში** (სხვა ფაზაშია) |
|------|--------------------------|------------------|-------------------------------------|
| **A** | უსაფრთხოება / სპამი / ნოტიფიკაციების ქცევა | **§49** Anti-spam გაფართოება (ევრისტიკა, Edge/RLS საჭიროებისამებრ — იხილე **`#### Anti-spam (49)`**); **§12** notifications — preference / Realtime polish **მხოლოდ** თუ აქვს პირდაპირი კავშირი სპამთან/სიასთან (სხვა polish → **ტალღა 2** / §44) | Feed ranking ღრმად; Search UX პაკეტი; Stripe; Email verification; Legal სრული თარგმანი |
| **B** | ლენტა / ძებნა / მოდერაციის ხარისხი (პროდუქტის „გემო“) | **§17** feed/trending tuning; **§14** search ranking + UX polish; **§19/20** მოდერაცია — ავტომატიზაციის გაძლიერება **MVP-ის გარეთ** (თუ უკვე არ არის დასრულებული — იხილე ქვემოთ „სტატუსი“) | §49 ახალი ტრიგერების დიდი პაკეტი უსაფრთხოების თემაზე (ძირითადად **A**); Stripe live; SMTP production |
| **C** | ინფრა / ბიზნესი „მოგვიანებით“ | **§45** Email — verification, alerts, custom SMTP; **§24** Premium — Stripe deploy, webhook, **Checkout UI** (`README` → Stripe); ტესტები ფლოუზე, თუ სკოპშია | Anti-spam SQL ძირითადი პაკეტი (**A**); feed algorithm სრული რედიზაინი (**B**) |

**წესი — მომხმარებელი + AI (რომ არ „ვიხტუნავოთ“):**

1. **მუშაობის დაწყებამდე** დაასახელე **ერთი** ფაზა: **„ვმუშაობთ A-ზე“** / **„B-ზე“** / **„C-ზე“** (ან **ტალღა 2** polish — იხილე **`## CURRENT WORK` → ტალღები**).
2. **A-ს სკოპში** არ ითხოვება და არ იწერება იმპლემენტაცია, რაც **მხოლობით** B-ის ან C-ის ცხრილშია (მაგ. A-ზე მუშაობისას **არ** იწყება Stripe Checkout ან feed ML).
3. **B-ს სკოპში** არ გადაიტანო სრულად **§49** ახალი მიგრაციის დიდი პაკეტი უსაფრთხოების თემაზე — ეს **თანხმობის შემთხვევაში** **A** ან ცალკე იტერაცია **`project.md`-ში**.
4. **C-ს სკოპში** ფოკუსი **Email / Stripe / billing** — არა ახალი anti-spam ტრიგერების პაკეტი (**A**).
5. **დაბნეულობისას** — უპირველესად **`## CURRENT WORK`** და **`#### Anti-spam (49)`**, არა მხოლოდ ეს ცხრილი.

#### ფაზა A / B / C — რა დასრულებულია vs რა კვლავ **გახსნილი** (სინქი ამ ეტაპზე)

| ფაზა | დაგეგმილი ხაზი | სტატუსი | შენიშვნა |
|------|----------------|----------|----------|
| **A** | Anti-spam MVP (SQL + აპი + რედაქტირება) | ✅ **baseline დასრულებული** | იხილე **შემდეგი განვითარების გეგმა** ცხრილი, `JOURNAL.md`; **გაფართოება** კვლავ **A სკოპი** |
| **A** | ნოტიფიკაციები v2 (preference, unread სინქი) | ✅ **baseline დასრულებული** | migration `20260401350200` — იხილე CURRENT WORK |
| **A** | Anti-spam დამატებითი ევრისტიკა / Edge | 🔄 **გახსნილი სურვილისამებრ** | არა სავალდებულო baseline-ისთვის; სკოპი **მხოლოდ** **`#### Anti-spam (49)`** + ეს ცხრილი |
| **B** | Feed tuning (trending RPC) | ✅ **გაშვებულია** | `20260401350300` |
| **B** | Search v2 RPC + UI | ✅ **გაშვებულია** | `20260401350400` |
| **B** | მოდერაცია auto-flag (N report) | ✅ **გაშვებულია** | `20260401350500` |
| **B** | Ranking / Search **UX polish** (სრული ტექსტი, ჰინტები, §14 Future) | 🔄 **ნაწილობრივ** — `/search` ინტრო (არა `q`); ერთიანი ცარიელი შედეგი (0 პოსტი + 0 პროფილი) | დარჩენილი polish სურვილისამებრ |
| **C** | Password reset MVP | ✅ **აპი** | §45 |
| **C** | Stripe live + Checkout UI | 🔄 **აპი + Edge `create-checkout-session`** რეპოში; **live** Stripe/Supabase deploy + secrets — ⬜ | `README` → Stripe Premium |
| **C** | Email verification / SMTP / alerts | ⬜ **მომავალი** | **C სკოპი** |

**გადადება / პროდუქტის არჩევანი (არა A/B/C-ის ნაწილი, არამედ ტალგა 2+):** **Legal სრული i18n** — პროდუქტის გადაწყვეტა. **AI მოდერაცია**, **native აპები** — §50 / ტალღა 4+.

**რისგან თავი:** Feed ranking — არ გადაიტვინო ერთ იტერაციაში; Premium — არ ჩაიტანო сложная billing სანამ **C** არ დაგეგმი; სპამი — legit users არ დააზიანო (**A** პრინციპი).

**რეკომენდებული რიგი (თუ ყველაფერი გახსნილია ერთდროულად არა):** ჯერ დასრულებული baseline-ის შემოწმება ზემოთ ცხრილში → შემდეგ **გახსნილი** ხაზების მიხედვით: **A** (სპამის გაფართოება, თუ პრიორიტეტი) → **B** (UX polish) → **C** (Stripe / Email). **არა** ფიქსირებული კალენდარი — პრიორიტეტი გუნდის გადაწყვეტილებაა, მაგრამ **სკოპი** რჩება ზემოთ ცხრილის მიხედვით.

---

#### Anti-spam (**49**) — სპეკი და იმპლემენტაცია (ერთი წყარო)

**სტატუსი:** ✅ **MVP baseline** დასრულებული (SQL + აპი — იხილე **CURRENT WORK**); **გაფართოება** — 🔄 სურვილისამებრ, სკოპი **ფაზა A** + ეს სექცია. დეტალი **მხოლოდ აქ**; **§49 FEATURE BREAKDOWN** ქვემოთ მხოლოდ მიმართებაა (არ ვაკოპირებთ ცხრილს).

**პრინციპი:** არსებულ **rate limits (48)** ზედ (`20260401310000_add_rate_limit_triggers.sql`, `SCHEMA.md`) — ევრისტიკა + რბილი დროშები; **არა** AI/CAPTCHA/fingerprint/ავტომატური სამუდამო ბანი MVP-ში. **Edge** მოგვიანებით; **არა** ტრიგერიდან Edge პირდაპირ (pg_net-ის გარეშე).

**Locked technical outline**

| ელემენტი | როგორ |
|----------|--------|
| **ლოგიკა** | PostgreSQL ტრიგერები + ფუნქციები — duplicate / ლინკის წესები; ინდექსი `user_id` + `created_at` სადაც საჭიროა. |
| **სქემა** | **`abuse_flags`** (FK: `post_id`, `comment_id`, ოფციონალური `message_id` — ერთი non-null `CHECK`); **და** **`posts` / `comments`** — `is_flagged` boolean, `spam_score` int default 0. |
| **RLS** | მომხმარებელი ვერ ცვლის `is_flagged` / `spam_score` ხელით — ტრიგერი ან SD ფუნქცია; ადმინი + bypass. |
| **აპი** | `src/pages/`, `src/components/`, `src/lib/` — არა `src/features/`. Toast / `errorMessage`. |
| **დოკი** | migration-ის შემდეგ: `SCHEMA.md`, `verify_schema.sql`. |

**იმპლემენტაციის default-ები (გადაწყვეტილი სანამ SQL დაიწყება)**

| თემა | მნიშვნელობა |
|------|----------------|
| დუბლიკატის ფანჯარა | **7 წუთი** (3–10 დიაპაზონიდან — იხილე `20260401351100`); ტექსტი ნორმალიზებული (trim, lower, collapse whitespace). |
| Soft hide feed | საჯარო feed / trending / სიები სხვებისთვის: **`is_flagged = true` არ ჩანს**; ავტორი ხედავს **საკუთარ პროფილში** / თავის პოსტებში (იმპლემენტაციაში დაიზუსტება query-ებით). |
| ლინკის ათვლა | მინიმუმ `http://`, `https://`; სურვილისამებრ `www.` უსქემოდ — ერთი regex იმპლემენტაციაში. |
| Approve (ადმინი) | `is_flagged = false`, `spam_score = 0`; `abuse_flags` ჩანაწერები იგივე საგანზე — წაშლა ან დატოვება audit-ისთვის (აირჩიე migration-ში ერთი). |
| Rate limit vs anti-spam | ორივე ტრიგერი შეიძლება იგივე INSERT-ზე — ერთი user-facing შეტყობინება (`errorMessage`); ზედმეტი დუბლირებული toast არა. |

**დადასტურებული კონფიგი (MVP)** — პროდუქტის ცხრილი (რისკებით); **`message_id`** ოფციონალური მომავალი chat-ისთვის; **პირველი ტალღა** — მხოლოდ **posts + comments** (chat — არსებული rate-limit მარტო).

| # | თემა | რეკომენდებული მნიშვნელობა | რისკი თუ ზედმეტად მკაცრი / რბილია |
|---|------|---------------------------|-------------------------------------|
| 1 | `abuse_flags` სქემა — FK vs polymorphic | FK ცალკე ველებით (`post_id`, `comment_id`, ოფციონალური `message_id`) — nullable; ერთ ჩანაწერში ერთი შევსებული | polymorphic მოქნილია, მაგრამ რთულდება RLS და join-ები; FK უფრო უსაფრთხოა MVP-ში |
| 2 | `is_flagged` / `spam_score` სად | `posts` და `comments`: `is_flagged` boolean, `spam_score` int default 0 | ზედმეტად აგრესიული → legit პოსტები დაიმალება; რბილი → სპამი დარჩება feed-ში |
| 3 | მხოლოდ posts+comments თუ chat-იც | პირველ ტალღაში: **posts + comments**; chat → მხოლოდ არსებული rate-limit | chat-ის სრული anti-spam ახლავე ზრდის false positives-ს |
| 4 | დუბლიკატის დროის ფანჯარა (წუთებში) | **7 წთ** იგივე ტექსტისთვის იგივე user-ზე (ნორმალიზებული ტექსტი); იხილე „იმპლემენტაციის default-ები“ + `20260401351100` | ძალიან მოკლე → spam გაეპარება; ძალიან გრძელი → legit პოსტები/რედაქტი დაიბლოკება |
| 5 | ლინკების მაქს. რაოდენობა | **max 2** link / post, comment-ში **max 1** | მკაცრი ლიმიტი → legit promo/content დაზარალდება; რბილი → link spam გაიზრდება |
| 6 | ავტორს ჩანს თუ არა დროში | ჩანს **საკუთარ პროფილში**; feed-ში შესაძლოა არ გამოჩნდეს (soft hide) | საერთოდ არ ჩანს → confusion; ყველგან ჩანს → spam ეფექტი არ მცირდება |
| 7 | ადმინის მინიმალური UI | Admin: filter `is_flagged=true`, sort `spam_score` desc; სწრაფი მოქმედებები: approve / delete / ban user (რაც უკვე არსებობს + ახალი ველების მიბმა) | სუსტი UI → bottleneck; ზედმეტად რთული → ზედმეტი dev დრო |
| 8 | ლოკალიზაცია | `en` / `ka` / `ru` — `messages.ts` (ახალი სტრინგები სამივე ლოკალში) | — |

**სხვების გამოცდილება (მოკლე რეფერენსი — არა „ერთი სიმბოლო“)**  
პლატფორმები ხშირად **რამდენიმე შრეს** იყენებენ: rate limit + ევრისტიკა + (საჭიროებისას) მოდერაცია/სკორი. დუბლიკატისთვის ტიპურია **დროის ფანჯარა 3–10 წთ** და **ნორმალიზებული ტექსტის** შედარება; მოკლე ტექსტზე **მკაცრი „იგივეა“** ხშირად იწვევს false positive-ს — ამიტომ ბევრი სისტემა **მინ. სიგრძეს** აყენებს მხოლოდ იმ ევრისტიკისთვის, რომელიც „იგივე კონტენტს“ ეძებს (არა იგივეა, რაც „მინიმალური ხარისხის“ ზღვარი პოსტისთვის — მაგ. Q&A საიტებზე ხშირად სხვა რიცხვია „მოკლე პასუხის“ ფილტრისთვის). **რბილი დროშა** (ჩვენთან `is_flagged` + feed-იდან დამალვა) + მეტრიკა false positive-ებზე — უფრო მდგრადია, ვიდრე ერთი პარამეტრით „ყველაფრის“ აკრძალვა.

**პროდუქტის გადაწყვეტილება — შეავსე ცხრილი (რა ქცევა გინდა)**  
სვეტი **«რა გინდა»** — შენი პირდაპირი ფორმულირება; განახლებისას აქვე განაახლე **«ახლა რეპოში»** (ან მიუთითე migration).

| პარამეტრი / ქცევა | რა გინდა (შეავსე) | სხვების ტიპიური დიაპაზონი | ახლა რეპოში |
|-------------------|-------------------|-----------------------------|--------------|
| დუბლიკატის დროის ფანჯარა (იგივე user, იგივე ნორმ. ტექსტი) | უფრო ფართო ფანჯარა (7 წთ), ვიდრე 5 წთ — იგივე ტექსტის სპამ-გამეორება უფრო დიდხანს იჭერა | 3–10 წთ | **7 წთ** (`20260401351100_antispam_tune_window_7_min_len_15.sql`) |
| დუბლიკატის ევრისტიკა — მინ. ნორმ. `body` სიგრძე (მოკლე ტექსტი არ ითვლება დუბლიკატად) | მინ. 15 სიმბოლო — უფრო ნაკლები false positive მოკლე ფრაზებზე | ხშირად 10–20 სიმბოლო იმავე ტიპის წესისთვის | **≥ 15** (`20260401351100_antispam_tune_window_7_min_len_15.sql`; წინა ეტაპი: `20260401351000` → 12) |
| ლინკების ლიმიტი post / comment | | ხშირად 1–3 / 0–2 | სპეკში: post **max 2**, comment **max 1** — დაადასტურე ტრიგერით `SCHEMA.md` |
| დროშის შედეგი (spam) | | რბილი დროშა vs სრული ბლოკი | **რბილი** — `is_flagged`, feed query-ები |
| ავტორს UI შემდეგ დროშაზე | | toast / ტექსტი ლოკალიზაციით | toast + `messages.ts` (`flaggedAfterPost` / `flaggedAfterComment`) |
| პრიორიტეტი false positive vs მეტი სპამის დაჭერა | false positive-ზე ორიენტაცია (რბილი დროშა, უფრო გრძელი მინ. სიგრძე დუბლიკატისთვის) | საზოგადოებრივი სერვისები ხშირად ამბობენ: ნდობა > მაქს. catch | იხილე ზემოთ პარამეტრები |

**Migration / იმპლემენტაციის ნაბიჯები (checklist)**

0. ახალი migration: **`20260401350000_add_anti_spam_flags.sql`** — იხილე `.cursor/rules/reziizi.mdc` migrations ცხრილი (#24).
1. `abuse_flags` ცხრილი (FK-ები + `CHECK` ერთი target-ზე).
2. `posts` / `comments` — `is_flagged`, `spam_score`.
3. duplicate-check ტრიგერი (INSERT / UPDATE საჭიროებისამებრ).
4. link-count ტრიგერი.
5. RLS + soft-hide წესი (იხილე „იმპლემენტაციის default-ები“).
6. admin bypass policy.
7. ინდექსები (`user_id`, `created_at`, საჭიროებისამებრ).
8. client — UI / ფილტრები / `messages.ts`.
9. **გაფართოება (რედაქტირება):** `20260401350600_antispam_recheck_on_body_update.sql` — `body` UPDATE-ზე იგივე ევრისტიკა + `abuse_flags` AFTER UPDATE (იხილე `SCHEMA.md`).
10. **ტუნინგი (ფაზა A):** `20260401351100_antispam_tune_window_7_min_len_15.sql` — duplicate ფანჯარა **7 წთ**, `spam_duplicate_eligible` **≥ 15** (იხილე „პროდუქტის გადაწყვეტილება“ ცხრილი).

**Appendix — external AI (optional):** სხვა ჩატში დასაკოპირებლად — **ინგლისური** ჩარჩო (სტეკი/რეპო არ დაირღვეს). სრული სპეკი anti-spam-ისთვის **ამავე სექციაა**, დამატებითი ქართული პრომპტი არ ვაკოპირებთ — იყო git ისტორიაში.

```
You are assisting the REZIIZI project. Obey these constraints:

1) STACK (fixed): React (Vite) + TypeScript + Supabase only. Do NOT propose new frameworks, new databases, or rewriting the app.

2) SOURCE OF TRUTH: Treat this repo’s project.md (CURRENT WORK + migrations list in .cursor/rules) as authoritative. If unsure, say "verify in repo" instead of inventing file paths, tables, or folders.

3) FOLDER STRUCTURE: Code lives under src/pages, src/components, src/lib — there is NO src/features/ tree. API registry: src/lib/api/.

4) IMPLEMENTATION ORDER: migrations + RLS + Supabase first, then app code — never skip RLS for user-facing tables.

5) POSTGRES: Do NOT assume a PostgreSQL trigger can "call" a Supabase Edge Function unless the project explicitly uses pg_net/http — prefer triggers + SQL for MVP; Edge Functions optional as separate HTTP step later.

6) SCOPE: One feature per answer unless asked otherwise. If the user asks for a plan, output scope, DB touchpoints, RLS notes, risks, acceptance criteria — NOT full production code unless requested.

7) ANTI-SPAM / ABUSE: Prefer soft flags, rate limits, and admin visibility; avoid AI moderation, CAPTCHA, and device fingerprinting in MVP unless explicitly requested.

Reply in the language the user asked (Georgian or English).
```

---

**იდეები სპეკიდან (არა სავალდებულო რიგი):** **SEO (42)**, **A11Y (43)**, **Localization (44)**, **Email (45)** (მოგვიანებით), **Rate limiting (48)** (Edge/API დამატება). **Anti-spam (49)** — სრული სპეკი **მხოლოდ** ზემოთ **`#### Anti-spam (49)`** (არა დუბლირება §49-ში). **Friends (5)** — baseline §5 + mutual MVP; ნოტიფიკაცია follow-ზე live. **Video (10)** — baseline §10 (ტრანსკოდინგი/სტრიმინგი მომავალში). **CI (GitHub Actions):** `README.md` → „GitHub Actions (CI)“.

**სადაც „მომავალია“:** თითოეულ ფიჩას აქვს **🚀 Future** ან **Notes** `FEATURE BREAKDOWN`-ში; ახალი ფიჩა: **ჯერ** გეგმა/სკოპი აქ (`project.md`) და სტატუსი ცხრილში, **მერე** კოდი (`reziizi.mdc`).

---

## FEATURE BREAKDOWN

### 1. User System ✅

#### 📌 Description
User system manages all users in the platform.

---

#### ✅ v1 (MVP)
- user has id
- user has email
- user has password

---

#### 🚀 Future (v2+)
- username
- avatar
- bio

---

#### ⚙️ Logic
- user is created during signup
- user is linked to posts

---

#### 🗄️ Database
Table: users
- id
- email
- password

---

#### 🛠️ Notes
- keep simple

---

#### 🧱 Implementation

Frontend:
- React
- simple form (signup/login)

Backend:
- Supabase Auth

Files:
- /src/pages/Auth.jsx
- /src/components/AuthForm.jsx

Flow:
1. user enters email/password
2. send request to Supabase
3. user gets session

UI:
- input: email
- input: password
- button: login/signup

---

### 2. Authentication ❌

#### 📌 Description
Authentication handles user login and access.

---

#### ✅ v1 (MVP)
- signup (email/password)
- login (email/password)
- logout
- basic validation
- Terms & Privacy link → **51. Legal / Privacy** (on login/register UI)

---

#### 🚀 Future (v2+)
- Google login
- email verification
- password reset

---

#### ⚙️ Logic
- user signs up → account created
- user logs in → session starts
- user stays logged in

---

#### 🗄️ Database (planned)
(uses users table)

---

#### 🛠️ Notes
- keep simple

---

#### 🧱 Implementation (2. Authentication)

- Supabase login / register
- Terms & Privacy link → **51. Legal / Privacy**

Frontend:
- React form (login/signup)

Backend:
- Supabase Auth

Files:
- /src/pages/Auth.jsx
- /src/components/AuthForm.jsx

Flow:
1. user inputs email/password
2. send to Supabase
3. receive session

UI:
- email input
- password input
- login button
- link to Terms & Privacy (see feature 51)

---

### 3. Profile Page ❌

#### 📌 Description
User profile page displaying user info.

---

#### ✅ v1 (MVP)
- show email
- show user posts

---

#### 🚀 Future (v2+)
- username
- bio
- followers count

---

#### ⚙️ Logic
- fetch user data
- fetch user posts

---

#### 🗄️ Database (planned)
users
posts

---

#### 🛠️ Notes
- simple layout

---

#### 🧱 Implementation (3. Profile Page)

Frontend:
- React page

Backend:
- Supabase fetch user data

Files:
- /src/pages/Profile.jsx

Flow:
1. get user data
2. display posts

UI:
- user email
- post list

---

### 4. Avatar System ✅ (baseline)

#### 📌 Description
User profile image system.

---

#### ✅ v1 (MVP)
- default avatar only

---

#### 🚀 Future (v2+)
- upload avatar
- change avatar

---

#### ⚙️ Logic
- default image if none

---

#### 🗄️ Database (planned)
avatar_url

---

#### 🛠️ Notes
- delay upload feature

---

#### 🧱 Implementation (4. Avatar System)

Frontend:
- show default avatar

Backend:
- none (v1)

Files:
- /src/components/Avatar.jsx

Flow:
1. show default image

UI:
- profile image

---

### 5. Friends / Following System ✅ — baseline (follow / counts / `/u/:userId`)

#### 📌 Description
Users can follow other users; follower and following counts are visible on profiles.

---

#### ✅ Baseline (implemented)
- **Table:** `follows` — `(follower_id, following_id)` PK, FK → `auth.users` CASCADE, CHECK no self-follow.
- **RLS:** SELECT public; INSERT/DELETE own rows (`follower_id = auth.uid()`).
- **App:** `src/lib/follows.ts` — counts, is-following, follow, unfollow; `src/lib/profileView.ts` — public profile + email visibility (`searchable`); **notifications** — `type` `follow` (გამომწერის ჩანაწერი `NotificationsPage`-ზე).
- **UI:** `/u/:userId` (`UserProfilePage`) — other user’s profile, posts, Follow/Unfollow, **mutual-follow badge** when both directions follow; `/u/:userId/followers` · `/u/:userId/following` (`UserFollowListPage`, infinite scroll); own `/profile` — რაოდენობები ლინკებით იმავე სიებზე; **PostCard** author → `/u/...`; **Search** — Profile + Message.
- **Migration:** `20260401330000_add_follows.sql`

---

#### 🚀 Future
- **Mutual follows — მომავალი ტალღა (არა MVP):** ცალკე `/mutuals` მარშრუტი; ფილტრი „მხოლოდ ორმხრივები“ followers/following სიებზე; ცალკე ნოტიფიკაცია „გახდით ორმხრივად გამოწერილი“.

---

#### 📋 Mutual follows — სპეკი და MVP სტატუსი

**განმარტება:** ორი მომხმარებელი „ორმხრივად გამოწერილია“, თუ **ორივე** მიმართულებით არსებობს `follows` ჩანაწერი: `A → B` და `B → A` (არსებული ცხრილი; **ახალი migration არა**).

**MVP (✅ დასრულებული):** `UserProfilePage` — ორი `useQuery`: `fetchIsFollowing(viewer, target)` და `fetchIsFollowing(target, viewer)` (`queryKeys.follow.relation` ორივე მიმართულებით); ბეიჯი `pages.userProfile.mutualFollowBadge` (`en`/`ka`/`ru`); follow/unfollow ინვალიდაცია ორივე relation query-ზე; სტილი `.badge--mutual`.

**დასრულების კრიტერიუმი (MVP):** ლოგინით მომხმარებელი ხედავს mutual ინდიკატორს მხოლოდ როცა ორივე მიმართულება ჭეშმარიტია; ენები სამივე; `npm test` + `npm run build` წარმატებით.

---

#### ⚙️ Logic
- user A follows user B; at most one row per pair (PK)

---

#### 🗄️ Database
- See migration above; `src/types/db.ts` — `FollowRow`

---

#### 🧱 Implementation (5. Friends / Following System)

Frontend:
- `UserProfilePage`, `UserFollowListPage`, `PostCard`, `SearchPage`, `ProfilePage` (counts + list links)

Backend:
- `public.follows` + RLS

---

### 6. Posts System ❌

#### 📌 Description
Users can create and manage posts.

---

#### ✅ v1 (MVP)
- create post (text)
- delete own post

---

#### 🚀 Future (v2+)
- edit post
- media posts

---

#### ⚙️ Logic
- post linked to user

---

#### 🗄️ Database (planned)
posts table

---

#### 🛠️ Notes
- text only first

---

#### 🧱 Implementation (6. Posts System)

Frontend:
- post creation form

Backend:
- Supabase table: posts

Files:
- /src/components/PostForm.jsx

Flow:
1. user writes post
2. save to DB

UI:
- textarea
- submit button

---

### 7. Post Feed ❌

#### 📌 Description
Main page showing posts.

---

#### ✅ v1 (MVP)
- list of posts
- newest first
- pagination / load more (batches, e.g. limit 10)

---

#### 🚀 Future (v2+)
- sorting options
- personalized feed

---

#### ⚙️ Logic
- fetch posts in pages (offset/limit or cursor)
- append older batches on “Load more” or infinite scroll

---

#### 🗄️ Database (planned)
posts

---

#### 🛠️ Notes
- simple feed

---

#### 🧱 Implementation (7. Post Feed)

Frontend:
- list posts

Backend:
- fetch posts from Supabase (paginated query)

Files:
- /src/pages/Home.jsx

Flow:
1. load initial posts (limit 10)
2. user scrolls or clicks “Load more”
3. fetch next batch

UI:
- post cards
- “Load more” (or infinite scroll)

---

### 8. Reactions System ❌

#### 📌 Description
Users react to posts.

---

#### ✅ v1 (MVP)
- 👍 / 👎 reactions

---

#### 🚀 Future (v2+)
- more reaction types

---

#### ⚙️ Logic
- one reaction per user per post
- calculate score

---

#### 🗄️ Database (planned)
reactions table

---

#### 🛠️ Notes
- core feature

---

#### 🧱 Implementation (8. Reactions System)

Frontend:
- like/dislike buttons

Backend:
- reactions table

Files:
- /src/components/ReactionButtons.jsx

Flow:
1. click reaction
2. save in DB

UI:
- 👍 👎 buttons

---

### 9. Comments System ✅ (v2 baseline)

#### 📌 Description
Users can comment on posts.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- add comment
- delete comment

---

#### ⚙️ Logic
- comment linked to post

---

#### 🗄️ Database (planned)
comments table

---

#### 🛠️ Notes
- move to v2

---

#### 🧱 Implementation (9. Comments System)

Frontend:
- `CommentSection` on `PostCard`; `src/lib/comments.ts`

Backend:
- `public.comments` + RLS; migration `20260401130000_add_comments.sql`

Notes:
- v2; apply SQL in Supabase before use

---

### 10. Video System ✅ — baseline (MP4/WebM, no transcoding)

> **ტერმინი „v2+“ აქ** = **post–v2 / შემდეგი ტალღა** (არა „ოფიციალური v2 milestone“ — v2 core baseline უკვე დასრულებულია ვიდეოს გარეშე).

#### 📌 Description
Users can attach a short video to a post; playback in the feed via HTML5 `<video>` (public Storage URL).

---

#### ✅ Baseline (implemented)
- **Formats:** `video/mp4`, `video/webm` — **50 MiB** max per file (bucket limit; client validation mirrors).
- **Storage:** dedicated bucket **`post-videos`**, same path pattern as images: `posts/{user_id}/{post_id}/{filename}`; RLS like `post-images`.
- **Database:** `posts.video_url` (nullable text); **CHECK** `posts_one_media_type`: **not both** `image_url` and `video_url` set.
- **UI:** `PostForm` — one attachment slot (image **or** video); `PostCard` / admin moderation — `<video controls playsInline>`.
- **Cleanup:** owner delete + admin delete + account deletion remove objects from **`post-videos`** (same prefix `posts/{user_id}/` as images).

---

#### 🚀 Future (optional)
- **Transcoding / adaptive streaming** (HLS, Mux, Cloudflare Stream, or Edge FFmpeg) if files exceed practical mobile playback or need watermarking.
- **Poster image**, duration metadata column, gallery of clips per post.
- **Separate `post_media` table** if multiple assets per post.

---

#### ⚙️ Logic
- At most **one** visual attachment per post: **image XOR video** (enforced in DB + UI).

---

#### 🗄️ Database
- Migration: `20260401320000_add_post_videos_storage_and_video_url.sql` (`post-videos` bucket + `posts.video_url` + `posts_one_media_type`).

---

#### 🧱 Implementation (10. Video System)

Frontend:
- `PostForm`, `PostCard`, `AdminModerationPage`; `src/lib/postVideoStorage.ts`

Backend:
- Supabase Storage `post-videos` + policies; column `posts.video_url`

---

### 11. Media Upload System ✅ — სრული breakdown (baseline: სურათი ან ვიდეო პოსტზე)

> **დამოკიდებულება:** **47. File Storage System** — Supabase Storage bucket(ები), პოლიტიკები (public read ან signed URL), ფაილის ზომის/ტიპის ლიმიტები. **10. Video System** — მოკლე ვიდეო (MP4/WebM) **ან** სურათი ერთ პოსტზე (ორი ერთად არა); იხილე §10. **4. Avatar System** — ცალკე bucket `avatars`.

---

#### ❗ Media type (Cursor — ერთი ჩანართი პოსტზე)

| | |
|--|--|
| **დაშვებული** | **სურათი** — JPEG, PNG, WebP, GIF (`post-images`, 5 MiB). **ან ვიდეო** — MP4, WebM (`post-videos`, 50 MiB). **ერთდროულად ერთი** ფაილი (სურათი **ან** ვიდეო). |
| **აკრძალული** | სხვა MIME (მაგ. `video/quicktime`), ორი ვიზუალური ერთ პოსტზე, ან ორივე სვეტი DB-ში — **CHECK** + UI. |

- იმპლემენტაცია: `accept` სურათისა და ვიდეოს MIME-ებზე; კლიენტური ვალიდაცია + Storage `allowed_mime_types`.

---

#### Description

მომხმარებელს შეუძლია პოსტთან ერთად **სურათის (ან მოკლე ვადით GIF)** ატვირთვა. ფაილი ინახება **ობიექტურ საცავში** (Supabase Storage); ბაზაში ინახება მიმართება (URL ან `storage path` + metadata), რათა feed-მა და პროფილის პოსტებმა გამოაჩინონ მედია. მიზანი: ტექსტური პოსტებიდან გადასვლა **ვიზუალურ კონტენტზე** — სოციალური ღირებულება მაღალია, SEO/Email-ზე ნაკლებად დამოკიდებულია პირველ ტალღაზე.

---

#### MVP Scope

- **მედიის ტიპი:** იხილე **«❗ Media type»** ზემოთ — **სურათი ან მოკლე ვიდეო** (ორი ერთად არა).
- **ერთი ვიზუალური ფაილი პოსტზე** (სურათი **ან** ვიდეო; მრავალი სურათი/კარუსელი — Future Scope).
- **ფორმატები (სურათი):** JPEG, PNG, WebP (სურვილისამებრ GIF — თუ ზომა/სპამი კონტროლდება).
- **ატვირთვა:** მხოლოდ ავტორიზებული მომხმარებელი; **banned** მომხმარებელს არ ეშვება (იგივე წესი რაც `PostForm`-ში ტექსტისთვის).
- **საცავი:** Supabase Storage bucket + RLS/პოლიტიკები (წაკითხვა feed-ისთვის — public object ან short-lived signed URL).
- **ბაზა:** `posts.image_url`, `posts.video_url` (ორი nullable; ურთიერთდაუშვებელი CHECK-ით); feed select ორივეს იღებს.
- **UI:** `PostForm` — პრევიუ; `PostCard` — სურათი ან `<video>` (responsive).
- **არ შედის MVP-ში:** გალერეა 10+ ფოტოთი, რედაქტირი, ფილტრები, ტრანსკოდინგი.

---

#### Future Scope

- რამდენიმე სურათი პოსტზე, კარუსელი, ზუმი/lightbox.
- **§10** — transcoding / streaming თუ საჭიროა მასშტაბისთვის.
- ავატარის ატვირთვა (**§4**) იგივე bucket-ის სუბფოლდერით `avatars/{user_id}`.
- ოპტიმიზაცია: thumbnail-ები (Edge Function ან client resize), WebP კონვერტი.
- მოდერაცია: NSFW scan, admin-ისთვის მედიის წაშლა (არსებული admin delete post უკვე ფარავს პოსტს მთლიანად).

---

#### Logic

1. მომხმარებელი ირჩევს ფაილს → კლიენტი ამოწმებს ტიპს/ზომას (და სერვერული პოლიტიკა Storage-ზე).
2. **Upload path:** `posts/{user_id}/{post_id_or_temp_uuid}/{filename}` — რათა RLS იყოს user-scoped; ალტერნატივა: დროებითი `uploads/{user_id}/...` შემდეგ post insert-ის შემდეგ გადატანა (ორფაზიანი ნაკლებად სასურველია — უმჯობესია ჯერ post row, შემდეგ attach, ან ერთ ტრანზაქციაში RPC).
3. Post insert/update: ბაზაში ინახება მედიის მიმართება(ები).
4. Feed / profile queries: არსებული `posts` select + join ან jsonb unwrap — TanStack Query cache keys განახლდეს (`queryKeys.posts` და სხვა), რომ ახალი ველები ინვალიდაციას არ გამოტოვებდეს.
5. წაშლა: პოსტის წაშლისას cascade ან lifecycle hook — Storage-დან ობიექტის წაშლა (თუ არა — orphan cleanup job მომავალში).

---

#### Implementation

**Frontend**

- `PostForm`: ფაილის input ან drag-and-drop; ვალიდაცია; `supabase.storage.from(bucket).upload(...)`; შეცდომები `errorMessage` / `InlineError`.
- `PostCard`: თუ `post`-ს აქვს მედია — `<img>` ან ერთიანი `MediaBlock` კომპონენტი; aspect-ratio / max-height დიზაინ სისტემის მიხედვით.
- `src/types/db.ts` (ან ანალოგი): `Post` ტიპის გაფართოება ახალი ველებით.
- TanStack Query: არსებული feed/profile hooks — განახლება select-ის ველებზე და `queryKeys`.

**Backend (Supabase)**

- Migration: `posts` სვეტ(ებ)ი ან `post_media` ცხრილი + RLS `insert/select` პოლიტიკები.
- Storage: bucket შექმნა, **Storage policies** (მაგ. authenticated upload საკუთარ prefix-ზე, read საჭირო დონეზე).
- ოფციონალური: Postgres trigger ან Edge Function ობიექტის წასაშლელად post delete-ზე.

**Files (მიმდინარე პროექტის მიმართულებით — სამუშაო სია, არა ფიქსირებული სახელები)**

- `src/components/PostForm.tsx` — ატვირთვის UI + ინტეგრაცია submit ფლოუში.
- `src/components/PostCard.tsx` — მედიის რენდერი.
- `src/lib/supabaseClient.ts` — უცვლელი თუ არა საჭიროა storage helper.
- ახალი: `src/lib/storageUpload.ts` ან მსგავსი — upload ლოგიკა, path builder, ტიპის შემოწმება.
- `supabase/migrations/*_post_media.sql` — სქემა.
- `supabase/SCHEMA.md`, `supabase/verify_schema.sql` — განახლება პოლიტიკის მიხედვით.

---

#### Flow (step-by-step)

1. მომხმარებელი იხსნის Home/feed გვერდს → `PostForm` ჩანს (როგორც ახლა).
2. ირჩევს სურათს (არასავალდებულო ველი MVP-ში შეიძლება იყოს სურათი ან მხოლოდ ტექსტი — პროდუქტის გადაწყვეტა: „ტექსტი ან ტექსტ+სურათი“, ორივე არა ცარიელი).
3. (ა) ჯერ ტექსტი+ტეგები validate → post insert → მიღებული `post.id` → upload path-ში გამოყენება; ან (ბ) presigned/temp upload → შემდეგ post — დოკუმენტირებული ორი ვარიანტიდან ერთი ირჩევა იმპლემენტაციისას.
4. Upload სრულდება → ბაზაში ინახება მედიის მიმართება.
5. `onPosted` / query invalidation → feed განახლდება → `PostCard` აჩვენებს სურათს.
6. შეცდომისას: მომხმარებელს ეჩვენება შეტყობინება; თუ post უკვე შექმნილია მაგრამ upload ჩავარდა — rollback ან orphan post cleanup (MVP-ში უნდა იყოს განსაზღვრული ერთი სტრატეგია).

---

#### UI

- **PostForm:** ტექსტის ველი და ტეგები როგორც ახლა; დამატებით: „Add image“ / ხატულა; არჩეული ფაილის სახელი და პატარა thumbnail; „Remove image“; ატვირთვისას disabled submit ან spinner; შეცდომა წითელი ტექსტით (`form__error`).
- **PostCard:** ტექსტის ზემოთ ან ქვემოთ სურათი (ერთი სტილი მთელ აპში); სურათს არ გადაერღვას layout მობილურზე (`max-width: 100%`, `object-fit`).
- **Feed / პროფილი:** იგივე ბარათი; ცარიელი სურათის მდგომარეობა არ ჩანს (მხოლოდ ტექსტი).
- **Accessibility:** სურათს `alt` — პირველ ტალღაში შეიძლება ტექსტის პირველი ხაზის მოკლე excerpt ან „Post image“.

---

#### 🗄️ Database (planned — დეტალი MVP იმპლემენტაციისას)

- ვარიანტი A: `posts` + `media_urls text[]` ან `media jsonb`.
- ვარიანტი B: `post_media (id, post_id, storage_path, sort_order, created_at)` + FK `posts`.

---

#### 🛠️ Notes

- **SEO (42)** და **Email (45)** პარალელურად მნიშვნელოვანია production-ისთვის, მაგრამ **Media** უშუალოდ უმატებს retention-ს feed-ში.
- **Rate limiting (48):** პოსტები/კომენტარები/ჩატი/რეპორტები — DB ტრიგერები (`SCHEMA.md`); **Storage** ატვირთვის სიხშირე — მომავალში. **Anti-spam (49)** — იმპლემენტაცია — **`## CURRENT WORK`** → **`#### Anti-spam (49)`** (ერთი სპეკი).

---

### 12. Notifications ✅ (v2 baseline)

#### 📌 Description
Notify users about activity.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- new reactions
- new comments

---

#### ⚙️ Logic
- event triggers notification

---

#### 🗄️ Database (planned)
notifications table

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (12. Notifications)

Frontend:
- `/notifications`, `useUnreadNotificationCount`, `src/lib/notifications.ts`

Backend:
- `public.notifications` + RLS; triggers `notify_post_owner_on_comment` / `notify_post_owner_on_reaction`; migration `20260401140000_add_notifications.sql`

Notes:
- apply SQL in Supabase; inserts only via triggers (not client)

---

### 13. Chat / Messaging System ✅ (v2 baseline)

#### 📌 Description
User-to-user messaging.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- send message
- chat threads

---

#### ⚙️ Logic
- messages linked between users

---

#### 🗄️ Database (planned)
messages table

---

#### 🛠️ Notes
- complex → later

---

#### 🧱 Implementation (13. Chat / Messaging System)

Frontend:
- `MessagesPage` `/messages`, `ChatThreadPage` `/messages/:peerId`; `src/lib/chat.ts`; Search-ში `Message` პროფილზე

Backend:
- `conversations` + `chat_messages`, RLS, RPC `get_or_create_conversation`

Notes:
- Realtime: `chat_messages` in `supabase_realtime` publication

---

### 14. Search ✅ (v2 baseline)

#### 📌 Description
Search posts or users.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- search posts
- search users

---

#### ⚙️ Logic
- query database

---

#### 🗄️ Database (planned)
users, posts

---

#### 🛠️ Notes
- basic search later

---

#### 🧱 Implementation (14. Search)

Frontend:
- `SearchPage` `/search`; `src/lib/search.ts` — `search_post_ids` / `search_profile_ids` RPC (ordered ids → `fetchFeedPostsByIdsOrdered` / profile `select` by id); `pages.search.rankingHint`; **`introHint`** (არა `q`); **`noResultsAny`** (ორივე სია ცარიელი); შედეგების რეგიონი `#search-results` — ძიების დასრულების შემდეგ `scrollIntoView` (`prefers-reduced-motion` → `auto`) + ფოკუსი (`resultsRegionLabel`); **`seo.ts`:** `?q=` (2+ სიმბოლო) — დინამიკური title/description, canonical/og:url query-ით; `RouteSeo` / `RouteAnnouncer` — `location.search`

Backend:
- **Search v2 (migration `20260401350400_add_search_v2_rpcs.sql`):** GIN index `to_tsvector('simple', body)`; `search_post_ids` — FTS + `ts_rank_cd`, ILIKE fallback, `not is_flagged`; `search_profile_ids` — email ILIKE, exact/prefix/substring order, `searchable` or viewer self

Notes:
- sanitize LIKE wildcards in user input; min 2 chars; RPC `SECURITY DEFINER` with explicit visibility (aligned with soft-hide / privacy)

---

### 15. Categories / Tags ✅ (v2 baseline)

#### 📌 Description
Organize posts with **tags** (slug-ები DB-ში); ფიდის ფილტრი `?tag=`; trending/tag feed RPC.

---

#### პროდუქტის გადაწყვეტილება — „ჰეშტეგი“ `body`-ში vs ცალკე ველი (ერთიანი სპეკი, 2026)

**მიმდინარე და განზოგადებული MVP:** **ვარიანტი B — მხოლოდ ცალკე ველი** (`PostForm` → „Tags“). **`posts.body` ტექსტიდან `#tag` ავტომატურად არ იკითხება** — არც პარსერი, არც სინქი `post_tags`-თან body-დან.

| ვარიანტი | აღწერა | სტატუსი REZIIZI-ში |
|----------|--------|---------------------|
| **A** | მხოლოდ body-დან `#` ტეგები; ცალკე ველი ამოღებული | ❌ არა |
| **B** | მხოლოდ ცალკე ველი — `parseTagsFromInput` / `slugifyTag` | ✅ **აქტიური** |
| **C** | body `#` + ველი, გაერთიანება dedup, კაპი ტირით | ⬜ გადადებული |
| **D** | body წყარო; `post_tags` სერვერზე insert/update | ⬜ გადადებული |

**რატომ არა A/C/D ახლა (შეჯამება):**
- **i18n / slug:** `slugifyTag` — მხოლოდ `[a-z0-9-]`; ქართული/CJK `#ტექსტი` body-დან „ჩუმად“ ქრება — ცალკე ველზე მომხმარებელი ხედავს რას იღებს ლათინური slug-ით.
- **სპამი / მოდერაცია:** ფარული ტეგები გრძელ body-ში; tag stuffing — Twitter-ის კლასის ზედაპირი.
- **ტექნიკური სირთულე:** URL-ში `#fragment` (მაგ. `page#section`) — body პარსერი ადვილად იღებს ცრუ ტეგს; საჭიროა სერვერული ვალიდაცია, რედაქტირებისას `post_tags` diff, კოდის ბლოკები — MVP-ს გარეთ.

**როდის გადავხედოთ body `#`:** მხოლოდ როცა **ანალიტიკა/ფიდბექი** აჩვენებს, რომ მომხმარებლები რეალურად წერენ `#...` body-ში და ელიან ქცევას — არა ინტუიციით.

**Polish (იგივე არქიტექტურა):** კომპოზერში **ცოცხალი გადახედვა** — როგორი slug-ები შეინახება (submit-მდე); ცარიელი slug-ის შემთხვევაში — გაფრთხილება არა-ლათინური სიმბოლოების შესახებ — ✅ **`PostForm`** (`tagsPreviewLabel` / `tagsPreviewInvalid`).

**ზღვარი / edge (დოკუმენტირებული):** URL `#`; `###` markdown; body+ველი იგივე slug → dedup; **კაპი ტირით:** უფასო **4** / პრემიუმი ან ადმინი **8** (`getMaxTagsPerPost`, DB trigger `post_tags_enforce_tier_limit`); ზედმეტი ტეგი ველში — ჩუმად მოჭრა `parseTagsFromInput`-ით (max ტირის მიხედვით).

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- assign tags
- filter by tag

---

#### ⚙️ Logic
- post has tags (via `post_tags`; not extracted from body)

---

#### 🗄️ Database
- `tags`, `post_tags` — იხილე `SCHEMA.md`; migration `20260401150000_add_tags.sql`

---

#### 🛠️ Notes
- Body hashtag parsing — იხილე ზემოთ „პროდუქტის გადაწყვეტილება“.

---

#### 🧱 Implementation (15. Categories / Tags)

Frontend:
- `PostForm` tags input; `PostCard` chips; `HomePage` `?tag=`; `lib/tagParse.ts`, `lib/tags.ts`

Backend:
- `tags`, `post_tags`, RLS; `feed_post_ids_by_tag` RPC; migration `20260401150000_add_tags.sql`

Notes:
- SQL გაშვებული უნდა იყოს Supabase-ზე (RPC + ცხრილები).

---

### 16. Trending System ✅ (v2 baseline)

#### 📌 Description
Show trending posts.

---

#### ✅ v1 (MVP)
- simple score-based sort

---

#### 🚀 Future (v2+)
- time-based trending

---

#### ⚙️ Logic
- high score = trending

---

#### 🗄️ Database (planned)
uses posts + reactions

---

#### 🛠️ Notes
- basic version only

---

#### 🧱 Implementation (16. Trending System)

Frontend:
- `HomePage` Latest / Trending tabs; `/?sort=trending`; `feed.ts` `FeedSortMode`

Backend:
- RPC `feed_trending_post_ids` — `sum(reactions.value)` per post, tie-break `created_at desc`

Files:
- `HomePage.tsx`, `feed.ts`, migration `20260401160000_add_trending_feed_rpc.sql`

Flow:
1. full feed only: trending; with `?tag=` uses latest only

UI:
- feed sort links

---

### 17. Algorithm / Ranking ✅ (v2 baseline)

#### 📌 Description
Ranking system for feed.

---

#### ✅ v1 (MVP)
- score = likes - dislikes

---

#### 🚀 Future (v2+)
- advanced ranking

---

#### ⚙️ Logic
- calculate score

---

#### 🗄️ Database (planned)
reactions

---

#### 🛠️ Notes
- simple first

---

#### 🧱 Implementation (17. Algorithm / Ranking)

Frontend:
- `PostCard` — net score (👍 − 👎); `ReactionButtons` — შეცდომის ტექსტი

Backend:
- `reactions.value`; Trending RPC `feed_trending_post_ids` — ჯამური ქულა

Flow:
1. ფიდი: Latest / Trending; ტეგზე latest

Notes:
- MVP

---

### 18. Admin Panel ✅ (v3 baseline)

#### 📌 Description
Admin control interface.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- manage users
- manage posts

---

#### ⚙️ Logic
- admin role access

---

#### 🗄️ Database (planned)
users role field

---

#### 🛠️ Notes
- v3

---

#### 🧱 Implementation (18. Admin Panel)

Frontend:
- `/admin`, `AdminRoute`, `AdminPage` (counts: profiles, posts, comments, reactions); nav **Admin** თუ `is_admin`

Backend:
- migration `20260401180000_add_profiles_is_admin.sql` — `profiles.is_admin`, ტრიგერი (არა-admin ვერ ცვლის ლოგინით)

Notes:
- პირველი admin: SQL Editor `update public.profiles set is_admin = true where id = '…'`

---

### 19. Moderation System ✅ (v3 baseline)

#### 📌 Description
Content moderation.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- remove content

---

#### ⚙️ Logic
- admin action

---

#### 🗄️ Database (planned)
reports

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (19. Moderation System)

Frontend:
- `AdminModerationPage` `/admin/moderation`; `adminModeration.ts`

Backend:
- RLS `posts_delete_admin`, `comments_delete_admin` — migration `20260401200000_add_admin_moderation_delete_policies.sql`

Notes:
- პოსტის წაშლა — კომენტარები cascade

---

### 20. Reports System ✅ (v3 baseline)

#### 📌 Description
Users report content.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- report button

---

#### ⚙️ Logic
- report saved

---

#### 🗄️ Database (planned)
reports table

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (20. Reports System)

Frontend:
- `ReportPostControl` on `PostCard`; `AdminReportsPage` `/admin/reports`; `reports.ts`

Backend:
- `reports` (reporter, post, reason, unique per user/post); RLS; admin delete

Notes:
- ერთი რეპორტი იგივე პოსტზე თითო მომხმარებლისთვის

---

### 21. Ban / Restriction System ✅ (v3 baseline)

#### 📌 Description
Restrict users.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- ban user

---

#### ⚙️ Logic
- block access

---

#### 🗄️ Database (planned)
user status

---

#### 🛠️ Notes
- admin feature

---

#### 🧱 Implementation (21. Ban / Restriction System)

Frontend:
- `AdminUsersPage` `/admin/users`, `BannedPage` `/banned`, `useProfileFlags`, `PostForm` ban message, Layout redirect

Backend:
- `profiles.is_banned`, `profiles.ban_reason`, `profiles.banned_at`, RLS writes blocked, `admin_set_user_banned(uuid, boolean, text)` RPC — migration `20260401270000_add_ban_reason.sql` (ძველი 2-arg ფუნქცია იცვლება)
- `profiles_update_admin` RLS policy — migration `20260401260000_add_profiles_admin_update_policy.sql` (სხვა მომხმარებლის `profiles` UPDATE ban/premium RPC-ებისთვის; თუ მხოლოდ `profiles_update_own` იყო, admin UPDATE სხვაზე შეიძლება ჩაეფლო RLS-ში)

Notes:
- admin cannot ban self via RPC; SQL-ით შესაძლებელია როგორც სხვა ველზე
- **ban reason UX:** `AdminUsersPage` — Ban ღილაკი textarea პანელით (max 500); `BannedPage` — „Why“ + „Restriction active since …`; სხვა UI არ აჩვენებს სხვის მიზეზს ცალკე (როგორც დოკუმენტი); **მომავალში:** `banned_until`, სხვის `ban_reason` დამალვა RLS/view-ით თუ ბაზიაში ღია რჩება

---

### 22. Statistics Dashboard ✅ (v3 baseline)

#### 📌 Description
Platform analytics.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- user stats
- post stats

---

#### ⚙️ Logic
- aggregate data

---

#### 🗄️ Database (planned)
various tables

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (22. Statistics Dashboard)

Frontend:
- `AdminStatsPage` `/admin/stats`; `fetchPlatformMetrics` — count ყველა ძირითად ცხრილზე

Backend:
- არა (კლიენტი `count` query-ები; პატარა მონაცემებისთვის OK)

Notes:
- მომავალში: SQL aggregate / charts

---

### 23. Advertisement System ✅ (v3 baseline)

#### 📌 Description
Display ads.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- ad blocks

---

#### ⚙️ Logic
- show ads in feed

---

#### 🗄️ Database (v3 baseline)
- `public.ad_slots` (`placement` unique, `feed_top` seed); RLS: public SELECT `is_active`; admin full CRUD

---

#### 🛠️ Notes
- v3

---

#### 🧱 Implementation (23. Advertisement System)

Frontend:
- `FeedAdSlot` — Home feed-ის ზედა sponsored strip; ტექსტი მხოლოდ (არა HTML)
- `AdminAdsPage` `/admin/ads` — title, body, URL, active checkbox
- `src/lib/ads.ts` — `fetchActiveFeedTopAd`, `fetchFeedTopAdForAdmin`, `saveFeedTopAd`

Backend:
- migration `20260401230000_add_ad_slots.sql`

Notes:
- მომავალში: სხვა `placement`-ები, ვიზუალი/სურათი

---

### 24. Monetization System ✅ (v3 baseline)

#### 📌 Description
Earn money from platform.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- ads revenue

---

#### ⚙️ Logic
- linked with ads

---

#### 🗄️ Database (v3 baseline)
- `profiles.premium_until` — admin-only changes (trigger + RPC); optional payment webhooks მომავალში

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (24. Monetization System)

Frontend:
- `lib/premium.ts` — `isPremiumActive`, `extendPremiumIso`
- `/admin/users` — +30d / +365d / Clear premium (cannot change own row)
- Profile / Settings — Premium სტატუსის ჩვენება

Backend:
- migration `20260401240000_add_premium_monetization.sql` — trigger, `admin_set_user_premium_until`

Notes:
- **Stripe (billing):** რეპოში არის `supabase/functions/stripe-webhook` და **`create-checkout-session`** (Settings → checkout); migration `20260401350700` — **live** (service_role → `premium_until`). **Production Stripe** (deploy ორივე ფუნქცია, secrets, Dashboard webhook, Price/თანხა) — იხილე **`README.md` → „Stripe Premium“**.

---

### 25. Settings Page ✅ (v1 + v3)

#### 📌 Description
User settings.

---

#### ✅ v1 (MVP)
- change password (Supabase flow)
- delete account
- logout
- basic settings (as needed for MVP)

---

#### 🚀 Future (v2+)
- profile edit

---

#### ⚙️ Logic
- update user data
- password change via Supabase
- account deletion via Supabase
- session end on logout

---

#### 🗄️ Database (planned)
users

---

#### 🛠️ Notes
- simple

---

#### 🧱 Implementation (25. Settings Page)

Frontend:
- `SettingsPage` — Appearance (theme), Account, **Privacy** (`searchable`), password, session, delete placeholder

Backend:
- Supabase Auth (password update, sign out); `profiles` update for privacy

Flow:
1. user opens settings
2. can change password (Supabase)
3. can log out
4. can delete account (placeholder — server flow later)

UI:
- password change
- logout button
- delete account (disabled / soon)
- Privacy: email search visibility

---

### 26. Privacy Settings ✅ (v3 baseline)

#### 📌 Description
Control user privacy.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- profile visibility

---

#### ⚙️ Logic
- restrict access

---

#### 🗄️ Database (v3 baseline)
- `profiles.searchable` — `false` = hide from email user search (signed-in user still finds self)

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (26. Privacy Settings)

Frontend:
- `SettingsPage` Privacy section; `profilePrivacy.ts`; Search page hint

Backend:
- migration `20260401250000_add_profile_searchable.sql`

Notes:
- მომავალში: პროფილის სრული დამალვა, follower-only, და სხვა

---

### 27. Security ✅ (v3 baseline)

#### 📌 Description
Protect system.

---

#### ✅ v1 (MVP)
- password validation

---

#### 🚀 Future (v2+)
- advanced security

---

#### ⚙️ Logic
- prevent abuse

---

#### 🗄️ Database (planned)
users

---

#### 🛠️ Notes
- expand later

---

#### 🧱 Implementation (27. Security)

Frontend:
- `passwordPolicy.ts` — min length 8 (signup + change password); sign-in unchanged for legacy short passwords
- `ErrorBoundary` — render failure UI + reload
- `SecurityPage` `/security` — user-facing summary (RLS, HTTPS, Privacy link)

Backend / hosting:
- Supabase Auth + RLS (unchanged)
- `vercel.json` — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (when hosted on Vercel)

Notes:
- CSP / rate limits — მომავალში

---

### 28. API Layer ✅ (v3 baseline)

#### 📌 Description
Backend API.

---

#### ✅ v1 (MVP)
- basic endpoints

---

#### 🚀 Future (v2+)
- structured API

---

#### ⚙️ Logic
- handle requests

---

#### 🗄️ Database (planned)
all tables

---

#### 🛠️ Notes
- needed for backend

---

#### 🧱 Implementation (28. API Layer)

Frontend:
- `src/lib/api/registry.ts` — `TABLE`, `RPC` (canonical names for Supabase)
- `src/lib/api/errors.ts` — `errorMessage`, `isPostgrestError`
- `src/lib/api/index.ts` — barrel export
- `AdminApiPage` `/admin/api` — read-only catalog for admins
- დანარჩენი მონაცემები: არსებული `src/lib/*.ts` მოდულები (`supabase.from` / `.rpc`)

Backend:
- Supabase PostgREST + Auth + RLS (არა ცალკე Node API)

Notes:
- ახალი ცხრილი/RPC დამატებისას განაახლე `registry.ts` და `verify_schema.sql`

---

### 29. Database Structure ✅ (v3 baseline)

#### 📌 Description
Database schema.

---

#### ✅ v1 (MVP)
- users
- posts
- reactions

---

#### 🚀 Future (v2+)
- expand tables

---

#### ⚙️ Logic
- relational structure

---

#### 🗄️ Database (v3 baseline)
`public` ცხრილები migrations-ით; მიმოხილვა: `supabase/SCHEMA.md`

---

#### 🛠️ Notes
- very important

---

#### 🧱 Implementation (29. Database Structure)

Frontend:
- none (დოკი რეპოში)

Backend:
- Supabase tables + RLS (იხ. migrations)

Documentation:
- `supabase/SCHEMA.md` — ცხრილები, RPC სია, ბმულები `registry.ts` / `types/db.ts`
- `supabase/verify_schema.sql` — დაყენების შემოწმება (განახლებულია `admin_set_user_banned`)

Notes:
- ახალი ცხრილი → migration + `SCHEMA.md` + `registry.ts` + `types/db.ts`

---

### 30. Caching System ✅ (v3 baseline)

#### 📌 Description
Client-side **query cache** — fewer redundant Supabase reads, shared data across routes.

---

#### ✅ v1 (MVP)
- not included

---

#### ✅ v3 (baseline — partial)
- `@tanstack/react-query` — `QueryClientProvider` in `main.tsx`
- `src/lib/queryClient.ts`, `src/lib/queryKeys.ts`
- **Feed:** `useInfiniteQuery` on `HomePage` + invalidation on post / reaction
- **Profile:** `useQuery` for email + `fetchUserPosts`
- **`useProfileFlags`:** `useQuery` (single cache for Layout, PostForm, Settings, …)

---

#### 🚀 Future (v2+)
- extend to Search, notifications list, chat; prefetch; persisted cache (optional)

---

#### ⚙️ Logic
- reduce DB calls; stale-while-revalidate (`staleTime` / refetch on focus)

---

#### 🗄️ Database (planned)
none — client cache only

---

#### 🛠️ Notes
- default `staleTime` 60s in `queryClient`; tune per-query if needed

---

#### 🧱 Implementation (30. Caching System)

Frontend:
- TanStack Query + keys + invalidation (`queryKeys`, pages above)

Backend:
- none

Notes:
- full feature 30 still open (broader coverage, server CDN cache, etc.)

---

### 31. Logging System ✅ (v3 baseline)

#### 📌 Description
Centralized client logging instead of ad-hoc `console.*`.

---

#### ✅ v1 (MVP)
- console logs

---

#### ✅ v3 (baseline — partial)
- `src/lib/logger.ts` — `debug` / `info` / `warnDev` (dev only); `warn` / `error` (always)
- Wired: `queryClient` (TanStack failures), `ErrorBoundary`, `PostCard` delete, `supabaseClient` missing env

---

#### 🚀 Future (v2+)
- remote aggregation (Sentry, LogRocket, etc.), structured JSON, sampling

---

#### ⚙️ Logic
- one prefix `[reziizi]`; production stays quiet except `warn`/`error`

---

#### 🗄️ Database (planned)
none for client baseline

---

#### 🛠️ Notes
- do not log tokens or PII

---

#### 🧱 Implementation (31. Logging System)

Frontend:
- `logger` module + call sites above

Backend:
- Supabase logs (Dashboard) — separate

Notes:
- full feature 31 still open (server-side pipelines, retention)

---

### 32. Error Handling System ✅ (v3 baseline)

#### 📌 Description
Consistent user-facing messages and predictable handling for Supabase/JS failures.

---

#### ✅ v1 (MVP)
- basic error messages

---

#### ✅ v3 (baseline — partial)
- `errorMessage()` in `src/lib/api/errors.ts` (Postgrest, `Error`, string, `{ message }`, fallback)
- `src/lib/errors.ts` re-exports for app imports
- `InlineError` component for query/form alerts
- `QueryClient` — `QueryCache` / `MutationCache` `onError`: dev-only `console.warn` (skips cancelled queries)
- Pages/components: `catch` blocks use `errorMessage(e)` instead of ad-hoc `instanceof Error`

---

#### 🚀 Future (v2+)
- toast / global banner; `QueryErrorResetBoundary`; structured error codes

---

#### ⚙️ Logic
- normalize unknown errors to a single English string for UI

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- `ReactionButtons` imports `errorMessage` as `formatError` (state name clash)

---

#### 🧱 Implementation (32. Error Handling System)

Frontend:
- `errorMessage`, `InlineError`, query cache logging, unified catch usage

Backend:
- none

UI:
- `.form__error` / `InlineError`

Notes:
- full feature 32 still open (toast, telemetry, etc.)

---

### 33. UI Design System ✅ (v1 baseline)

#### 📌 Description
Design consistency — ერთი `styles.css`, განმეორებადი კლასები (`.card`, `.card__title`, `.post-card`, …), ერთი ვიზუალური ენა; **არა** ცალკე Figma-სპეკი — დეტალები **`## CURRENT WORK`** (Home polish, Profile roadmap, ფაზა E).

---

#### ✅ v1 (MVP)
- basic styles (`src/styles.css`)

---

#### ✅ v3+ (რეალური სტატუსი — სინქი სპეკთან)
- **Theme (§34)**-თან დაკავშირებული CSS ცვლადები (`html[data-theme]`), მუქი/ღია რეჟიმი
- **პოლიში:** `home-feed-toolbar` / `home-composer`, sticky ლენტის ზოლი, პოსტის ბარათები; **`.card__title`** ერთიანი სტილი მრავალ გვერდზე (იხილე CURRENT WORK → Home feed UI, Profile UX ფაზა E)
- **i18n-მზადი UI** — სტრინგები `messages.ts` / `t()` (§44); ახალი ეკრანები იგივე პატერნში

---

#### 🚀 Future (ტალღა 2+ — გაფართოება, არა baseline-ის პირობა)
- ფაზა **E** დასრულება: სრული საიტის §33 audit (ტიპოგრაფია, სივრცეები, ყველა მარშრუტი)
- სურვილისამებრ: უფრო ფორმალური **დიზაინ-ტოკენები** (spacing scale, კომპონენტების ცხრილი) — არსებულ CSS-ზე დაყრდნობით, არქიტექტურის გადაწერის გარეშე
- optional: Storybook / კომპონენტების კატალოგი

---

#### ⚙️ Logic
- reusable components; ერთი გლობალური სტილი + React კომპონენტები

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- simple UI first; **ტალღა 1** = მინიმალური მაგრამ **გაფართოებადი**; **ტალღა 2** = დახვეწა იდეების ჩამატება **`project.md`-ის გარეშე არა** (იხილე **`## CURRENT WORK` → „ტალგები“**)

---

#### 🧱 Implementation (33. UI Design System)

Frontend:
- `src/styles.css` — ძირითადი UI; კომპონენტები `src/components/`, გვერდები `src/pages/`

Files:
- `src/styles.css`

Notes:
- minimal design; სრული ჩამონათვალი polish — CURRENT WORK + Profile UX ცხრილი (ფაზა E)

---

### 34. Theme System ✅ (v2 baseline)

#### 📌 Description
Light/Dark mode.

---

#### ✅ v1 (MVP)
- not included

---

#### ✅ v2 (baseline — სინქი)
- `ThemeProvider` / `useTheme`; `ThemePreferenceControls`; CSS vars + `html[data-theme="light"|"dark"]`; `index.html` inline script (FOUC-ის თავიდან აცილება)
- preference: **`localStorage`** (სერვერზე სინქი არა — საკმარისი MVP/v3 baseline-ისთვის)

---

#### 🚀 Future (ტალღა 2+)
- სურვილისამებრ: `profiles`-ში თემის შენახვა (Auth-თან) — მრავალი მოწყობილობა
- optional: სისტემის თემასთან სრული სინქი / დამატებითი პალიტრები

---

#### ⚙️ Logic
- toggle theme; `matchMedia` სისტემის ცვლილებაზე

---

#### 🗄️ Database (planned)
user preference (optional Future)

---

#### 🛠️ Notes
- v2 baseline ლოკალური პარამეტრით დასრულებულია; სერვერული პარამეტრი — მომავალი ტალღა

---

#### 🧱 Implementation (34. Theme System)

Frontend:
- `ThemeProvider` / `useTheme`; `ThemePreferenceControls`; CSS vars + `html[data-theme="light"]`; `index.html` inline script

Backend:
- none (preference `localStorage` only — baseline)

Notes:
- system preference updates via `matchMedia`

---

### 35. Mobile Responsiveness ✅ (v1 baseline)

#### 📌 Description
Mobile-friendly UI.

---

#### ✅ v1 (MVP)
- responsive layout (`@media`, fluid width, touch-friendly სადაც უკვე გაკეთებულია)

---

#### ✅ v3+ (რეალური სტატუსი — სინქი)
- **პროფილი:** `profile-tabs` ტაბები თანაბარი სიგანით (`max-width: 600px` ზონაში)
- **Legal / Security:** `legal-page__nav` — `min-height` / `inline-flex` touch-ისთვის
- **ლენტა:** sticky toolbar + `safe-area` / `feed__more` min-width — ფაზა E ფოკუსი (იხილე CURRENT WORK)

---

#### 🚀 Future (ტალღა 2+)
- სრული მობილური audit ყველა მარშრუტზე (ადმინი, ჩატი, ძებნა)
- optional: PWA, უფრო აგრესიული perf (virtualized lists — §36-თან ერთად)

---

#### ⚙️ Logic
- CSS responsive; იგივე HTML სტრუქტურა მობილურზე და დესკტოპზე სადაც შესაძლებელია

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- მობილური პირველობა პროფილის roadmap-ში; დანარჩენი — **ტალღა 2**

---

#### 🧱 Implementation (35. Mobile Responsiveness)

Frontend:
- `src/styles.css` — responsive წესები; კომპონენტების კლასები

Notes:
- mobile friendly layout; სრული audit — CURRENT WORK → ფაზა E / Future

---

### 36. Performance Optimization ✅ (v3 baseline)

#### 📌 Description
Improve speed — **v3 baseline:** smaller initial JS by **lazy-loading** heavy routes (admin, messages, chat thread, notifications).

---

#### ✅ v1 (MVP)
- basic optimization

---

#### ✅ v3 (baseline — partial)
- `src/lazy/chunks.ts` — `React.lazy` for admin pages, `MessagesPage`, `ChatThreadPage`, `NotificationsPage`
- `src/components/RouteFallback.tsx` — Suspense fallback
- `App.tsx` — `<Suspense>` around `<Routes>`; catch-all `*` → **`NotFoundPage`** (არა ჩუმად `Navigate` `/`-ზე); **`seo.routes.notFound`** — `noindex`

---

#### 🚀 Future (v2+)
- advanced tuning

---

#### ⚙️ Logic
- optimize queries; code-split routes to defer non-critical UI

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- later: memoization, list virtualization, image lazy load, Supabase query limits

---

#### 🧱 Implementation (36. Performance Optimization)

Frontend:
- lazy route chunks + Suspense (`lazy/chunks.ts`, `RouteFallback.tsx`, `App.tsx`)

Backend:
- none

Notes:
- full feature 36 still open (caching, profiling, etc.)

---

### 37. Deployment System ✅ (v3 baseline)

#### 📌 Description
Host the SPA online with correct routing and secrets.

---

#### ✅ v1 (MVP)
- basic deploy

---

#### ✅ v3 (baseline — partial)
- `vercel.json` — **rewrites** (`/(.*)` → `/index.html`) so React Router deep links and refresh work
- `README.md` — **Production (Vercel)** steps: import repo, `VITE_*` env vars, Supabase Auth URL config
- `.env.example` — note on Vercel Environment Variables

---

#### 🚀 Future (v2+)
- CI/CD (GitHub Actions), preview deploys per PR, staging env

---

#### ⚙️ Logic
- static build (`dist`) + SPA fallback; client uses Supabase cloud

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- security headers unchanged (see Security (27))

---

#### 🧱 Implementation (37. Deployment System)

Frontend:
- Vite + Vercel; `vercel.json` rewrites + headers

Backend:
- Supabase hosted

Notes:
- full feature 37 still open (monitoring, rollback playbook, etc.)

---

### 38. Environment Configuration ❌

#### 📌 Description
Manage environment variables.

---

#### ✅ v1 (MVP)
- .env file

---

#### 🚀 Future (v2+)
- multiple environments

---

#### ⚙️ Logic
- store secrets

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- required later

---

#### 🧱 Implementation (38. Environment Configuration)

Frontend:
- .env file

Backend:
- Supabase keys

Files:
- .env

Notes:
- store secrets

---

### 39. Backup System ❌

#### 📌 Description
Data backup.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- automated backups

---

#### ⚙️ Logic
- save snapshots

---

#### 🗄️ Database (planned)
backups

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (39. Backup System)

Frontend:
- none

Backend:
- Supabase backup

Notes:
- later

---

### 40. Versioning System ❌

#### 📌 Description
Track versions.

---

#### ✅ v1 (MVP)
- manual versioning

---

#### 🚀 Future (v2+)
- automated versioning

---

#### ⚙️ Logic
- track changes

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- simple first

---

#### 🧱 Implementation (40. Versioning System)

Frontend:
- Git

Notes:
- manual versioning

---

### 41. Testing System ✅ (v3 baseline)

#### 📌 Description
Automated checks for pure logic and UI primitives.

---

#### ✅ v1 (MVP)
- manual testing

---

#### ✅ v3 (baseline — partial)
- **Vitest** + **jsdom** + **@testing-library/react** + **@testing-library/jest-dom**
- `vite.config.ts` — `test` block (`defineConfig` from `vitest/config`)
- `src/test/setup.ts` — jest-dom matchers
- Sample tests: `errorMessage`, `slugifyTag` / `parseTagsFromInput`, `isPasswordLongEnough`, `InlineError`
- Scripts: `npm test`, `npm run test:watch`

---

#### 🚀 Future (v2+)
- Playwright/Cypress E2E; coverage thresholds; GitHub Actions `npm test` on PR

---

#### ⚙️ Logic
- unit + component smoke tests; no Supabase in CI without secrets

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- extend tests when changing `feed`, auth, or admin flows

---

#### 🧱 Implementation (41. Testing System)

Frontend:
- Vitest + Testing Library (see above)

Notes:
- full feature 41 still open (integration tests, E2E, coverage gates)
- **Deferred:** password recovery UI tests (`ForgotPasswordPage`, `ResetPasswordPage`, mocked Auth) — იხილე **§45** Notes.

---

### 42. SEO Optimization ✅ (v3 baseline)

#### 📌 Description
Improve search engine visibility.

---

#### ✅ v1 (MVP)
- **`index.html`:** default `description`, `og:*`, `twitter:card`
- **`src/lib/seo.ts`:** `getSeoForPath`, `applyPageSeo` (title, description, robots, OG, canonical)
- **`RouteSeo`** (`Layout`): updates head on client navigation — public routes `index,follow`; login, profile, settings, messages, notifications, admin, banned → `noindex,nofollow`

---

#### 🚀 Future (v2+)
- advanced SEO (sitemap, structured data, per-post OG images)

---

#### ⚙️ Logic
- Route map + `matchPath`; canonical / `og:url` = `origin + pathname`

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- SPA: crawlers that execute JS see updated tags; static shell in `index.html` for first paint

---

#### 🧱 Implementation (42. SEO Optimization)

Frontend:
- `src/lib/seo.ts`, `src/lib/seo.test.ts`, `src/components/RouteSeo.tsx`, `Layout.tsx`, `index.html`

Notes:
- baseline done; v2+ optional

---

### 43. Accessibility (A11Y) ✅ (v3 baseline)

#### 📌 Description
Make app usable for all users.

---

#### ✅ v1 (MVP)
- **Skip link** (`.skip-link`) → `#main-content` (WCAG 2.4.1)
- **`<main id="main-content" tabIndex={-1}>`** — fragment focus after skip
- **Brand** — `Link` to `/` + `aria-label="REZIIZI home"`
- **`RouteAnnouncer`** — `role="status"` + `aria-live="polite"`; copy from `getRouteAnnouncement()` in `seo.ts` (SPA navigation)
- **`.sr-only`** — visually hidden live region
- Existing: `nav` `aria-label`, theme `radiogroup`, `:focus-visible`, `prefers-reduced-motion`, touch targets (`--touch-min`)

---

#### 🚀 Future (v2+)
- full accessibility audit; per-post OG already separate (SEO)

---

#### ⚙️ Logic
- keyboard + screen reader baseline; no backend

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- Route announcements: see `RouteAnnouncer`

---

#### 🧱 Implementation (43. Accessibility)

Frontend:
- `Layout.tsx`, `styles.css`, `RouteAnnouncer.tsx`, `seo.ts` (`getRouteAnnouncement`)

Notes:
- baseline + live region done; audit optional later

---

### 44. Localization (Languages) ✅ (v3 baseline)

#### 📌 Description
Support multiple languages.

---

#### ✅ Baseline (v3) — რა არის მიბმული
- **`src/i18n/`:** `messages.ts` — `en` / `ka` / `ru`; `resolveMessage` + `interpolate`; `locale` helpers
- **`messages.seo`:** route titles/descriptions + `announcer`; **`seo.ts`** by `Locale`; **`RouteSeo` / `RouteAnnouncer`**
- **`I18nProvider` / `useI18n().t()`** — `document.documentElement.lang`, `localStorage` (`reziizi-locale`)
- **Settings:** language `<select>`
- **UI `t()`-ით:** `Layout`, `ThemePreferenceControls`, `SettingsPage`; **`HomePage`**, **`LoginPage`**, **`SearchPage`**, **`PostForm`**; **Profile**, **PostCard**, კომენტარები, reports, reactions; **Legal / Security** (გვერდის chrome — სათაურები/ნავი); **Notifications**; **Messages**; **Chat**; **Admin** — `pages.admin.*` (`AdminPage`, Moderation, Reports, Ads, Stats, Users, API catalog). სრული ჩამონათვალი და სტატუსი: **`## CURRENT WORK`** → **Localization (გაფართოება)**.

---

#### 🚀 Future (დარჩენილი / სურვილისამებრ)
- **Legal:** სტატიის სრული შიგთავსი — ლოკალიზაცია (ახლა ტექსტი ძირითადად ინგლისურია)
- **შეცდომები:** Supabase/API სერვერის შეტყობინებები ხშირად ინგლისურია — კლიენტზე `errorMessage` / toast
- სხვა გვერდები ან სტრინგები — ინკრემენტულად; ოფციონალური DB-backed copy; SEO per locale სიღრმით

---

#### ⚙️ Logic
- Dot-path keys (e.g. `layout.nav.home`); `{placeholder}` interpolation

---

#### 🗄️ Database (planned)
- optional for CMS-style copy; not required for MVP

---

#### 🛠️ Notes
- სერვერიდან მოსული შეცდომის ტექსტები (PostgREST, Auth) ხშირად ინგლისურია — ეს არაა `messages.ts`-ის ბრალი; UI-ის საკუთარი სტრინგები — `t()`.

---

#### 🧱 Implementation (44. Localization)

Frontend:
- `src/contexts/I18nContext.tsx`, `src/main.tsx`, `Layout.tsx`, `ThemePreferenceControls.tsx`, `SettingsPage.tsx`, `src/i18n/*` (`messages.ts`, `locale.ts`, `resolveMessage.ts`)
- გვერდები/კომპონენტები `useI18n` / `t("pages.…")` — იხილე **`CURRENT WORK`** სია

Notes:
- ახალი UI სტრინგი: დაამატე გასაღები სამივე ლოკალში `messages.ts`-ში (`en` / `ka` / `ru`), თორემ ტიპი/რეზოლვერი დაირღვევა

---

### 45. Email System ✅ (password reset MVP) / 🔄 (verification, alerts, SMTP — Future)

#### 📌 Description
Transactional email via **Supabase Auth** (and optional custom SMTP). **MVP:** password recovery. **Later:** email verification, critical alerts — **არა** მარკეტინგული ეკოსისტემა მალე.

---

#### ✅ v1 (MVP)
- **Password reset:** `/forgot-password` → `resetPasswordForEmail` → email link → `/reset-password` → `updateUser({ password })` (PKCE + `detectSessionInUrl`).

---

#### 🚀 Future (v2+)
- email verification (signup confirm)
- critical / transactional alerts (საჭიროებისამებრ Resend/SendGrid SMTP in Dashboard)

---

#### ⚙️ Logic
- Supabase Auth sends recovery email; redirect URL must be allowlisted (**Site URL** + **Redirect URLs**).

---

#### 🗄️ Database (planned)
- none for password reset (Auth handles tokens). Future verification may use Auth metadata only.

---

#### 🛠️ Notes
- **Production:** Dashboard → **Authentication** → **SMTP** (custom provider optional); **URL Configuration** — add `https://<domain>/reset-password` (and dev `http://localhost:5173/reset-password` if needed). იხილე **`README.md`** → *Supabase — Auth URL configuration*.

---

#### 🧱 Implementation (45. Email System)

Frontend:
- `src/lib/authRedirect.ts` — `getAuthRecoveryRedirectTo()` → `{origin}/reset-password`
- `src/pages/ForgotPasswordPage.tsx`, `src/pages/ResetPasswordPage.tsx`
- `src/lib/supabaseClient.ts` — `auth: { detectSessionInUrl: true, flowType: "pkce" }`
- `src/App.tsx` — routes `/forgot-password`, `/reset-password`
- `src/pages/LoginPage.tsx` — „Forgot password?“ → `/forgot-password` (sign-in mode)
- `src/lib/seo.ts`, `src/i18n/messages.ts` — routes + copy (`en` / `ka` / `ru`)

Backend:
- Supabase Auth (built-in); no app migration for reset flow.

Notes:
- Does not disclose whether an email exists (generic success copy on forgot-password).
- **Tests (deferred, §41):** Vitest/RTL for `ForgotPasswordPage` / `ResetPasswordPage` with mocked `supabase.auth` — მომავალში, როცა პრიორიტეტი იქნება.

---

### 46. Push Notifications ❌

#### 📌 Description
Real-time notifications.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- push alerts

---

#### ⚙️ Logic
- send notification

---

#### 🗄️ Database (planned)
notifications

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (46. Push Notifications)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 47. File Storage System ❌

#### 📌 Description
Store uploaded files.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- file storage integration

---

#### ⚙️ Logic
- store files in cloud

---

#### 🗄️ Database (planned)
file URLs

---

#### 🛠️ Notes
- needed for media

---

#### 🧱 Implementation (47. File Storage System)

Frontend:
- none

Backend:
- Supabase storage (later)

Notes:
- needed for media

---

### 48. Rate Limiting System ✅ (v3 baseline)

#### 📌 Description
Prevent spam requests.

---

#### ✅ v1 (MVP)
- PostgreSQL BEFORE INSERT triggers + rolling-window counts (`SECURITY DEFINER`)
- See: `supabase/migrations/20260401310000_add_rate_limit_triggers.sql`, `supabase/SCHEMA.md` → **Rate limits**

---

#### 🚀 Future (v2+)
- Edge/API rate limits; Supabase Storage upload throttling; reaction limits if needed

---

#### ⚙️ Logic
- Enforced on insert; client shows PostgREST error message via `errorMessage()`

---

#### 🗄️ Database (planned)
- Implemented: indexes on `(user_id, created_at)` / `(sender_id, created_at)` for fast counts

---

#### 🛠️ Notes
- Tuning: change thresholds in migration SQL

---

#### 🧱 Implementation (48. Rate Limiting System)

Frontend:
- none (errors from Supabase)

Backend:
- `posts` / `comments` / `chat_messages` / `reports` triggers
- **Vercel API (partial):** `POST /api/delete-account` — IP window rate limit (`api/lib/rateLimitByIp.ts`); env `DELETE_ACCOUNT_RATE_LIMIT_*` — იხილე **`README.md`**

Notes:
- MVP baseline (DB); Edge/API layer expanded for account deletion; global hard limits → Redis/WAF მომავალში

---

### 49. Anti-Spam System ✅ (MVP baseline) / 🔄 (გაფართოება — `CURRENT WORK` → Anti-spam (49))

#### 📌 Description
Spam ევრისტიკა + რბილი დროშები; არსებულ rate limits-ზე დამატება.

---

#### სპეკი (ერთი წყარო)

**არ ავაკოპირებთ ცხრილს აქ.** სრული დეტალი: **`## CURRENT WORK`** → **`### შემდეგი ფაზა`** → **`#### Anti-spam (49)`** — locked სქემა, კონფიგი, migration checklist, optional AI appendix.

---

#### ✅ v1 (MVP) — შინაარსი იხილე ზემო ბმული

---

#### 🧱 Implementation (49. Anti-Spam System)

- **DB:** migration `supabase/migrations/` (ახალი ფაილი, თანმიმდევრობა `.cursor/rules/reziizi.mdc`), შემდეგ `SCHEMA.md`, `verify_schema.sql`.
- **App:** `src/pages/`, `src/components/`, `src/lib/`; `messages.ts` (`en`/`ka`/`ru`).
- **Admin:** არსებულ moderation-ზე ფილტრი / სორტი ახალ ველებზე.

---

### 50. Future Features — (კატეგორია / იდეების სათავე; არა ერთი ფიჩა)

#### 📌 Description
Ideas for future expansion — ახალი ფიჩა ჯერ **`project.md`**-ში (სკოპი), მერე კოდი.

---

#### ✅ v1 (MVP)
- none

---

#### 🚀 Future (v2+)
- new ideas

---

#### ⚙️ Logic
- add later

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- placeholder

---

#### 🧱 Implementation (50. Future Features)

Frontend:
- none

Backend:
- none

Notes:
- placeholder

---

### 51. Legal / Privacy (Terms & Privacy) ✅

#### 📌 Description
Legal pages for users: Terms of Service and Privacy Policy.

---

#### ✅ v1 (MVP)
- simple static page (or two pages)
- link from registration / login
- show Terms & Privacy text for compliance / transparency

---

#### 🚀 Future (v2+)
- versioning, updates, locale-specific legal text

---

#### ⚙️ Logic
- static content; no user data in DB for v1

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- keep copy minimal; update when product grows

---

#### 🧱 Implementation (51. Legal / Privacy)

Frontend:
- static React route(s)

Backend:
- none (v1)

Files:
- /src/pages/Legal.jsx (or Terms.jsx + Privacy.jsx)

Flow:
1. simple static page
2. link from registration/login
3. show Terms & Privacy

UI:
- readable text layout
- links from auth screens

---

## RULES

- Work on one feature at a time
- Always update feature before coding
- Do not skip steps
- Keep everything numbered

---

## JOURNAL

ერთი სამუშაო ჟურნალი — ყველა მნიშვნელოვანი ჩანაწერი: **`JOURNAL.md`** (თარიღი, რა გაკეთდა, შემდეგი ნაბიჯები).

---

## PROJECT SETUP

Frontend:
- React (Vite)

Backend:
- Supabase

Tools:
- Cursor
- Git

---

## FIRST STEP

Goal:
- Create basic app structure

Includes:
- React app setup
- simple homepage

---

## დოკუმენტის ბოლო განახლება (2026-04-03)

**✔ რა შეიცვალა ბოლოს**

- **§10 Video System** — სრული სპეკი + **baseline** სტატუსი (MP4/WebM, `post-videos`, `posts.video_url`, ტრანსკოდინგი მომავალში).
- **§11 Media Upload** — „Media type“ ცხრილი განახლებულია: სურათი **ან** ვიდეო ერთ პოსტზე; **MASTER** სიაში `11` — სახელები ურთიერთდაუშვებელი მედიის მიხედვით.
- **`## CURRENT WORK`**, **`შემდეგი განვითარების გეგმა`**, **იდეების ინდექსი** — Video (10) baseline-ზე მიბმული.

**✔ როგორ შევამოწმო**

1. §10 და §11 — ერთნაირი წესები (ერთი ვიზუალური ფაილი: სურათი XOR ვიდეო).
2. **Migration** `20260401320000_add_post_videos_storage_and_video_url.sql` რეპოში + `reziizi.mdc` ცხრილის განახლება (#20 rate limits, #21 video).
