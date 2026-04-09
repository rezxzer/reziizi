import { supabase } from "./supabaseClient.ts";

/** Threshold in minutes — if last_seen_at is within this, user is "online". */
export const ONLINE_THRESHOLD_MINUTES = 5;

/**
 * Update the current user's last_seen_at to now() via RPC.
 * Lightweight — called periodically by the heartbeat hook.
 */
export async function updateLastSeen(): Promise<void> {
  const { error } = await supabase.rpc("update_last_seen");
  if (error) {
    // Silent fail — heartbeat is best-effort
    console.warn("[lastSeen] heartbeat failed:", error.message);
  }
}

/**
 * Fetch last_seen_at for a specific user.
 */
export async function fetchLastSeen(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("last_seen_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as { last_seen_at: string | null } | null)?.last_seen_at ?? null;
}

/**
 * Determine if a user is currently online based on their last_seen_at.
 */
export function isOnline(lastSeenAt: string | null): boolean {
  if (!lastSeenAt) {
    return false;
  }
  const diff = Date.now() - new Date(lastSeenAt).getTime();
  return diff < ONLINE_THRESHOLD_MINUTES * 60 * 1000;
}

/**
 * Format a "last seen" timestamp into a human-readable relative string.
 */
export function formatLastSeen(
  lastSeenAt: string | null,
  t: (key: string, params?: Record<string, string | number>) => string,
): string {
  if (!lastSeenAt) {
    return t("pages.userProfile.lastSeenNever");
  }

  if (isOnline(lastSeenAt)) {
    return t("pages.userProfile.online");
  }

  const diffMs = Date.now() - new Date(lastSeenAt).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 60) {
    return t("pages.userProfile.lastSeenMinutes", { count: Math.max(1, diffMin) });
  }

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return t("pages.userProfile.lastSeenHours", { count: diffHours });
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return t("pages.userProfile.lastSeenDays", { count: diffDays });
  }

  return t("pages.userProfile.lastSeenLongAgo");
}
