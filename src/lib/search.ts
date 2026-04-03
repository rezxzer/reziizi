import type { PostRow, ProfileRow } from "../types/db";
import type { FeedPost } from "../types/feed";
import { enrichPosts } from "./feed";
import { supabase } from "./supabaseClient";

const MAX_QUERY_LEN = 120;
const MIN_QUERY_LEN = 2;
const RESULT_LIMIT = 40;

/** Strips LIKE wildcards so user input cannot broaden matches unexpectedly. */
export function sanitizeSearchQuery(raw: string): string {
  return raw
    .trim()
    .replace(/[%_\\]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, MAX_QUERY_LEN);
}

export function isSearchQueryValid(q: string): boolean {
  return q.length >= MIN_QUERY_LEN;
}

export async function searchPostsByBody(query: string): Promise<FeedPost[]> {
  const pattern: string = sanitizeSearchQuery(query);
  if (!isSearchQueryValid(pattern)) {
    return [];
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, user_id, body, image_url, video_url, created_at, updated_at")
    .ilike("body", `%${pattern}%`)
    .order("created_at", { ascending: false })
    .limit(RESULT_LIMIT);

  if (error) {
    throw error;
  }

  return enrichPosts((data ?? []) as PostRow[]);
}

/**
 * Email search respects `profiles.searchable` (Privacy).
 * Signed-in users always see their own row if the email matches, even when not searchable.
 */
export async function searchProfilesByEmail(
  query: string,
  viewerId?: string | null,
): Promise<ProfileRow[]> {
  const pattern: string = sanitizeSearchQuery(query);
  if (!isSearchQueryValid(pattern)) {
    return [];
  }

  let q = supabase
    .from("profiles")
    .select(
      "id, email, avatar_url, created_at, is_admin, is_banned, ban_reason, banned_at, premium_until, searchable",
    )
    .ilike("email", `%${pattern}%`)
    .order("created_at", { ascending: false })
    .limit(RESULT_LIMIT);

  if (viewerId != null && viewerId.length > 0) {
    q = q.or(`searchable.eq.true,id.eq.${viewerId}`);
  } else {
    q = q.eq("searchable", true);
  }

  const { data, error } = await q;

  if (error) {
    throw error;
  }

  return (data ?? []) as ProfileRow[];
}
