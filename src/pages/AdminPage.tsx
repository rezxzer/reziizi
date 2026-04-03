import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchPlatformMetrics } from "../lib/adminStats.ts";
import { errorMessage } from "../lib/errors.ts";

type AdminStats = {
  profiles: number;
  posts: number;
  comments: number;
  reactions: number;
};

export function AdminPage(): ReactElement {
  const toast = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const m = await fetchPlatformMetrics();
      setStats({
        profiles: m.profiles,
        posts: m.posts,
        comments: m.comments,
        reactions: m.reactions,
      });
    } catch (e: unknown) {
      toast.error(errorMessage(e));
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">Admin</h1>
        <div className="card__body">
          <p className="muted">
            Promote admins in Supabase SQL Editor if needed:{" "}
            <code className="admin-page__code">
              {`update public.profiles set is_admin = true where id = '…';`}
            </code>
          </p>
          <p>
            <Link to="/admin/moderation">Moderation — delete posts &amp; comments</Link>
          </p>
          <p>
            <Link to="/admin/users">Users — ban / unban accounts</Link>
          </p>
          <p>
            <Link to="/admin/reports">Reports — user reports on posts</Link>
          </p>
          <p>
            <Link to="/admin/stats">Statistics — full platform counts</Link>
          </p>
          <p>
            <Link to="/admin/ads">Ads — feed top sponsored strip</Link>
          </p>
          <p>
            <Link to="/admin/api">API catalog — tables &amp; RPCs (Supabase)</Link>
          </p>
          <p>
            <Link to="/">← Home</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Counts</h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              Loading…
            </p>
          ) : null}
          {!loading && stats ? (
            <ul className="admin-stats">
              <li className="admin-stats__item">
                <span className="admin-stats__label">Profiles</span>
                <span className="admin-stats__value">{stats.profiles}</span>
              </li>
              <li className="admin-stats__item">
                <span className="admin-stats__label">Posts</span>
                <span className="admin-stats__value">{stats.posts}</span>
              </li>
              <li className="admin-stats__item">
                <span className="admin-stats__label">Comments</span>
                <span className="admin-stats__value">{stats.comments}</span>
              </li>
              <li className="admin-stats__item">
                <span className="admin-stats__label">Reactions</span>
                <span className="admin-stats__value">{stats.reactions}</span>
              </li>
            </ul>
          ) : null}
          {!loading ? (
            <button type="button" className="btn btn--small" onClick={() => void load()}>
              Refresh
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
