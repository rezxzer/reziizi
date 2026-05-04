import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useFeedVideoBehavior } from "../hooks/useFeedVideoBehavior.ts";
import type { FeedPost } from "../types/feed.ts";
import { Avatar } from "./Avatar.tsx";
import { EmojiReactionBar } from "./EmojiReactionBar.tsx";

type ReelCardProps = {
  post: FeedPost;
  /** Soft auto-play hint: when true, the card is the visible reel — try to play. */
  active: boolean;
  /** Global mute state shared across all reels in a session. */
  muted: boolean;
  onToggleMute: () => void;
};

export function ReelCard({ post, active, muted, onToggleMute }: ReelCardProps): ReactElement {
  const { t } = useI18n();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  useFeedVideoBehavior(videoEl);

  /** Mark the card data-active so the parent's IntersectionObserver decision is reflected in CSS. */
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.dataset.active = active ? "true" : "false";
    }
  }, [active]);

  /** Try to play / pause based on `active`. Browsers permit autoplay only when muted. */
  useEffect(() => {
    if (!videoEl) {
      return;
    }
    if (active) {
      videoEl.play().catch(() => {
        // Autoplay may be denied (e.g. desktop without user gesture). Stay paused; user can tap to play.
      });
    } else {
      videoEl.pause();
    }
  }, [active, videoEl]);

  const author: string = post.authorDisplayName?.trim() || post.user_id.slice(0, 8);
  const body: string = post.body?.trim() ?? "";

  return (
    <article
      ref={cardRef}
      className="reel-card"
      id={`post-${post.id}`}
      data-post-id={post.id}
      data-active="false"
    >
      <video
        ref={setVideoEl}
        className="reel-card__video"
        src={post.video_url ?? undefined}
        playsInline
        loop
        preload="metadata"
        muted={muted}
        controls={false}
      />

      {/* Overlay layer — author on top-left, mute toggle top-right, caption + emoji bar at the bottom. */}
      <div className="reel-card__overlay">
        <div className="reel-card__top">
          <Link className="reel-card__author-link" to={`/u/${post.user_id}`}>
            <Avatar
              imageUrl={post.authorAvatarUrl}
              label={author}
              seed={post.user_id}
              size="sm"
            />
            <span className="reel-card__author-name">{author}</span>
          </Link>
          <button
            type="button"
            className="reel-card__mute-btn"
            onClick={onToggleMute}
            aria-label={muted ? t("pages.reels.unmute") : t("pages.reels.mute")}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>

        <div className="reel-card__bottom">
          {body.length > 0 ? <p className="reel-card__caption">{body}</p> : null}
          <EmojiReactionBar postId={post.id} />
        </div>
      </div>
    </article>
  );
}
