# REZIIZI — პროექტის ჟურნალი

აქ იწერება **ერთიანი ისტორია**: რა გაკეთდა, რა გადაწყვიტე, რა დარჩა. ახალი ჩანაწერი ყოველთვის **ზედა ნაწილში** (უახლესი ზემოთ) ან თარიღის სექციის ქვეშ — როგორც გეხერხება.

---

## ფორმატი (რეკომენდებული)

```
### YYYY-MM-DD — მოკლე სათაური

- რა შეიცვალა / რა დაიწყო
- შემდეგი ნაბიჯი (სურვილისამებრ)
```

---

## ჩანაწერები

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
