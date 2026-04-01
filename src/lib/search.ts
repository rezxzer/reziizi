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
    .select("id, user_id, body, created_at, updated_at")
    .ilike("body", `%${pattern}%`)
    .order("created_at", { ascending: false })
    .limit(RESULT_LIMIT);

  if (error) {
    throw error;
  }

  return enrichPosts((data ?? []) as PostRow[]);
}

export async function searchProfilesByEmail(query: string): Promise<ProfileRow[]> {
  const pattern: string = sanitizeSearchQuery(query);
  if (!isSearchQueryValid(pattern)) {
    return [];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, created_at")
    .ilike("email", `%${pattern}%`)
    .order("created_at", { ascending: false })
    .limit(RESULT_LIMIT);

  if (error) {
    throw error;
  }

  return (data ?? []) as ProfileRow[];
}
