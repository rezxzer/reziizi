import type { ProfileRow } from "../types/db";
import type { FeedPost } from "../types/feed";
import { fetchFeedPostsByIdsOrdered } from "./feed";
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

  const { data, error } = await supabase.rpc("search_post_ids", {
    p_query: pattern,
    p_limit: RESULT_LIMIT,
  });

  if (error) {
    throw error;
  }

  const ids: string[] = (data ?? []).map((r: { id: string }) => r.id);
  if (ids.length === 0) {
    return [];
  }

  return fetchFeedPostsByIdsOrdered(ids);
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

  const { data, error } = await supabase.rpc("search_profile_ids", {
    p_query: pattern,
    p_limit: RESULT_LIMIT,
    p_viewer_id: viewerId ?? null,
  });

  if (error) {
    throw error;
  }

  const ids: string[] = (data ?? []).map((r: { id: string }) => r.id);
  if (ids.length === 0) {
    return [];
  }

  const { data: rows, error: fetchError } = await supabase
    .from("profiles")
    .select(
      "id, email, avatar_url, display_name, bio, created_at, is_admin, is_banned, ban_reason, banned_at, premium_until, searchable, notify_on_comment, notify_on_reaction, notify_on_follow",
    )
    .in("id", ids);

  if (fetchError) {
    throw fetchError;
  }

  const byId = new Map<string, ProfileRow>();
  for (const row of rows ?? []) {
    byId.set(row.id, row as ProfileRow);
  }

  return ids.map((id) => byId.get(id)).filter((r): r is ProfileRow => r !== undefined);
}
