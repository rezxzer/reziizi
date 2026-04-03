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
30. Caching System 🟡
31. Logging System 🟡
32. Error Handling System 🟡
33. UI Design System
34. Theme System (Dark/Light)
35. Mobile Responsiveness
36. Performance Optimization 🟡
37. Deployment System 🟡
38. Environment Configuration (.env)
39. Backup System
40. Versioning System
41. Testing System 🟡
42. SEO Optimization 🟡
43. Accessibility (A11Y) 🟡
44. Localization (Languages) 🟡
45. Email System (verification/reset)
46. Push Notifications
47. File Storage System
48. Rate Limiting System 🟡
49. Anti-Spam System
50. Future Features
51. Legal / Privacy (Terms & Privacy)

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

---

## CURRENT WORK

### რა გაკეთდა (სტატუსი — ამ ეტაპზე)

- **v1 (MVP):** Auth, პოსტები, feed, რეაქციები, პროფილი, settings, UI/მობილური, Legal — **დასრულებული** (ლოკალურად).
- **v2:** კომენტარები, ძებნა, თემა, ნოტიფიკაციები, ტეგები, trending, chat, ranking UI — **baseline დასრულებული**.
- **v3:** Admin, moderation, reports, ban, stats, ads, premium, settings+privacy, security, API catalog, DB docs (`SCHEMA.md`, `verify_schema`), **Caching (30)** TanStack Query, **Error Handling (32)** (toast, route-level `QueryErrorResetBoundary` + `RouteErrorBoundary`), **Logging (31)**, **Performance (36)** lazy routes, **Deployment (37)** Vercel + `vercel.json` + **`README.md` deployment გზამკვლევი**, **Testing (41)** Vitest — **baseline დასრულებული** კოდში.
- **Production:** აპი **ატვირთულია Vercel-ზე** (GitHub დაკავშირება, `VITE_*` env, Supabase Auth URL-ები — იხილე **`README.md` → „Production deployment (GitHub + Vercel + Supabase)”**).
- **Media Upload (11) + File Storage (47) — baseline:** Supabase Storage `post-images`, `posts.image_url`, `PostForm` სურათი, feed/admin `PostCard` / Moderation; პოსტის წაშლისას Storage cleanup (საუკეთესო ძალისხმევა).
- **Video (10) — baseline:** Storage `post-videos` (MP4/WebM, 50 MiB), `posts.video_url`, CHECK ერთ მედიაზე; `PostForm` / `PostCard` / admin; account deletion იშლის `post-videos` პრეფიქსს; **ტრანსკოდინგი არა** (იხილე §10).
- **Friends (5) — baseline:** `follows` + RLS; `/u/:userId`; `/u/:userId/followers` · `/u/:userId/following` (`UserFollowListPage`, pagination); Follow/Unfollow; პროფილზე რაოდენობები ლინკებით; **ორმხრივი გამოწერა** — `UserProfilePage`-ზე ბეიჯი `pages.userProfile.mutualFollowBadge` (ორი `queryKeys.follow.relation`); **ნოტიფიკაცია** ახალ გამომწერზე (`notifications.type` `follow`, migration `20260401340000` **live Supabase** — იხილე `JOURNAL.md`); ლინკები `PostCard` / Search (იხილე §5).
- **Avatar (4) — baseline:** `profiles.avatar_url`, bucket `avatars` (2 MiB), **Settings** → Profile photo, **Profile** + feed **PostCard** — `Avatar` კომპონენტი; ძველი სურათის წაშლა ახალი ატვირთვისას / Remove.
- **GitHub CI:** `.github/workflows/ci.yml` — `main`/`master`-ზე push/PR: `npm ci` → `npm test` → `npm run build` (იხილე **`README.md` → „GitHub Actions (CI)“**). **Vercel** დეპლოი რჩება რეპოდან იმპორტით, როგორც ადრე.
- **ანგარიშის წაშლა (სერვერული ფლოუ):** **`supabase/functions/delete-account/`** — Edge Function: JWT → Storage (`avatars/`, `post-images/`) წაშლა → `auth.admin.deleteUser`. **`api/delete-account.ts`** (Vercel) + **`src/lib/deleteAccount.ts`** — same-origin `/api/delete-account`, fallback Edge. **`SettingsPage`** — დადასტურება `DELETE`, `queryClient.clear`, sign out. **Deno/IDE:** `supabase/functions/deno.json` (import map), `tsconfig.json` + `deno-env.d.ts` — `@supabase/supabase-js` ტიპები `node_modules`-იდან. **ცოცხალი Supabase:** საჭიროა **`supabase functions deploy delete-account`** (იხილე **`README.md`** + **`supabase/ACCOUNT_DELETION_DESIGN.md`**).
- **ანგარიშის წაშლა (სტატუსი production):** **მოგვიანებით დაბრუნება.** სისტემა **ამ ეტაპზე სტაბილურად არ მუშაობს** (Vercel `/api/delete-account`, env, Edge — დიაგნოსტიკა/დეპლოი დასრულებული არა). იხილე **`README.md`** → Production deployment, **`vercel.json`**, **`api/delete-account.ts`**.
- **ნავიგაცია (ადმინი):** **`Layout`** — ადმინის ქვემენიუ ერთ **`details`** ჩამოსაშლელში (ჰედერი აღარ „იშლება“ ბევრი ბმულით). **`translate="no"`** ჰედერზე — ბრაუზერის ავტოთარგმანი არ ურევს ნავიგაციის ტექსტს.
- **Localization (გაფართოება):** `messages.ts` `pages.*` — Profile, PostCard, კომენტარები, reports, reactions, Legal (chrome), Security, **Notifications** (`pages.notifications.*`) სრულად `t()`; Legal სტატიის **შიგთავსი** ჯერ კიდევ ინგლისურია (სურვილისამებრ მომავალი ტალღა).

