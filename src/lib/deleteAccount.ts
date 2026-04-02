import { supabase } from "./supabaseClient.ts";

/**
 * Permanently deletes the current user's account (Edge Function: Storage + auth user).
 * Requires `supabase functions deploy delete-account` on the linked Supabase project.
 */
export async function deleteAccountViaEdgeFunction(): Promise<void> {
  const url: string | undefined = import.meta.env.VITE_SUPABASE_URL;
  const anonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  }

  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession();
  if (sessionErr || !session) {
    throw new Error("Not signed in");
  }

  const endpoint = `${url.replace(/\/$/, "")}/functions/v1/delete-account`;
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(120_000),
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.name === "AbortError") {
      throw new Error("Request timed out. Check your connection and try again.");
    }
    throw e;
  }

  const body: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    let msg: string =
      typeof body === "object" && body !== null && "error" in body && typeof (body as { error: unknown }).error === "string"
        ? (body as { error: string }).error
        : res.statusText;
    if (res.status === 404) {
      msg = `${msg} Deploy the Edge Function: supabase functions deploy delete-account (see README).`;
    }
    throw new Error(msg);
  }
}
