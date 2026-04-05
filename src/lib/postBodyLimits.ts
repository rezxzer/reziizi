/** Free-plan max — must stay in sync with `posts_enforce_tier_limits` (migration `20260401351300_posts_tier_free_premium.sql`). */
export const POST_BODY_MAX_LENGTH_FREE = 1000;

/** Premium / admin max — matches DB `posts_body_length_check` upper bound. */
export const POST_BODY_MAX_LENGTH_PREMIUM = 5000;

export function getPostBodyMaxLength(isPremium: boolean, isAdmin: boolean): number {
  if (isAdmin) {
    return POST_BODY_MAX_LENGTH_PREMIUM;
  }
  return isPremium ? POST_BODY_MAX_LENGTH_PREMIUM : POST_BODY_MAX_LENGTH_FREE;
}
