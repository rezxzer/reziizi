# REZIIZI — სწრაფი კონტექსტი (ახალი ჩატი / AI)

ამ ფაილის მიზანია: **ახალ სესიაში** სწრაფად გაიგო პროექტი — სად რა წერია და რა რიგით ვაკეთებთ.

## რა არის ეს

- **REZIIZI** — სოციალური ქსელის MVP (v1) → შემდეგ v2/v3.
- **სტეკი:** React (Vite) + TypeScript + Supabase (`@supabase/supabase-js`).
- **რეპო:** GitHub-ზე; `.env` **არ უნდა** იყოს კომიტში (იხილე `.gitignore`).

## ფოლდერების განლაგება (არ არის „გაფანტული“ — ეს არის სტანდარტი)

ყველაფერი **ერთ რეპოში**ა: **დოკუმენტაცია ფესვში**, **კოდი `src/`-ში**, **ინსტრუმენტები/კონფიგი ფესვში**. ცალკე `docs/` ფოლდერი არ გვაქვს — `project.md` უკვე „ცოცხალი“ სპეკია; თუ გინდა მომავალში, შეგიძლია დაამატო `docs/` და გადაიტანო ან დაუკავშირო.

```
reziizi/
├── .cursor/rules/          # Cursor AI წესები (reziizi.mdc)
├── src/
│   ├── components/         # განმეორებადი UI (Layout, …)
│   ├── pages/              # გვერდები = მარშრუტები (HomePage, LoginPage, …)
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
├── project.md              # სრული სპეკი + CURRENT WORK
├── JOURNAL.md              # ჟურნალი
├── AGENTS.md               # ეს ფაილი — ახალი ჩატისთვის
└── README.md               # მოკლე quick start
```

**არ ინახება რეპოში:** `node_modules/`, `dist/`, `.env` (იხილე `.gitignore`).

## სად არის სიმართი (დოკუმენტების რუკა)

| ფაილი / ფოლდერი | რისთვის |
|-----------------|--------|
| **`README.md`** | Quick start, tests, **GitHub Actions (CI)**, **Production deployment (GitHub + Vercel + Supabase)** — სრული ნაბიჯები. |
| **`project.md`** | სრული სპეკი: feature-ები 1–51, VERSIONS (MVP/v2/v3), **FEATURE BREAKDOWN**, **CURRENT WORK** (დასრულებული სტატუსი + **შემდეგი განვითარების გეგმა (შევსებადი)** ცხრილი). |
| **`JOURNAL.md`** | ქრონოლოგია — რა გაკეთდა, რა გადაწყვიტე (მოკლე ჩანაწერები). |
| **`supabase/SCHEMA.md`** | public DB სქემის მიმოხილვა (ცხრილები, RPC, Storage, rate limits). |
| **`supabase/ACCOUNT_DELETION_DESIGN.md`** | ანგარიშის წაშლა (Supabase): Edge Function, CASCADE, Storage — **დეპლოი სავალდებულოა** (`README` → Edge Function სექცია). |
| **`.cursor/rules/reziizi.mdc`** | Cursor წესები: ენა, მიდგომა, **v1/v2 იმპლემენტაციის რიგი**, **მიგრაციების თანმიმდევრობა**, **იმპლემენტაციამდე: შემოწმება → დოკუმენტი → მერე კოდი**, Supabase/Git. |
| **`src/`** | აპის კოდი — `pages/`, `components/`, `lib/supabaseClient.ts`. |

**ახალი ჩატის მინიმალური წესი:** ჯერ **`## CURRENT WORK`** `project.md`, შემდეგ **`reziizi.mdc`** (v1/v2 რიგი, migrations ცხრილი, **იმპლემენტაციამდე** 4 ნაბიჯი). ახალი ფიჩა: თანმიმდევრობა არ ემთხვევა სპეკს → **ჯერ დოკუმენტი**, მერე კოდი.

## ლოკალურად გაშვება

```bash
cd reziizi
cp .env.example .env   # Windows: copy .env.example .env
# შეავსე VITE_SUPABASE_URL და VITE_SUPABASE_ANON_KEY (Supabase Dashboard → Settings → API)
npm install
npm run dev
```

## სად ვართ ახლა (მაღალი დონე)

- **v1 core:** Supabase + აპი (Auth, feed, reactions, profile, settings, `/legal`); **UI ტოკენები + მობილური ბაზა** — `styles.css` / `index.html`.
- **v2:** **Comments**, **Search**, **Theme**, **Notifications**, **Tags**, **Trending**, **Chat**, **Ranking (17)** — net score `PostCard`-ზე; migrations Supabase-ში.
- **v3:** **Admin** … **API Layer**, **Database Structure**, **Caching (30)**, **Logging (31)**, **Error Handling (32)**, **Deployment (37)**, **Testing (41)** (Vitest), **Performance (36)** (lazy routes) — სრულად `project.md` → **REZIIZI v3**.
- **შემდეგი განვითარება:** `project.md` → **`## CURRENT WORK`** → **„შემდეგი განვითარების გეგმა (შევსებადი)“** — იქ ჩაწერე პრიორიტეტები; v3 ტექნიკური baseline დასრულებულია. **Media (11)** / **Avatar (4)** — `project.md` ცხრილი. **ანგარიშის წაშლა:** **სტატუსი — მოგვიანებით** — production-ზე სტაბილურად არ მუშაობს; დაბრუნება დაგეგმილია (`project.md` → **CURRENT WORK**, `README.md`). **Email (45)** — მოგვიანებით (არა სავალდებულო). **Tests:** `npm test`. **CI:** GitHub (`ci.yml`). **Production:** `README.md` → **„Production deployment“** (Vercel).

## კომუნიკაცია და კოდი

- ჩატი პროექტზე: **ქართული** (მომხმარებლის წესი).
- კოდი, სახელები, UI სტრინგები MVP-ისთვის: **ინგლისური** — დეტალები `reziizi.mdc` → „ენა“.

## Supabase CLI (სისტემაში)

- `supabase` — Scoop shim-ით (Windows); migrations / link საჭიროებისამებრ.
- **ერთი** Supabase პროექტი (Production) — სხვა ინსტანცია არ არის სავალდებულო MVP-სთვის.

---

*ბოლო განახლება: ხელით შეავსე, როცა დიდი ეტაპი იცვლება (ან დაუმატე ჩანაწერი `JOURNAL.md`-ში).*
