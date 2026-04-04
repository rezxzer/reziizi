/** Row shapes for Supabase public tables (keep in sync with migrations and `supabase/SCHEMA.md`). */

export type ProfileRow = {
  id: string;
  email: string | null;
  /** Public URL in Storage (`avatars` bucket). */
  avatar_url: string | null;
  is_admin: boolean;
  is_banned: boolean;
  ban_reason: string | null;
  banned_at: string | null;
  premium_until: string | null;
  searchable: boolean;
  /** In-app notifications for comments on your posts (default true). */
  notify_on_comment: boolean;
  /** In-app notifications for reactions on your posts (default true). */
  notify_on_reaction: boolean;
  /** In-app notifications for new followers (default true). */
  notify_on_follow: boolean;
  created_at: string;
};

export type PostRow = {
  id: string;
  user_id: string;
  body: string;
  /** Public URL from Storage (`post-images`); null if no image. Mutually exclusive with `video_url`. */
  image_url: string | null;
  /** Public URL from Storage (`post-videos`); null if no video. Mutually exclusive with `image_url`. */
  video_url: string | null;
  /** Anti-spam: hidden from public lists when true (author/admin still see). */
  is_flagged: boolean;
  spam_score: number;
  created_at: string;
  updated_at: string;
};

export type ReactionRow = {
  id: string;
  post_id: string;
  user_id: string;
  value: -1 | 1;
  created_at: string;
};

export type CommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  is_flagged: boolean;
  spam_score: number;
  created_at: string;
  updated_at: string;
};

export type TagRow = {
  id: string;
  slug: string;
  created_at: string;
};

export type NotificationType = "comment" | "reaction" | "follow";

export type NotificationRow = {
  id: string;
  user_id: string;
  type: NotificationType;
  actor_id: string;
  post_id: string | null;
  comment_id: string | null;
  read_at: string | null;
  created_at: string;
};

export type ConversationRow = {
  id: string;
  user_a: string;
  user_b: string;
  last_message_at: string;
  created_at: string;
};

export type ChatMessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type ReportRow = {
  id: string;
  reporter_id: string;
  post_id: string;
  reason: string;
  created_at: string;
};

export type FollowRow = {
  follower_id: string;
  following_id: string;
  created_at: string;
};

export type AdSlotRow = {
  id: string;
  placement: string;
  title: string;
  body: string;
  link_url: string | null;
  is_active: boolean;
  updated_at: string;
};
