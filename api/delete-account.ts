/**
 * Vercel Serverless: same-origin account deletion (no browser → *.supabase.co fetch).
 * Env (Vercel): VITE_SUPABASE_URL or SUPABASE_URL, VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY,
 * SUPABASE_SERVICE_ROLE_KEY (server-only, never VITE_*).
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { errorMessage } from "../src/lib/api/errors";
import { deleteAuthUser, deleteUserStorage } from "./lib/accountDeletionBackend";

/** Vercel Node serverless — allow long Storage cleanup + auth.admin.deleteUser. */
export const config: { maxDuration: number } = {
  maxDuration: 120,
};

function json(res: VercelResponse, status: number, body: Record<string, unknown>): void {
  res.status(status).setHeader("Content-Type", "application/json").json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "authorization, x-client-info, apikey, content-type",
    );
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  const supabaseUrl: string =
    process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const anonKey: string =
    process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";
  const serviceKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!supabaseUrl || !anonKey || !serviceKey) {
    console.error("delete-account api: missing env (need URL, anon, SUPABASE_SERVICE_ROLE_KEY)");
    json(res, 500, { error: "Server misconfigured" });
    return;
  }

  const authHeader: string | undefined =
    typeof req.headers.authorization === "string" ? req.headers.authorization : undefined;
  if (!authHeader?.startsWith("Bearer ")) {
    json(res, 401, { error: "Missing authorization" });
    return;
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user },
    error: userErr,
  } = await userClient.auth.getUser();
  if (userErr || !user) {
    json(res, 401, { error: "Invalid session" });
    return;
  }

  const userId = user.id;

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    await deleteUserStorage(admin, userId);
  } catch (e: unknown) {
    const msg: string = errorMessage(e);
    console.error("delete-account api: storage", e);
    json(res, 500, { error: msg.length > 0 ? msg : "Storage cleanup failed" });
    return;
  }

  try {
    await deleteAuthUser(admin, userId);
  } catch (e: unknown) {
    const msg: string = errorMessage(e);
    console.error("delete-account api: auth.admin.deleteUser", e);
    json(res, 500, { error: msg.length > 0 ? msg : "Failed to delete user" });
    return;
  }

  json(res, 200, { ok: true });
}
