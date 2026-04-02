import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPlatformMetrics, type PlatformMetrics } from "../lib/adminStats.ts";
import { errorMessage } from "../lib/errors.ts";

const METRIC_LABELS: { key: keyof PlatformMetrics; label: string }[] = [
  { key: "profiles", label: "Profiles" },
  { key: "posts", label: "Posts" },
  { key: "comments", label: "Comments" },
  { key: "reactions", label: "Reactions" },
  { key: "reports", label: "Reports" },
  { key: "tags", label: "Tags" },
  { key: "post_tags", label: "Post–tag links" },
  { key: "conversations", label: "DM conversations" },
  { key: "chat_messages", label: "Chat messages" },
  { key: "notifications", label: "Notifications" },
  { key: "ad_slots", label: "Ad slots" },
];

export function AdminStatsPage(): ReactElement {
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const m = await fetchPlatformMetrics();
      setMetrics(m);
    } catch (e: unknown) {
      setError(errorMessage(e));
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">Statistics</h1>
        <div className="card__body">
          <p className="muted">Row counts across public tables (approximate platform size).</p>
          <p>
            <Link to="/admin">← Admin overview</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Metrics</h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              Loading…
            </p>
          ) : null}
          {error ? (
            <p className="form__error" role="alert">
              {error}
            </p>
          ) : null}
          {!loading && !error && metrics ? (
            <ul className="admin-stats admin-stats--wide">
              {METRIC_LABELS.map(({ key, label }) => (
                <li key={key} className="admin-stats__item">
                  <span className="admin-stats__label">{label}</span>
                  <span className="admin-stats__value">{metrics[key]}</span>
                </li>
              ))}
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
