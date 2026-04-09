import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FeedAdSlot } from "../components/FeedAdSlot.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { PostForm } from "../components/PostForm.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { useProfileFlags } from "../hooks/useProfileFlags";
import { isBillingCheckoutEnabled } from "../lib/billingFlags.ts";
import { createPremiumCheckoutRedirectUrl } from "../lib/createCheckoutSession.ts";
import { errorMessage } from "../lib/errors.ts";
import { useAppFeatureFlags } from "../hooks/useAppFeatureFlags";
import { FEATURE_FLAG_KEYS, isFeatureEnabled } from "../lib/featureFlags";
import { fetchFeedPage, type FeedSortMode } from "../lib/feed.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { slugifyTag } from "../lib/tagParse.ts";
import { fetchTrendingTags, type TrendingTag } from "../lib/trendingTags.ts";
import type { FeedPost } from "../types/feed.ts";

export function HomePage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isPremium } = useProfileFlags();
  const [checkoutBusy, setCheckoutBusy] = useState(false);

  const featureFlagsQuery = useAppFeatureFlags();

  const trendingTagsQuery = useQuery({
    queryKey: queryKeys.trendingTags,
    queryFn: () => fetchTrendingTags(8),
    staleTime: 5 * 60_000, // 5 min
  });
  const trendingTags: TrendingTag[] = trendingTagsQuery.data ?? [];

  const showFeedAds = isFeatureEnabled(featureFlagsQuery.data, FEATURE_FLAG_KEYS.feedAds);
  const showHomePremiumCta = isFeatureEnabled(featureFlagsQuery.data, FEATURE_FLAG_KEYS.homePremiumCta);
  /** Show while logged out, or logged in and not Premium (no wait on profile flags — avoids hidden card). */
  const showPremiumPromo: boolean = showHomePremiumCta && (!user || !isPremium);

  useEffect(() => {
    if (!isBillingCheckoutEnabled()) {
      return;
    }
    const v = searchParams.get("checkout");
    if (v !== "success" && v !== "cancelled") {
      return;
    }
    if (!user) {
      return;
    }
    if (v === "success") {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.flags(user.id) });
      toast.success(t("settings.premiumCheckoutSuccess"));
    } else {
      toast.show(t("settings.premiumCheckoutCancelled"), "info");
    }
    const next = new URLSearchParams(searchParams);
    next.delete("checkout");
    setSearchParams(next, { replace: true });
  }, [user, searchParams, setSearchParams, t, toast, queryClient]);

  async function handleHomePremiumCheckout(): Promise<void> {
    if (!user || checkoutBusy) {
      return;
    }
    setCheckoutBusy(true);
    try {
      const url = await createPremiumCheckoutRedirectUrl(30);
      window.location.assign(url);
    } catch (err: unknown) {
      toast.error(errorMessage(err));
      setCheckoutBusy(false);
    }
  }

  const rawTag = searchParams.get("tag");
  const tagSlug = rawTag ? slugifyTag(rawTag) : null;
  const tagInvalid = Boolean(rawTag && !tagSlug);
  const effectiveTag = tagInvalid ? null : tagSlug;
  const wantsTrendingFromUrl = searchParams.get("sort") === "trending";
  const wantsTrending = wantsTrendingFromUrl;
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

  const loadMore = useCallback((): void => {
    if (!hasMore || loadingMore || loading) {
      return;
    }
    void feedQuery.fetchNextPage();
  }, [feedQuery, hasMore, loadingMore, loading]);

  const scrollSentinelRef = useInfiniteScroll({
    hasMore,
    loading: loadingMore || loading,
    onLoadMore: loadMore,
  });

  const handleFeedSort = useCallback(
    (mode: FeedSortMode) => {
      const next = new URLSearchParams(searchParams);
      if (mode === "latest") {
        next.delete("sort");
      } else {
        next.set("sort", "trending");
        next.delete("tag");
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="home-page">
      <div className="home-feed">
        <div className="home-feed-toolbar home-feed-toolbar--sticky">
          <div className="feed-tabs" role="tablist" aria-label={t("pages.home.feedSortAria")}>
            <button
              type="button"
              role="tab"
              aria-selected={!wantsTrending}
              className={`feed-tabs__tab${!wantsTrending ? " active" : ""}`}
              onClick={() => handleFeedSort("latest")}
            >
              {t("pages.home.latest")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={wantsTrending}
              className={`feed-tabs__tab${wantsTrending ? " active" : ""}`}
              onClick={() => handleFeedSort("trending")}
            >
              {t("pages.home.trending")}
            </button>
          </div>
        </div>
        {effectiveTag && wantsTrendingFromUrl ? (
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

        <section className="card home-composer">
          <PostForm onPosted={onPosted} />
        </section>

        {showPremiumPromo ? (
          <div className="home-premium-cta-wrap">
            <aside className="home-premium-cta card" aria-label={t("pages.home.premiumCtaTitle")}>
              <h3 className="home-premium-cta__title">{t("pages.home.premiumCtaTitle")}</h3>
              <p className="muted home-premium-cta__body">
                {isBillingCheckoutEnabled() ? t("pages.home.premiumCtaBody") : t("pages.home.premiumCtaBodyNoBilling")}
              </p>
              <div className="home-premium-cta__actions">
                {!user ? (
                  <Link to="/login" state={{ from: "/settings" }} className="btn btn--primary btn--small">
                    {t("pages.home.premiumCtaLinkLogin")}
                  </Link>
                ) : isBillingCheckoutEnabled() ? (
                  <>
                    <button
                      type="button"
                      className="btn btn--primary btn--small"
                      disabled={checkoutBusy}
                      onClick={() => void handleHomePremiumCheckout()}
                    >
                      {checkoutBusy ? t("settings.premiumCheckoutBusy") : t("settings.premiumCheckoutSubscribe")}
                    </button>
                    <Link to="/settings" className="inline-link home-premium-cta__settings-link">
                      {t("pages.home.premiumCtaLinkSettings")}
                    </Link>
                  </>
                ) : (
                  <Link to="/settings" className="btn btn--primary btn--small">
                    {t("pages.home.premiumCtaLinkSettings")}
                  </Link>
                )}
              </div>
            </aside>
          </div>
        ) : null}

        {showFeedAds ? <FeedAdSlot /> : null}

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
          <div className="feed__more" ref={scrollSentinelRef}>
            {loadingMore ? (
              <p className="feed__more-loading" role="status">
                {t("pages.common.loading")}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <aside className="home-sidebar" aria-label={t("pages.home.sidebarTrendingAria")}>
        <div className="home-sidebar__widget">
          <div className="home-sidebar__title">{t("pages.home.sidebarTrendingTitle")}</div>
          {trendingTags.length > 0
            ? trendingTags.map((tt) => (
                <div key={tt.tag} className="home-sidebar__trend-item">
                  <Link className="home-sidebar__trend-tag" to={`/?tag=${encodeURIComponent(tt.tag)}`}>
                    #{tt.tag}
                  </Link>
                  <span className="home-sidebar__trend-count">{tt.post_count}</span>
                </div>
              ))
            : (
              <p className="muted home-sidebar__empty">{t("pages.home.sidebarTrendingEmpty")}</p>
            )}
        </div>
      </aside>
    </div>
  );
}
