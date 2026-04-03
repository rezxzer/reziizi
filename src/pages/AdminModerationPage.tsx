import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteCommentAsModerator,
  deletePostAsModerator,
  fetchCommentsForModeration,
  fetchPostsForModeration,
  type ModerationCommentRow,
  type ModerationPostRow,
} from "../lib/adminModeration.ts";
import { errorMessage } from "../lib/errors.ts";
import { postImageAltFromBody } from "../lib/postImageAlt.ts";

export function AdminModerationPage(): ReactElement {
  const [posts, setPosts] = useState<ModerationPostRow[]>([]);
  const [comments, setComments] = useState<ModerationCommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const [p, c] = await Promise.all([fetchPostsForModeration(), fetchCommentsForModeration()]);
      setPosts(p);
      setComments(c);
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDeletePost(id: string): Promise<void> {
    if (!window.confirm("Delete this post? (Comments will be removed with it.)")) {
      return;
    }
    setBusyId(id);
    setError(null);
    try {
      await deletePostAsModerator(id);
      setPosts((prev) => prev.filter((x) => x.id !== id));
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDeleteComment(id: string): Promise<void> {
    if (!window.confirm("Delete this comment?")) {
      return;
    }
    setBusyId(id);
    setError(null);
    try {
      await deleteCommentAsModerator(id);
      setComments((prev) => prev.filter((x) => x.id !== id));
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">Moderation</h1>
        <div className="card__body">
          <p className="muted">Delete posts or comments (admin only). Latest {posts.length > 0 ? "50" : ""} each.</p>
          <p>
            <Link to="/admin">← Admin overview</Link>
          </p>
        </div>
      </section>

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

      <section className="card">
        <h2 className="card__title">Posts</h2>
        <div className="card__body">
          {posts.length === 0 ? (
            <p className="muted">No posts.</p>
          ) : (
            <ul className="mod-list">
              {posts.map((p) => (
                <li key={p.id} className="mod-list__item">
                  <div className="mod-list__meta">
                    <span className="mod-list__author">{p.authorEmail ?? p.user_id.slice(0, 8)}</span>
                    <time className="muted" dateTime={p.created_at}>
                      {new Date(p.created_at).toLocaleString()}
                    </time>
                  </div>
                  {p.video_url ? (
                    <div className="mod-list__media">
                      <video
                        className="mod-list__video"
                        src={p.video_url}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={postImageAltFromBody(p.body)}
                      />
                    </div>
                  ) : p.image_url ? (
                    <div className="mod-list__media">
                      <img
                        className="mod-list__image"
                        src={p.image_url}
                        alt={postImageAltFromBody(p.body)}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                  <p className="mod-list__body">{p.body}</p>
                  <button
                    type="button"
                    className="btn btn--danger btn--small"
                    disabled={busyId !== null}
                    onClick={() => void handleDeletePost(p.id)}
                  >
                    {busyId === p.id ? "…" : "Delete post"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Comments</h2>
        <div className="card__body">
          {comments.length === 0 ? (
            <p className="muted">No comments.</p>
          ) : (
            <ul className="mod-list">
              {comments.map((c) => (
                <li key={c.id} className="mod-list__item">
                  <div className="mod-list__meta">
                    <span className="mod-list__author">{c.authorEmail ?? c.user_id.slice(0, 8)}</span>
                    <span className="muted mod-list__post-ref" title={c.post_id}>
                      post {c.post_id.slice(0, 8)}…
                    </span>
                    <time className="muted" dateTime={c.created_at}>
                      {new Date(c.created_at).toLocaleString()}
                    </time>
                  </div>
                  <p className="mod-list__body">{c.body}</p>
                  <button
                    type="button"
                    className="btn btn--danger btn--small"
                    disabled={busyId !== null}
                    onClick={() => void handleDeleteComment(c.id)}
                  >
                    {busyId === c.id ? "…" : "Delete comment"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {!loading ? (
        <p>
          <button type="button" className="btn btn--small" onClick={() => void load()}>
            Refresh lists
          </button>
        </p>
      ) : null}
    </div>
  );
}
