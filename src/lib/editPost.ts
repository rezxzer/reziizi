import { supabase } from "./supabaseClient.ts";

const BODY_MIN = 1;
const BODY_MAX = 5000;

/**
 * Validate post body before update.
 * Returns null if valid, or an error message string.
 */
export function validatePostBody(raw: string): string | null {
  const t = raw.trim();
  if (t.length < BODY_MIN) {
    return "Post body cannot be empty.";
  }
  if (t.length > BODY_MAX) {
    return `Post body must be at most ${BODY_MAX} characters.`;
  }
  return null;
}

/**
 * Update a post's body text.
 * RLS ensures only the owner (non-banned) can update.
 * The DB trigger `prevent_user_editing_spam_columns_posts` re-runs
 * anti-spam heuristics on body change automatically.
 *
 * Returns `{ flagged }` so UI can show a hint if the edit got auto-flagged.
 */
export async function updatePostBody(
  postId: string,
  newBody: string,
): Promise<{ flagged: boolean }> {
  const trimmed = newBody.trim();
  const err = validatePostBody(trimmed);
  if (err) {
    throw new Error(err);
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ body: trimmed })
    .eq("id", postId)
    .select("is_flagged")
    .single();

  if (error) {
    throw error;
  }

  return { flagged: (data as { is_flagged: boolean }).is_flagged };
}
