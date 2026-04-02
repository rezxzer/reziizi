import type { PostgrestError } from "@supabase/supabase-js";

const FALLBACK: string = "Something went wrong. Please try again.";

export function isPostgrestError(err: unknown): err is PostgrestError {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as PostgrestError).message === "string"
  );
}

function hasStringMessage(err: unknown): err is { message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string" &&
    (err as { message: string }).message.length > 0
  );
}

/** Normalizes Supabase Postgrest, Auth, JS errors, and plain objects for UI copy (English). */
export function errorMessage(err: unknown): string {
  if (typeof err === "string" && err.trim().length > 0) {
    return err;
  }
  if (isPostgrestError(err)) {
    return err.message;
  }
  if (err instanceof Error && err.message.trim().length > 0) {
    return err.message;
  }
  if (hasStringMessage(err)) {
    return err.message;
  }
  return FALLBACK;
}
