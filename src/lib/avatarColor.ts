/**
 * Deterministic gradient picker for fallback (initials) avatars.
 *
 * Same seed always returns the same gradient, so a given user keeps a
 * consistent identity color across the entire app — feed, comments,
 * profile, search, notifications. Pure function: no DB, no React, no
 * randomness.
 *
 * The palette is hand-tuned to harmonise with the existing brand pink/
 * purple/orange (see `.layout__brand` gradient in `styles.css`) and to
 * keep enough chroma contrast against white text for the initial.
 */

const AVATAR_GRADIENTS: readonly string[] = [
  "linear-gradient(135deg, #E1306C, #833AB4)", // brand pink → purple (default)
  "linear-gradient(135deg, #833AB4, #F77737)", // purple → orange
  "linear-gradient(135deg, #F77737, #E1306C)", // orange → pink
  "linear-gradient(135deg, #4F46E5, #06B6D4)", // indigo → cyan
  "linear-gradient(135deg, #06B6D4, #10B981)", // cyan → emerald
  "linear-gradient(135deg, #10B981, #FBBF24)", // emerald → amber
  "linear-gradient(135deg, #FBBF24, #F77737)", // amber → orange
  "linear-gradient(135deg, #EC4899, #8B5CF6)", // rose → violet
  "linear-gradient(135deg, #8B5CF6, #3B82F6)", // violet → blue
  "linear-gradient(135deg, #3B82F6, #06B6D4)", // blue → cyan
  "linear-gradient(135deg, #14B8A6, #6366F1)", // teal → indigo
  "linear-gradient(135deg, #F59E0B, #EF4444)", // amber → red
];

const FALLBACK_GRADIENT: string = AVATAR_GRADIENTS[0]!;

/**
 * Pick a deterministic gradient string for the given seed.
 *
 * Empty / null / undefined seeds resolve to the brand default (index 0).
 * Hash uses a small djb2-style mixer; collisions are fine — we only
 * need stable assignment, not cryptographic uniqueness.
 */
export function avatarGradientForSeed(seed: string | null | undefined): string {
  if (seed === null || seed === undefined || seed.length === 0) {
    return FALLBACK_GRADIENT;
  }
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const index: number = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index] ?? FALLBACK_GRADIENT;
}

/** Exposed for tests so the palette assertion stays in sync. */
export const AVATAR_GRADIENT_COUNT: number = AVATAR_GRADIENTS.length;
