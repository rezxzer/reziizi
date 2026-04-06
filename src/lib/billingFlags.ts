/**
 * Client flag: show Settings → Stripe Checkout only when billing is wired (Edge secrets + deploy).
 * Default off so the app works without Stripe until you enable it (`README` → Stripe Premium).
 */
export function isBillingCheckoutEnabled(): boolean {
  return import.meta.env.VITE_BILLING_CHECKOUT_ENABLED === "true";
}
