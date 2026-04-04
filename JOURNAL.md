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
- **შემდეგი (სურვილისამებრ):** UI/responsive პოლიში, ანგარიშის წაშლის ნაკადი v2/Edge Function.

### 2026-04-01 — v1: DB მიგრაცია + Auth + Feed + რეაქციები (აპი)

- **`supabase/migrations/20260401120000_init_posts_reactions_profiles.sql`:** ერთი საწყისი მიგრაცია — `profiles`, `posts`, `reactions` + RLS; `handle_new_user` (`execute procedure`). Supabase-ში გაშვებულია და მუშაობს.
- **`AuthProvider` / `useAuth`**, **`ProtectedRoute`** — `/profile`, `/settings` დაცულია.
- **`LoginPage`:** email/password sign in + sign up; Legal ბმული.
- **`HomePage`:** `PostForm`, `PostCard`, `ReactionButtons`, პაგინაცია (`fetchFeedPage` / `Load more`).
- **`ProfilePage`:** პროფილი + საკუთარი პოსტები; **`SettingsPage`:** პაროლის შეცვლა, გამოსვლა; ანგარიშის წაშლა — stub.
- **`src/lib/feed.ts`:** `enrichPosts`, `fetchUserPosts`.
- **შემდეგი:** SQL გაშვება Supabase-ში (თუ ჯერ არაა); არსებული auth მომხმარებლებისთვის `profiles` backfill საჭიროებისამებრ.

### 2026-04-01 — ფოლდერების აღწერა დოკუმენტში

- **`AGENTS.md`:** დამატებულია სექცია „ფოლდერების განლაგება“ (ხის სტრუქტურა) — რომ არ მოჩანდეს „გაფანტული“; დოკუმენტაცია ფესვში, კოდი `src/`-ში — განზრახ არჩევანი.
- **`README.md`:** Layout მოკლე ბმულით `AGENTS.md`-ზე.
- **ლოკალურად:** წაშლილია `_scaffold_tmp/` (ზედმეტი ნაშთი).

### 2026-04-01 — AGENTS.md + README (ახალი ჩატისთვის)

- დამატებულია **`AGENTS.md`** — სწრაფი კონტექსტი: სად არის სპეკი, წესები, გაშვება, შემდეგი ეტაპი.
- დამატებულია **`README.md`** — მოკლე quick start + ბმულები დოკუმენტებზე.
- **`project.md`** თავში ბმული `AGENTS.md`-ზე.

### 2026-04-01 — Git + GitHub

- **Git** და **GitHub CLI (`gh`)** სისტემაში უკვე დაყენებული იყო — დამატებითი ინსტალაცია არ დასჭირდა.
- **ლოკალური რეპო:** `git init`, `main`, პირველი კომიტი; `_scaffold_tmp/` ამოღებულია კომიტიდან და დამატებულია `.gitignore`-ში.
- **Remote:** `origin` → `https://github.com/rezxzer/reziizi.git`; **`git push -u origin main`** წარმატებით.

### 2026-04-01 — Supabase `.env` (ლოკალური)

- რეალური პროექტის `VITE_SUPABASE_URL` და `VITE_SUPABASE_ANON_KEY` ჩასმულია `.env`-ში (ფაილი git-ში არ ეშვება).
- **შემდეგი:** `npm run dev` გადატვირთვა საჭიროებისამებრ; შემდეგ — DB სქემა + RLS Supabase-ში.

### 2026-04-01 — REZIIZI v1 scaffold

- **Stack:** React 19 + Vite 6 + TypeScript; `react-router-dom`; `@supabase/supabase-js`.
- **Structure:** `src/pages/`, `src/components/`, `src/lib/supabaseClient.ts`, `src/styles.css`.
- **Routes:** `/`, `/login`, `/profile`, `/settings`, `/legal` — placeholder UI + Flow ტექსტები v1 critical path-ისთვის; Legal ლინკი login გვერდზე.
- **Env:** `.env.example` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`); რეალური `.env` ლოკალურად.
- **შემდეგი ნაბიჯი:** Supabase სქემა + RLS (`posts`, `reactions`), შემდეგ Auth / Feed / Reactions ინტეგრაცია.

### 2026-04-01 — ჟურნალი გაიხსნა

- დამატებულია `JOURNAL.md` როგორც ერთი სამუშაო ჟურნალი; შემდეგი ცვლილებები და გადაწყვეტილებები — აქ ჩაწერა.
