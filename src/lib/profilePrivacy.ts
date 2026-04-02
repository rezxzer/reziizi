import { supabase } from "./supabaseClient.ts";

export async function fetchProfileSearchable(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("searchable")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const row = data as { searchable?: boolean } | null;
  return Boolean(row?.searchable ?? true);
}

export async function setProfileSearchable(userId: string, searchable: boolean): Promise<void> {
  const { error } = await supabase.from("profiles").update({ searchable }).eq("id", userId);
  if (error) {
    throw error;
  }
}
