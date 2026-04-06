/**
 * Creates a Stripe Checkout Session for Premium extension (metadata → webhook).
 * Deploy: `supabase functions deploy create-checkout-session`
 * Secrets: STRIPE_SECRET_KEY; plus either STRIPE_PRICE_ID or STRIPE_PRICE_UNIT_AMOUNT_CENTS (+ optional STRIPE_PRICE_CURRENCY).
 * Optional: SITE_URL (https://your-app.vercel.app) if Origin header is missing.
 * See README.md → Stripe Premium.
 */
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

function parsePremiumDays(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.min(3650, Math.max(1, Math.floor(raw)));
  }
  if (typeof raw === "string" && raw.trim().length > 0) {
    const n = parseInt(raw.trim(), 10);
    if (!Number.isNaN(n)) {
      return Math.min(3650, Math.max(1, n));
    }
  }
  return 30;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

  if (!stripeSecret || !supabaseUrl || !anonKey) {
    console.error("create-checkout-session: missing STRIPE_SECRET_KEY or SUPABASE_*");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const priceId = Deno.env.get("STRIPE_PRICE_ID")?.trim() ?? "";
  const unitCentsRaw = Deno.env.get("STRIPE_PRICE_UNIT_AMOUNT_CENTS")?.trim() ?? "";
  const currency = (Deno.env.get("STRIPE_PRICE_CURRENCY") ?? "usd").trim().toLowerCase() || "usd";
  const productName = (Deno.env.get("STRIPE_PRICE_PRODUCT_NAME") ?? "REZIIZI Premium").trim() || "REZIIZI Premium";

  if (!priceId && !unitCentsRaw) {
    return new Response(
      JSON.stringify({
        error:
          "Billing not configured: set Edge secret STRIPE_PRICE_ID or STRIPE_PRICE_UNIT_AMOUNT_CENTS (see README → Stripe Premium).",
      }),
      {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing authorization" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
    return new Response(JSON.stringify({ error: "Invalid session" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: { premium_days?: unknown } = {};
  try {
    const text = await req.text();
    if (text.length > 0) {
      body = JSON.parse(text) as { premium_days?: unknown };
    }
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const premiumDays = parsePremiumDays(body.premium_days);

  const origin =
    req.headers.get("Origin")?.trim() ||
    Deno.env.get("SITE_URL")?.trim() ||
    "";
  if (!origin || !/^https?:\/\//i.test(origin)) {
    return new Response(
      JSON.stringify({
        error: "Missing Origin header or SITE_URL secret (set in Supabase Edge Function secrets).",
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const successUrl = new URL("/settings", origin);
  successUrl.searchParams.set("checkout", "success");
  const cancelUrl = new URL("/settings", origin);
  cancelUrl.searchParams.set("checkout", "cancelled");

  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-09-30.acacia" });

  let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  if (priceId.length > 0) {
    lineItems = [{ price: priceId, quantity: 1 }];
  } else {
    const parsed = parseInt(unitCentsRaw, 10);
    const cents = Math.min(99999999, Math.max(50, Number.isNaN(parsed) ? 0 : parsed));
    if (cents < 50) {
      return new Response(
        JSON.stringify({
          error: "Invalid STRIPE_PRICE_UNIT_AMOUNT_CENTS (minimum 50, smallest currency unit).",
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    lineItems = [
      {
        price_data: {
          currency,
          product_data: { name: `${productName} (+${premiumDays} days)` },
          unit_amount: cents,
        },
        quantity: 1,
      },
    ];
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      client_reference_id: user.id,
      customer_email: user.email ?? undefined,
      metadata: {
        user_id: user.id,
        premium_days: String(premiumDays),
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("create-checkout-session: Stripe error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const url = session.url;
  if (!url) {
    return new Response(JSON.stringify({ error: "Stripe did not return checkout URL" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ url }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
