import { supabase } from "./supabaseClient.ts";

export type PrivacySettings = {
  searchable: boolean;
  is_private: boolean;
};

export async function fetchPrivacySettings(userId: string): Promise<PrivacySettings> {
  const { data, error } = await supabase
    .from("profiles")
    .select("searchable, is_private")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const row = data as { searchable?: boolean; is_private?: boolean } | null;
  return {
    searchable: Boolean(row?.searchable ?? true),
    is_private: Boolean(row?.is_private ?? false),
  };
}

/** @deprecated Use fetchPrivacySettings instead */
export async function fetchProfileSearchable(userId: string): Promise<boolean> {
  const settings = await fetchPrivacySettings(userId);
  return settings.searchable;
}

export async function setProfileSearchable(userId: string, searchable: boolean): Promise<void> {
  const { error } = await supabase.from("profiles").update({ searchable }).eq("id", userId);
  if (error) {
    throw error;
  }
}

export async function setProfilePrivate(userId: string, is_private: boolean): Promise<void> {
  const { error } = await supabase.from("profiles").update({ is_private }).eq("id", userId);
  if (error) {
    throw error;
  }
}
