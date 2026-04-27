import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "../components/Avatar.tsx";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useAppFeatureFlags } from "../hooks/useAppFeatureFlags";
import { errorMessage } from "../lib/errors.ts";
import { FEATURE_FLAG_KEYS, isFeatureEnabled } from "../lib/featureFlags";
import { prefersReducedMotion } from "../lib/prefersReducedMotion.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import {
  isSearchQueryValid,
  sanitizeSearchQuery,
  searchPostsByBody,
  searchProfilesByEmail,
} from "../lib/search";
import type { FeedPost } from "../types/feed";
import type { ProfileRow } from "../types/db";

export function SearchPage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const featureFlags = useAppFeatureFlags();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam: string = searchParams.get("q") ?? "";
  const [input, setInput] = useState(qParam);
  const resultsRegionRef = useRef<HTMLDivElement>(null);
  const lastScrolledForQ = useRef<string | null>(null);

  const pattern: string = sanitizeSearchQuery(qParam);
  const viewerId: string | null = user?.id ?? null;

  const searchQuery = useQuery({
    queryKey: queryKeys.search.results(pattern, viewerId),
    queryFn: async (): Promise<{ posts: FeedPost[]; profiles: ProfileRow[] }> => {
      const [posts, profiles] = await Promise.all([
        searchPostsByBody(pattern),
        searchProfilesByEmail(pattern, viewerId),
      ]);
      return { posts, profiles };
    },
    enabled: isSearchQueryValid(pattern),
  });

  const posts: FeedPost[] = searchQuery.data?.posts ?? [];
  const profiles: ProfileRow[] = searchQuery.data?.profiles ?? [];
  const loading: boolean = searchQuery.isPending;
  const error: string | null = searchQuery.isError ? errorMessage(searchQuery.error) : null;

  const onPostChanged = useCallback((): void => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.search.results(pattern, viewerId) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
  }, [queryClient, pattern, viewerId]);

  useEffect(() => {
    setInput(qParam);
  }, [qParam]);

  useEffect(() => {
    if (!isSearchQueryValid(pattern)) {
      lastScrolledForQ.current = null;
      return;
    }
    if (loading) {
      return;
    }
    if (lastScrolledForQ.current === qParam) {
      return;
    }
    lastScrolledForQ.current = qParam;
    requestAnimationFrame(() => {
      const el: HTMLDivElement | null = resultsRegionRef.current;
      if (!el) {
        return;
      }
      const instant: boolean = prefersReducedMotion();
      el.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "nearest" });
      el.focus({ preventScroll: true });
    });
  }, [qParam, pattern, loading]);

  if (!isFeatureEnabled(featureFlags.data, FEATURE_FLAG_KEYS.navSearch)) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const next: string = sanitizeSearchQuery(input);
    if (next.length < 1) {
      setSearchParams({});
      return;
    }
    setSearchParams({ q: next });
  }

  function handleClear(): void {
    setInput("");
    setSearchParams({});
  }

  function handleRetry(): void {
    void searchQuery.refetch();
  }

  const patternForHint: string = sanitizeSearchQuery(qParam);
  const showHint: boolean = qParam.length > 0 && !isSearchQueryValid(patternForHint);
  const hasNoQuery: boolean = qParam.trim().length < 1;
  const bothEmpty: boolean = posts.length === 0 && profiles.length === 0;
  const totalResults: number = posts.length + profiles.length;

  return (
    <div className="stack search-page">
      <section className="page-hero search-page__hero" aria-labelledby="search-heading">
        <div className="page-hero__icon search-page__hero-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>
        <div className="page-hero__text search-page__hero-copy">
          <h1 id="search-heading" className="page-hero__title">
            {t("pages.search.title")}
          </h1>
          <p className="page-hero__subtitle search-page__hero-subtitle">
            {hasNoQuery ? t("pages.search.introHint") : t("pages.search.rankingHint")}
          </p>
          {isSearchQueryValid(pattern) && !loading && !error ? (
            <p className="muted form__hint search-page__summary" aria-live="polite">
              {t("pages.search.resultsSummary", {
                q: pattern,
                total: totalResults,
                posts: posts.length,
                users: profiles.length,
              })}
            </p>
          ) : null}
        </div>
        <div className="search-page__search-panel">
          <form className="search-form form" role="search" onSubmit={handleSubmit}>
            <label className="form__label">
              {t("pages.search.queryLabel")}
              <input
                className="form__input"
                type="search"
                name="q"
                autoComplete="off"
                placeholder={t("pages.search.placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <span className="search-form__actions">
              <button type="submit" className="btn btn--primary">
                {t("pages.search.submit")}
              </button>
              {!hasNoQuery ? (
                <button type="button" className="btn" onClick={handleClear}>
                  {t("pages.search.clear")}
                </button>
              ) : null}
            </span>
          </form>
          {showHint ? (
            <p className="muted form__hint search-page__panel-note">{t("pages.search.hintMinChars")}</p>
          ) : null}
        </div>
      </section>

      {isSearchQueryValid(pattern) && !loading && !error ? (
        <div className="page-stats-bar search-page__stats" aria-live="polite">
          <div className="page-stats-bar__item page-stats-bar__item--accent">
            <span className="page-stats-bar__value">{totalResults}</span>
            <span className="page-stats-bar__label">{t("pages.search.title")}</span>
          </div>
          <div className="page-stats-bar__item">
            <span className="page-stats-bar__value">{profiles.length}</span>
            <span className="page-stats-bar__label">{t("pages.search.usersWithCount", { count: profiles.length })}</span>
          </div>
          <div className="page-stats-bar__item">
            <span className="page-stats-bar__value">{posts.length}</span>
            <span className="page-stats-bar__label">{t("pages.search.postsWithCount", { count: posts.length })}</span>
          </div>
        </div>
      ) : null}

      {isSearchQueryValid(pattern) ? (
        <div
          ref={resultsRegionRef}
          id="search-results"
          className="search-page__results-region"
          tabIndex={-1}
          aria-label={t("pages.search.resultsRegionLabel")}
        >
          {loading ? (
            <section className="card search-page__state-card" role="status" aria-live="polite">
              <div className="page-loading-block">
                <div className="page-loading-block__spinner" />
                <p className="muted">{t("pages.search.searching")}</p>
              </div>
            </section>
          ) : null}

          {!loading && error ? (
            <section className="card search-page__state-card search-page__error" role="alert" aria-live="assertive">
              <div className="page-empty-state search-page__state search-page__state--error">
                <div className="page-empty-state__icon search-page__state-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                    <path d="M11 8v4" />
                    <path d="M11 15h.01" />
                  </svg>
                </div>
                <div className="search-page__state-copy">
                  <p className="search-page__state-title">{t("pages.search.errorTitle")}</p>
                  <p className="page-empty-state__text">{error}</p>
                  <p className="muted form__hint">{t("pages.search.errorHint")}</p>
                </div>
                <button type="button" className="btn btn--primary" onClick={handleRetry}>
                  {t("pages.search.retry")}
                </button>
              </div>
            </section>
          ) : null}

          {!loading && !error && bothEmpty ? (
            <section className="card search-page__state-card search-page__empty-all" aria-live="polite" role="status">
              <div className="page-empty-state search-page__state">
                <div className="page-empty-state__icon search-page__state-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </div>
                <div className="search-page__state-copy">
                  <p className="search-page__state-title">{t("pages.search.noResultsAny", { q: pattern })}</p>
                  <p className="page-empty-state__text">{t("pages.search.noResultsTips")}</p>
                </div>
              </div>
            </section>
          ) : null}

          {!loading && !error && !bothEmpty ? (
            <>
              <section className="card search-results-card" aria-labelledby="users-heading">
                <div className="search-results-card__head">
                  <h2 id="users-heading" className="card__title search-results-card__title">
                    {t("pages.search.usersWithCount", { count: profiles.length })}
                  </h2>
                </div>
                <div className="card__body search-results-card__body">
                  <p className="muted search-results-card__intro">{t("pages.search.usersPrivacyNote")}</p>
                  {profiles.length === 0 ? (
                    <div className="page-empty-state search-results-card__empty">
                      <p className="page-empty-state__text">{t("pages.search.noProfiles")}</p>
                    </div>
                  ) : (
                    <ul className="search-profile-list">
                      {profiles.map((p) => {
                        const displayName = (p as { display_name?: string | null }).display_name?.trim() || null;
                        const bio = (p as { bio?: string | null }).bio;
                        const listLabel: string =
                          displayName ?? t("pages.userProfile.memberFallback", { short: p.id.slice(0, 8) });
                        return (
                        <li key={p.id} className="search-profile-list__item">
                          <div className="search-profile-list__row">
                            <Avatar imageUrl={p.avatar_url} label={listLabel} seed={p.id} size="sm" />
                            <div className="search-profile-list__main">
                              <span className="search-profile-list__display-name">{listLabel}</span>
                              {bio ? (
                                <span className="muted search-profile-list__bio">{bio.length > 80 ? `${bio.slice(0, 80)}…` : bio}</span>
                              ) : null}
                            </div>
                            {user && user.id !== p.id ? (
                              <span className="search-profile-list__actions">
                                <Link
                                  to={`/u/${p.id}`}
                                  className="btn btn--small search-profile-list__btn search-profile-list__btn--profile"
                                >
                                  {t("pages.search.viewProfile")}
                                </Link>
                                <Link
                                  to={`/messages/${p.id}`}
                                  className="btn btn--small search-profile-list__btn search-profile-list__btn--message"
                                >
                                  {t("pages.search.message")}
                                </Link>
                              </span>
                            ) : null}
                          </div>
                        </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </section>

              <section className="card search-results-card" aria-labelledby="posts-heading">
                <div className="search-results-card__head">
                  <h2 id="posts-heading" className="card__title search-results-card__title">
                    {t("pages.search.postsWithCount", { count: posts.length })}
                  </h2>
                </div>
                <div className="card__body search-posts search-results-card__body">
                  {posts.length === 0 ? (
                    <div className="page-empty-state search-results-card__empty">
                      <p className="page-empty-state__text">{t("pages.search.noPosts")}</p>
                    </div>
                  ) : (
                    <ul className="post-list">
                      {posts.map((post) => (
                        <li key={post.id}>
                          <PostCard post={post} onChanged={onPostChanged} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
