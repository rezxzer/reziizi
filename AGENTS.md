# REZIIZI — სწრაფი კონტექსტი (ახალი ჩატი / AI)

ამ ფაილის მიზანია: **ახალ სესიაში** სწრაფად გაიგო პროექტი — სად რა წერია და რა რიგით ვაკეთებთ.

## რა არის ეს

- **REZIIZI** — სოციალური ქსელის MVP (v1) → შემდეგ v2/v3.
- **სტეკი:** React (Vite) + TypeScript + Supabase (`@supabase/supabase-js`).
- **რეპო:** GitHub-ზე; `.env` **არ უნდა** იყოს კომიტში (იხილე `.gitignore`).

## ფოლდერების განლაგება (არ არის „გაფანტული“ — ეს არის სტანდარტი)

ყველაფერი **ერთ რეპოში**ა: **შესასვლელი დოკები ფესვში** (`README.md`, `AGENTS.md`, `CLAUDE.md`), **სამუშაო დოკები `docs/`-ში** (`docs/project.md`, `docs/JOURNAL.md`, `docs/*_POLISH.md`), **კოდი `src/`-ში**, **ინსტრუმენტები/კონფიგი ფესვში**.

```
reziizi/
├── .cursor/rules/          # Cursor AI წესები (reziizi.mdc)
├── src/
│   ├── components/         # განმეორებადი UI (Layout, …)
│   ├── pages/              # გვერდები = მარშრუტები (HomePage, LoginPage, …)
│   ├── hooks/              # მაგ. useInfiniteScroll.ts (ინფინიტი სქროლი სენტინელით)
│   ├── lib/                # კლიენტები (supabaseClient.ts, api/registry, …)
│   ├── test/               # Vitest setup (jest-dom)
│   ├── App.tsx             # Router
│   ├── main.tsx            # Entry
│   └── styles.css          # გლობალური სტილი (v1 UI)
├── supabase/
│   ├── migrations/         # SQL (RLS, ცხრილები) — Supabase-თან სინქი CLI ან SQL Editor
│   ├── functions/          # Edge Functions (Deno), მაგ. delete-account
│   ├── SCHEMA.md           # public სქემის მიმოხილვა (Database Structure)
│   ├── ACCOUNT_DELETION_DESIGN.md  # ანგარიშის წაშლის ტექნიკური დიზაინი + დეპლოი
│   └── verify_schema.sql   # დაყენების შემოწმება SQL Editor-ში
├── index.html
├── vite.config.ts
├── package.json
├── .env                    # ლოკალური საიდუმლო — git-ში არა
├── .env.example            # მაგალითი (კომიტდება)
├── docs/
│   ├── project.md              # სრული სპეკი + CURRENT WORK
│   ├── JOURNAL.md              # ჟურნალი
│   ├── HOME_PAGE_POLISH.md     # მთავარი გვერდის სკოპი / უსაფრთხო polish (ინგლისური)
│   ├── NOTIFICATIONS_POLISH.md # /notifications სკოპი — UI polish, არა DB/Push (ინგლისური)
│   ├── MESSAGES_POLISH.md      # /messages + thread — UI polish, არა chat RPC (ინგლისური)
│   ├── SEARCH_POLISH.md        # /search — UI polish; ინოვაციის ზონა დოკში (ინგლისური)
│   ├── SETTINGS_POLISH.md      # /settings — UI polish + ინოვაცია (ინგლისური)
│   ├── PROFILE_POLISH.md       # /profile — UI polish + ინოვაცია (ინგლისური)
│   └── MOTION_SOUND_POLISH.md  # motion/sound სისტემა — tiers, limits, rollout (ინგლისური)
├── CLAUDE.md               # ინგლისური handoff გარე AI-სთვის (+ AGENTS.md რუკა)
├── AGENTS.md               # ეს ფაილი — ახალი ჩატისთვის
└── README.md               # მოკლე quick start
```

**არ ინახება რეპოში:** `node_modules/`, `dist/`, `.env` (იხილე `.gitignore`).

## სად არის სიმართი (დოკუმენტების რუკა)

