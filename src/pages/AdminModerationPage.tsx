import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  deleteCommentAsModerator,
  deletePostAsModerator,
  fetchCommentsForModeration,
  fetchPostsForModeration,
  type ModerationCommentRow,
  type ModerationPostRow,
} from "../lib/adminModeration.ts";
import { errorMessage } from "../lib/errors.ts";

export function AdminModerationPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [posts, setPosts] = useState<ModerationPostRow[]>([]);
  const [comments, setComments] = useState<ModerationCommentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([fetchPostsForModeration(), fetchCommentsForModeration()]);
      setPosts(p);
      setComments(c);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
      setPosts([]);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDeletePost(row: ModerationPostRow): Promise<void> {
    if (!window.confirm(t("pages.admin.moderation.confirmDeletePost"))) {
      return;
    }
    try {
      await deletePostAsModerator(row.id);
      setPosts((prev) => prev.filter((p) => p.id !== row.id));
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  }

  async function onDeleteComment(row: ModerationCommentRow): Promise<void> {
    if (!window.confirm(t("pages.admin.moderation.confirmDeleteComment"))) {
      return;
    }
    try {
      await deleteCommentAsModerator(row.id);
      setComments((prev) => prev.filter((c) => c.id !== row.id));
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  }

  return (
    <div className="stack admin-moderation-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.moderation.title")}</h1>
        <div className="card__body">
          <p className="muted">
            {t("pages.admin.moderation.hint")} {t("pages.admin.moderation.latest50")}
          </p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {!loading ? (
            <button type="button" className="btn btn--small" onClick={() => void load()}>
              {t("pages.admin.refreshLists")}
            </button>
          ) : null}
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.moderation.postsHeading")}</h2>
        <div className="card__body">
          {posts.length === 0 ? (
            <p className="muted">{t("pages.admin.moderation.noPosts")}</p>
          ) : (
            <ul className="admin-moderation-list">
              {posts.map((p) => (
                <li key={p.id} className="admin-moderation-list__item">
                  <div className="admin-moderation-list__meta">
                    <span className="muted">{new Date(p.created_at).toLocaleString()}</span>
                    {p.authorEmail ? (
                      <span className="muted"> · {p.authorEmail}</span>
                    ) : null}
                  </div>
                  <div className="admin-moderation-list__body">{p.body}</div>
                  <div className="admin-moderation-list__actions">
                    <button
                      type="button"
                      className="btn btn--small btn--danger"
                      onClick={() => void onDeletePost(p)}
                    >
                      {t("pages.admin.moderation.deletePost")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.moderation.commentsHeading")}</h2>
        <div className="card__body">
          {comments.length === 0 ? (
            <p className="muted">{t("pages.admin.moderation.noComments")}</p>
          ) : (
            <ul className="admin-moderation-list">
              {comments.map((c) => (
                <li key={c.id} className="admin-moderation-list__item">
                  <div className="admin-moderation-list__meta">
                    <span className="muted">{new Date(c.created_at).toLocaleString()}</span>
                    {c.authorEmail ? (
                      <span className="muted"> · {c.authorEmail}</span>
                    ) : null}{" "}
                    <span className="muted">
                      · {t("pages.admin.moderation.postRefPrefix")} {c.post_id.slice(0, 8)}…
                    </span>
                  </div>
                  <div className="admin-moderation-list__body">{c.body}</div>
                  <div className="admin-moderation-list__actions">
                    <button
                      type="button"
                      className="btn btn--small btn--danger"
                      onClick={() => void onDeleteComment(c)}
                    >
                      {t("pages.admin.moderation.deleteComment")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
