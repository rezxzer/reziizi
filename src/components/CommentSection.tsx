import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchCommentsForPost,
  getCommentMaxLength,
  type CommentWithAuthor,
} from "../lib/comments";
import { supabase } from "../lib/supabaseClient";

type CommentSectionProps = {
  postId: string;
};

export function CommentSection({ postId }: CommentSectionProps): ReactElement {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const maxLen = getCommentMaxLength();

  useEffect(() => {
    if (!open) {
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    void fetchCommentsForPost(postId)
      .then((list) => {
        if (!cancelled) {
          setComments(list);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load comments");
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
    setError(null);
    const { data, error: insError } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: user.id, body: trimmed })
      .select("id, post_id, user_id, body, created_at, updated_at")
      .single();
    setSubmitting(false);
    if (insError || !data) {
      setError(insError?.message ?? "Could not post comment");
      return;
    }
    setBody("");
    setComments((prev) => [
      ...prev,
      {
        ...data,
        authorEmail: user.email ?? null,
      },
    ]);
  }

  async function handleDelete(commentId: string, authorId: string): Promise<void> {
    if (!user || user.id !== authorId) {
      return;
    }
    if (!window.confirm("Delete this comment?")) {
      return;
    }
    setError(null);
    const { error: delError } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", user.id);
    if (delError) {
      setError(delError.message);
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
        {open ? "Hide comments" : "Comments"}
        {!loading && open ? ` (${comments.length})` : ""}
        {!open && comments.length > 0 ? ` (${comments.length})` : ""}
      </button>

      {open ? (
        <div className="comment-section__panel">
          {loading ? (
            <p className="muted" role="status">
              Loading comments…
            </p>
          ) : null}
          {error ? (
            <p className="form__error" role="alert">
              {error}
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
                        Delete
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {user ? (
            <form className="comment-form form form--post" onSubmit={(e) => void handleSubmit(e)}>
              <label className="form__label">
                Add a comment
                <textarea
                  className="form__textarea"
                  rows={2}
                  maxLength={maxLen}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write a comment…"
                />
              </label>
              <div className="form__row">
                <span className="muted">
                  {body.length}/{maxLen}
                </span>
                <button type="submit" className="btn btn--primary" disabled={submitting || body.trim().length < 1}>
                  {submitting ? "Sending…" : "Comment"}
                </button>
              </div>
            </form>
          ) : (
            <p className="muted">
              <Link to="/login" className="inline-link">
                Sign in
              </Link>{" "}
              to comment.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
