import { supabase } from "./supabaseClient";
import type { CommentRow } from "../types/db";

const MAX_LEN = 2000;

export type CommentWithAuthor = CommentRow & {
  authorEmail: string | null;
  authorAvatarUrl: string | null;
};

export function getCommentMaxLength(): number {
  return MAX_LEN;
}

export async function fetchCommentsForPost(postId: string): Promise<CommentWithAuthor[]> {
  const { data: rows, error } = await supabase
    .from("comments")
    .select("id, post_id, user_id, body, is_flagged, spam_score, created_at, updated_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const list: CommentRow[] = rows ?? [];
  if (list.length === 0) {
    return [];
  }

  const userIds = [...new Set(list.map((c) => c.user_id))];
  const { data: profiles, error: profError } = await supabase
    .from("profiles")
    .select("id, email, avatar_url")
    .in("id", userIds);

  if (profError) {
    throw profError;
  }

  const emailById = new Map<string, string | null>();
  const avatarById = new Map<string, string | null>();
  for (const p of profiles ?? []) {
    const row = p as { id: string; email: string | null; avatar_url: string | null };
    emailById.set(row.id, row.email);
    avatarById.set(row.id, row.avatar_url ?? null);
  }

  return list.map((c) => ({
    ...c,
    authorEmail: emailById.get(c.user_id) ?? null,
    authorAvatarUrl: avatarById.get(c.user_id) ?? null,
  }));
}
