import type { ReactElement } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  approveCommentAsModerator,
  approvePostAsModerator,
  deleteCommentAsModerator,
  deletePostAsModerator,
  fetchCommentsForModeration,
  fetchPostsForModeration,
  type ModerationCommentRow,
  type ModerationPostRow,
} from "../lib/adminModeration.ts";
import { errorMessage } from "../lib/errors.ts";

type ModerationFilter = "all" | "flagged" | "clean";

export function AdminModerationPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [posts, setPosts] = useState<ModerationPostRow[]>([]);
  const [comments, setComments] = useState<ModerationCommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [postFilter, setPostFilter] = useState<ModerationFilter>("all");
  const [commentFilter, setCommentFilter] = useState<ModerationFilter>("all");

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

  const filteredPosts = useMemo(() => {
    if (postFilter === "flagged") return posts.filter((p) => p.is_flagged);
    if (postFilter === "clean") return posts.filter((p) => !p.is_flagged);
    return posts;
  }, [posts, postFilter]);

  const filteredComments = useMemo(() => {
    if (commentFilter === "flagged") return comments.filter((c) => c.is_flagged);
    if (commentFilter === "clean") return comments.filter((c) => !c.is_flagged);
    return comments;
  }, [comments, commentFilter]);

  const postFlaggedCount = useMemo(() => posts.filter((p) => p.is_flagged).length, [posts]);
  const commentFlaggedCount = useMemo(() => comments.filter((c) => c.is_flagged).length, [comments]);

  async function onApprovePost(row: ModerationPostRow): Promise<void> {
    try {
      await approvePostAsModerator(row.id);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === row.id ? { ...p, is_flagged: false, spam_score: 0 } : p,
        ),
      );
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  }

  async function onApproveComment(row: ModerationCommentRow): Promise<void> {
    try {
      await approveCommentAsModerator(row.id);
      setComments((prev) =>
        prev.map((c) =>
          c.id === row.id ? { ...c, is_flagged: false, spam_score: 0 } : c,
        ),
      );
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  }

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

  function renderFilterChips(
    current: ModerationFilter,
    setter: (f: ModerationFilter) => void,
    flaggedCount: number,
    totalCount: number,
  ): ReactElement {
    return (
      <div className="admin-users-toolbar__filters">
        <button
          type="button"
          className={`admin-filter-chip${current === "all" ? " admin-filter-chip--active" : ""}`}
          onClick={() => setter("all")}
        >
          All <span className="admin-filter-chip__count">{totalCount}</span>
        </button>
        <button
          type="button"
          className={`admin-filter-chip${current === "flagged" ? " admin-filter-chip--active" : ""}`}
          onClick={() => setter("flagged")}
        >
          Flagged <span className="admin-filter-chip__count">{flaggedCount}</span>
        </button>
        <button
          type="button"
          className={`admin-filter-chip${current === "clean" ? " admin-filter-chip--active" : ""}`}
          onClick={() => setter("clean")}
        >
          Clean <span className="admin-filter-chip__count">{totalCount - flaggedCount}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="stack admin-moderation-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.moderation.title")}</h1>
        <div className="card__body">
          <p className="muted">
            {t("pages.admin.moderation.hint")} {t("pages.admin.moderation.latest50")}
          </p>
          <p className="muted">{t("pages.admin.moderation.autoFlagHint")}</p>
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
        <h2 className="card__title">
          {t("pages.admin.moderation.postsHeading")}
          {postFlaggedCount > 0 ? (
            <span className="admin-moderation-count admin-moderation-count--flagged">
              {postFlaggedCount} flagged
            </span>
          ) : null}
        </h2>
        <div className="card__body">
          {renderFilterChips(postFilter, setPostFilter, postFlaggedCount, posts.length)}

          {filteredPosts.length === 0 ? (
            <p className="muted">{t("pages.admin.moderation.noPosts")}</p>
          ) : (
            <ul className="admin-moderation-list">
              {filteredPosts.map((p) => (
                <li key={p.id} className={`admin-moderation-list__item${p.is_flagged ? " admin-moderation-list__item--flagged" : ""}`}>
                  <div className="admin-moderation-list__meta">
                    <span className="muted">{new Date(p.created_at).toLocaleString()}</span>
                    {p.authorEmail ? (
                      <span className="muted"> · {p.authorEmail}</span>
                    ) : null}
                    {p.is_flagged ? (
                      <span className="admin-moderation-list__badge admin-moderation-list__badge--flagged">
                        {t("pages.admin.moderation.flaggedLabel")}
                      </span>
                    ) : null}
                    <span className="admin-moderation-list__spam-score">
                      {t("pages.admin.moderation.spamScoreLabel")}: {p.spam_score}
                    </span>
                  </div>

                  {/* Media preview */}
                  {p.image_url ? (
                    <div className="admin-moderation-list__media">
                      <img
                        src={p.image_url}
                        alt="Post image"
                        className="admin-moderation-list__image"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  {p.video_url ? (
                    <div className="admin-moderation-list__media">
                      <video
                        src={p.video_url}
                        className="admin-moderation-list__video"
                        controls
                        preload="metadata"
                      />
                    </div>
                  ) : null}

                  <div className="admin-moderation-list__body">{p.body}</div>
                  <div className="admin-moderation-list__actions">
                    {p.is_flagged ? (
                      <button
                        type="button"
                        className="btn btn--small"
                        onClick={() => void onApprovePost(p)}
                      >
                        {t("pages.admin.moderation.approvePost")}
                      </button>
                    ) : null}
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
        <h2 className="card__title">
          {t("pages.admin.moderation.commentsHeading")}
          {commentFlaggedCount > 0 ? (
            <span className="admin-moderation-count admin-moderation-count--flagged">
              {commentFlaggedCount} flagged
            </span>
          ) : null}
        </h2>
        <div className="card__body">
          {renderFilterChips(commentFilter, setCommentFilter, commentFlaggedCount, comments.length)}

          {filteredComments.length === 0 ? (
            <p className="muted">{t("pages.admin.moderation.noComments")}</p>
          ) : (
            <ul className="admin-moderation-list">
              {filteredComments.map((c) => (
                <li key={c.id} className={`admin-moderation-list__item${c.is_flagged ? " admin-moderation-list__item--flagged" : ""}`}>
                  <div className="admin-moderation-list__meta">
                    <span className="muted">{new Date(c.created_at).toLocaleString()}</span>
                    {c.authorEmail ? (
                      <span className="muted"> · {c.authorEmail}</span>
                    ) : null}{" "}
                    <span className="muted">
                      · {t("pages.admin.moderation.postRefPrefix")} {c.post_id.slice(0, 8)}…
                    </span>
                    {c.is_flagged ? (
                      <span className="admin-moderation-list__badge admin-moderation-list__badge--flagged">
                        {t("pages.admin.moderation.flaggedLabel")}
                      </span>
                    ) : null}
                    <span className="admin-moderation-list__spam-score">
                      {t("pages.admin.moderation.spamScoreLabel")}: {c.spam_score}
                    </span>
                  </div>
                  <div className="admin-moderation-list__body">{c.body}</div>
                  <div className="admin-moderation-list__actions">
                    {c.is_flagged ? (
                      <button
                        type="button"
                        className="btn btn--small"
                        onClick={() => void onApproveComment(c)}
                      >
                        {t("pages.admin.moderation.approveComment")}
                      </button>
                    ) : null}
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
