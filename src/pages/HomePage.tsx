import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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
import { useProfileFlags } from "../hooks/useProfileFlags";
import { isBillingCheckoutEnabled } from "../lib/billingFlags.ts";
import { createPremiumCheckoutRedirectUrl } from "../lib/createCheckoutSession.ts";
import { errorMessage } from "../lib/errors.ts";
import { useAppFeatureFlags } from "../hooks/useAppFeatureFlags";
import { FEATURE_FLAG_KEYS, isFeatureEnabled } from "../lib/featureFlags";
import { fetchFeedPage, getPageSize, type FeedSortMode } from "../lib/feed.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { slugifyTag } from "../lib/tagParse.ts";
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

  const showTrendingTab = isFeatureEnabled(featureFlagsQuery.data, FEATURE_FLAG_KEYS.feedTrendingTab);
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
  const wantsTrending = showTrendingTab && wantsTrendingFromUrl;
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
    <div className="home-page">
      <div className="home-feed">
        <section className="card">
          <h2 className="card__title">{t("pages.home.title")}</h2>
          <div className="card__body">
            <div className="home-feed-toolbar home-feed-toolbar--sticky">
              {showTrendingTab ? (
                <div className="feed-tabs" role="tablist" aria-label={t("pages.home.feedSortAria")}>
                  <Link
                    to={latestHref}
                    className={`feed-tabs__tab${effectiveSort === "latest" ? " active" : ""}`}
                    role="tab"
                    aria-selected={effectiveSort === "latest"}
                  >
                    {t("pages.home.latest")}
                  </Link>
                  <Link
                    to="/?sort=trending"
                    className={`feed-tabs__tab${effectiveSort === "trending" ? " active" : ""}`}
                    role="tab"
                    aria-selected={effectiveSort === "trending"}
                  >
                    {t("pages.home.trending")}
                  </Link>
                </div>
              ) : null}
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

        {showPremiumPromo ? (
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

      <aside className="home-sidebar" aria-label="Trending tags">
        <div className="home-sidebar__widget">
          <div className="home-sidebar__title">Trending tags</div>
          <div className="home-sidebar__trend-item">
            <Link className="home-sidebar__trend-tag" to="/?tag=dev">
              #dev
            </Link>
            <span className="home-sidebar__trend-count">—</span>
          </div>
          <div className="home-sidebar__trend-item">
            <Link className="home-sidebar__trend-tag" to="/?tag=news">
              #news
            </Link>
            <span className="home-sidebar__trend-count">—</span>
          </div>
          <div className="home-sidebar__trend-item">
            <Link className="home-sidebar__trend-tag" to="/?tag=release-notes">
              #release-notes
            </Link>
            <span className="home-sidebar__trend-count">—</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
