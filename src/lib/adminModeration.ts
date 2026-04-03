import type { PostRow } from "../types/db";
import { removeStoredPostImageByPublicUrl } from "./postImageStorage.ts";
import { removeStoredPostVideoByPublicUrl } from "./postVideoStorage.ts";
import { supabase } from "./supabaseClient";

const LIST_LIMIT = 50;

export type ModerationPostRow = PostRow & {
  authorEmail: string | null;
};

export type ModerationCommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
  authorEmail: string | null;
};

async function emailsForUserIds(ids: string[]): Promise<Map<string, string | null>> {
  const map = new Map<string, string | null>();
  if (ids.length === 0) {
    return map;
  }
  const { data, error } = await supabase.from("profiles").select("id, email").in("id", ids);
  if (error) {
    throw error;
  }
  for (const row of data ?? []) {
    const r = row as { id: string; email: string | null };
    map.set(r.id, r.email);
  }
  return map;
}

export async function fetchPostsForModeration(): Promise<ModerationPostRow[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, user_id, body, image_url, video_url, created_at, updated_at")
    .order("created_at", { ascending: false })
    .limit(LIST_LIMIT);

  if (error) {
    throw error;
  }

  const rows: PostRow[] = (data ?? []) as PostRow[];
  const userIds: string[] = [...new Set(rows.map((r) => r.user_id))];
  const emails = await emailsForUserIds(userIds);

  return rows.map((r) => ({
    ...r,
    authorEmail: emails.get(r.user_id) ?? null,
  }));
}

export async function fetchCommentsForModeration(): Promise<ModerationCommentRow[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("id, post_id, user_id, body, created_at")
    .order("created_at", { ascending: false })
    .limit(LIST_LIMIT);

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as Omit<ModerationCommentRow, "authorEmail">[];
  const userIds: string[] = [...new Set(rows.map((r) => r.user_id))];
  const emails = await emailsForUserIds(userIds);

  return rows.map((r) => ({
    ...r,
    authorEmail: emails.get(r.user_id) ?? null,
  }));
}

export async function deletePostAsModerator(postId: string): Promise<void> {
  const { data: row, error: selectError } = await supabase
    .from("posts")
    .select("image_url, video_url")
    .eq("id", postId)
    .maybeSingle();

  if (selectError) {
    throw selectError;
  }

  const imageUrl: string | null = (row as { image_url: string | null } | null)?.image_url ?? null;
  const videoUrl: string | null = (row as { video_url: string | null } | null)?.video_url ?? null;

  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) {
    throw error;
  }

  await removeStoredPostImageByPublicUrl(imageUrl);
  await removeStoredPostVideoByPublicUrl(videoUrl);
}

export async function deleteCommentAsModerator(commentId: string): Promise<void> {
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) {
    throw error;
  }
}
