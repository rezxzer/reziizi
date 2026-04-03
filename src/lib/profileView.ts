import { supabase } from "./supabaseClient.ts";

export type PublicProfileView = {
  id: string;
  email: string | null;
  avatar_url: string | null;
  searchable: boolean;
  is_banned: boolean;
};

/**
 * Profile row for `/u/:userId`. Email visibility for others follows `searchable`
 * (same idea as email search).
 */
export async function fetchPublicProfile(userId: string): Promise<PublicProfileView | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, avatar_url, searchable, is_banned")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const r = data as {
    id: string;
    email: string | null;
    avatar_url: string | null;
    searchable: boolean | null;
    is_banned: boolean | null;
  };
  return {
    id: r.id,
    email: r.email ?? null,
    avatar_url: r.avatar_url ?? null,
    searchable: Boolean(r.searchable),
    is_banned: Boolean(r.is_banned),
  };
}

/** Whether `viewerId` may see `profile.email` (own profile or searchable). */
export function canShowEmail(profile: PublicProfileView, viewerId: string | null): boolean {
  if (viewerId != null && viewerId === profile.id) {
    return true;
  }
  return profile.searchable;
}
