# Motion + Sound polish scope (pilot -> system)

Read before adding animations or sounds. This document prevents random per-page effects and keeps behavior consistent.

**Product priority (Wave 2):** This motion + sound + route-transition system is the **official UI polish priority** for REZIIZI (Claude-proposed direction, **product-confirmed**). Do not treat competing one-off effects as equal scope — extend or adjust **within this tiered model**. Decision log: `JOURNAL.md` (2026-04-09 consolidated entry, Georgian) and `project.md` → **CURRENT WORK**.

## Goal

Build a reusable interaction system for visual motion + optional sound feedback.

- Start from the existing **Home <-> Search** page-turn pilot.
- Expand in phases with clear limits.
- Keep product usable, accessible, and performant.

## Non-negotiables

- Keep data/business logic unchanged.
- Do not change query keys, RPC contracts, URL semantics, or auth flow for animation work.
- Every new animation must respect `prefers-reduced-motion: reduce`.
- Audio must be user-gesture gated (browser autoplay rules).
- No loud/long sounds; subtle UI feedback only.

## Tier model (single source)

### Tier 1 — Global micro feedback (safe default)

- Hover / active / focus-visible polish for buttons, links, tabs.
- Small transforms and shadows only.
- No route-level overlays.

### Tier 2 — Contextual 3D accents (selected controls)

- Limited 3D tilt/press/flip for key controls.
- Use only where semantic value is high (primary CTA, major tabs, top nav items).
- Keep durations short and consistent.

### Tier 3 — Route transitions (high-impact, limited routes)

- Route-level effects such as page-turn overlays.
- Must be explicitly mapped by route pair (e.g. Home <-> Search).
- Never enable globally by default.

## Sound map rules

- Assign a small sound profile per interaction family:
  - `tap-soft`
  - `tap-primary`
  - `route-flip`
  - `success-soft`
  - `error-soft`
- Reuse profiles; do not invent new sound per button.
- Route sounds only for mapped transitions, not for every navigation.

## Current pilot

- **Active pilot:** Home <-> Search page-turn + flip sound.
- Heart overlay is currently part of the pilot motif.
- This is an experiment, not a global default.

## Rollout sequence

1. Finalize motion/sound tokens and durations.
2. Approve route transition map (which route pairs are allowed).
3. Apply Tier 1 globally where safe.
4. Apply Tier 2 selectively.
5. Keep Tier 3 restricted to approved route pairs.

## Files usually touched

- `src/styles.css` (motion layers, keyframes, class variants)
- `src/components/LayoutOutlet.tsx` (route transition wrapper + sound trigger)
- `src/pages/*` (only if class hooks are needed; avoid logic edits)
- `src/i18n/messages.ts` (only when UX copy changes)

## QA checklist

- Test with reduced motion ON.
- Test keyboard navigation focus states.
- Test route transition timing (no layout jump).
- Test sound only after user interaction.
- Verify no regression on mobile performance.
