import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { Avatar } from "./Avatar.tsx";
import {
  fetchCommentsForPost,
  getCommentMaxLength,
  type CommentWithAuthor,
} from "../lib/comments";
import { errorMessage } from "../lib/errors.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { supabase } from "../lib/supabaseClient";

type CommentSectionProps = {
  postId: string;
};

export function CommentSection({ postId }: CommentSectionProps): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
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
    staleTime: 60_000,
  });
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const maxLen = getCommentMaxLength();

  useEffect(() => {
    if (!open) {
      return;
    }
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    void fetchCommentsForPost(postId)
      .then((list) => {
        if (!cancelled) {
          setComments(list);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setLoadError(errorMessage(e));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, postId]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!user) {
      return;
    }
    const trimmed = body.trim();
    if (trimmed.length < 1 || trimmed.length > maxLen) {
      return;
    }
    setSubmitting(true);
    const { data, error: insError } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: user.id, body: trimmed })
      .select("id, post_id, user_id, body, is_flagged, spam_score, created_at, updated_at")
      .single();
    setSubmitting(false);
    if (insError || !data) {
      toast.error(insError != null ? errorMessage(insError) : t("pages.comment.commentFailed"));
      return;
    }
    if (data.is_flagged) {
      toast.show(t("pages.comment.flaggedAfterComment"), "info");
    }
    setBody("");
    setComments((prev) => [
      ...prev,
      {
        ...data,
        authorEmail: user.email ?? null,
        authorAvatarUrl: profileDisplayQuery.data?.avatar_url ?? null,
      },
    ]);
  }

  async function handleDelete(commentId: string, authorId: string): Promise<void> {
    if (!user || user.id !== authorId) {
      return;
    }
    if (!window.confirm(t("pages.comment.deleteCommentConfirm"))) {
      return;
    }
    const { error: delError } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", user.id);
    if (delError) {
      toast.error(errorMessage(delError));
      return;
    }
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  return (
    <div className="comment-section">
      <button
        type="button"
        className="comment-section__toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? t("pages.comment.hideComments") : t("pages.comment.comments")}
        {!loading && open ? ` (${comments.length})` : ""}
        {!open && comments.length > 0 ? ` (${comments.length})` : ""}
      </button>

      {open ? (
        <div className="comment-section__panel">
          {loading ? (
            <p className="muted" role="status">
              {t("pages.comment.loading")}
            </p>
          ) : null}
          {loadError ? (
            <p className="form__error" role="alert">
              {loadError}
            </p>
          ) : null}

          {!loading ? (
            <ul className="comment-list">
              {comments.map((c) => {
                const label = c.authorEmail ?? c.user_id.slice(0, 8);
                const isMine = user?.id === c.user_id;
                const time = new Date(c.created_at).toLocaleString();
                return (
                  <li key={c.id} className="comment-list__item">
                    <div className="comment-list__row">
                      <Avatar imageUrl={c.authorAvatarUrl} label={label} size="sm" />
                      <div className="comment-list__main">
                        <div className="comment-list__meta">
                          <span className="comment-list__author">{label}</span>
                          <time className="comment-list__time" dateTime={c.created_at}>
                            {time}
                          </time>
                        </div>
                        <p className="comment-list__body">{c.body}</p>
                        {isMine ? (
                          <button
                            type="button"
                            className="btn btn--danger btn--small comment-list__delete"
                            onClick={() => void handleDelete(c.id, c.user_id)}
                          >
                            {t("pages.comment.delete")}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {user ? (
            <form className="comment-form form form--post" onSubmit={(e) => void handleSubmit(e)}>
              <label className="form__label">
                {t("pages.comment.addLabel")}
                <textarea
                  className="form__textarea"
                  rows={2}
                  maxLength={maxLen}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={t("pages.comment.placeholder")}
                />
              </label>
              <div className="form__row">
                <span className="muted">
                  {body.length}/{maxLen}
                </span>
                <button type="submit" className="btn btn--primary" disabled={submitting || body.trim().length < 1}>
                  {submitting ? t("pages.comment.sending") : t("pages.comment.submit")}
                </button>
              </div>
            </form>
          ) : (
            <p className="muted">
              <Link to="/login" className="inline-link">
                {t("pages.comment.signInLink")}
              </Link>{" "}
              {t("pages.comment.signInSuffix")}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
