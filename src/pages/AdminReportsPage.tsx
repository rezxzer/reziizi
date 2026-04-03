import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import {
  deleteReportAsAdmin,
  fetchReportsForAdmin,
  type ReportWithReporterEmail,
} from "../lib/reports.ts";

export function AdminReportsPage(): ReactElement {
  const toast = useToast();
  const [items, setItems] = useState<ReportWithReporterEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const list = await fetchReportsForAdmin();
      setItems(list);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDismiss(id: string): Promise<void> {
    if (!window.confirm("Remove this report from the list?")) {
      return;
    }
    setBusyId(id);
    try {
      await deleteReportAsAdmin(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">Reports</h1>
        <div className="card__body">
          <p className="muted">User-submitted reports on posts (newest first).</p>
          <p>
            <Link to="/admin">← Admin overview</Link>
          </p>
        </div>
      </section>

      {loading ? (
        <p className="page-loading" role="status">
          Loading…
        </p>
      ) : null}

      <section className="card">
        <div className="card__body">
          {items.length === 0 && !loading ? (
            <p className="muted">No reports yet.</p>
          ) : (
            <ul className="mod-list">
              {items.map((r) => (
                <li key={r.id} className="mod-list__item">
                  <div className="mod-list__meta">
                    <span className="mod-list__author">{r.reporterEmail ?? r.reporter_id.slice(0, 8)}</span>
                    <span className="muted mod-list__post-ref" title={r.post_id}>
                      post {r.post_id.slice(0, 8)}…
                    </span>
                    <time className="muted" dateTime={r.created_at}>
                      {new Date(r.created_at).toLocaleString()}
                    </time>
                  </div>
                  <p className="mod-list__body">{r.reason}</p>
                  <button
                    type="button"
                    className="btn btn--small"
                    disabled={busyId !== null}
                    onClick={() => void handleDismiss(r.id)}
                  >
                    {busyId === r.id ? "…" : "Dismiss"}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!loading ? (
            <p>
              <button type="button" className="btn btn--small" onClick={() => void load()}>
                Refresh
              </button>
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
