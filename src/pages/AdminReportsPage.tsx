import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { deleteReportAsAdmin, fetchReportsForAdmin, type ReportWithReporterEmail } from "../lib/reports.ts";
import { errorMessage } from "../lib/errors.ts";

export function AdminReportsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [rows, setRows] = useState<ReportWithReporterEmail[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const r = await fetchReportsForAdmin();
      setRows(r);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDismiss(id: string): Promise<void> {
    if (!window.confirm(t("pages.admin.reports.confirmDismiss"))) {
      return;
    }
    try {
      await deleteReportAsAdmin(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  }

  return (
    <div className="stack admin-reports-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.reports.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.reports.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {!loading ? (
            <button type="button" className="btn btn--small" onClick={() => void load()}>
              {t("pages.admin.refreshLists")}
            </button>
          ) : null}
        </div>
      </section>

      <section className="card">
        <div className="card__body">
          {rows.length === 0 ? (
            <p className="muted">{t("pages.admin.reports.empty")}</p>
          ) : (
            <ul className="admin-reports-list">
              {rows.map((r) => (
                <li key={r.id} className="admin-reports-list__item">
                  <div className="admin-reports-list__meta">
                    <span className="muted">{new Date(r.created_at).toLocaleString()}</span>
                    <span className="muted">
                      {" "}
                      · {t("pages.admin.reports.postIdPrefix")} {r.post_id.slice(0, 8)}…
                    </span>
                    {r.reporterEmail ? (
                      <span className="muted"> · {r.reporterEmail}</span>
                    ) : null}
                  </div>
                  <div className="admin-reports-list__reason">{r.reason}</div>
                  <div className="admin-reports-list__actions">
                    <button
                      type="button"
                      className="btn btn--small"
                      onClick={() => void onDismiss(r.id)}
                    >
                      {t("pages.admin.reports.dismiss")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
