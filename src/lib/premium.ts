/** Premium window: admin-granted `profiles.premium_until`; payment provider TBD. */

export function isPremiumActive(premiumUntil: string | null): boolean {
  if (premiumUntil == null || premiumUntil.length === 0) {
    return false;
  }
  const t: number = Date.parse(premiumUntil);
  if (Number.isNaN(t)) {
    return false;
  }
  return t > Date.now();
}

/** Extend from max(now, active until) + addDays (calendar-ish, UTC ms). */
export function extendPremiumIso(currentUntil: string | null, addDays: number): string {
  const now: number = Date.now();
  let base: number = now;
  if (currentUntil != null && currentUntil.length > 0 && isPremiumActive(currentUntil)) {
    const u: number = Date.parse(currentUntil);
    if (!Number.isNaN(u)) {
      base = Math.max(u, now);
    }
  }
  const end: number = base + addDays * 86400000;
  return new Date(end).toISOString();
}
