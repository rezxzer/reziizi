import type { ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { supabase } from "../lib/supabaseClient.ts";
import type { FeedPost } from "../types/feed";
import { CommentSection } from "./CommentSection";
import { ReactionButtons } from "./ReactionButtons";

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
      console.error(error);
      return;
    }
    onChanged();
  }

  return (
    <article className="post-card">
      <header className="post-card__header">
        <span className="post-card__author">{display}</span>
        <time className="post-card__time" dateTime={post.created_at}>
          {created}
        </time>
      </header>
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
        <ReactionButtons
          postId={post.id}
          thumbsUp={post.thumbsUp}
          thumbsDown={post.thumbsDown}
          myReaction={post.myReaction}
          onChanged={onChanged}
        />
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
      </footer>
      <CommentSection postId={post.id} />
    </article>
  );
}
