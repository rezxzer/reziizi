import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { errorMessage } from "../lib/errors.ts";
import {
  fetchFollowersPage,
  fetchFollowingPage,
  type FollowListMember,
} from "../lib/follows.ts";
import { isValidUuid } from "../lib/chat.ts";
import { canShowEmail, fetchPublicProfile, type PublicProfileView } from "../lib/profileView.ts";

function memberLabel(m: FollowListMember, viewerId: string | null): string {
  const p: PublicProfileView = {
    id: m.userId,
    email: m.email,
    avatar_url: m.avatar_url,
    display_name: null,
    bio: null,
    searchable: m.searchable,
    is_private: false,
    is_banned: m.is_banned,
  };
  if (canShowEmail(p, viewerId)) {
    return m.email ?? m.userId.slice(0, 8);
  }
  return `${m.userId.slice(0, 8)}…`;
}

export function UserFollowListPage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const targetId: string = userId ?? "";
  const viewerId: string | null = user?.id ?? null;

  const mode: "followers" | "following" = location.pathname.endsWith("/following") ? "following" : "followers";

  const profileQuery = useQuery({
    queryKey: ["publicProfile", targetId],
    queryFn: () => fetchPublicProfile(targetId),
    enabled: isValidUuid(targetId),
  });

  const listQuery = useInfiniteQuery({
    queryKey: ["followList", mode, targetId],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      mode === "followers"
        ? fetchFollowersPage(targetId, pageParam)
        : fetchFollowingPage(targetId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return allPages.reduce((sum, p) => sum + p.rows.length, 0);
    },
    enabled: isValidUuid(targetId) && Boolean(profileQuery.data) && !profileQuery.data?.is_banned,
  });

  const profile = profileQuery.data;
  const rows: FollowListMember[] = listQuery.data?.pages.flatMap((p) => p.rows) ?? [];

  const hasMore = Boolean(listQuery.hasNextPage);
  const loadingMore = listQuery.isFetchingNextPage;

  const loadMore = useCallback((): void => {
    if (!hasMore || loadingMore) {
      return;
    }
    void listQuery.fetchNextPage();
  }, [listQuery, hasMore, loadingMore]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loadingMore || listQuery.isPending,
    onLoadMore: loadMore,
  });

  if (!isValidUuid(targetId)) {
    return (
      <div className="stack follow-list-page">
        <section className="card">
          <h1 className="card__title">{t("pages.userProfile.invalidTitle")}</h1>
          <div className="card__body">
            <p className="form__error" role="alert">
              {t("pages.userProfile.invalidBody")}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const title: string =
    mode === "followers" ? t("pages.followList.followersHeading") : t("pages.followList.followingHeading");

  return (
    <div className="stack follow-list-page">
      <section className="card">
        <h1 className="card__title">{title}</h1>
        <div className="card__body">
          <p className="muted">
            <Link className="inline-link" to={`/u/${targetId}`}>
              {t("pages.followList.backToProfile")}
            </Link>
          </p>
          {profileQuery.isPending ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {profileQuery.isError ? <InlineError message={errorMessage(profileQuery.error)} /> : null}
          {!profileQuery.isPending && profile == null ? (
            <p className="muted">{t("pages.userProfile.notFound")}</p>
          ) : null}
          {profile?.is_banned ? (
            <p className="form__error" role="alert">
              {t("pages.userProfile.bannedNotice")}
            </p>
          ) : null}
        </div>
      </section>

      {profile != null && !profile.is_banned ? (
        <section className="card">
          <div className="card__body">
            {listQuery.isPending ? (
              <p className="page-loading" role="status">
                {t("pages.common.loading")}
              </p>
            ) : null}
            <InlineError message={listQuery.isError ? errorMessage(listQuery.error) : null} />
            {!listQuery.isPending && !listQuery.isError && rows.length === 0 ? (
              <p className="muted">
                {mode === "followers" ? t("pages.followList.emptyFollowers") : t("pages.followList.emptyFollowing")}
              </p>
            ) : null}
            {rows.length > 0 ? (
              <ul className="follow-list">
                {rows.map((m) => {
                  const label = memberLabel(m, viewerId);
                  return (
                    <li key={`${m.userId}-${m.followedAt}`} className="follow-list__item">
                      <Avatar imageUrl={m.avatar_url} label={label} size="sm" />
                      <div className="follow-list__main">
                        <Link className="follow-list__name" to={`/u/${m.userId}`}>
                          {label}
                        </Link>
                        {m.is_banned ? (
                          <span className="muted follow-list__badge">{t("pages.followList.restricted")}</span>
                        ) : null}
                      </div>
                      {user && user.id !== m.userId && !m.is_banned ? (
                        <Link to={`/messages/${m.userId}`} className="btn btn--small">
                          {t("pages.search.message")}
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            {hasMore ? (
              <div className="feed__more" ref={sentinelRef}>
                {loadingMore ? (
                  <p className="feed__more-loading" role="status">
                    {t("pages.common.loading")}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
