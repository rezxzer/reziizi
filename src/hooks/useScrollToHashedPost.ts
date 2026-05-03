import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll the post matching the URL fragment (`#post-:postId`) into view
 * when the page mounts or the hash changes.
 *
 * The post element is `<article id="post-{id}">` (set in PostCard). Pages
 * that render feeds via infinite scroll may not have the post in the DOM
 * on first paint, so the hook retries a small number of times before
 * giving up — this covers the common case where a shared link lands the
 * user on a profile and the post is in the first or second batch.
 *
 * Respects `prefers-reduced-motion`: instant snap, no smooth animation.
 */
const POST_HASH_PATTERN = /^#post-([\w-]+)$/;
const RETRY_COUNT = 10;
const RETRY_INTERVAL_MS = 200;

export function useScrollToHashedPost(): void {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }
    const match = POST_HASH_PATTERN.exec(hash);
    if (!match) {
      return;
    }
    const targetId: string = `post-${match[1]}`;

    let attempts = 0;
    let timer: number | null = null;
    let cancelled = false;

    const tryScroll = (): void => {
      if (cancelled) {
        return;
      }
      const el: HTMLElement | null = document.getElementById(targetId);
      if (el) {
        const reduceMotion: boolean =
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
        return;
      }
      attempts += 1;
      if (attempts < RETRY_COUNT) {
        timer = window.setTimeout(tryScroll, RETRY_INTERVAL_MS);
      }
    };

    tryScroll();

    return () => {
      cancelled = true;
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [hash]);
}
