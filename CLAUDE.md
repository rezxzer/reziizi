# REZIIZI — assistant handoff (Claude / others)

- **Spec / roadmap:** `project.md` (**CURRENT WORK**), **`reziizi.mdc`** (order, migrations).
- **What changed recently (human-readable):** **`JOURNAL.md`** (newest entries at the top).
- **Global styles:** single file **`src/styles.css`** — UI fixes belong there with existing class names.
- **Hidden `<input type="file">`:** do not use `position: absolute; inset: 0` on a large hit area without a tightly scoped `position: relative` parent; prefer off-screen + `pointer-events: none` + open via `inputRef.current?.click()` from a real button (see **JOURNAL.md** — 2026-04-07).
- **Vite dev `431`:** large cookies on `localhost` — see **`package.json`** `dev` script (`--max-http-header-size`) and **JOURNAL.md**.
