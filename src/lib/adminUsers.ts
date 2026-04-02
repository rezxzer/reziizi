import type { ProfileRow } from "../types/db";
import { supabase } from "./supabaseClient";

export async function fetchProfilesForAdmin(): Promise<ProfileRow[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, avatar_url, created_at, is_admin, is_banned, ban_reason, banned_at, premium_until, searchable",
    )
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    throw error;
  }

  return (data ?? []) as ProfileRow[];
}

export async function setUserBanned(
  userId: string,
  banned: boolean,
  reason?: string | null,
): Promise<void> {
  const { error } = await supabase.rpc("admin_set_user_banned", {
    p_user_id: userId,
    p_banned: banned,
    p_reason: banned ? (reason != null && reason.length > 0 ? reason : null) : null,
  });
  if (error) {
    throw error;
  }
}

export async function setUserPremiumUntil(userId: string, premiumUntil: string | null): Promise<void> {
  const { error } = await supabase.rpc("admin_set_user_premium_until", {
    p_user_id: userId,
    p_premium_until: premiumUntil,
  });
  if (error) {
    throw error;
  }
}
