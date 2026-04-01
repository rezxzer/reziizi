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
