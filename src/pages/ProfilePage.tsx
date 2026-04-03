import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { fetchFollowCounts } from "../lib/follows.ts";
import { fetchUserPosts } from "../lib/feed";
import { queryKeys } from "../lib/queryKeys.ts";
import { supabase } from "../lib/supabaseClient";

export function ProfilePage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { isPremium, loading: flagsLoading } = useProfileFlags();

  const profileDisplayQuery = useQuery({
    queryKey: queryKeys.profile.display(user?.id ?? "__none__"),
    queryFn: async (): Promise<{ email: string | null; avatar_url: string | null }> => {
      const { data: prof, error: profError } = await supabase
        .from("profiles")
        .select("email, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();
      if (profError) {
        throw profError;
      }
      const r = prof as { email: string | null; avatar_url: string | null } | null;
      return {
        email: r?.email ?? user!.email ?? null,
        avatar_url: r?.avatar_url ?? null,
      };
    },
    enabled: Boolean(user),
  });

  const postsQuery = useQuery({
    queryKey: queryKeys.userPosts(user?.id ?? "__none__"),
    queryFn: () => fetchUserPosts(user!.id),
    enabled: Boolean(user),
  });

  const followCountsQuery = useQuery({
    queryKey: queryKeys.follow.counts(user?.id ?? "__none__"),
    queryFn: () => fetchFollowCounts(user!.id),
    enabled: Boolean(user),
  });

  const displayEmail: string | null = profileDisplayQuery.data?.email ?? null;
  const avatarUrl: string | null = profileDisplayQuery.data?.avatar_url ?? null;
  const posts = postsQuery.data ?? [];

  const loading: boolean = profileDisplayQuery.isPending || postsQuery.isPending;
  const errUnknown: unknown = profileDisplayQuery.error ?? postsQuery.error;
  const error: string | null =
    profileDisplayQuery.isError || postsQuery.isError ? errorMessage(errUnknown) : null;
  const followCounts = followCountsQuery.data;

  const onPostChanged = useCallback((): void => {
    if (!user) {
      return;
    }
    void queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(user.id) });
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
  }, [queryClient, user]);

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">
          {t("pages.profile.title")}
          {!flagsLoading && isPremium ? (
            <span className="premium-badge">{t("pages.profile.premiumBadge")}</span>
          ) : null}
        </h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.profile.loading")}
            </p>
          ) : null}
          <InlineError message={error} />
          {!loading && !error ? (
            <>
              <div className="profile-page__identity">
                <Avatar imageUrl={avatarUrl} label={displayEmail ?? t("pages.profile.avatarLabel")} size="lg" />
                <div>
                  <p>
                    <strong>{t("pages.profile.emailLabel")}</strong> {displayEmail ?? "—"}
                  </p>
                  <p className="muted">
                    <Link className="inline-link" to="/settings">
                      {avatarUrl ? t("pages.profile.changePhoto") : t("pages.profile.uploadPhoto")}
                    </Link>
                    {" — "}
                    {t("pages.profile.settingsPhotoHint")}
                  </p>
                </div>
              </div>
              <p className="muted">{t("pages.profile.postsCount", { count: posts.length })}</p>
              {followCounts != null && user ? (
                <p className="muted profile-page__follow-stats">
                  <Link className="inline-link" to={`/u/${user.id}/followers`}>
                    {t("pages.userProfile.followersStat", { count: followCounts.followers })}
                  </Link>
                  {" · "}
                  <Link className="inline-link" to={`/u/${user.id}/following`}>
                    {t("pages.userProfile.followingStat", { count: followCounts.following })}
                  </Link>
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.profile.yourPosts")}</h2>
        <div className="card__body">
          {posts.length === 0 && !loading ? (
            <p className="muted">{t("pages.profile.emptyPosts")}</p>
          ) : (
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} onChanged={onPostChanged} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
