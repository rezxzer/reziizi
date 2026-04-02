import type { ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { logger } from "../lib/logger.ts";
import { supabase } from "../lib/supabaseClient.ts";
import { Avatar } from "./Avatar.tsx";
import { postImageAltFromBody } from "../lib/postImageAlt.ts";
import { removeStoredPostImageByPublicUrl } from "../lib/postImageStorage.ts";
import type { FeedPost } from "../types/feed";
import { CommentSection } from "./CommentSection";
import { ReactionButtons } from "./ReactionButtons";
import { ReportPostControl } from "./ReportPostControl.tsx";

type PostCardProps = {
  post: FeedPost;
  onChanged: () => void;
};

export function PostCard({ post, onChanged }: PostCardProps): ReactElement {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const isOwner = user?.id === post.user_id;
  const display = post.authorEmail ?? post.user_id.slice(0, 8);
  const created = new Date(post.created_at).toLocaleString();
  const netScore: number = post.thumbsUp - post.thumbsDown;

  async function handleDelete(): Promise<void> {
    if (!user || !isOwner || deleting) {
      return;
    }
    if (!window.confirm("Delete this post?")) {
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
    onChanged();
  }

  return (
    <article className="post-card">
      <header className="post-card__header">
        <div className="post-card__author-row">
          <Avatar imageUrl={post.authorAvatarUrl} label={display} size="sm" />
          <span className="post-card__author">{display}</span>
        </div>
        <time className="post-card__time" dateTime={post.created_at}>
          {created}
        </time>
      </header>
      {post.image_url ? (
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
      <p className="post-card__body">{post.body}</p>
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
            className="post-card__score"
            title="Net score (thumbs up minus thumbs down)"
          >
            {netScore > 0 ? `+${netScore}` : `${netScore}`}
          </span>
        </div>
        <div className="post-card__actions">
          {isOwner ? (
            <button
              type="button"
              className="btn btn--danger btn--small"
              disabled={deleting}
              onClick={() => void handleDelete()}
            >
              {deleting ? "…" : "Delete"}
            </button>
          ) : null}
        </div>
        <ReportPostControl postId={post.id} isOwner={isOwner} />
      </footer>
      <CommentSection postId={post.id} />
    </article>
  );
}
