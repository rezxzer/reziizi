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
    /** Whether viewerId has a pending follow request to targetId. */
    requested: (viewerId: string, targetId: string) => ["follow", "requested", viewerId, targetId] as const,
    /** Pending incoming follow requests for the current user. */
    pendingRequests: (userId: string) => ["follow", "pendingRequests", userId] as const,
    pendingCount: (userId: string) => ["follow", "pendingCount", userId] as const,
  },
  block: {
    relation: (viewerId: string, targetId: string) => ["block", "rel", viewerId, targetId] as const,
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
  /**
   * Feature flags — **two keys**: public map vs admin rows (same Supabase table, different shapes).
   * Do not share one key: React Query would cache an object where an array is expected (or vice versa).
   */
  featureFlags: {
    map: ["featureFlags", "map"] as const,
    adminRows: ["featureFlags", "adminRows"] as const,
  },
  trendingTags: ["trendingTags"] as const,
  /** Sponsored placement applications (`ad_placement_requests`). */
  adPlacementRequests: {
    mine: (userId: string) => ["adPlacementRequests", "mine", userId] as const,
    adminList: ["adPlacementRequests", "admin"] as const,
  },
  /** Free tier: posts with `video_url` today (UTC day) — RPC `my_post_video_count_today`. */
  postVideoToday: (userId: string) => ["posts", userId, "videoToday"] as const,
} as const;
