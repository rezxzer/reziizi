import { supabase } from "./supabaseClient.ts";

export type FollowRequest = {
  id: string;
  requesterId: string;
  requesterEmail: string | null;
  requesterAvatar: string | null;
  requesterDisplayName: string | null;
  createdAt: string;
};

/**
 * Send a follow request to a private profile.
 */
export async function sendFollowRequest(targetId: string): Promise<void> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  if (uid === targetId) {
    throw new Error("Cannot request to follow yourself");
  }
  const { error } = await supabase
    .from("follow_requests")
    .insert({ requester_id: uid, target_id: targetId });
  if (error) {
    if (error.code === "23505") {
      // unique violation — already requested
      return;
    }
    throw error;
  }
}

/**
 * Cancel a pending follow request (called by requester).
 */
export async function cancelFollowRequest(targetId: string): Promise<void> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  const { error } = await supabase
    .from("follow_requests")
    .delete()
    .eq("requester_id", uid)
    .eq("target_id", targetId);
  if (error) {
    throw error;
  }
}

/**
 * Check if the viewer has a pending follow request to the target.
 */
export async function fetchHasRequested(viewerId: string, targetId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("follow_requests")
    .select("id")
    .eq("requester_id", viewerId)
    .eq("target_id", targetId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data != null;
}

/**
 * Accept a follow request (called by target — uses RPC for atomicity).
 */
export async function acceptFollowRequest(requesterId: string): Promise<void> {
  const { error } = await supabase.rpc("accept_follow_request", {
    p_requester_id: requesterId,
  });
  if (error) {
    throw error;
  }
}

/**
 * Reject a follow request (called by target — just deletes the row).
 */
export async function rejectFollowRequest(requesterId: string): Promise<void> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  const { error } = await supabase
    .from("follow_requests")
    .delete()
    .eq("requester_id", requesterId)
    .eq("target_id", uid);
  if (error) {
    throw error;
  }
}

/**
 * Fetch pending follow requests for the current user (as target).
 * Includes requester profile info.
 */
export async function fetchPendingFollowRequests(
  targetId: string,
): Promise<FollowRequest[]> {
  const { data, error } = await supabase
    .from("follow_requests")
    .select("id, requester_id, created_at")
    .eq("target_id", targetId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as { id: string; requester_id: string; created_at: string }[];
  if (rows.length === 0) {
    return [];
  }

  // Fetch requester profiles
  const ids = rows.map((r) => r.requester_id);
  const { data: profs, error: pErr } = await supabase
    .from("profiles")
    .select("id, email, avatar_url, display_name")
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
        display_name: string | null;
      };
      return [r.id, r] as const;
    }),
  );

  return rows.map((fr) => {
    const pr = profById.get(fr.requester_id);
    return {
      id: fr.id,
      requesterId: fr.requester_id,
      requesterEmail: pr?.email ?? null,
      requesterAvatar: pr?.avatar_url ?? null,
      requesterDisplayName: pr?.display_name ?? null,
      createdAt: fr.created_at,
    };
  });
}

/**
 * Count pending follow requests for a user.
 */
export async function fetchFollowRequestCount(targetId: string): Promise<number> {
  const { count, error } = await supabase
    .from("follow_requests")
    .select("*", { count: "exact", head: true })
    .eq("target_id", targetId);
  if (error) {
    throw error;
  }
  return count ?? 0;
}
