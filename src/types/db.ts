/** Row shapes for Supabase public tables (keep in sync with migrations). */

export type ProfileRow = {
  id: string;
  email: string | null;
  created_at: string;
};

export type PostRow = {
  id: string;
  user_id: string;
  body: string;
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
  created_at: string;
  updated_at: string;
};

export type TagRow = {
  id: string;
  slug: string;
  created_at: string;
};

export type NotificationType = "comment" | "reaction";

export type NotificationRow = {
  id: string;
  user_id: string;
  type: NotificationType;
  actor_id: string;
  post_id: string;
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
