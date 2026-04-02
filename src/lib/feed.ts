import { supabase } from "./supabaseClient";
import type { PostRow } from "../types/db";
import type { FeedPost } from "../types/feed";
import { fetchTagSlugsForPostIds } from "./tags";

const PAGE_SIZE = 10;

export type FeedSortMode = "latest" | "trending";

async function fetchPostsByIdsOrdered(ids: string[]): Promise<FeedPost[]> {
  if (ids.length === 0) {
    return [];
  }
  const { data: postRows, error: postsError } = await supabase
    .from("posts")
    .select("id, user_id, body, image_url, created_at, updated_at")
    .in("id", ids);

  if (postsError) {
    throw postsError;
  }

  const byId = new Map<string, PostRow>();
  for (const row of postRows ?? []) {
    byId.set(row.id, row as PostRow);
  }

  const ordered: PostRow[] = ids.map((id) => byId.get(id)).filter((r): r is PostRow => r !== undefined);
  return enrichPosts(ordered);
}

export async function enrichPosts(posts: PostRow[]): Promise<FeedPost[]> {
  if (posts.length === 0) {
    return [];
  }

  const postIds: string[] = posts.map((p) => p.id);
  const userIds: string[] = [...new Set(posts.map((p) => p.user_id))];

  const [{ data: profileRows }, { data: reactionRows }, authRes, tagMap] = await Promise.all([
    supabase.from("profiles").select("id, email, avatar_url").in("id", userIds),
    supabase.from("reactions").select("post_id, user_id, value").in("post_id", postIds),
    supabase.auth.getUser(),
    fetchTagSlugsForPostIds(postIds),
  ]);

  if (authRes.error) {
    throw authRes.error;
  }

  const myId: string | null = authRes.data.user?.id ?? null;

  const emailByUserId = new Map<string, string | null>();
  const avatarByUserId = new Map<string, string | null>();
  for (const row of profileRows ?? []) {
    const r = row as { id: string; email: string | null; avatar_url: string | null };
    emailByUserId.set(r.id, r.email);
    avatarByUserId.set(r.id, r.avatar_url ?? null);
  }

  const counts = new Map<string, { up: number; down: number }>();
  const myByPost = new Map<string, -1 | 1>();

  for (const pid of postIds) {
    counts.set(pid, { up: 0, down: 0 });
  }

  for (const r of reactionRows ?? []) {
    const c = counts.get(r.post_id);
    if (!c) {
      continue;
    }
    if (r.value === 1) {
      c.up += 1;
    } else {
      c.down += 1;
    }
    if (myId && r.user_id === myId) {
      myByPost.set(r.post_id, r.value as -1 | 1);
    }
  }

  return posts.map((p) => {
    const c = counts.get(p.id) ?? { up: 0, down: 0 };
    return {
      ...p,
      authorEmail: emailByUserId.get(p.user_id) ?? null,
      authorAvatarUrl: avatarByUserId.get(p.user_id) ?? null,
      thumbsUp: c.up,
      thumbsDown: c.down,
      myReaction: myByPost.get(p.id) ?? null,
      tagSlugs: tagMap.get(p.id) ?? [],
    };
  });
}

export async function fetchFeedPage(
  from: number,
  tagSlug?: string | null,
  sort: FeedSortMode = "latest",
): Promise<{ posts: FeedPost[]; hasMore: boolean }> {
  if (tagSlug) {
    const { data: idRows, error: rpcError } = await supabase.rpc("feed_post_ids_by_tag", {
      p_slug: tagSlug,
      p_limit: PAGE_SIZE,
      p_offset: from,
    });

    if (rpcError) {
      throw rpcError;
    }

    const ids: string[] = (idRows ?? []).map((r: { id: string }) => r.id);
    if (ids.length === 0) {
      return { posts: [], hasMore: false };
    }

    const feed = await fetchPostsByIdsOrdered(ids);
    return { posts: feed, hasMore: ids.length === PAGE_SIZE };
  }

  if (sort === "trending") {
    const { data: idRows, error: rpcError } = await supabase.rpc("feed_trending_post_ids", {
      p_limit: PAGE_SIZE,
      p_offset: from,
    });

    if (rpcError) {
      throw rpcError;
    }

    const ids: string[] = (idRows ?? []).map((r: { id: string }) => r.id);
    if (ids.length === 0) {
      return { posts: [], hasMore: false };
    }

    const feed = await fetchPostsByIdsOrdered(ids);
    return { posts: feed, hasMore: ids.length === PAGE_SIZE };
  }

  const to = from + PAGE_SIZE - 1;
  const { data: postRows, error: postsError } = await supabase
    .from("posts")
    .select("id, user_id, body, image_url, created_at, updated_at")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (postsError) {
    throw postsError;
  }

  const posts: PostRow[] = postRows ?? [];
  const feed = await enrichPosts(posts);
  return { posts: feed, hasMore: posts.length === PAGE_SIZE };
}

export async function fetchUserPosts(userId: string): Promise<FeedPost[]> {
  const { data: postRows, error } = await supabase
    .from("posts")
    .select("id, user_id, body, image_url, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return enrichPosts(postRows ?? []);
}

export function getPageSize(): number {
  return PAGE_SIZE;
}
