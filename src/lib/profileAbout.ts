import { supabase } from "./supabaseClient.ts";

/** Matches `profiles_display_name_len` in migration `20260401350800_add_profiles_display_name_bio.sql`. */
export const PROFILE_DISPLAY_NAME_MAX = 80;

/** Matches `profiles_bio_len`. */
export const PROFILE_BIO_MAX = 500;

export type ProfileDisplayRow = {
  email: string | null;
  avatar_url: string | null;
  display_name: string | null;
  bio: string | null;
};

export async function fetchProfileDisplay(userId: string): Promise<ProfileDisplayRow> {
  const { data, error } = await supabase
    .from("profiles")
    .select("email, avatar_url, display_name, bio")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  const r = data as {
    email: string | null;
    avatar_url: string | null;
    display_name: string | null;
    bio: string | null;
  } | null;
  return {
    email: r?.email ?? null,
    avatar_url: r?.avatar_url ?? null,
    display_name: r?.display_name ?? null,
    bio: r?.bio ?? null,
  };
}

export type ProfileAboutInput = {
  display_name: string | null;
  bio: string | null;
};

/** Trim; empty string becomes null (clear field in DB). */
export function normalizeProfileAboutField(value: string): string | null {
  const t = value.trim();
  return t.length === 0 ? null : t;
}

export async function updateProfileAbout(userId: string, input: ProfileAboutInput): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: input.display_name,
      bio: input.bio,
    })
    .eq("id", userId);
  if (error) {
    throw error;
  }
}
