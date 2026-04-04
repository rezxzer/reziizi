/** Full URL for Supabase Auth redirects (password recovery, etc.). Must match Dashboard → Auth → Redirect URLs. */
export function getAuthRecoveryRedirectTo(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return `${window.location.origin}/reset-password`;
}
