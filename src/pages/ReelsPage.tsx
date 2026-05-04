import type { ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReelCard } from "../components/ReelCard.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { fetchVideoFeedPage, getPageSize } from "../lib/feed.ts";
import type { FeedPost } from "../types/feed.ts";

const REELS_QUERY_KEY = ["feed", "reels"] as const;
const PAGE_SIZE = getPageSize();

export function ReelsPage(): ReactElement {
  const { t } = useI18n();
  const [muted, setMuted] = useState<boolean>(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reelsQuery = useInfiniteQuery({
    queryKey: REELS_QUERY_KEY,
    queryFn: ({ pageParam }: { pageParam: number }) => fetchVideoFeedPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (last, _all, lastParam) =>
      last.hasMore ? (typeof lastParam === "number" ? lastParam + PAGE_SIZE : PAGE_SIZE) : undefined,
    staleTime: 30_000,
  });

  const posts: FeedPost[] = useMemo(
    () => reelsQuery.data?.pages.flatMap((p) => p.posts) ?? [],
    [reelsQuery.data],
  );

  /** Mark the most-visible reel as `active` so it auto-plays. */
  useEffect(() => {
    const root: HTMLElement | null = containerRef.current;
    if (!root) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const id: string | undefined = el.dataset.postId;
          if (!id) continue;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = id;
          }
        }
        if (bestId !== null && bestRatio > 0.6) {
          setActiveId(bestId);
        }
      },
      { threshold: [0.0, 0.6, 0.9, 1.0] },
    );
    const cards = root.querySelectorAll("[data-post-id]");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [posts]);

  /** Default the first card as active once posts arrive. */
  useEffect(() => {
    if (activeId === null && posts.length > 0) {
      setActiveId(posts[0]!.id);
    }
  }, [posts, activeId]);

  const sentinelRef = useInfiniteScroll({
    hasMore: !!reelsQuery.hasNextPage,
    loading: reelsQuery.isFetchingNextPage || reelsQuery.isPending,
    onLoadMore: () => {
      void reelsQuery.fetchNextPage();
    },
  });

  if (reelsQuery.isPending) {
    return (
      <div className="reels-page reels-page--loading">
        <p className="page-loading" role="status">
          {t("pages.common.loading")}
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="reels-page reels-page--empty">
        <p className="muted">{t("pages.reels.empty")}</p>
      </div>
    );
  }

  return (
    <div className="reels-page" ref={containerRef}>
      {posts.map((p) => (
        <ReelCard
          key={p.id}
          post={p}
          active={activeId === p.id}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
        />
      ))}
      {reelsQuery.hasNextPage ? (
        <div className="reels-page__sentinel" ref={sentinelRef}>
          {reelsQuery.isFetchingNextPage ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
