import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";
import { supabase } from "./supabaseClient.ts";

/**
 * Starts Stripe Checkout for Premium extension (Edge `create-checkout-session` → webhook updates `premium_until`).
 * Requires deploy + secrets; see README → Stripe Premium.
 */
export async function createPremiumCheckoutRedirectUrl(premiumDays: number = 30): Promise<string> {
  const days = Math.min(3650, Math.max(1, Math.floor(premiumDays)));

  const { data, error } = await supabase.functions.invoke<{ url?: string; error?: string }>(
    "create-checkout-session",
    {
      body: { premium_days: days },
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
        msg = `${msg} Deploy: supabase functions deploy create-checkout-session (see README).`;
      }
      if (error.context.status === 503 && msg.includes("Billing not configured")) {
        msg =
          "Premium checkout is not configured yet (Stripe Price or amount in Edge secrets). See README → Stripe Premium.";
      }
      throw new Error(msg.trim().length > 0 ? msg : `Request failed (${error.context.status})`);
    }
    if (error instanceof FunctionsRelayError) {
      throw new Error(error.message);
    }
    if (error instanceof FunctionsFetchError) {
      throw new Error(
        `Network error (${error.message}). Deploy create-checkout-session and set Stripe secrets on Supabase.`,
      );
    }
    throw new Error(error instanceof Error ? error.message : "Checkout error");
  }

  if (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string") {
    throw new Error((data as { error: string }).error);
  }

  const url = data?.url;
  if (typeof url !== "string" || url.length === 0) {
    throw new Error("Checkout did not return a redirect URL.");
  }

  return url;
}
