import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FeedAdSlot } from "../components/FeedAdSlot.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { PostForm } from "../components/PostForm.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { fetchFeedPage, getPageSize, type FeedSortMode } from "../lib/feed.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { slugifyTag } from "../lib/tagParse.ts";
import type { FeedPost } from "../types/feed.ts";

export function HomePage(): ReactElement {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const rawTag = searchParams.get("tag");
  const tagSlug = rawTag ? slugifyTag(rawTag) : null;
  const tagInvalid = Boolean(rawTag && !tagSlug);
  const effectiveTag = tagInvalid ? null : tagSlug;
  const wantsTrending = searchParams.get("sort") === "trending";
  const effectiveSort: FeedSortMode = effectiveTag ? "latest" : wantsTrending ? "trending" : "latest";

  const feedQuery = useInfiniteQuery({
    queryKey: [...queryKeys.feed.list(effectiveTag, effectiveSort), tagInvalid ? "invalid" : "ok"],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetchFeedPage(pageParam, effectiveTag ?? undefined, effectiveSort),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return allPages.reduce((acc, p) => acc + p.posts.length, 0);
    },
    enabled: !tagInvalid,
  });

  const posts: FeedPost[] = useMemo(
    () => feedQuery.data?.pages.flatMap((p) => p.posts) ?? [],
    [feedQuery.data?.pages],
  );

  const loading: boolean = feedQuery.isPending && posts.length === 0;
  const loadingMore: boolean = feedQuery.isFetchingNextPage;
  const hasMore: boolean = Boolean(feedQuery.hasNextPage);
  const error: string | null = feedQuery.isError ? errorMessage(feedQuery.error) : null;

  const onPosted = useCallback((): void => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
    if (user) {
      void queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(user.id) });
    }
  }, [queryClient, user]);

  const onPostChanged = useCallback(
    (authorUserId: string): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(authorUserId) });
    },
    [queryClient],
  );

  function loadMore(): void {
    if (!hasMore || loadingMore || loading) {
      return;
    }
    void feedQuery.fetchNextPage();
  }

  const latestHref: string = effectiveTag ? `/?tag=${encodeURIComponent(effectiveTag)}` : "/";

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">{t("pages.home.title")}</h2>
        <div className="card__body">
          <div className="home-feed-toolbar">
            <div className="feed-sort" role="tablist" aria-label={t("pages.home.feedSortAria")}>
              <Link
                to={latestHref}
                className={`feed-sort__link${effectiveSort === "latest" ? " feed-sort__link--active" : ""}`}
                role="tab"
                aria-selected={effectiveSort === "latest"}
              >
                {t("pages.home.latest")}
              </Link>
              <Link
                to="/?sort=trending"
                className={`feed-sort__link${effectiveSort === "trending" ? " feed-sort__link--active" : ""}`}
                role="tab"
                aria-selected={effectiveSort === "trending"}
              >
                {t("pages.home.trending")}
              </Link>
            </div>
            {effectiveTag && wantsTrending ? (
              <p className="muted form__hint">{t("pages.home.trendingTagHint")}</p>
            ) : null}
            {effectiveTag ? (
              <p className="feed-filter">
                {t("pages.home.filterTag", { tag: effectiveTag })}{" "}
                <Link to={effectiveSort === "trending" ? "/?sort=trending" : "/"} className="inline-link">
                  {t("pages.home.clear")}
                </Link>
              </p>
            ) : null}
            {tagInvalid ? (
              <p className="form__error" role="alert">
                {t("pages.home.invalidTag")}
              </p>
            ) : null}
          </div>
          <div className="home-composer">
            <PostForm onPosted={onPosted} />
          </div>
        </div>
      </section>

      <FeedAdSlot />

      {loading && posts.length === 0 ? (
        <p className="page-loading" role="status">
          {t("pages.home.loadingPosts")}
        </p>
      ) : null}

      <InlineError message={error} />

      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.id}>
            <PostCard post={p} onChanged={() => onPostChanged(p.user_id)} />
          </li>
        ))}
      </ul>

      {!loading && posts.length === 0 && !error && !tagInvalid ? (
        <p className="muted">
          {effectiveTag ? t("pages.home.emptyTagged") : t("pages.home.emptyFeed")}
        </p>
      ) : null}

      {hasMore && posts.length > 0 ? (
        <div className="feed__more">
          <button
            type="button"
            className="btn"
            disabled={loadingMore || loading}
            onClick={() => loadMore()}
          >
            {loadingMore ? t("pages.common.loading") : t("pages.home.loadMore", { pageSize: getPageSize() })}
          </button>
        </div>
      ) : null}
    </div>
  );
}
