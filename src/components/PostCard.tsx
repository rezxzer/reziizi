import type { FormEvent, ReactElement } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { useAppFeatureFlags } from "../hooks/useAppFeatureFlags";
import { useFeedVideoBehavior } from "../hooks/useFeedVideoBehavior.ts";
import { getPostAbsoluteUrl, sharePostUrl } from "../lib/copyToClipboard.ts";
import { FEATURE_FLAG_KEYS, isFeatureEnabled } from "../lib/featureFlags";
import { updatePostBody, validatePostBody } from "../lib/editPost.ts";
import { errorMessage } from "../lib/errors.ts";
import { logger } from "../lib/logger.ts";
import { supabase } from "../lib/supabaseClient.ts";
import { postImageAltFromBody } from "../lib/postImageAlt.ts";
import { removeStoredPostImageByPublicUrl } from "../lib/postImageStorage.ts";
import { removeStoredPostVideoByPublicUrl } from "../lib/postVideoStorage.ts";
import type { FeedPost } from "../types/feed";
import { Avatar } from "./Avatar.tsx";
import { CommentSection } from "./CommentSection";
import { ReactionButtons } from "./ReactionButtons";
import { ReportPostControl } from "./ReportPostControl.tsx";

type PostCardProps = {
  post: FeedPost;
  onChanged: () => void;
};

