import { supabase } from "./supabaseClient.ts";
import { TABLE } from "./api/registry.ts";

/** Catalog of allowed emoji reaction codes. Matches the DB check constraint. */
export type EmojiCode =
  | "thumbs_up"
  | "heart"
  | "laugh"
  | "wow"
  | "fire"
  | "celebrate"
  | "clap";

/** Display glyph for each code — kept in code so we don't store emoji bytes in the DB. */
export const EMOJI_GLYPH: Readonly<Record<EmojiCode, string>> = Object.freeze({
  thumbs_up: "👍",
  heart: "❤️",
  laugh: "😂",
  wow: "😮",
  fire: "🔥",
  celebrate: "🎉",
  clap: "👏",
});

/** Fixed display order in the bar. */
export const EMOJI_ORDER: readonly EmojiCode[] = Object.freeze([
  "thumbs_up",
  "heart",
  "laugh",
  "wow",
  "fire",
  "celebrate",
  "clap",
]);

/** Aggregated per-emoji state for one post. */
export type PostEmojiState = {
  /** Total count of users who picked that emoji on this post. */
  counts: Readonly<Record<EmojiCode, number>>;
  /** Emojis the current user has picked, for highlighting. */
  mine: ReadonlySet<EmojiCode>;
};

function emptyCounts(): Record<EmojiCode, number> {
  return {
    thumbs_up: 0,
    heart: 0,
    laugh: 0,
    wow: 0,
    fire: 0,
    celebrate: 0,
    clap: 0,
  };
}

/**
 * Load all emoji reactions for a post and bucket them.
 *
 * Returns counts keyed by `EmojiCode` and the set of codes the current user
 * has chosen — needed to render an "active" highlight in the bar.
 */
export async function fetchPostEmojiState(
  postId: string,
  myUserId: string | null,
): Promise<PostEmojiState> {
  const { data, error } = await supabase
    .from(TABLE.post_emoji_reactions)
    .select("user_id, emoji_code")
    .eq("post_id", postId);

  if (error) {
    throw error;
  }

  const counts: Record<EmojiCode, number> = emptyCounts();
  const mine: Set<EmojiCode> = new Set();

  for (const row of (data ?? []) as { user_id: string; emoji_code: EmojiCode }[]) {
    counts[row.emoji_code] = (counts[row.emoji_code] ?? 0) + 1;
    if (myUserId !== null && row.user_id === myUserId) {
      mine.add(row.emoji_code);
    }
  }

  return { counts, mine };
}

/**
 * Insert one (post, user, emoji_code) row. Idempotent at the DB level via the
 * unique constraint, so a duplicate insert is a no-op error we swallow.
 */
export async function addEmojiReaction(
  postId: string,
  userId: string,
  emoji: EmojiCode,
): Promise<void> {
  const { error } = await supabase
    .from(TABLE.post_emoji_reactions)
    .insert({ post_id: postId, user_id: userId, emoji_code: emoji });
  if (error) {
    // Postgres unique-violation code — user already had this emoji on the post.
    if (error.code === "23505") {
      return;
    }
    throw error;
  }
}

/** Remove the current user's reaction of a specific emoji on a post. */
export async function removeEmojiReaction(
  postId: string,
  userId: string,
  emoji: EmojiCode,
): Promise<void> {
  const { error } = await supabase
    .from(TABLE.post_emoji_reactions)
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId)
    .eq("emoji_code", emoji);
  if (error) {
    throw error;
  }
}
