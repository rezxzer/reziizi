import { useMutation, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FormEvent, ReactElement } from "react";
import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { AvatarUploadSection } from "../components/AvatarUploadSection.tsx";
import { ProfilePostListSkeleton } from "../components/ProfilePostListSkeleton.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { copyToClipboard, getPublicProfileAbsoluteUrl } from "../lib/copyToClipboard.ts";
import { errorMessage } from "../lib/errors.ts";
import {
  fetchUserCommentedPostsPage,
  fetchUserPosts,
} from "../lib/feed";
import { fetchFollowCounts } from "../lib/follows.ts";
import {
  fetchPendingFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../lib/followRequests.ts";
import {
  PROFILE_BIO_MAX,
  PROFILE_DISPLAY_NAME_MAX,
  fetchProfileDisplay,
  normalizeProfileAboutField,
  updateProfileAbout,
} from "../lib/profileAbout.ts";
import { fetchPrivacySettings, setProfilePrivate } from "../lib/profilePrivacy.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { queryClient as qc } from "../lib/queryClient.ts";
import { supabase } from "../lib/supabaseClient.ts";

type ProfileTab = "posts" | "commented";

export function ProfilePage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPremium, loading: flagsLoading } = useProfileFlags();

  /* ── Edit Profile state ── */
  const [editOpen, setEditOpen] = useState(false);
  const [aboutDisplayName, setAboutDisplayName] = useState<string>("");
  const [aboutBio, setAboutBio] = useState<string>("");
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const [aboutBusy, setAboutBusy] = useState(false);
  const [aboutMsg, setAboutMsg] = useState<string | null>(null);
  const [isPrivateLocal, setIsPrivateLocal] = useState(false);
  const [privateBusy, setPrivateBusy] = useState(false);
  const [logoutBusy, setLogoutBusy] = useState(false);

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

  /** Whether the user's profile is private (to decide whether to show follow requests). */
  const privacyQuery = useQuery({
    queryKey: ["profile", user?.id ?? "__none__", "privacy"],
    queryFn: () => fetchPrivacySettings(user!.id),
    enabled: Boolean(user),
  });

  const isPrivateProfile = privacyQuery.data?.is_private === true;

  /** Pending follow requests (only if profile is private). */
  const followRequestsQuery = useQuery({
    queryKey: queryKeys.follow.pendingRequests(user?.id ?? "__none__"),
    queryFn: () => fetchPendingFollowRequests(user!.id),
    enabled: Boolean(user) && isPrivateProfile,
  });

  const pendingRequests = followRequestsQuery.data ?? [];

  const acceptMut = useMutation({
    mutationFn: (requesterId: string) => acceptFollowRequest(requesterId),
    onSuccess: (): void => {
      if (user) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.pendingRequests(user.id) });
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.counts(user.id) });
      }
    },
    onError: (e: unknown): void => {
      toast.error(errorMessage(e));
    },
  });

  const rejectMut = useMutation({
    mutationFn: (requesterId: string) => rejectFollowRequest(requesterId),
    onSuccess: (): void => {
      if (user) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.follow.pendingRequests(user.id) });
      }
    },
    onError: (e: unknown): void => {
      toast.error(errorMessage(e));
    },
  });

  const avatarUrl: string | null = profileDisplayQuery.data?.avatar_url ?? null;
  const displayName: string | null = profileDisplayQuery.data?.display_name?.trim() || null;
  const bio: string | null = profileDisplayQuery.data?.bio?.trim() || null;
  const avatarLabel: string =
    displayName ?? user?.email ?? t("pages.profile.avatarLabel");
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

  const commentedSentinelRef = useInfiniteScroll({
    hasMore: commentedHasMore,
    loading: commentedLoadingMore || commentedLoading,
    onLoadMore: loadMoreCommented,
  });

  const followersDisplay =
    followCountsQuery.isPending && followCounts == null ? "…" : (followCounts?.followers ?? "—");
  const followingDisplay =
    followCountsQuery.isPending && followCounts == null ? "…" : (followCounts?.following ?? "—");
  const postsStatDisplay = postsQuery.isPending ? "…" : String(posts.length);

  /* ── Open Edit Profile + lazy-load fields ── */
  function handleToggleEdit(): void {
    const opening = !editOpen;
    setEditOpen(opening);
    if (opening && !aboutLoaded && profileDisplayQuery.data) {
      setAboutDisplayName(profileDisplayQuery.data.display_name ?? "");
      setAboutBio(profileDisplayQuery.data.bio ?? "");
      setAboutLoaded(true);
    }
    if (opening && privacyQuery.data) {
      setIsPrivateLocal(privacyQuery.data.is_private);
    }
  }

  async function handlePrivateToggle(checked: boolean): Promise<void> {
    if (!user) {
      return;
    }
    setIsPrivateLocal(checked);
    setPrivateBusy(true);
    try {
      await setProfilePrivate(user.id, checked);
      void qc.invalidateQueries({ queryKey: ["profile", user.id, "privacy"] });
      void qc.invalidateQueries({ queryKey: ["publicProfile"] });
    } catch (err: unknown) {
      toast.error(errorMessage(err));
      setIsPrivateLocal(!checked); // revert
    } finally {
      setPrivateBusy(false);
    }
  }

  async function handleProfileAboutSave(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!user) {
      return;
    }
    setAboutMsg(null);
    const dn = normalizeProfileAboutField(aboutDisplayName);
    const b = normalizeProfileAboutField(aboutBio);
    if (dn != null && dn.length > PROFILE_DISPLAY_NAME_MAX) {
      toast.error(t("settings.displayNameTooLong", { max: PROFILE_DISPLAY_NAME_MAX }));
      return;
    }
    if (b != null && b.length > PROFILE_BIO_MAX) {
      toast.error(t("settings.bioTooLong", { max: PROFILE_BIO_MAX }));
      return;
    }
    setAboutBusy(true);
    try {
      await updateProfileAbout(user.id, { display_name: dn, bio: b });
      void qc.invalidateQueries({ queryKey: queryKeys.profile.display(user.id) });
      setAboutMsg(t("settings.profileAboutSaved"));
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setAboutBusy(false);
    }
  }

  async function handleLogout(): Promise<void> {
    if (logoutBusy) {
      return;
    }
    setLogoutBusy(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setLogoutBusy(false);
    }
  }

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
                  className="btn btn--small profile-hero__copy-btn"
                  onClick={() => void onCopyProfileLink()}
                >
                  {t("pages.profile.copyProfileLink")}
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--small"
                  onClick={handleToggleEdit}
                >
                  {editOpen ? t("pages.profile.closeEdit") : t("pages.profile.editProfile")}
                </button>
                <button
                  type="button"
                  className="btn btn--small"
                  onClick={() => void handleLogout()}
                  disabled={logoutBusy}
                >
                  {t("settings.logOut")}
                </button>
              </p>
              <div className="profile-hero__layout">
                <div className="profile-hero__avatar-ring">
                  <div className="profile-hero__avatar">
                    <Avatar imageUrl={avatarUrl} label={avatarLabel} size="lg" />
                  </div>
                </div>
                <div className="profile-hero__meta">
                  <p className="profile-hero__name">
                    {displayName ?? t("pages.profile.noPublicNameYet")}
                  </p>
                  <p className="muted form__hint profile-hero__privacy-hint">
                    {t("pages.profile.publicNamePrivacyHint")}
                  </p>
                </div>
              </div>
              {bio ? <p className="profile-hero__bio">{bio}</p> : null}
              <div className="profile-stats" role="list">
                <div className="profile-stats__item profile-stats__item--stagger-1" role="listitem">
                  <span className="profile-stats__value">{postsStatDisplay}</span>
                  <span className="profile-stats__label">{t("pages.profile.statsPosts")}</span>
                </div>
                <Link
                  className="profile-stats__item profile-stats__item--link profile-stats__item--stagger-2"
                  to={`/u/${user.id}/followers`}
                  role="listitem"
                >
                  <span className="profile-stats__value">{followersDisplay}</span>
                  <span className="profile-stats__label">{t("pages.profile.statsFollowers")}</span>
                </Link>
                <Link
                  className="profile-stats__item profile-stats__item--link profile-stats__item--stagger-3"
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

      {/* ── Edit Profile (collapsible) ── */}
      {editOpen && user ? (
        <div className="profile-edit-section">
          <AvatarUploadSection userId={user.id} />

          <section className="card">
            <h2 className="card__title">{t("settings.profileAbout")}</h2>
            <div className="card__body">
              <p className="muted">{t("settings.profileAboutHint")}</p>
              <form className="form" onSubmit={(ev) => void handleProfileAboutSave(ev)}>
                <label className="form__label" htmlFor="profile-edit-display-name">
                  {t("settings.displayName")}
                </label>
                <input
                  id="profile-edit-display-name"
                  className="form__input"
                  type="text"
                  maxLength={PROFILE_DISPLAY_NAME_MAX}
                  autoComplete="nickname"
                  value={aboutDisplayName}
                  onChange={(ev) => setAboutDisplayName(ev.target.value)}
                  placeholder={t("settings.displayNamePlaceholder")}
                />
                <label className="form__label" htmlFor="profile-edit-bio">
                  {t("settings.bio")}
                </label>
                <textarea
                  id="profile-edit-bio"
                  className="form__input"
                  rows={4}
                  maxLength={PROFILE_BIO_MAX}
                  value={aboutBio}
                  onChange={(ev) => setAboutBio(ev.target.value)}
                  placeholder={t("settings.bioPlaceholder")}
                />
                <button type="submit" className="btn btn--primary" disabled={aboutBusy}>
                  {aboutBusy ? t("settings.profileAboutSaving") : t("settings.profileAboutSave")}
                </button>
                {aboutMsg ? (
                  <p className="form__success" role="status">
                    {aboutMsg}
                  </p>
                ) : null}
              </form>
            </div>
          </section>

          <section className="card">
            <h2 className="card__title">{t("settings.privacy")}</h2>
            <div className="card__body">
              <label className="form__label--checkbox">
                <input
                  type="checkbox"
                  checked={isPrivateLocal}
                  disabled={privateBusy}
                  onChange={(ev) => void handlePrivateToggle(ev.target.checked)}
                />
                {t("settings.privateProfileCheckbox")}
              </label>
              <p className="muted form__hint">{t("settings.privateProfileHint")}</p>
            </div>
          </section>
        </div>
      ) : null}

      {/* ── Follow Requests (only for private profiles) ── */}
      {isPrivateProfile && pendingRequests.length > 0 ? (
        <section className="card">
          <h2 className="card__title">
            {t("pages.profile.followRequests")}{" "}
            <span className="badge badge--count">{pendingRequests.length}</span>
          </h2>
          <div className="card__body">
            <ul className="follow-request-list">
              {pendingRequests.map((req) => (
                <li key={req.id} className="follow-request-item">
                  <Link to={`/u/${req.requesterId}`} className="follow-request-item__user">
                    <Avatar
                      imageUrl={req.requesterAvatar}
                      label={req.requesterDisplayName ?? req.requesterEmail ?? "?"}
                      size="sm"
                    />
                    <span className="follow-request-item__name">
                      {req.requesterDisplayName ?? req.requesterEmail ?? req.requesterId.slice(0, 8)}
                    </span>
                  </Link>
                  <div className="follow-request-item__actions">
                    <button
                      type="button"
                      className="btn btn--primary btn--small"
                      disabled={acceptMut.isPending || rejectMut.isPending}
                      onClick={() => void acceptMut.mutateAsync(req.requesterId)}
                    >
                      {t("pages.profile.acceptRequest")}
                    </button>
                    <button
                      type="button"
                      className="btn btn--small"
                      disabled={acceptMut.isPending || rejectMut.isPending}
                      onClick={() => void rejectMut.mutateAsync(req.requesterId)}
                    >
                      {t("pages.profile.rejectRequest")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

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
      </section>
    </div>
  );
}
