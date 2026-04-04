/**
 * Vercel `api/` only — avoids importing from `src/` (bundler/runtime quirks).
 * Keep behavior aligned with `src/lib/api/errors.ts` `errorMessage`.
 */
const FALLBACK = "Something went wrong. Please try again.";

export function errorMessage(err: unknown): string {
  if (typeof err === "string" && err.trim().length > 0) {
    return err;
  }
  if (err instanceof Error && err.message.trim().length > 0) {
    return err.message;
  }
  if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string" &&
    (err as { message: string }).message.trim().length > 0
  ) {
    return (err as { message: string }).message;
  }
  return FALLBACK;
}
