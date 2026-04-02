import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";
import { supabase } from "./supabaseClient.ts";

/**
 * Permanently deletes the current user account.
 * Production (Vercel): prefers same-origin `POST /api/delete-account` (no cross-origin fetch to Supabase).
 * Fallback: Supabase Edge Function `delete-account` (requires deploy + CORS).
 */
export async function deleteAccountViaEdgeFunction(): Promise<void> {
  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession();
  if (sessionErr || !session) {
    throw new Error("Not signed in");
  }

  const anonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const tryVercelApi: boolean = import.meta.env.PROD && typeof window !== "undefined";
  let vercelApiReturned404: boolean = false;

  if (tryVercelApi) {
    let res: Response;
    try {
      res = await fetch(`${window.location.origin}/api/delete-account`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          ...(anonKey ? { apikey: anonKey } : {}),
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

    if (res.status === 404) {
      vercelApiReturned404 = true;
    } else {
      const body: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        let msg: string =
          typeof body === "object" && body !== null && "error" in body && typeof (body as { error: unknown }).error === "string"
            ? (body as { error: string }).error
            : res.statusText;
        if (msg.trim().length === 0) {
          msg = res.statusText.trim().length > 0 ? res.statusText : `Request failed (${res.status})`;
        }
        if (res.status === 500 && msg === "Server misconfigured") {
          throw new Error(
            "Account deletion is not configured on the server. Add SUPABASE_SERVICE_ROLE_KEY to Vercel (see README).",
          );
        }
        throw new Error(msg);
      }
      return;
    }
  }

  const { data, error } = await supabase.functions.invoke<{ ok?: boolean; error?: string }>(
    "delete-account",
    {
      method: "POST",
      timeout: 120_000,
    },
  );

  if (error) {
    if (error instanceof FunctionsHttpError) {
      const body: unknown = await error.context.json().catch(() => ({}));
      let msg: string =
        typeof body === "object" && body !== null && "error" in body && typeof (body as { error: unknown }).error === "string"
          ? (body as { error: string }).error
          : error.context.statusText;
      if (error.context.status === 404) {
        msg = `${msg} Deploy the Edge Function: supabase functions deploy delete-account (see README).`;
      }
      throw new Error(msg);
    }
    if (error instanceof FunctionsRelayError) {
      throw new Error(error.message);
    }
    if (error instanceof FunctionsFetchError) {
      if (vercelApiReturned404) {
        throw new Error(
          `POST /api/delete-account returned 404 on this deployment — the Vercel serverless route is missing. ` +
            `Fix: Vercel project Root Directory must be the repo folder that contains the api/ directory; push latest code and redeploy. ` +
            `Set SUPABASE_SERVICE_ROLE_KEY (and VITE_* for build). ` +
            `Edge fallback failed too (${error.message}). See README.`,
        );
      }
      throw new Error(
        `Network error (${error.message}). Production needs Vercel env SUPABASE_SERVICE_ROLE_KEY and redeploy, or deploy the Edge Function. See README.`,
      );
    }
    throw new Error(error instanceof Error ? error.message : "Edge Function error");
  }

  if (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string") {
    throw new Error((data as { error: string }).error);
  }
}
