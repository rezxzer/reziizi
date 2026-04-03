import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { fetchFollowCounts, fetchIsFollowing, followUser, unfollowUser } from "../lib/follows.ts";
import { fetchUserPosts } from "../lib/feed.ts";
import { isValidUuid } from "../lib/chat.ts";
import { canShowEmail, fetchPublicProfile } from "../lib/profileView.ts";
import { queryKeys } from "../lib/queryKeys.ts";

export function UserProfilePage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();
  const { isBanned: viewerBanned, loading: flagsLoading } = useProfileFlags();

  const targetId: string = userId ?? "";
  const viewerId: string | null = user?.id ?? null;

  const profileQuery = useQuery({
    queryKey: ["publicProfile", targetId],
    queryFn: () => fetchPublicProfile(targetId),
    enabled: isValidUuid(targetId),
  });

  const postsQuery = useQuery({
    queryKey: queryKeys.userPosts(targetId),
    queryFn: () => fetchUserPosts(targetId),
    enabled: isValidUuid(targetId) && Boolean(profileQuery.data) && !profileQuery.data?.is_banned,
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

  const followMut = useMutation({
    mutationFn: async (): Promise<void> => {
      await followUser(targetId);
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(targetId) });
      if (viewerId != null) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(viewerId) });
        void queryClient.invalidateQueries({ queryKey: ["followList", "followers", targetId] });
        void queryClient.invalidateQueries({ queryKey: ["followList", "following", viewerId] });
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.relation(viewerId ?? "", targetId) });
    },
  });

  const unfollowMut = useMutation({
    mutationFn: async (): Promise<void> => {
      await unfollowUser(targetId);
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(targetId) });
      if (viewerId != null) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(viewerId) });
        void queryClient.invalidateQueries({ queryKey: ["followList", "followers", targetId] });
        void queryClient.invalidateQueries({ queryKey: ["followList", "following", viewerId] });
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow.relation(viewerId ?? "", targetId) });
    },
  });

  const onPostChanged = useCallback((): void => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(targetId) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
  }, [queryClient, targetId]);

  if (!isValidUuid(targetId)) {
    return (
      <div className="stack">
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
    profile != null && canShowEmail(profile, viewerId)
      ? profile.email ?? profile.id.slice(0, 8)
      : profile != null
        ? `${profile.id.slice(0, 8)}…`
        : "—";

  const showFollowUi: boolean =
    Boolean(viewerId) &&
    viewerId !== targetId &&
    Boolean(profile) &&
    !profile!.is_banned &&
    !viewerBanned &&
    !flagsLoading;

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">{t("pages.userProfile.title")}</h2>
        <div className="card__body">
          {profileQuery.isPending ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          <InlineError message={profileQuery.isError ? errorMessage(profileErr) : null} />
          {!profileQuery.isPending && !profileQuery.isError && profile == null ? (
            <p className="muted">{t("pages.userProfile.notFound")}</p>
          ) : null}
          {!profileQuery.isPending && profile != null ? (
            <>
              {profile.is_banned ? (
                <p className="form__error" role="alert">
                  {t("pages.userProfile.bannedNotice")}
                </p>
              ) : null}
              <div className="profile-page__identity">
                <Avatar imageUrl={profile.avatar_url} label={displayLabel} size="lg" />
                <div>
                  <p>
                    <strong>{t("pages.profile.emailLabel")}</strong>{" "}
                    {canShowEmail(profile, viewerId) ? profile.email ?? "—" : t("pages.userProfile.emailHidden")}
                  </p>
                  {countsQuery.data != null ? (
                    <p className="muted user-profile__follow-stats">
                      <Link className="inline-link" to={`/u/${targetId}/followers`}>
                        {t("pages.userProfile.followersStat", { count: countsQuery.data.followers })}
                      </Link>
                      {" · "}
                      <Link className="inline-link" to={`/u/${targetId}/following`}>
                        {t("pages.userProfile.followingStat", { count: countsQuery.data.following })}
                      </Link>
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
                  {followMut.isError ? (
                    <InlineError message={errorMessage(followMut.error)} />
                  ) : null}
                  {unfollowMut.isError ? (
                    <InlineError message={errorMessage(unfollowMut.error)} />
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
            </>
          ) : null}
        </div>
      </section>

      {profile != null ? (
        <section className="card">
          <h2 className="card__title">{t("pages.userProfile.theirPosts")}</h2>
          <div className="card__body">
            {profile.is_banned ? (
              <p className="muted">{t("pages.userProfile.postsHiddenBanned")}</p>
            ) : postsQuery.isPending ? (
              <p className="page-loading" role="status">
                {t("pages.common.loading")}
              </p>
            ) : null}
            {!profile.is_banned && postsQuery.isError ? (
              <InlineError message={errorMessage(postsQuery.error)} />
            ) : null}
            {!profile.is_banned && !postsQuery.isPending && !postsQuery.isError && (postsQuery.data?.length ?? 0) === 0 ? (
              <p className="muted">{t("pages.profile.emptyPosts")}</p>
            ) : null}
            {!profile.is_banned && !postsQuery.isPending && !postsQuery.isError && (postsQuery.data?.length ?? 0) > 0 ? (
              <ul className="post-list">
                {(postsQuery.data ?? []).map((p) => (
                  <li key={p.id}>
                    <PostCard post={p} onChanged={onPostChanged} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
