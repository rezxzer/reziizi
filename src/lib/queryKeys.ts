import type { FeedSortMode } from "./feed.ts";

/** Stable query keys for TanStack Query — use for invalidation and prefetch. */
export const queryKeys = {
  feed: {
    all: ["feed"] as const,
    list: (tag: string | null, sort: FeedSortMode) => ["feed", tag ?? "", sort] as const,
  },
  userPosts: (userId: string) => ["userPosts", userId] as const,
  profile: {
    flags: (userId: string) => ["profile", userId, "flags"] as const,
    /** Email + avatar_url for Profile / Settings. */
    display: (userId: string) => ["profile", userId, "display"] as const,
  },
} as const;
