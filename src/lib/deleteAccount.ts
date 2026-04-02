import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";
import { supabase } from "./supabaseClient.ts";

/**
 * Permanently deletes the current user's account (Edge Function: Storage + auth user).
 * Requires `supabase functions deploy delete-account` on the linked Supabase project.
 */
export async function deleteAccountViaEdgeFunction(): Promise<void> {
  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession();
  if (sessionErr || !session) {
    throw new Error("Not signed in");
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
      throw new Error(
        `Network error (${error.message}). If the function is deployed, check browser extensions/ad blockers. Otherwise: supabase functions deploy delete-account`,
      );
    }
    throw new Error(error instanceof Error ? error.message : "Edge Function error");
  }

  if (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string") {
    throw new Error((data as { error: string }).error);
  }
}
