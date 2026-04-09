import { supabase } from "./supabaseClient.ts";

/** Row counts for admin dashboard (client-side aggregate; OK for small data). */
export type PlatformMetrics = {
  profiles: number;
  posts: number;
  comments: number;
  reactions: number;
  reports: number;
  user_reports: number;
  blocks: number;
  follow_requests: number;
  tags: number;
  post_tags: number;
  conversations: number;
  chat_messages: number;
  notifications: number;
  ad_slots: number;
};

export async function fetchPlatformMetrics(): Promise<PlatformMetrics> {
  const [
    profiles,
    posts,
    comments,
    reactions,
    reports,
    user_reports,
    blocks,
    follow_requests,
    tags,
    post_tags,
    conversations,
    chat_messages,
    notifications,
    ad_slots,
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase.from("reactions").select("*", { count: "exact", head: true }),
    supabase.from("reports").select("*", { count: "exact", head: true }),
    supabase.from("user_reports").select("*", { count: "exact", head: true }),
    supabase.from("blocks").select("*", { count: "exact", head: true }),
    supabase.from("follow_requests").select("*", { count: "exact", head: true }),
    supabase.from("tags").select("*", { count: "exact", head: true }),
    supabase.from("post_tags").select("*", { count: "exact", head: true }),
    supabase.from("conversations").select("*", { count: "exact", head: true }),
    supabase.from("chat_messages").select("*", { count: "exact", head: true }),
    supabase.from("notifications").select("*", { count: "exact", head: true }),
    supabase.from("ad_slots").select("*", { count: "exact", head: true }),
  ]);

  const err =
    profiles.error ??
    posts.error ??
    comments.error ??
    reactions.error ??
    reports.error ??
    user_reports.error ??
    blocks.error ??
    follow_requests.error ??
    tags.error ??
    post_tags.error ??
    conversations.error ??
    chat_messages.error ??
    notifications.error ??
    ad_slots.error;

  if (err) {
    throw err;
  }

  return {
    profiles: profiles.count ?? 0,
    posts: posts.count ?? 0,
    comments: comments.count ?? 0,
    reactions: reactions.count ?? 0,
    reports: reports.count ?? 0,
    user_reports: user_reports.count ?? 0,
    blocks: blocks.count ?? 0,
    follow_requests: follow_requests.count ?? 0,
    tags: tags.count ?? 0,
    post_tags: post_tags.count ?? 0,
    conversations: conversations.count ?? 0,
    chat_messages: chat_messages.count ?? 0,
    notifications: notifications.count ?? 0,
    ad_slots: ad_slots.count ?? 0,
  };
}