| ფაილი / ფოლდერი | რისთვის |
|-----------------|--------|
| **`README.md`** | Quick start, tests, **GitHub Actions (CI)**, **Production deployment (GitHub + Vercel + Supabase)** — სრული ნაბიჯები. |
| **`docs/project.md`** | სრული სპეკი: feature-ები 1–51, VERSIONS (MVP/v2/v3), **FEATURE BREAKDOWN**, **CURRENT WORK** (დასრულებული სტატუსი + **შემდეგი განვითარების გეგმა (შევსებადი)** ცხრილი). **ბიზნესი / Stripe:** **`#### ბიზნესი / §24 — განვითარების გადაწყვეტილება`** — P1/P2, გადადებული, რისკების დაზღვევა. |
| **`docs/JOURNAL.md`** | ქრონოლოგია — რა გაკეთდა, რა გადაწყვიტე (მოკლე ჩანაწერები). როცა მომხმარებელი ადასტურებს Supabase-ზე migration-ის გაშვებას — AI უნდა განაახლოს **`docs/JOURNAL.md`** + **`docs/project.md` CURRENT WORK** (იხილე `.cursor/rules/reziizi.mdc` → „დადასტურება, რიგი და ჩანაწერი“). |
| **`CLAUDE.md`** | ინგლისური handoff გარე ასისტენტისთვის (სპეკი, რიგი, motion პრიორიტეტი, pitfalls); სრული რუკა — **`AGENTS.md`**; ქრონოლოგია — **`docs/JOURNAL.md`**. |
| **`docs/HOME_PAGE_POLISH.md`** | მთავარი გვერდის სკოპი / რა არ დაირღვეს / უსაფრთხო polish — ინგლისური, Cowork-ისთვის. |
| **`docs/NOTIFICATIONS_POLISH.md`** | **`/notifications`** — in-app notifications UI; არა Push (§46); ინგლისური სკოპი. |
| **`docs/MESSAGES_POLISH.md`** | **`/messages`**, **`/messages/:peerId`** — საუბრების სია + თრედი; `nav_messages` flag; ინგლისური სკოპი. |
| **`docs/SEARCH_POLISH.md`** | **`/search`** (`?q=`); `nav_search` flag; უსაფრთხო polish + **Innovation** სექცია დოკში. |
| **`docs/MOTION_SOUND_POLISH.md`** | motion+sound სისტემის სკოპი: Tier 1/2/3, route mapping, sound profiles, rollout sequence; **არ** ავურიოთ შემთხვევითი ეფექტები. **ტალღა 2 UI polish-ის პრიორიტეტი** (Claude-ის ხაზი — პროდუქტით დადასტურებული; **`docs/JOURNAL.md` → 2026-04-09**). |
| **`docs/*_POLISH.md` (საერთო)** | **ინოვაცია polish-ში** = AI **თავად გამოიგონოს და ჩაამბედოს** მიკრო-ინტერაქციები (არა მხოლოდ სიის „მოხატვა“): მაგ. **hover** ნავიგაციის ღილაკებზე/ლინკებზე, **მაუსის რეაქცია** (`:hover` / `:active` — მსუბუქ `scale`, ჩრდილი), ბარათების მსუბუქი აწევა, **focus-visible** კლავიატურისთვის. ყოველთვის `prefers-reduced-motion`, არა ახალი RPC/URL. დეტალი — ინგლისურად თითო `docs/*_POLISH.md` → **Innovation**. |
| **`docs/SETTINGS_POLISH.md`** | **`/settings`** — ანგარიში, პაროლი, თემა, პრივატულობა, Premium, წაშლა; ინგლისური სკოპი. |
| **`docs/PROFILE_POLISH.md`** | **`/profile`** (საკუთარი) — ჰერო, სტატისტიკა, ტაბები, პოსტების სია; ინგლისური სკოპი. |
| **Cowork პრომპტი (polish)** | ქვემოთ **საერთო ინგლისური ბლოკი** — ჩასვი ყოველ polish სესიაში + შესაბამისი `docs/*_POLISH.md` წაკითხვა. |
| **`supabase/SCHEMA.md`** | public DB სქემის მიმოხილვა (ცხრილები, RPC, Storage, rate limits). |
| **`supabase/ACCOUNT_DELETION_DESIGN.md`** | ანგარიშის წაშლა (Supabase): Edge Function, CASCADE, Storage — **დეპლოი სავალდებულოა** (`README` → Edge Function სექცია). |
| **`.cursor/rules/reziizi.mdc`** | Cursor წესები: ენა, მიდგომა, **პროექტის დაცვა** (არ გავაფუჭოთ / არ გავტეხოთ — სკოპი, რიგი, გარე ჩატი ≠ სპეკი), **v1/v2 იმპლემენტაციის რიგი**, **მიგრაციების თანმიმდევრობა**, **იმპლემენტაციამდე: შემოწმება → დოკუმენტი → მერე კოდი**, Supabase/Git. |
| **`src/hooks/useInfiniteScroll.ts`** | ინფინიტი სქროლი: `IntersectionObserver` სენტინელი — **`HomePage`**, **`ProfilePage`** (Commented), **`UserProfilePage`**, **`UserFollowListPage`**; „Load More“ ღილაკი აღარ გამოიყენება ამ სიებში. |
| **`src/`** | აპის კოდი — `pages/`, `components/`, `hooks/`, `lib/supabaseClient.ts`. |