**შენიშვნა:** **Database Structure (29)** — `supabase/SCHEMA.md`, `verify_schema.sql`; ახალი migration-ის შემდეგ ამ ფაილებიც განაახლე.

---

### v3 ტექნიკური სტეკი (დასრულებული baseline — ცხრილი)

| # | ფიჩა | რა გაკეთდა | მომავალი (სურვილისამებრ) |
|---|------|------------|---------------------------|
| 1 | **Caching (30)** | TanStack Query: feed, profile, `useProfileFlags`, **Search** (`queryKeys.search.results`), **Notifications** (`queryKeys.notifications.list`); `queryKeys` / `queryClient` | prefetch სურვილისამებრ |
| 2 | **Error Handling (32)** | `errorMessage`, `InlineError`, ერთიანი `catch`, query cache dev log; **Toast** (`ToastProvider` / `useToast`); **RouteErrorBoundary** + **`QueryErrorResetBoundary`** (`LayoutOutlet`); მუტაციის/ავთენტიკაციის შეცდომა toast-ით — `NotificationsPage`, **`SettingsPage`** (პაროლი / privacy / წაშლა), **`LoginPage`** | toast სხვა გვერდებზე სურვილისამებრ; `QueryErrorResetBoundary` + სრული `ErrorBoundary` ტესტები |
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
| 3 | **42. SEO** — `src/lib/seo.ts`, `RouteSeo`, `index.html` defaults; public routes indexable, auth/admin noindex | ✅ baseline | **Email (45)** — მოგვიანებით |
| 4 | **43. A11Y** — skip link, `#main-content`, brand; **`RouteAnnouncer`** (`aria-live`, `getRouteAnnouncement`) | ✅ baseline | full audit — v3 |
| 5 | **48. Rate limiting** — DB triggers on `posts` / `comments` / `chat_messages` / `reports` (see `SCHEMA.md`) | ✅ baseline | Edge/API limits — v2 |
| 6 | **44. Localization** — `pages.*` (`en`/`ka`/`ru`), Layout, Settings, SEO, Profile, PostCard, comments, reports, reactions, Legal chrome, Security, **Notifications** | ✅ baseline v3 | Legal article body ინგლისურად; დანარჩენი გვერდები სურვილისამებრ |
| 7 | **Account deletion** — Edge `delete-account`, `api/delete-account`, `src/lib/deleteAccount.ts`, Settings UI | 🔄 მოგვიანებით (production) | **Production არ არის სტაბილური** — დაბრუნება დაგეგმილია. კოდი რეპოშია; იხილე `README`, `CURRENT WORK` ზემოთ |
| 8 | **5. Friends — mutual follows** (ორმხრივი გამოწერა, UI ინდიკატორი `UserProfilePage`) | ✅ baseline (MVP) | სრული სკოპი **§5**; „მომავალი ტალღა“ იხილე **`#### 🚀 Future`** mutual-ის ქვეშ |

