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
    /** Profile row fields for Profile / Settings: email, avatar, display_name, bio. */
    display: (userId: string) => ["profile", userId, "display"] as const,
    /** Posts the user commented on (RPC `user_commented_post_ids` + enrich). */
    commentedPosts: (userId: string) => ["profile", userId, "commentedPosts"] as const,
  },
  follow: {
    counts: (userId: string) => ["follow", "counts", userId] as const,
    relation: (viewerId: string, targetId: string) => ["follow", "rel", viewerId, targetId] as const,
  },
  /** Search results (posts + profiles); `viewerId` affects profile visibility (searchable). */
  search: {
    all: ["search"] as const,
    results: (pattern: string, viewerId: string | null) =>
      ["search", "results", pattern, viewerId ?? "__anon__"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    list: ["notifications", "list"] as const,
  },
} as const;