**Cowork / გარე AI — საერთო polish ნაწილი (ინგლისური, ჩასასმელი ყველა `docs/*_POLISH.md` სესიაში):**

```
INNOVATION (required — invent, not only execute):
- You must INVENT 1–3 tasteful micro-interactions for THIS page and implement what fits safely.
  Examples: hover lift or shadow on buttons/links/tabs; :active “press” (scale) on primary actions; subtle card hover; stronger focus-visible for keyboard users — pointer + keyboard should both feel polished.
- Do NOT only restyle spacing/colors — actively look for 1–2 “delight” moments (CSS-only where possible).
- Still forbidden without spec: new RPCs, query keys, URL/query params, feature-flag semantics, heavy JS (e.g. staggered list animation with per-item delay).
- All motion: respect prefers-reduced-motion: reduce (disable or instant).
- In your summary: bullets for what you invented (done or skipped). If truly nothing fit: “No extra inventions — polish only.”
```

**ახალი ჩატის მინიმალური წესი:** ჯერ **`## CURRENT WORK`** `docs/project.md`, შემდეგ **`reziizi.mdc`** (v1/v2 რიგი, migrations ცხრილი, **იმპლემენტაციამდე** 4 ნაბიჯი). ახალი ფიჩა: თანმიმდევრობა არ ემთხვევა სპეკს → **ჯერ დოკუმენტი**, მერე კოდი.

**ფაზა A / B / C (არ ავირიოთ სკოპში):** სრული განსაზღვრება + „რა დასრულებულია vs გახსნილი“ — **`docs/project.md` → `### შემდეგი ფაზა — A / B / C`**. მუშაობისას აირჩიე **ერთი** ფაზა; **არ** მოითხოვო B-ში რაც მხოლოდ C-შია (ან პირიქით) — იხილე იქაური ცხრილი „შედის / არ შედის სკოპში“.

**გარე AI (ChatGPT, Claude და სხვ.):** ზოგადი მიდგომა — **`.cursor/rules/reziizi.mdc` → „გარე ჩატი vs Cursor“** (იდეის დახვეწა; Cursor გიმზადებს პრომპტს; გარე პასუხი ისევ Cursor-ში — იქიდან მხოლოდ REZIIZI-ს მორგებული; წყარო სპეკი — `docs/project.md`). **Anti-spam (49)** — დამატებითი სპეციფიკა **`## CURRENT WORK` → `#### Anti-spam (49)`** (კონფიგი + checklist + Appendix).

## ლოკალურად გაშვება

```bash
cd reziizi
cp .env.example .env   # Windows: copy .env.example .env
# შეავსე VITE_SUPABASE_URL და VITE_SUPABASE_ANON_KEY (Supabase Dashboard → Settings → API)
npm install
npm run dev
```

## სად ვართ ახლა (მაღალი დონე)