**იდეები სპეკიდან (არა სავალდებულო რიგი):** **SEO (42)**, **A11Y (43)**, **Localization (44)**, **Email (45)** (მოგვიანებით), **Rate limiting (48)** (Edge/API დამატება), **Anti-spam (49)** — დეტალები **MASTER FEATURE LIST** + **FEATURE BREAKDOWN**. **Friends (5)** — baseline §5 + mutual MVP; ნოტიფიკაცია follow-ზე live. **Video (10)** — baseline §10 (ტრანსკოდინგი/სტრიმინგი მომავალში). **CI (GitHub Actions):** `README.md` → „GitHub Actions (CI)“.

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

### 4. Avatar System 🟡

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

### 5. Friends / Following System 🟡 — baseline (follow / counts / `/u/:userId`)

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

### 10. Video System 🟡 — baseline (MP4/WebM, no transcoding)

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

### 11. Media Upload System 🟡 — სრული breakdown (baseline: სურათი ან ვიდეო პოსტზე ✅)

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
- **Rate limiting (48):** პოსტები/კომენტარები/ჩატი/რეპორტები — DB ტრიგერები (`SCHEMA.md`); **Storage** ატვირთვის სიხშირე — მომავალში. **Anti-spam (49)** — მომავალში.

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
- `SearchPage` `/search`; `src/lib/search.ts` (ilike on `posts.body`, `profiles.email`)

Backend:
- no new tables; uses existing RLS + indexes (seq scan OK for small data)

Notes:
- sanitize LIKE wildcards in user input; min 2 chars

---

### 15. Categories / Tags ✅ (v2 baseline)

#### 📌 Description
Organize posts with tags.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- assign tags
- filter by tag

---

#### ⚙️ Logic
- post has tags

---

#### 🗄️ Database (planned)
tags table

---

#### 🛠️ Notes
- later feature

---

#### 🧱 Implementation (15. Categories / Tags)

Frontend:
- `PostForm` tags input; `PostCard` chips; `HomePage` `?tag=`; `lib/tagParse.ts`, `lib/tags.ts`

Backend:
- `tags`, `post_tags`, RLS; `feed_post_ids_by_tag` RPC; migration `20260401150000_add_tags.sql`

Notes:
- apply SQL in Supabase (RPC + tables)

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
- გადახდის პროვაიდერი (Stripe და სხვ.) — მომდევნო ეტაპი

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

### 30. Caching System 🟡

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

### 31. Logging System 🟡

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

### 32. Error Handling System 🟡

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
Design consistency.

---

#### ✅ v1 (MVP)
- basic styles

---

#### 🚀 Future (v2+)
- design system

---

#### ⚙️ Logic
- reusable components

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- simple UI first

---

#### 🧱 Implementation (33. UI Design System)

Frontend:
- basic styles (CSS)

Files:
- /src/styles.css

Notes:
- minimal design

---

### 34. Theme System ✅ (v2 baseline)

#### 📌 Description
Light/Dark mode.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- theme switch

---

#### ⚙️ Logic
- toggle theme

---

#### 🗄️ Database (planned)
user preference

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (34. Theme System)

