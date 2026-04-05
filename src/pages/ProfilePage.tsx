import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { ProfilePostListSkeleton } from "../components/ProfilePostListSkeleton.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { copyToClipboard, getPublicProfileAbsoluteUrl } from "../lib/copyToClipboard.ts";
import { errorMessage } from "../lib/errors.ts";
import {
  fetchUserCommentedPostsPage,
  fetchUserPosts,
  getPageSize,
} from "../lib/feed";
import { fetchFollowCounts } from "../lib/follows.ts";
import { fetchProfileDisplay } from "../lib/profileAbout.ts";
import { queryKeys } from "../lib/queryKeys.ts";

type ProfileTab = "posts" | "commented";

export function ProfilePage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPremium, loading: flagsLoading } = useProfileFlags();

  const tab: ProfileTab = searchParams.get("tab") === "commented" ? "commented" : "posts";

  const setTab = useCallback(
    (next: ProfileTab): void => {
      if (next === "posts") {
        setSearchParams({}, { replace: true });
      } else {
        setSearchParams({ tab: "commented" }, { replace: true });
      }
    },
    [setSearchParams],
  );

  const profileDisplayQuery = useQuery({
    queryKey: queryKeys.profile.display(user?.id ?? "__none__"),
    queryFn: () => fetchProfileDisplay(user!.id),
    enabled: Boolean(user),
  });

  const postsQuery = useQuery({
    queryKey: queryKeys.userPosts(user?.id ?? "__none__"),
    queryFn: () => fetchUserPosts(user!.id),
    enabled: Boolean(user),
  });

  const commentedQuery = useInfiniteQuery({
    queryKey: queryKeys.profile.commentedPosts(user?.id ?? "__none__"),
    queryFn: ({ pageParam }: { pageParam: number }) => fetchUserCommentedPostsPage(user!.id, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return allPages.reduce((acc, p) => acc + p.posts.length, 0);
    },
    enabled: Boolean(user) && tab === "commented",
  });

  const followCountsQuery = useQuery({
    queryKey: queryKeys.follow.counts(user?.id ?? "__none__"),
    queryFn: () => fetchFollowCounts(user!.id),
    enabled: Boolean(user),
  });

  const displayEmail: string | null =
    profileDisplayQuery.data?.email ?? user?.email ?? null;
  const avatarUrl: string | null = profileDisplayQuery.data?.avatar_url ?? null;
  const displayName: string | null = profileDisplayQuery.data?.display_name?.trim() || null;
  const bio: string | null = profileDisplayQuery.data?.bio?.trim() || null;
  const avatarLabel: string =
    displayName ?? displayEmail ?? t("pages.profile.avatarLabel");
  const posts = postsQuery.data ?? [];

  const commentedPosts = useMemo(
    () => commentedQuery.data?.pages.flatMap((p) => p.posts) ?? [],
    [commentedQuery.data?.pages],
  );

  const heroLoading = profileDisplayQuery.isPending;
  const profileError = profileDisplayQuery.isError ? errorMessage(profileDisplayQuery.error) : null;
  const postsLoading = postsQuery.isPending;
  const postsError = postsQuery.isError ? errorMessage(postsQuery.error) : null;
  const commentedLoading = commentedQuery.isPending && commentedPosts.length === 0;
  const commentedLoadingMore = commentedQuery.isFetchingNextPage;
  const commentedHasMore = Boolean(commentedQuery.hasNextPage);
  const commentedError = commentedQuery.isError ? errorMessage(commentedQuery.error) : null;

  const followCounts = followCountsQuery.data;

  const onPostChanged = useCallback((): void => {
    if (!user) {
      return;
    }
    void queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(user.id) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.profile.commentedPosts(user.id) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
  }, [queryClient, user]);

  const onCopyProfileLink = useCallback(async (): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      await copyToClipboard(getPublicProfileAbsoluteUrl(user.id));
      toast.success(t("pages.profile.copyProfileLinkSuccess"));
    } catch {
      toast.error(t("pages.profile.copyProfileLinkFailed"));
    }
  }, [user, toast, t]);

  const loadMoreCommented = useCallback((): void => {
    if (!commentedHasMore || commentedLoadingMore || commentedLoading) {
      return;
    }
    void commentedQuery.fetchNextPage();
  }, [commentedQuery, commentedHasMore, commentedLoadingMore, commentedLoading]);

  const followersDisplay =
    followCountsQuery.isPending && followCounts == null ? "…" : (followCounts?.followers ?? "—");
  const followingDisplay =
    followCountsQuery.isPending && followCounts == null ? "…" : (followCounts?.following ?? "—");
  const postsStatDisplay = postsQuery.isPending ? "…" : String(posts.length);

  return (
    <div className="stack profile-page">
      <section className="card profile-hero">
        <h2 className="card__title profile-hero__title">
          {t("pages.profile.title")}
          {!flagsLoading && isPremium ? (
            <span className="premium-badge">{t("pages.profile.premiumBadge")}</span>
          ) : null}
        </h2>
        <div className="card__body">
          {heroLoading ? (
            <>
              <p className="sr-only" role="status">
                {t("pages.profile.loading")}
              </p>
              <div className="profile-skeleton" aria-hidden="true">
                <div className="profile-skeleton__row">
                  <div className="profile-skeleton__avatar" />
                  <div className="profile-skeleton__lines">
                    <div className="profile-skeleton__line profile-skeleton__line--lg" />
                    <div className="profile-skeleton__line profile-skeleton__line--sm" />
                  </div>
                </div>
                <div className="profile-skeleton__stats">
                  <div className="profile-skeleton__stat" />
                  <div className="profile-skeleton__stat" />
                  <div className="profile-skeleton__stat" />
                </div>
              </div>
            </>
          ) : null}
          <InlineError message={profileError} />
          {!heroLoading && !profileError && user ? (
            <>
              <p className="profile-hero__toolbar">
                <button
                  type="button"
                  className="btn btn--small"
                  onClick={() => void onCopyProfileLink()}
                >
                  {t("pages.profile.copyProfileLink")}
                </button>
              </p>
              <div className="profile-hero__layout">
                <div className="profile-hero__avatar">
                  <Avatar imageUrl={avatarUrl} label={avatarLabel} size="lg" />
                </div>
                <div className="profile-hero__meta">
                  {displayName ? <p className="profile-hero__name">{displayName}</p> : null}
                  <p className="profile-hero__line">
                    <strong>{t("pages.profile.emailLabel")}</strong> {displayEmail ?? "—"}
                  </p>
                  <p className="profile-hero__hint muted">
                    <Link className="inline-link" to="/settings">
                      {avatarUrl ? t("pages.profile.changePhoto") : t("pages.profile.uploadPhoto")}
                    </Link>
                    {" — "}
                    {t("pages.profile.settingsPhotoHint")}
                  </p>
                </div>
              </div>
              {bio ? <p className="profile-hero__bio">{bio}</p> : null}
              <div className="profile-stats" role="list">
                <div className="profile-stats__item" role="listitem">
                  <span className="profile-stats__value">{postsStatDisplay}</span>
                  <span className="profile-stats__label">{t("pages.profile.statsPosts")}</span>
                </div>
                <Link
                  className="profile-stats__item profile-stats__item--link"
                  to={`/u/${user.id}/followers`}
                  role="listitem"
                >
                  <span className="profile-stats__value">{followersDisplay}</span>
                  <span className="profile-stats__label">{t("pages.profile.statsFollowers")}</span>
                </Link>
                <Link
                  className="profile-stats__item profile-stats__item--link"
                  to={`/u/${user.id}/following`}
                  role="listitem"
                >
                  <span className="profile-stats__value">{followingDisplay}</span>
                  <span className="profile-stats__label">{t("pages.profile.statsFollowing")}</span>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="card profile-posts">
        <div className="profile-posts__head">
          <h2 className="card__title" id="profile-posts-heading">
            {tab === "posts" ? t("pages.profile.yourPosts") : t("pages.profile.sectionCommented")}
          </h2>
          <div className="profile-tabs" role="tablist" aria-labelledby="profile-posts-heading">
            <button
              type="button"
              className="profile-tabs__tab"
              role="tab"
              aria-selected={tab === "posts"}
              id="profile-tab-posts"
              onClick={() => setTab("posts")}
            >
              {t("pages.profile.tabPosts")}
            </button>
            <button
              type="button"
              className="profile-tabs__tab"
              role="tab"
              aria-selected={tab === "commented"}
              id="profile-tab-commented"
              onClick={() => setTab("commented")}
            >
              {t("pages.profile.tabCommented")}
            </button>
          </div>
        </div>
        <div className="card__body">
          {tab === "posts" ? (
            <>
              {postsLoading ? (
                <ProfilePostListSkeleton />
              ) : postsError ? (
                <InlineError message={postsError} />
              ) : posts.length === 0 ? (
                <div className="profile-empty" role="status">
                  <p className="profile-empty__text muted">{t("pages.profile.emptyPosts")}</p>
                  <p className="profile-empty__actions">
                    <Link to="/" className="inline-link">
                      {t("pages.profile.emptyPostsCta")}
                    </Link>
                  </p>
                </div>
              ) : (
                <ul className="post-list">
                  {posts.map((p) => (
                    <li key={p.id}>
                      <PostCard post={p} onChanged={onPostChanged} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              {commentedLoading ? (
                <ProfilePostListSkeleton />
              ) : commentedError ? (
                <InlineError message={commentedError} />
              ) : commentedPosts.length === 0 ? (
                <div className="profile-empty" role="status">
                  <p className="profile-empty__text muted">{t("pages.profile.emptyCommented")}</p>
                </div>
              ) : (
                <>
                  <ul className="post-list">
                    {commentedPosts.map((p) => (
                      <li key={p.id}>
                        <PostCard post={p} onChanged={onPostChanged} />
                      </li>
                    ))}
                  </ul>
                  {commentedHasMore ? (
                    <div className="feed__more">
                      <button
                        type="button"
                        className="btn"
                        disabled={commentedLoadingMore}
                        onClick={() => loadMoreCommented()}
                      >
                        {commentedLoadingMore
                          ? t("pages.common.loading")
                          : t("pages.home.loadMore", { pageSize: getPageSize() })}
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
