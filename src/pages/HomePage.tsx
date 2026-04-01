import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PostCard } from "../components/PostCard.tsx";
import { PostForm } from "../components/PostForm.tsx";
import { fetchFeedPage, getPageSize, type FeedSortMode } from "../lib/feed.ts";
import { slugifyTag } from "../lib/tagParse.ts";
import type { FeedPost } from "../types/feed.ts";

export function HomePage(): ReactElement {
  const [searchParams] = useSearchParams();
  const rawTag = searchParams.get("tag");
  const tagSlug = rawTag ? slugifyTag(rawTag) : null;
  const tagInvalid = Boolean(rawTag && !tagSlug);
  const effectiveTag = tagInvalid ? null : tagSlug;
  const wantsTrending = searchParams.get("sort") === "trending";
  const effectiveSort: FeedSortMode = effectiveTag ? "latest" : wantsTrending ? "trending" : "latest";

  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const { posts: page, hasMore: more } = await fetchFeedPage(0, effectiveTag ?? undefined, effectiveSort);
      setPosts(page);
      setOffset(page.length);
      setHasMore(more);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load feed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [effectiveTag, effectiveSort]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function loadMore(): Promise<void> {
    if (!hasMore || loadingMore || loading) {
      return;
    }
    setLoadingMore(true);
    setError(null);
    try {
      const { posts: next, hasMore: more } = await fetchFeedPage(
        offset,
        effectiveTag ?? undefined,
        effectiveSort,
      );
      setPosts((prev) => [...prev, ...next]);
      setOffset((o) => o + next.length);
      setHasMore(more);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load more";
      setError(msg);
    } finally {
      setLoadingMore(false);
    }
  }

  const latestHref: string = effectiveTag ? `/?tag=${encodeURIComponent(effectiveTag)}` : "/";

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">Feed</h2>
        <div className="card__body">
          <div className="feed-sort" role="tablist" aria-label="Feed order">
            <Link
              to={latestHref}
              className={`feed-sort__link${effectiveSort === "latest" ? " feed-sort__link--active" : ""}`}
              role="tab"
              aria-selected={effectiveSort === "latest"}
            >
              Latest
            </Link>
            <Link
              to="/?sort=trending"
              className={`feed-sort__link${effectiveSort === "trending" ? " feed-sort__link--active" : ""}`}
              role="tab"
              aria-selected={effectiveSort === "trending"}
            >
              Trending
            </Link>
          </div>
          {effectiveTag && wantsTrending ? (
            <p className="muted form__hint">
              Trending applies to the full feed. Showing latest posts for this tag.
            </p>
          ) : null}
          {effectiveTag ? (
            <p className="feed-filter">
              Filter: tag <strong>{effectiveTag}</strong>{" "}
              <Link to={effectiveSort === "trending" ? "/?sort=trending" : "/"} className="inline-link">
                Clear
              </Link>
            </p>
          ) : null}
          {tagInvalid ? (
            <p className="form__error" role="alert">
              Invalid tag in URL. Use letters, numbers, and hyphens only.
            </p>
          ) : null}
          <PostForm onPosted={() => void refresh()} />
        </div>
      </section>

      {loading && posts.length === 0 ? (
        <p className="page-loading" role="status">
          Loading posts…
        </p>
      ) : null}

      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}

      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.id}>
            <PostCard post={p} onChanged={() => void refresh()} />
          </li>
        ))}
      </ul>

      {!loading && posts.length === 0 && !error ? (
        <p className="muted">
          {effectiveTag ? "No posts with this tag yet." : "No posts yet. Be the first to post."}
        </p>
      ) : null}

      {hasMore && posts.length > 0 ? (
        <div className="feed__more">
          <button
            type="button"
            className="btn"
            disabled={loadingMore || loading}
            onClick={() => void loadMore()}
          >
            {loadingMore ? "Loading…" : `Load more (${getPageSize()} per page)`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
