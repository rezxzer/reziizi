import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const anonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

function createSupabaseClient(): SupabaseClient {
  if (!url || !anonKey) {
    console.warn(
      "[reziizi] missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — add .env (see .env.example)",
    );
  }
  return createClient(url ?? "", anonKey ?? "");
}

export const supabase: SupabaseClient = createSupabaseClient();
