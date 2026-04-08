import { useEffect, useRef, type RefObject } from "react";

interface UseInfiniteScrollOptions {
  /** More pages available to load. */
  hasMore: boolean;
  /** Currently loading — skip triggering another fetch. */
  loading: boolean;
  /** Called when sentinel enters viewport. */
  onLoadMore: () => void;
  /** Margin around the root (viewport) that triggers early. Default "200px" — start fetching before user reaches the very end. */
  rootMargin?: string;
}

/**
 * Attaches an `IntersectionObserver` to a sentinel element ref.
 * When the sentinel scrolls into (or near) the viewport, calls `onLoadMore`.
 *
 * Returns a ref to attach to a sentinel `<div>` at the end of the list.
 */
export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollOptions): RefObject<HTMLDivElement | null> {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore, rootMargin]);

  return sentinelRef;
}
