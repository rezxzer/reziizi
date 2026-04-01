import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserPosts } from "../lib/feed";
import { supabase } from "../lib/supabaseClient";
import type { FeedPost } from "../types/feed";

export function ProfilePage(): ReactElement {
  const { user } = useAuth();
  const [displayEmail, setDisplayEmail] = useState<string | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    if (!user) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: prof, error: profError } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", user.id)
        .maybeSingle();
      if (profError) {
        throw profError;
      }
      setDisplayEmail(prof?.email ?? user.email ?? null);
      const list = await fetchUserPosts(user.id);
      setPosts(list);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load profile";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">Profile</h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              Loading…
            </p>
          ) : null}
          {error ? (
            <p className="form__error" role="alert">
              {error}
            </p>
          ) : null}
          {!loading && !error ? (
            <>
              <p>
                <strong>Email:</strong> {displayEmail ?? "—"}
              </p>
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
                  <PostCard post={p} onChanged={() => void load()} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
