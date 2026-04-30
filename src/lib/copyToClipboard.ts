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

/**
 * Full URL for a single post — anchors to the user's profile feed at the
 * post's article id (`<article id="post-{postId}">`). When real `/post/:id`
 * routing lands the helper can be updated in one place.
 */
export function getPostAbsoluteUrl(userId: string, postId: string): string {
  const path: string = `/u/${userId}#post-${postId}`;
  if (typeof window === "undefined") {
    return path;
  }
  return `${window.location.origin}${path}`;
}

export type ShareOutcome = "shared" | "copied" | "cancelled";

/**
 * Share a URL via the system share sheet on supported browsers (mobile),
 * falling back to copying to the clipboard on desktop. Returns:
 *   - "shared"     — system share sheet completed
 *   - "copied"     — clipboard fallback used
 *   - "cancelled"  — user dismissed the share sheet (no action needed)
 *
 * Throws when neither path is available or clipboard write fails.
 */
export async function sharePostUrl(url: string, title: string): Promise<ShareOutcome> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ url, title });
      return "shared";
    } catch (e: unknown) {
      // User dismissed the share sheet — treat as no-op, do not fall through to clipboard.
      if (e instanceof DOMException && e.name === "AbortError") {
        return "cancelled";
      }
      // Any other error from share() — fall through to clipboard.
    }
  }
  await copyToClipboard(url);
  return "copied";
}
