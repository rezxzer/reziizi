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
│   ├── lib/                # კლიენტები (supabaseClient.ts)
│   ├── App.tsx             # Router
│   ├── main.tsx            # Entry
│   └── styles.css          # გლობალური სტილი (v1 UI)
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
| **`project.md`** | სრული სპეკი: feature-ები 1–51, VERSIONS (MVP/v2/v3), **FEATURE BREAKDOWN**, **CURRENT WORK**. |
| **`JOURNAL.md`** | ქრონოლოგია — რა გაკეთდა, რა გადაწყვიტე (მოკლე ჩანაწერები). |
| **`.cursor/rules/reziizi.mdc`** | Cursor წესები: ენა, მიდგომა, **REZIIZI v1 იმპლემენტაციის რიგი**, Supabase/Git. |
| **`src/`** | აპის კოდი — `pages/`, `components/`, `lib/supabaseClient.ts`. |

**ახალი ჩატის მინიმალური წესი:** ჯერ გადახედე **`## CURRENT WORK`** `project.md`-ში, შემდეგ **იმპლემენტაციის რიგი** `reziizi.mdc`-ში — არ გადააბიჯო ეტაპებს უგეგმველოდ.

## ლოკალურად გაშვება

```bash
cd reziizi
cp .env.example .env   # Windows: copy .env.example .env
# შეავსე VITE_SUPABASE_URL და VITE_SUPABASE_ANON_KEY (Supabase Dashboard → Settings → API)
npm install
npm run dev
```

## სად ვართ ახლა (მაღალი დონე)

- **Scaffold:** Vite + routes (`/`, `/login`, `/profile`, `/settings`, `/legal`) + placeholder UI — **გაკეთებულია**.
- **შემდეგი ტექნიკური ეტაპი (რიგით):** Supabase **`posts` + `reactions` ცხრილები და RLS** → შემდეგ **Auth** ინტეგრაცია → დანარჩენი v1 ფიჩები `reziizi.mdc`-ის რიგის მიხედვით.

## კომუნიკაცია და კოდი

- ჩატი პროექტზე: **ქართული** (მომხმარებლის წესი).
- კოდი, სახელები, UI სტრინგები MVP-ისთვის: **ინგლისური** — დეტალები `reziizi.mdc` → „ენა“.

## Supabase CLI (სისტემაში)

- `supabase` — Scoop shim-ით (Windows); migrations / link საჭიროებისამებრ.
- **ერთი** Supabase პროექტი (Production) — სხვა ინსტანცია არ არის სავალდებულო MVP-სთვის.

---

*ბოლო განახლება: ხელით შეავსე, როცა დიდი ეტაპი იცვლება (ან დაუმატე ჩანაწერი `JOURNAL.md`-ში).*
