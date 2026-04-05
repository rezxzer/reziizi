/** Copies text to the system clipboard (HTTPS or localhost). */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  throw new Error("Clipboard API unavailable");
}

/** Full URL for the public profile route `/u/:userId`. */
export function getPublicProfileAbsoluteUrl(userId: string): string {
  if (typeof window === "undefined") {
    return `/u/${userId}`;
  }
  return `${window.location.origin}/u/${userId}`;
}
