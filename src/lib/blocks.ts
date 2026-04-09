import { supabase } from "./supabaseClient.ts";

/**
 * Block a user. Also removes follow relationships and follow requests (via DB trigger).
 */
export async function blockUser(targetId: string): Promise<void> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  if (uid === targetId) {
    throw new Error("Cannot block yourself");
  }
  const { error } = await supabase.from("blocks").insert({ blocker_id: uid, blocked_id: targetId });
  if (error) {
    if (error.code === "23505") {
      // Already blocked
      return;
    }
    throw error;
  }
}

/**
 * Unblock a user.
 */
export async function unblockUser(targetId: string): Promise<void> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }
  const { error } = await supabase
    .from("blocks")
    .delete()
    .eq("blocker_id", uid)
    .eq("blocked_id", targetId);
  if (error) {
    throw error;
  }
}

/**
 * Check if viewerId has blocked targetId.
 */
export async function fetchIsBlocked(viewerId: string, targetId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("blocks")
    .select("id")
    .eq("blocker_id", viewerId)
    .eq("blocked_id", targetId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data != null;
}

/**
 * Check if targetId has blocked viewerId (i.e., viewer is blocked BY target).
 */
export async function fetchIsBlockedBy(viewerId: string, targetId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("blocks")
    .select("id")
    .eq("blocker_id", targetId)
    .eq("blocked_id", viewerId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data != null;
}

/** Row returned by the admin listing. */
export type BlockRow = {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
  blockerEmail: string | null;
  blockedEmail: string | null;
};

/**
 * Fetch all blocks for admin review (newest first, limit 200).
 * Enriches with email from profiles.
 */
export async function fetchBlocksForAdmin(): Promise<BlockRow[]> {
  const { data, error } = await supabase
    .from("blocks")
    .select("id, blocker_id, blocked_id, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as { id: string; blocker_id: string; blocked_id: string; created_at: string }[];
  if (rows.length === 0) {
    return [];
  }

  const allIds = [...new Set(rows.flatMap((r) => [r.blocker_id, r.blocked_id]))];
  const { data: profs, error: profError } = await supabase.from("profiles").select("id, email").in("id", allIds);
  if (profError) {
    throw profError;
  }

  const emailById = new Map<string, string | null>();
  for (const p of profs ?? []) {
    const row = p as { id: string; email: string | null };
    emailById.set(row.id, row.email);
  }

  return rows.map((r) => ({
    ...r,
    blockerEmail: emailById.get(r.blocker_id) ?? null,
    blockedEmail: emailById.get(r.blocked_id) ?? null,
  }));
}

export type BlockRelation = {
  /** Viewer has blocked target */
  viewerBlockedTarget: boolean;
  /** Target has blocked viewer */
  targetBlockedViewer: boolean;
};

/**
 * Fetch block relationship between two users in a single call.
 */
export async function fetchBlockRelation(viewerId: string, targetId: string): Promise<BlockRelation> {
  const { data, error } = await supabase
    .from("blocks")
    .select("blocker_id, blocked_id")
    .or(
      `and(blocker_id.eq.${viewerId},blocked_id.eq.${targetId}),and(blocker_id.eq.${targetId},blocked_id.eq.${viewerId})`,
    );

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as { blocker_id: string; blocked_id: string }[];
  return {
    viewerBlockedTarget: rows.some((r) => r.blocker_id === viewerId && r.blocked_id === targetId),
    targetBlockedViewer: rows.some((r) => r.blocker_id === targetId && r.blocked_id === viewerId),
  };
}
