# REZIIZI — assistant handoff (Claude / others)

Short orientation. **Full map:** read **`AGENTS.md`** next (repo layout, doc index, polish rules). **Authoritative spec:** **`docs/project.md`** → **`## CURRENT WORK`**.

## Stack & layout

- **React (Vite) + TypeScript + Supabase** (`@supabase/supabase-js`). App code: **`src/`** (`pages/`, `components/`, `hooks/`, `lib/`). DB: **`supabase/migrations/`**, **`supabase/SCHEMA.md`**.
- **Global CSS only:** **`src/styles.css`** — reuse existing class names; do not scatter one-off page CSS without a reason.

## Rules of engagement (do not skip)

1. **`docs/project.md` is the spec.** If a request conflicts with **CURRENT WORK**, **FEATURE BREAKDOWN**, or migration order — flag it; do not silently invent scope.
2. **External chat ideas ≠ product spec** until captured in **`docs/project.md`** (see **`.cursor/rules/reziizi.mdc`** — “external chat vs Cursor”).
3. **Implementation order:** check CURRENT WORK + **`reziizi.mdc`** → update docs if scope changes → SQL/RLS if needed → then code. **New tables/RPCs:** wire through **`src/lib/api/registry.ts`** (and related patterns already in the repo).
4. **Secrets:** API keys / service role only in **`.env`** / host secrets — never commit, never paste full keys in chat.
5. **Localization:** user-facing strings via **`src/i18n/messages.ts`** and **`t()`** (`en` / `ka` / `ru`); English is the source locale in `messages`. **Code** (names, comments): English. **Project chat with the team:** often Georgian — still keep code/docs artifacts as per repo conventions.

## Where to read what

| Need | File |
|------|------|
| Roadmap, status, next steps | **`docs/project.md`** (**CURRENT WORK**, “შემდეგი განვითარების გეგმა”) |
| Recent decisions / chronology | **`docs/JOURNAL.md`** (newest entries at top) |
| v1/v2 order, **migration sequence**, guardrails | **`.cursor/rules/reziizi.mdc`** |
| Run, CI, deploy | **`README.md`** |
| Per-page UI polish scope (English) | **`docs/HOME_PAGE_POLISH.md`**, **`docs/*_POLISH.md`**, especially **`docs/MOTION_SOUND_POLISH.md`** |
| Wave 2 motion/sound **priority** (product-confirmed) | **`docs/MOTION_SOUND_POLISH.md`** + **`docs/JOURNAL.md`** → **2026-04-09** consolidated entry |

## Motion / sound / route transitions

- Follow **`docs/MOTION_SOUND_POLISH.md`** (Tier 1–3, route map, sound rules, `prefers-reduced-motion`). **Do not** add random global animations or new RPCs/URLs for “delight.”
- Route-level behavior lives around **`LayoutOutlet`** / **`styles.css`** — align with the tier model.

## Concrete pitfalls (already burned us)

- **Hidden `<input type="file">`:** do not use `position: absolute; inset: 0` on a huge hit area without a tightly scoped `position: relative` parent. Prefer off-screen + `pointer-events: none` + `inputRef.current?.click()` from a real button — **`docs/JOURNAL.md`** (2026-04-07).
- **Vite dev HTTP 431 on `localhost`:** oversized cookies — **`package.json`** `dev` script (`--max-http-header-size`) and **`docs/JOURNAL.md`**.

## Verification

- Before claiming a change is good: **`npm test`** and **`npm run build`** when the task touches app code (project standard).
