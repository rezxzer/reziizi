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
      <section className="card" aria-labelledby="search-heading">
        <h1 id="search-heading" className="card__title">
          {t("pages.search.title")}
        </h1>
        <div className="card__body">
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
          {hasNoQuery ? (
            <p className="muted form__hint">{t("pages.search.introHint")}</p>
          ) : null}
          {showHint ? (
            <p className="muted">{t("pages.search.hintMinChars")}</p>
          ) : null}
          {isSearchQueryValid(patternForHint) ? (
            <p className="muted form__hint">{t("pages.search.rankingHint")}</p>
          ) : null}
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
      </section>

      {isSearchQueryValid(pattern) ? (
        <div
          ref={resultsRegionRef}
          id="search-results"
          className="search-page__results-region"
          tabIndex={-1}
          aria-label={t("pages.search.resultsRegionLabel")}
        >
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.search.searching")}
            </p>
          ) : null}

          {!loading && error ? (
            <section className="card search-page__error" role="alert" aria-live="assertive">
              <div className="card__body">
                <p className="form__error">{t("pages.search.errorTitle")}</p>
                <p className="muted">{error}</p>
                <p className="muted form__hint">{t("pages.search.errorHint")}</p>
                <button type="button" className="btn btn--small" onClick={handleRetry}>
                  {t("pages.search.retry")}
                </button>
              </div>
            </section>
          ) : null}

          {!loading && !error && bothEmpty ? (
            <section className="card search-page__empty-all" aria-live="polite" role="status">
              <div className="card__body">
                <p className="muted">{t("pages.search.noResultsAny", { q: pattern })}</p>
                <p className="muted form__hint">{t("pages.search.noResultsTips")}</p>
              </div>
            </section>
          ) : null}

          {!loading && !error && !bothEmpty ? (
            <>
              <section className="card search-results-card" aria-labelledby="users-heading">
                <h2 id="users-heading" className="card__title search-results-card__title">
                  {t("pages.search.usersWithCount", { count: profiles.length })}
                </h2>
                <div className="card__body search-results-card__body">
                  <p className="muted search-results-card__intro">{t("pages.search.usersPrivacyNote")}</p>
                  {profiles.length === 0 ? (
                    <p className="muted">{t("pages.search.noProfiles")}</p>
                  ) : (
                    <ul className="search-profile-list">
                      {profiles.map((p) => {
                        const displayName = (p as { display_name?: string | null }).display_name;
                        const bio = (p as { bio?: string | null }).bio;
                        return (
                        <li key={p.id} className="search-profile-list__item">
                          <div className="search-profile-list__row">
                            <Avatar imageUrl={p.avatar_url} label={displayName ?? p.email ?? p.id} size="sm" />
                            <div className="search-profile-list__main">
                              {displayName ? (
                                <span className="search-profile-list__display-name">{displayName}</span>
                              ) : null}
                              <span className={displayName ? "muted search-profile-list__email" : "search-profile-list__email"}>{p.email ?? "—"}</span>
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
                <h2 id="posts-heading" className="card__title search-results-card__title">
                  {t("pages.search.postsWithCount", { count: posts.length })}
                </h2>
                <div className="card__body search-posts search-results-card__body">
                  {posts.length === 0 ? (
                    <p className="muted">{t("pages.search.noPosts")}</p>
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
