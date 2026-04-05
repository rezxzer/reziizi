/**
 * Best-effort in-memory rate limit for Vercel serverless (single-instance window).
 * For high traffic, use Redis/Upstash; this still reduces accidental abuse and scripted bursts.
 */

const buckets = new Map<string, number[]>();
const MAX_KEYS = 8_000;

function pruneOld(timestamps: number[], windowMs: number, now: number): number[] {
  return timestamps.filter((t) => now - t < windowMs);
}

export type RateLimitOptions = {
  max: number;
  windowMs: number;
};

/** Returns true if request is allowed; false if limit exceeded. */
export function allowIpRequest(ip: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  const { max, windowMs } = options;
  let timestamps = buckets.get(ip) ?? [];
  timestamps = pruneOld(timestamps, windowMs, now);
  if (timestamps.length >= max) {
    buckets.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  buckets.set(ip, timestamps);
  if (buckets.size > MAX_KEYS) {
    const first = buckets.keys().next().value as string | undefined;
    if (first !== undefined) {
      buckets.delete(first);
    }
  }
  return true;
}

/** Prefer first public IP from X-Forwarded-For (Vercel). */
export function getClientIpFromRequest(
  headers: { "x-forwarded-for"?: string | string[]; "x-real-ip"?: string | string[] },
): string {
  const xf = headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length > 0) {
    const part = xf.split(",")[0]?.trim();
    if (part) {
      return part;
    }
  }
  const xr = headers["x-real-ip"];
  if (typeof xr === "string" && xr.length > 0) {
    return xr.trim();
  }
  return "unknown";
}