export function PostCard({ post, onChanged }: PostCardProps): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const featureFlags = useAppFeatureFlags();
  const showComments = isFeatureEnabled(featureFlags.data, FEATURE_FLAG_KEYS.postComments);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [bodyOverflows, setBodyOverflows] = useState(false);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  useFeedVideoBehavior(videoEl);
  const isOwner = user?.id === post.user_id;
  const hasMedia: boolean = Boolean(post.image_url || post.video_url);
  const display: string =
    post.authorDisplayName?.trim() || post.user_id.slice(0, 8);
  const created = new Date(post.created_at).toLocaleString();
  const netScore: number = post.thumbsUp - post.thumbsDown;
  useLayoutEffect(() => {
    if (!hasMedia) {
      setBodyOverflows(false);
      return;
    }
    const el = bodyRef.current;
    if (!el) {
      return;
    }
    const measure = (): void => {
      if (bodyExpanded) {
        setBodyOverflows(true);
        return;
      }
      setBodyOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [hasMedia, bodyExpanded, post.body, post.id]);

  async function handleDelete(): Promise<void> {
    if (!user || !isOwner || deleting) {
      return;
    }
    if (!window.confirm(t("pages.postCard.deleteConfirm"))) {
      return;
    }
    setDeleting(true);
    const { error } = await supabase.from("posts").delete().eq("id", post.id).eq("user_id", user.id);
    setDeleting(false);
    if (error) {
      logger.error("delete post failed:", error);
      return;
    }
    void removeStoredPostImageByPublicUrl(post.image_url);
    void removeStoredPostVideoByPublicUrl(post.video_url);
    onChanged();
  }

  async function handleShare(): Promise<void> {
    const url: string = getPostAbsoluteUrl(post.user_id, post.id);
    const title: string = display;
    try {
      const outcome = await sharePostUrl(url, title);
      if (outcome === "copied") {
        toast.success(t("pages.postCard.shareLinkCopied"));
      }
      // "shared" — system share sheet was the feedback; "cancelled" — user dismissed, no toast.
    } catch (e: unknown) {
      logger.error("share post", e);
      toast.error(t("pages.postCard.shareFailed"));
    }
  }

  function handleEditStart(): void {
    setEditBody(post.body);
    setEditing(true);
    requestAnimationFrame(() => {
      editRef.current?.focus();
    });
  }

  function handleEditCancel(): void {
    setEditing(false);
    setEditBody("");
  }

  async function handleEditSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const trimmed = editBody.trim();
    if (trimmed === post.body.trim()) {
      setEditing(false);
      return;
    }
    const err = validatePostBody(trimmed);
    if (err) {
      toast.error(err);
      return;
    }
    setEditSaving(true);
    try {
      const { flagged } = await updatePostBody(post.id, trimmed);
      setEditing(false);
      onChanged();
      if (flagged) {
        toast.show(t("pages.postCard.editFlaggedHint"), "info");
      } else {
        toast.success(t("pages.postCard.editSaved"));
      }
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setEditSaving(false);
    }
  }

  const isEdited = post.updated_at !== post.created_at;

  return (
    <article className="post-card" id={`post-${post.id}`}>
      <header className="post-card__header">
        <div className="post-card__author-row">
          <div className="post-card__avatar">
            <Avatar imageUrl={post.authorAvatarUrl} label={display} seed={post.user_id} size="sm" />
          </div>
          <Link className="post-card__author-link" to={`/u/${post.user_id}`}>
            <span className="post-card__author">{display}</span>
          </Link>
        </div>
        <time className="post-card__time" dateTime={post.created_at}>
          {created}
        </time>
      </header>
      {post.video_url ? (
        <div className="post-card__media">
          <video
            ref={setVideoEl}
            className="post-card__video"
            src={post.video_url}
            controls
            playsInline
            preload="metadata"
            aria-label={postImageAltFromBody(post.body)}
          />
        </div>
      ) : post.image_url ? (
        <div className="post-card__media">
          <img
            className="post-card__image"
            src={post.image_url}
            alt={postImageAltFromBody(post.body)}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      {isOwner && post.is_flagged ? (
        <p className="post-card__flag-hint muted" role="status">
          {t("pages.postCard.flaggedAuthorHint")}
        </p>
      ) : null}
      {editing ? (
        <form className="post-card__edit-form" onSubmit={(e) => void handleEditSubmit(e)}>
          <textarea
            ref={editRef}
            className="form__input post-card__edit-textarea"
            rows={4}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            disabled={editSaving}
          />
          <div className="post-card__edit-actions">
            <button type="submit" className="btn btn--primary btn--small" disabled={editSaving || !editBody.trim()}>
              {editSaving ? t("pages.postCard.editSaving") : t("pages.postCard.editSave")}
            </button>
            <button type="button" className="btn btn--small" onClick={handleEditCancel} disabled={editSaving}>
              {t("pages.postCard.editCancel")}
            </button>
          </div>
        </form>
      ) : hasMedia ? (
        <div className="post-card__body-block">
          <p
            ref={bodyRef}
            className={
              bodyExpanded
                ? "post-card__body"
                : "post-card__body post-card__body--clamped"
            }
          >
            {post.body}
          </p>
          {bodyExpanded || bodyOverflows ? (
            <button
              type="button"
              className="post-card__body-toggle"
              aria-expanded={bodyExpanded}
              aria-label={
                bodyExpanded
                  ? t("pages.postCard.collapseBodyAria")
                  : t("pages.postCard.expandBodyAria")
              }
              title={
                bodyExpanded
                  ? t("pages.postCard.collapseBodyAria")
                  : t("pages.postCard.expandBodyAria")
              }
              onClick={() => setBodyExpanded((v) => !v)}
            >
              <span className="post-card__body-toggle-icon" aria-hidden="true">
                {bodyExpanded ? "▲" : "▼"}
              </span>
            </button>
          ) : null}
          {isEdited ? (
            <span className="post-card__edited muted">{t("pages.postCard.edited")}</span>
          ) : null}
        </div>
      ) : (
        <div className="post-card__body-block">
          <p className="post-card__body">{post.body}</p>
          {isEdited ? (
            <span className="post-card__edited muted">{t("pages.postCard.edited")}</span>
          ) : null}
        </div>
      )}
      {post.tagSlugs.length > 0 ? (
        <ul className="tag-list">
          {post.tagSlugs.map((slug) => (
            <li key={slug}>
              <Link className="tag-chip" to={`/?tag=${encodeURIComponent(slug)}`}>
                {slug}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <footer className="post-card__footer">
        <div className="post-card__reactions-row">
          <ReactionButtons
            postId={post.id}
            thumbsUp={post.thumbsUp}
            thumbsDown={post.thumbsDown}
            myReaction={post.myReaction}
            onChanged={onChanged}
          />
          <span
            key={netScore}
            className="post-card__score count-bump"
            title={t("pages.postCard.netScoreTitle")}
          >
            {netScore > 0 ? `+${netScore}` : `${netScore}`}
          </span>
        </div>
        <div className="post-card__actions">
          <button
            type="button"
            className="btn btn--small"
            onClick={() => void handleShare()}
            aria-label={t("pages.postCard.shareAria")}
          >
            {t("pages.postCard.share")}
          </button>
          {isOwner && !editing ? (
            <>
              <button
                type="button"
                className="btn btn--small"
                onClick={handleEditStart}
              >
                {t("pages.postCard.edit")}
              </button>
              <button
                type="button"
                className="btn btn--danger btn--small"
                disabled={deleting}
                onClick={() => void handleDelete()}
              >
                {deleting ? t("pages.postCard.deleting") : t("pages.postCard.delete")}
              </button>
            </>
          ) : null}
        </div>
        <ReportPostControl postId={post.id} isOwner={isOwner} />
      </footer>
      {showComments ? <CommentSection postId={post.id} /> : null}
    </article>
  );
}
