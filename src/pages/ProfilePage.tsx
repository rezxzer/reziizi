import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { InlineError } from "../components/InlineError.tsx";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { fetchUserPosts } from "../lib/feed";
import { queryKeys } from "../lib/queryKeys.ts";
import { supabase } from "../lib/supabaseClient";

export function ProfilePage(): ReactElement {
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

  const displayEmail: string | null = profileDisplayQuery.data?.email ?? null;
  const avatarUrl: string | null = profileDisplayQuery.data?.avatar_url ?? null;
  const posts = postsQuery.data ?? [];

  const loading: boolean = profileDisplayQuery.isPending || postsQuery.isPending;
  const errUnknown: unknown = profileDisplayQuery.error ?? postsQuery.error;
  const error: string | null =
    profileDisplayQuery.isError || postsQuery.isError ? errorMessage(errUnknown) : null;

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
          Profile
          {!flagsLoading && isPremium ? <span className="premium-badge">Premium</span> : null}
        </h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              Loading…
            </p>
          ) : null}
          <InlineError message={error} />
          {!loading && !error ? (
            <>
              <div className="profile-page__identity">
                <Avatar imageUrl={avatarUrl} label={displayEmail ?? "Profile"} size="lg" />
                <div>
                  <p>
                    <strong>Email:</strong> {displayEmail ?? "—"}
                  </p>
                  <p className="muted">
                    <Link className="inline-link" to="/settings">
                      {avatarUrl ? "Change profile photo" : "Upload profile photo"}
                    </Link>
                    {" — "}
                    Settings → Profile photo
                  </p>
                </div>
              </div>
              <p className="muted">
                Posts: {posts.length}
              </p>
            </>
          ) : null}
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Your posts</h2>
        <div className="card__body">
          {posts.length === 0 && !loading ? (
            <p className="muted">You have not posted yet.</p>
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