Frontend:
- `ThemeProvider` / `useTheme`; `ThemePreferenceControls`; CSS vars + `html[data-theme="light"]`; `index.html` inline script

Backend:
- none (preference `localStorage` only)

Notes:
- system preference updates via `matchMedia`

---

### 35. Mobile Responsiveness ✅ (v1 baseline)

#### 📌 Description
Mobile-friendly UI.

---

#### ✅ v1 (MVP)
- responsive layout

---

#### 🚀 Future (v2+)
- optimize mobile UX

---

#### ⚙️ Logic
- CSS responsive

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- important

---

#### 🧱 Implementation (35. Mobile Responsiveness)

Frontend:
- responsive CSS

Notes:
- mobile friendly layout

---

### 36. Performance Optimization 🟡

#### 📌 Description
Improve speed — **v3 baseline:** smaller initial JS by **lazy-loading** heavy routes (admin, messages, chat thread, notifications).

---

#### ✅ v1 (MVP)
- basic optimization

---

#### ✅ v3 (baseline — partial)
- `src/lazy/chunks.ts` — `React.lazy` for admin pages, `MessagesPage`, `ChatThreadPage`, `NotificationsPage`
- `src/components/RouteFallback.tsx` — Suspense fallback
- `App.tsx` — `<Suspense>` around `<Routes>`

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

### 37. Deployment System 🟡

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

### 41. Testing System 🟡

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

---

### 42. SEO Optimization 🟡

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

### 43. Accessibility (A11Y) 🟡

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

### 44. Localization (Languages) 🟡

#### 📌 Description
Support multiple languages.

---

#### ✅ v1 (MVP)
- **`src/i18n/`:** `messages` (`en`, `ka`, `ru`), `resolveMessage` + `interpolate`, `locale` helpers
- **`messages.seo`:** route titles/descriptions + `announcer` template; **`seo.ts`** reads by `Locale`; **`RouteSeo` / `RouteAnnouncer`** use `useI18n().locale`
- **`I18nProvider` / `useI18n().t()`** — `document.documentElement.lang` (`en` \| `ka` \| `ru`), `localStorage` (`reziizi-locale`)
- **Settings:** language `<select>` (first card)
- **Translated UI:** `Layout`, `ThemePreferenceControls`, `SettingsPage`; **`pages`:** `HomePage`, `LoginPage`, `SearchPage`, `PostForm` (`en` / `ka` / `ru`)
- **Not yet:** Admin, Profile, PostCard/Comment, Legal/Security, messaging pages — incremental

---

#### 🚀 Future (v2+)
- translate remaining pages/components; optional DB-backed copy; SEO per locale

---

#### ⚙️ Logic
- Dot-path keys (e.g. `layout.nav.home`); `{placeholder}` interpolation

---

#### 🗄️ Database (planned)
- optional for CMS-style copy; not required for MVP

---

#### 🛠️ Notes
- API / Supabase error strings remain English

---

#### 🧱 Implementation (44. Localization)

Frontend:
- `src/contexts/I18nContext.tsx`, `src/main.tsx`, `Layout.tsx`, `ThemePreferenceControls.tsx`, `SettingsPage.tsx`, `src/i18n/*`

Notes:
- baseline done; expand coverage incrementally

---

### 45. Email System ❌

#### 📌 Description
Email verification and password reset.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- email verification
- password reset

---

#### ⚙️ Logic
- send email

---

#### 🗄️ Database (planned)
email tokens

---

#### 🛠️ Notes
- important later

---

#### 🧱 Implementation (45. Email System)

Frontend:
- none (v1)

Backend:
- Supabase (later)

Notes:
- later

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

### 48. Rate Limiting System 🟡

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

Notes:
- MVP baseline

---

### 49. Anti-Spam System ❌

#### 📌 Description
Detect and block spam.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- spam detection

---

#### ⚙️ Logic
- filter content

---

#### 🗄️ Database (planned)
spam flags

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (49. Anti-Spam System)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 50. Future Features ❌

#### 📌 Description
Ideas for future expansion.

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
