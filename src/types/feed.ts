import type { PostRow } from "./db";

export type FeedPost = PostRow & {
  /** Public display name from `profiles.display_name` (trimmed); never fall back to email in UI. */
  authorDisplayName: string | null;
  /** Kept for admin tools; do not show in public post/comment UI. */
  authorEmail: string | null;
  authorAvatarUrl: string | null;
  thumbsUp: number;
  thumbsDown: number;
  myReaction: -1 | 1 | null;
  tagSlugs: string[];
};
