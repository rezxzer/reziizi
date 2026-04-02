import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { logger } from "./logger.ts";

const url: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const anonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

function createSupabaseClient(): SupabaseClient {
  if (!url || !anonKey) {
    logger.warn("missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — add .env (see .env.example)");
  }
  return createClient(url ?? "", anonKey ?? "");
}

export const supabase: SupabaseClient = createSupabaseClient();
