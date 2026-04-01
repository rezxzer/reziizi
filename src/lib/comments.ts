import { supabase } from "./supabaseClient";
import type { CommentRow } from "../types/db";

const MAX_LEN = 2000;

export type CommentWithAuthor = CommentRow & {
  authorEmail: string | null;
};

export function getCommentMaxLength(): number {
  return MAX_LEN;
}

export async function fetchCommentsForPost(postId: string): Promise<CommentWithAuthor[]> {
  const { data: rows, error } = await supabase
    .from("comments")
    .select("id, post_id, user_id, body, created_at, updated_at")
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
    .select("id, email")
    .in("id", userIds);

  if (profError) {
    throw profError;
  }

  const emailById = new Map<string, string | null>();
  for (const p of profiles ?? []) {
    emailById.set(p.id, p.email);
  }

  return list.map((c) => ({
    ...c,
    authorEmail: emailById.get(c.user_id) ?? null,
  }));
}