- **ტალღები 1 → 2 → 3 → 4+:** **`docs/project.md` → `## CURRENT WORK`** — **„ტალღები“** (ფუნდამენტი vs polish) + ცხრილი **„MASTER 1–51 — იმპლემენტაცია vs მომავალი ტალღა“** (დასრულებული baseline; მომავალი: **2** polish·i18n·audit / **3** Stripe·ლანჩი / **4+** push·ops·§50). გაფართოება იგივე არქიტექტურაზე — **`reziizi.mdc`**: ჯერ დოკუმენტი, მერე კოდი. **ტალღა 2-ში motion/დიზაინის პირველი პრიორიტეტი:** Claude-ის შეთანხმებული ხაზი — **`docs/MOTION_SOUND_POLISH.md`**, დადასტურება **`docs/JOURNAL.md` → 2026-04-09**.
- **v1 core:** Supabase + აპი (Auth, feed, reactions, profile, settings, `/legal`); **UI ტოკენები + მობილური ბაზა** — `styles.css` / `index.html`.
- **v2:** **Comments**, **Search**, **Theme**, **Notifications**, **Tags**, **Trending**, **Chat**, **Ranking (17)** — net score `PostCard`-ზე; **`supabase/migrations/`** სრულად **გაშვებულია production Supabase-ზე** (დადასტურებული — `docs/project.md` **CURRENT WORK**).
- **v3:** **Admin** … **API Layer**, **Database Structure**, **Caching (30)**, **Logging (31)**, **Error Handling (32)**, **Deployment (37)**, **Testing (41)** (Vitest), **Performance (36)** (lazy routes) — სრულად `docs/project.md` → **REZIIZI v3**. **Localization (44):** `en` / `ka` / `ru` — `src/i18n/messages.ts`, მთავარი ფიჩა-გვერდები + **Admin** `t()`-ით; დარჩენილი სკოპი → `docs/project.md` **§44** + **CURRENT WORK**.
- **შემდეგი განვითარება:** `docs/project.md` → **`## CURRENT WORK`** → **„შემდეგი განვითარების გეგმა (შევსებადი)“** — იქ ჩაწერე პრიორიტეტები; v3 ტექნიკური baseline დასრულებულია. **Media (11)** / **Avatar (4)** — `docs/project.md` ცხრილი. **ანგარიშის წაშლა:** **production დადასტურებული** (Vercel `/api/delete-account` + Supabase Auth/Storage) — `docs/project.md` **CURRENT WORK**, `README.md`. **Email/Auth (45):** password reset + signup email confirmation flow **დადასტურებულია production-ზე** (`https://www.metafeed.it.com`); custom SMTP/alerts — მოგვიანებით (`README` → Auth URL). **ბიზნესი / Premium (§24):** ოფიციალური რიგი და რისკების დაზღვევა — **`docs/project.md` → `#### ბიზნესი / §24 — განვითარების გადაწყვეტილება`**; ტექნიკა — `README` → „Stripe Premium“ (Edge `create-checkout-session` + `stripe-webhook`; Settings-ში checkout — **`VITE_BILLING_CHECKOUT_ENABLED=true`** როცა Stripe მზადაა). **API rate limit** — delete-account (`README`). **Tests:** `npm test`. **CI:** GitHub (`ci.yml`). **Production:** `README.md` → **„Production deployment“** (Vercel).

## გარე ასისტენტები — უსაფრთხო რეჟიმი (მუდმივი)

- გარე AI (Claude/ChatGPT/სხვა) გამოყენებისას **წყარო სიმართლე** არის მხოლოდ რეპო: `docs/project.md`, `docs/JOURNAL.md`, `AGENTS.md`, `.cursor/rules/reziizi.mdc`.
- არ უნდა გაკეთდეს „დიდი რეფაქტორი“ ან DB-ფუნდამენტის ცვლილება ერთი სესიით/უგეგმოდ.
- უკვე გაშვებულ Supabase migrations-ზე ისტორიის გადაწერა/rename არა — ახალი ცვლილება ყოველთვის ახალი migration-ით.
- სკოპი თუ ბუნდოვანია, ჯერ დოკუმენტში ჩაიწეროს, მერე კოდი.

## კომუნიკაცია და კოდი

- ჩატი პროექტზე: **ქართული** (მომხმარებლის წესი).
- **კოდი** (სახელები, კომენტარები): **ინგლისური**. **UI ტექსტი მომხმარებლისთვის:** სამი ლოკალი — `messages.en` / `messages.ka` / `messages.ru` (`useI18n().t()`); **წყარო/ძირითადი ვერსია** ინგლისურში `messages.ts`-ში. სერვერის შეცდომის სტრინგები ხშირად ინგლისურია. სრულად — `reziizi.mdc` → „ენა“, `docs/project.md` → **§44 Localization**.

## Supabase CLI (სისტემაში)

- `supabase` — Scoop shim-ით (Windows); migrations / link საჭიროებისამებრ.
- **ერთი** Supabase პროექტი (Production) — სხვა ინსტანცია არ არის სავალდებულო MVP-სთვის.

---

*ბოლო განახლება: ხელით შეავსე, როცა დიდი ეტაპი იცვლება (ან დაუმატე ჩანაწერი `docs/JOURNAL.md`-ში).*
