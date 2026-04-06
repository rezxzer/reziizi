/**
 * Canonical names for Supabase `public` tables and RPCs used by the web app.
 * Keep in sync with `supabase/migrations/`, `supabase/verify_schema.sql`, and `supabase/SCHEMA.md`.
 */

export const TABLE = {
  profiles: "profiles",
  posts: "posts",
  reactions: "reactions",
  comments: "comments",
  notifications: "notifications",
  tags: "tags",
  post_tags: "post_tags",
  conversations: "conversations",
  chat_messages: "chat_messages",
  reports: "reports",
  ad_slots: "ad_slots",
  follows: "follows",
  /** Audit rows for auto-flagged content (admin SELECT only). */
  abuse_flags: "abuse_flags",
  /** Admin-toggled; public SELECT — home feed hides UI when off. */
  feature_flags: "feature_flags",
} as const;

export type TableName = (typeof TABLE)[keyof typeof TABLE];

/** RPCs invoked from the client (`supabase.rpc`). */
export const RPC = {
  feed_post_ids_by_tag: "feed_post_ids_by_tag",
  feed_trending_post_ids: "feed_trending_post_ids",
  user_commented_post_ids: "user_commented_post_ids",
  search_post_ids: "search_post_ids",
  search_profile_ids: "search_profile_ids",
  get_or_create_conversation: "get_or_create_conversation",
  admin_set_user_banned: "admin_set_user_banned",
  admin_set_user_premium_until: "admin_set_user_premium_until",
} as const;

export type RpcName = (typeof RPC)[keyof typeof RPC];
