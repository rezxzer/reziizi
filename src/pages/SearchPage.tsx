import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import {
  isSearchQueryValid,
  sanitizeSearchQuery,
  searchPostsByBody,
  searchProfilesByEmail,
} from "../lib/search";
import type { FeedPost } from "../types/feed";
import type { ProfileRow } from "../types/db";

export function SearchPage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam: string = searchParams.get("q") ?? "";
  const [input, setInput] = useState(qParam);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(async (raw: string): Promise<void> => {
    const pattern: string = sanitizeSearchQuery(raw);
    if (!isSearchQueryValid(pattern)) {
      setPosts([]);
      setProfiles([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [p, u] = await Promise.all([
        searchPostsByBody(pattern),
        searchProfilesByEmail(pattern, user?.id ?? null),
      ]);
      setPosts(p);
      setProfiles(u);
    } catch (e: unknown) {
      setError(errorMessage(e));
      setPosts([]);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    setInput(qParam);
    void runSearch(qParam);
  }, [qParam, runSearch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const next: string = sanitizeSearchQuery(input);
    if (next.length < 1) {
      setSearchParams({});
      return;
    }
    setSearchParams({ q: next });
  }

  const pattern: string = sanitizeSearchQuery(qParam);
  const showHint: boolean = qParam.length > 0 && !isSearchQueryValid(pattern);

  return (
    <div className="stack search-page">
      <section className="card" aria-labelledby="search-heading">
        <h1 id="search-heading" className="card__title">
          {t("pages.search.title")}
        </h1>
        <div className="card__body">
          <form className="search-form form" role="search" onSubmit={handleSubmit}>
            <label className="form__label">
              {t("pages.search.queryLabel")}
              <input
                className="form__input"
                type="search"
                name="q"
                autoComplete="off"
                placeholder={t("pages.search.placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn--primary">
              {t("pages.search.submit")}
            </button>
          </form>
          {showHint ? (
            <p className="muted">{t("pages.search.hintMinChars")}</p>
          ) : null}
        </div>
      </section>

      {loading ? (
        <p className="page-loading" role="status">
          {t("pages.search.searching")}
        </p>
      ) : null}

      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && isSearchQueryValid(pattern) && !error ? (
        <>
          <section className="card" aria-labelledby="users-heading">
            <h2 id="users-heading" className="card__title">
              {t("pages.search.usersWithCount", { count: profiles.length })}
            </h2>
            <div className="card__body">
              <p className="muted">{t("pages.search.usersPrivacyNote")}</p>
              {profiles.length === 0 ? (
                <p className="muted">{t("pages.search.noProfiles")}</p>
              ) : (
                <ul className="search-profile-list">
                  {profiles.map((p) => (
                    <li key={p.id} className="search-profile-list__item">
                      <div className="search-profile-list__row">
                        <div className="search-profile-list__main">
                          <span className="search-profile-list__email">{p.email ?? "—"}</span>
                          <span className="muted search-profile-list__id">{p.id}</span>
                        </div>
                        {user && user.id !== p.id ? (
                          <Link to={`/messages/${p.id}`} className="btn btn--small">
                            {t("pages.search.message")}
                          </Link>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="card" aria-labelledby="posts-heading">
            <h2 id="posts-heading" className="card__title">
              {t("pages.search.postsWithCount", { count: posts.length })}
            </h2>
            <div className="card__body search-posts">
              {posts.length === 0 ? (
                <p className="muted">{t("pages.search.noPosts")}</p>
              ) : (
                <ul className="post-list">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <PostCard post={post} onChanged={() => void runSearch(qParam)} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
