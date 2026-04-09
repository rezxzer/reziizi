import { supabase } from "./supabaseClient.ts";

const FOLLOW_LIST_PAGE_SIZE = 50;

export type FollowListMember = {
  userId: string;
  email: string | null;
  avatar_url: string | null;
  searchable: boolean;
  is_banned: boolean;
  /** When this user followed / was followed (edge timestamp). */
  followedAt: string;
};

export type FollowCounts = {
  followers: number;
  following: number;
};

export async function fetchFollowCounts(userId: string): Promise<FollowCounts> {
  const [followersRes, followingRes] = await Promise.all([
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", userId),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", userId),
  ]);
  if (followersRes.error) {
    throw followersRes.error;
  }
  if (followingRes.error) {
    throw followingRes.error;
  }
  return {
    followers: followersRes.count ?? 0,
    following: followingRes.count ?? 0,
  };
}

export async function fetchIsFollowing(viewerId: string, targetId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("follower_id", viewerId)
    .eq("following_id", targetId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data != null;
}

/**
 * Follow result: "followed" for direct follow, "requested" if the target has a
 * private profile and a follow request was created instead.
 */
export type FollowResult = "followed" | "requested";

export async function followUser(targetUserId: string): Promise<FollowResult> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid: string | undefined = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  if (uid === targetUserId) {
    throw new Error("Cannot follow yourself");
  }

  // Check if target profile is private
  const { data: targetProfile, error: profileErr } = await supabase
    .from("profiles")
    .select("is_private")
    .eq("id", targetUserId)
    .maybeSingle();

  if (profileErr) {
    throw profileErr;
  }

  const isPrivate = Boolean((targetProfile as { is_private?: boolean } | null)?.is_private);

  if (isPrivate) {
    // Create a follow request instead of a direct follow
    const { error } = await supabase
      .from("follow_requests")
      .insert({ requester_id: uid, target_id: targetUserId });
    if (error) {
      if (error.code === "23505") {
        // Already requested
        return "requested";
      }
      throw error;
    }
    return "requested";
  }

  const { error } = await supabase.from("follows").insert({ follower_id: uid, following_id: targetUserId });
  if (error) {
    throw error;
  }
  return "followed";
}

/**
 * Users who follow `userId` (newest first).
 */
export async function fetchFollowersPage(
  userId: string,
  offset: number,
): Promise<{ rows: FollowListMember[]; hasMore: boolean }> {
  const { data: followRows, error } = await supabase
    .from("follows")
    .select("follower_id, created_at")
    .eq("following_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + FOLLOW_LIST_PAGE_SIZE - 1);

  if (error) {
    throw error;
  }

  const list = (followRows ?? []) as { follower_id: string; created_at: string }[];
  if (list.length === 0) {
    return { rows: [], hasMore: false };
  }

  const ids: string[] = list.map((r) => r.follower_id);
  const { data: profs, error: pErr } = await supabase
    .from("profiles")
    .select("id, email, avatar_url, searchable, is_banned")
    .in("id", ids);

  if (pErr) {
    throw pErr;
  }

  const profById = new Map(
    (profs ?? []).map((p) => {
      const r = p as {
        id: string;
        email: string | null;
        avatar_url: string | null;
        searchable: boolean | null;
        is_banned: boolean | null;
      };
      return [
        r.id,
        {
          email: r.email ?? null,
          avatar_url: r.avatar_url ?? null,
          searchable: Boolean(r.searchable),
          is_banned: Boolean(r.is_banned),
        },
      ] as const;
    }),
  );

  const rows: FollowListMember[] = list.map((fr) => {
    const pr = profById.get(fr.follower_id);
    return {
      userId: fr.follower_id,
      email: pr?.email ?? null,
      avatar_url: pr?.avatar_url ?? null,
      searchable: pr?.searchable ?? false,
      is_banned: pr?.is_banned ?? false,
      followedAt: fr.created_at,
    };
  });

  return { rows, hasMore: list.length === FOLLOW_LIST_PAGE_SIZE };
}

/**
 * Users that `userId` follows (newest first).
 */
export async function fetchFollowingPage(
  userId: string,
  offset: number,
): Promise<{ rows: FollowListMember[]; hasMore: boolean }> {
  const { data: followRows, error } = await supabase
    .from("follows")
    .select("following_id, created_at")
    .eq("follower_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + FOLLOW_LIST_PAGE_SIZE - 1);

  if (error) {
    throw error;
  }

  const list = (followRows ?? []) as { following_id: string; created_at: string }[];
  if (list.length === 0) {
    return { rows: [], hasMore: false };
  }

  const ids: string[] = list.map((r) => r.following_id);
  const { data: profs, error: pErr } = await supabase
    .from("profiles")
    .select("id, email, avatar_url, searchable, is_banned")
    .in("id", ids);

  if (pErr) {
    throw pErr;
  }

  const profById = new Map(
    (profs ?? []).map((p) => {
      const r = p as {
        id: string;
        email: string | null;
        avatar_url: string | null;
        searchable: boolean | null;
        is_banned: boolean | null;
      };
      return [
        r.id,
        {
          email: r.email ?? null,
          avatar_url: r.avatar_url ?? null,
          searchable: Boolean(r.searchable),
          is_banned: Boolean(r.is_banned),
        },
      ] as const;
    }),
  );

  const rows: FollowListMember[] = list.map((fr) => {
    const pr = profById.get(fr.following_id);
    return {
      userId: fr.following_id,
      email: pr?.email ?? null,
      avatar_url: pr?.avatar_url ?? null,
      searchable: pr?.searchable ?? false,
      is_banned: pr?.is_banned ?? false,
      followedAt: fr.created_at,
    };
  });

  return { rows, hasMore: list.length === FOLLOW_LIST_PAGE_SIZE };
}

export function getFollowListPageSize(): number {
  return FOLLOW_LIST_PAGE_SIZE;
}

export async function unfollowUser(targetUserId: string): Promise<void> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid: string | undefined = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  const { error } = await supabase.from("follows").delete().eq("follower_id", uid).eq("following_id", targetUserId);
  if (error) {
    throw error;
  }
}
