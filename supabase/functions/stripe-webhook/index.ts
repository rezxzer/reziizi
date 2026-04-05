/**
 * Stripe webhook: extend profiles.premium_until after successful Checkout (checkout.session.completed).
 * Optional until launch: deploy and set secrets only when enabling real billing (see README → Stripe Premium).
 * Deploy: `supabase functions deploy stripe-webhook --no-verify-jwt`
 * Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (Dashboard → Edge Functions → Secrets)
 * Checkout Session metadata: user_id (UUID), premium_days (optional, default 30)
 */
import { createClient } from "@supabase/supabase-js";
import Stripe from "npm:stripe@17.0.0";

function isUuid(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    s,
  );
}

function addPremiumDaysUtc(currentUntilIso: string | null, days: number): string {
  const now = Date.now();
  const currentMs = currentUntilIso ? new Date(currentUntilIso).getTime() : 0;
  const startMs = Math.max(now, Number.isFinite(currentMs) ? currentMs : 0);
  const end = new Date(startMs + days * 86_400_000);
  return end.toISOString();
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!stripeSecret || !webhookSecret || !supabaseUrl || !serviceKey) {
    console.error("stripe-webhook: missing STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, or SUPABASE_*");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response(JSON.stringify({ error: "Missing stripe-signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawBody = await req.text();
  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-11-20.acacia" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("stripe-webhook: signature verification failed", msg);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true, ignored: event.type }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.user_id?.trim() ?? "";
  if (!userId || !isUuid(userId)) {
    console.error("stripe-webhook: missing or invalid metadata.user_id");
    return new Response(JSON.stringify({ error: "Invalid metadata.user_id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const daysRaw = session.metadata?.premium_days?.trim() ?? "30";
  const days = Math.min(3650, Math.max(1, parseInt(daysRaw, 10) || 30));

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: row, error: selErr } = await admin
    .from("profiles")
    .select("premium_until")
    .eq("id", userId)
    .maybeSingle();

  if (selErr) {
    console.error("stripe-webhook: select profile", selErr);
    return new Response(JSON.stringify({ error: selErr.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!row) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const until = addPremiumDaysUtc(
    row.premium_until != null && String(row.premium_until).length > 0
      ? String(row.premium_until)
      : null,
    days,
  );

  const { error: upErr } = await admin.from("profiles").update({ premium_until: until }).eq("id", userId);
  if (upErr) {
    console.error("stripe-webhook: update premium_until", upErr);
    return new Response(JSON.stringify({ error: upErr.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, premium_until: until }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
