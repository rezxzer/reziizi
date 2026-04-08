import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback, useMemo } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { ProfilePostListSkeleton } from "../components/ProfilePostListSkeleton.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { fetchFollowCounts, fetchIsFollowing, followUser, unfollowUser } from "../lib/follows.ts";
import { fetchUserCommentedPostsPage, fetchUserPosts } from "../lib/feed.ts";
import { isValidUuid } from "../lib/chat.ts";
import { copyToClipboard, getPublicProfileAbsoluteUrl } from "../lib/copyToClipboard.ts";
import { canShowEmail, fetchPublicProfile } from "../lib/profileView.ts";
import { queryKeys } from "../lib/queryKeys.ts";

type ProfileTab = "posts" | "commented";

export function UserProfilePage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isBanned: viewerBanned, loading: flagsLoading } = useProfileFlags();

  const targetId: string = userId ?? "";
  const viewerId: string | null = user?.id ?? null;

  const profileQuery = useQuery({
    queryKey: ["publicProfile", targetId],
    queryFn: () => fetchPublicProfile(targetId),
    enabled: isValidUuid(targetId),
  });

  const profileBanned = profileQuery.data?.is_banned === true;
  const tab: ProfileTab =
    !profileBanned && searchParams.get("tab") === "commented" ? "commented" : "posts";

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

  const postsQuery = useQuery({
    queryKey: queryKeys.userPosts(targetId),
    queryFn: () => fetchUserPosts(targetId),
    enabled: isValidUuid(targetId) && Boolean(profileQuery.data) && !profileQuery.data?.is_banned,
  });

  const commentedQuery = useInfiniteQuery({
    queryKey: queryKeys.profile.commentedPosts(targetId),
    queryFn: ({ pageParam }: { pageParam: number }) => fetchUserCommentedPostsPage(targetId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return allPages.reduce((acc, p) => acc + p.posts.length, 0);
    },
    enabled:
      isValidUuid(targetId) &&
      Boolean(profileQuery.data) &&
      !profileQuery.data?.is_banned &&
      tab === "commented",
  });

  const countsQuery = useQuery({
    queryKey: queryKeys.follow.counts(targetId),
    queryFn: () => fetchFollowCounts(targetId),
    enabled: isValidUuid(targetId) && Boolean(profileQuery.data),
  });

  const followingQuery = useQuery({
    queryKey: queryKeys.follow.relation(viewerId ?? "__none__", targetId),
    queryFn: () => fetchIsFollowing(viewerId!, targetId),
    enabled: isValidUuid(targetId) && Boolean(viewerId) && viewerId !== targetId && Boolean(profileQuery.data),
  });

  /** Target user follows viewer (for mutual-follow indicator). */
  const targetFollowsViewerQuery = useQuery({
    queryKey: queryKeys.follow.relation(targetId, viewerId ?? "__none__"),
    queryFn: () => fetchIsFollowing(targetId, viewerId!),
    enabled: isValidUuid(targetId) && Boolean(viewerId) && viewerId !== targetId && Boolean(profileQuery.data),
  });

  const showMutualFollow: boolean =
    Boolean(viewerId) &&
    viewerId !== targetId &&
    followingQuery.data === true &&
    targetFollowsViewerQuery.data === true &&
    !followingQuery.isPending &&
    !targetFollowsViewerQuery.isPending;

  const followMut = useMutation({
    mutationFn: async (): Promise<void> => {
      await followUser(targetId);
    },
    onError: (e: unknown): void => {
      toast.error(errorMessage(e));
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(targetId) });
      if (viewerId != null) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(viewerId) });
        void queryClient.invalidateQueries({ queryKey: ["followList", "followers", targetId] });
        void queryClient.invalidateQueries({ queryKey: ["followList", "following", viewerId] });
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.relation(viewerId ?? "", targetId) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.relation(targetId, viewerId ?? "") });
    },
  });

  const unfollowMut = useMutation({
    mutationFn: async (): Promise<void> => {
      await unfollowUser(targetId);
    },
    onError: (e: unknown): void => {
      toast.error(errorMessage(e));
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(targetId) });
      if (viewerId != null) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(viewerId) });
        void queryClient.invalidateQueries({ queryKey: ["followList", "followers", targetId] });
        void queryClient.invalidateQueries({ queryKey: ["followList", "following", viewerId] });
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.relation(viewerId ?? "", targetId) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.relation(targetId, viewerId ?? "") });
    },
  });

  const onPostChanged = useCallback((): void => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(targetId) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.profile.commentedPosts(targetId) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
  }, [queryClient, targetId]);

  const commentedPosts = useMemo(
    () => commentedQuery.data?.pages.flatMap((p) => p.posts) ?? [],
    [commentedQuery.data?.pages],
  );

  const commentedLoading = commentedQuery.isPending && commentedPosts.length === 0;
  const commentedLoadingMore = commentedQuery.isFetchingNextPage;
  const commentedHasMore = Boolean(commentedQuery.hasNextPage);
  const commentedError = commentedQuery.isError ? errorMessage(commentedQuery.error) : null;

  const loadMoreCommented = useCallback((): void => {
    if (!commentedHasMore || commentedLoadingMore || commentedLoading) {
      return;
    }
    void commentedQuery.fetchNextPage();
  }, [commentedQuery, commentedHasMore, commentedLoadingMore, commentedLoading]);

  const commentedSentinelRef = useInfiniteScroll({
    hasMore: commentedHasMore,
    loading: commentedLoadingMore || commentedLoading,
    onLoadMore: loadMoreCommented,
  });

  const onCopyProfileLink = useCallback(async (): Promise<void> => {
    try {
      await copyToClipboard(getPublicProfileAbsoluteUrl(targetId));
      toast.success(t("pages.profile.copyProfileLinkSuccess"));
    } catch {
      toast.error(t("pages.profile.copyProfileLinkFailed"));
    }
  }, [targetId, toast, t]);

  if (!isValidUuid(targetId)) {
    return (
      <div className="stack profile-page">
        <section className="card">
          <h1 className="card__title">{t("pages.userProfile.invalidTitle")}</h1>
          <div className="card__body">
            <p className="form__error" role="alert">
              {t("pages.userProfile.invalidBody")}
            </p>
            <p>
              <Link to="/" className="inline-link">
                {t("pages.userProfile.backHome")}
              </Link>
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (viewerId != null && viewerId === targetId) {
    return <Navigate to="/profile" replace />;
  }

  const profileErr: unknown = profileQuery.error;
  const profile = profileQuery.data;

  const displayLabel: string =
    profile != null
      ? (() => {
          const nm = profile.display_name?.trim();
          if (nm) {
            return nm;
          }
          return canShowEmail(profile, viewerId)
            ? profile.email ?? profile.id.slice(0, 8)
            : `${profile.id.slice(0, 8)}…`;
        })()
      : "—";

  const showFollowUi: boolean =
    Boolean(viewerId) &&
    viewerId !== targetId &&
    Boolean(profile) &&
    !profile!.is_banned &&
    !viewerBanned &&
    !flagsLoading;

  const postsStatDisplay = postsQuery.isPending
    ? "…"
    : postsQuery.isError
      ? "—"
      : (postsQuery.data?.length ?? 0);
  const followersStatDisplay =
    countsQuery.isPending && countsQuery.data == null ? "…" : (countsQuery.data?.followers ?? "—");
  const followingStatDisplay =
    countsQuery.isPending && countsQuery.data == null ? "…" : (countsQuery.data?.following ?? "—");

  return (
    <div className="stack profile-page">
      <section className="card profile-hero">
        <h2 className="card__title profile-hero__title">{t("pages.userProfile.title")}</h2>
        <div className="card__body">
          {profileQuery.isPending ? (
            <>
              <p className="sr-only" role="status">
                {t("pages.common.loading")}
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
          <InlineError message={profileQuery.isError ? errorMessage(profileErr) : null} />
          {!profileQuery.isPending && !profileQuery.isError && profile == null ? (
            <p className="muted">{t("pages.userProfile.notFound")}</p>
          ) : null}
          {!profileQuery.isPending && profile != null ? (
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
              {profile.is_banned ? (
                <p className="form__error" role="alert">
                  {t("pages.userProfile.bannedNotice")}
                </p>
              ) : null}
              <div className="profile-hero__layout">
                <div className="profile-hero__avatar">
                  <Avatar imageUrl={profile.avatar_url} label={displayLabel} size="lg" />
                </div>
                <div className="profile-hero__meta">
                  {!profile.is_banned && profile.display_name?.trim() ? (
                    <p className="profile-hero__name">{profile.display_name.trim()}</p>
                  ) : null}
                  <p className="profile-hero__line">
                    <strong>{t("pages.profile.emailLabel")}</strong>{" "}
                    {canShowEmail(profile, viewerId) ? profile.email ?? "—" : t("pages.userProfile.emailHidden")}
                  </p>
                  {showMutualFollow ? (
                    <p className="user-profile__mutual" role="status">
                      <span className="badge badge--mutual">{t("pages.userProfile.mutualFollowBadge")}</span>
                    </p>
                  ) : null}
                  {showFollowUi ? (
                    <div className="user-profile__follow">
                      {followingQuery.data ? (
                        <button
                          type="button"
                          className="btn btn--small"
                          disabled={unfollowMut.isPending || followMut.isPending}
                          onClick={() => void unfollowMut.mutateAsync()}
                        >
                          {unfollowMut.isPending ? t("pages.common.loading") : t("pages.userProfile.unfollow")}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--primary btn--small"
                          disabled={followMut.isPending || unfollowMut.isPending}
                          onClick={() => void followMut.mutateAsync()}
                        >
                          {followMut.isPending ? t("pages.common.loading") : t("pages.userProfile.follow")}
                        </button>
                      )}
                    </div>
                  ) : null}
                  {!user && profile != null && !profile.is_banned ? (
                    <p className="muted">
                      <Link to="/login" className="inline-link">
                        {t("pages.userProfile.signInToFollow")}
                      </Link>
                    </p>
                  ) : null}
                  {user && viewerId !== targetId ? (
                    <p className="muted user-profile__message-link">
                      <Link to={`/messages/${targetId}`} className="inline-link">
                        {t("pages.search.message")}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
              {!profile.is_banned && profile.bio?.trim() ? (
                <p className="profile-hero__bio">{profile.bio.trim()}</p>
              ) : null}
              {!profile.is_banned ? (
                <div className="profile-stats" role="list">
                  <div className="profile-stats__item" role="listitem">
                    <span className="profile-stats__value">{postsStatDisplay}</span>
                    <span className="profile-stats__label">{t("pages.profile.statsPosts")}</span>
                  </div>
                  <Link
                    className="profile-stats__item profile-stats__item--link"
                    to={`/u/${targetId}/followers`}
                    role="listitem"
                  >
                    <span className="profile-stats__value">{followersStatDisplay}</span>
                    <span className="profile-stats__label">{t("pages.profile.statsFollowers")}</span>
                  </Link>
                  <Link
                    className="profile-stats__item profile-stats__item--link"
                    to={`/u/${targetId}/following`}
                    role="listitem"
                  >
                    <span className="profile-stats__value">{followingStatDisplay}</span>
                    <span className="profile-stats__label">{t("pages.profile.statsFollowing")}</span>
                  </Link>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </section>

      {profile != null ? (
        <section className="card profile-posts">
          {profile.is_banned ? (
            <>
              <h2 className="card__title">{t("pages.userProfile.theirPosts")}</h2>
              <div className="card__body">
                <p className="muted">{t("pages.userProfile.postsHiddenBanned")}</p>
              </div>
            </>
          ) : (
            <>
              <div className="profile-posts__head">
                <h2 className="card__title" id="user-profile-posts-heading">
                  {tab === "posts" ? t("pages.userProfile.theirPosts") : t("pages.userProfile.sectionCommented")}
                </h2>
                <div className="profile-tabs" role="tablist" aria-labelledby="user-profile-posts-heading">
                  <button
                    type="button"
                    className="profile-tabs__tab"
                    role="tab"
                    aria-selected={tab === "posts"}
                    id="user-profile-tab-posts"
                    onClick={() => setTab("posts")}
                  >
                    {t("pages.profile.tabPosts")}
                  </button>
                  <button
                    type="button"
                    className="profile-tabs__tab"
                    role="tab"
                    aria-selected={tab === "commented"}
                    id="user-profile-tab-commented"
                    onClick={() => setTab("commented")}
                  >
                    {t("pages.profile.tabCommented")}
                  </button>
                </div>
              </div>
              <div className="card__body">
                {tab === "posts" ? (
                  <>
                    {postsQuery.isPending ? (
                      <ProfilePostListSkeleton />
                    ) : postsQuery.isError ? (
                      <InlineError message={errorMessage(postsQuery.error)} />
                    ) : (postsQuery.data?.length ?? 0) === 0 ? (
                      <div className="profile-empty" role="status">
                        <p className="profile-empty__text muted">{t("pages.userProfile.emptyPostsOther")}</p>
                      </div>
                    ) : (
                      <ul className="post-list">
                        {(postsQuery.data ?? []).map((p) => (
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
                        <p className="profile-empty__text muted">{t("pages.userProfile.emptyCommentedOther")}</p>
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
                          <div className="feed__more" ref={commentedSentinelRef}>
                            {commentedLoadingMore ? (
                              <p className="feed__more-loading" role="status">
                                {t("pages.common.loading")}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </section>
      ) : null}
    </div>
  );
}
