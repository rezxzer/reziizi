import type { PostRow } from "./db";

export type FeedPost = PostRow & {
  authorEmail: string | null;
  thumbsUp: number;
  thumbsDown: number;
  myReaction: -1 | 1 | null;
  tagSlugs: string[];
};
