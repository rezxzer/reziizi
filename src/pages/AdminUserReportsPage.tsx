import type { ReactElement } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { deleteUserReportAsAdmin, fetchUserReportsForAdmin, type UserReportRow } from "../lib/userReports.ts";
import { errorMessage } from "../lib/errors.ts";

export function AdminUserReportsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [rows, setRows] = useState<UserReportRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const r = await fetchUserReportsForAdmin();
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

  // Count reports per reported user
  const userReportCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) {
      counts.set(r.reported_id, (counts.get(r.reported_id) ?? 0) + 1);
    }
    return counts;
  }, [rows]);

  async function onDismiss(id: string): Promise<void> {
    if (!window.confirm(t("pages.admin.userReports.confirmDismiss"))) {
      return;
    }
    try {
      await deleteUserReportAsAdmin(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  }

  return (
    <div className="stack admin-reports-page">
      <section className="card">
        <h1 className="card__title">
          {t("pages.admin.userReports.title")}
          {rows.length > 0 ? (
            <span className="admin-moderation-count">{rows.length}</span>
          ) : null}
        </h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.userReports.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/admin/reports">{t("pages.admin.overview.linkReports")}</Link>
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
          {rows.length === 0 && !loading ? (
            <p className="muted">{t("pages.admin.userReports.empty")}</p>
          ) : (
            <ul className="admin-reports-list">
              {rows.map((r) => {
                const reportCount = userReportCounts.get(r.reported_id) ?? 1;
                return (
                  <li key={r.id} className={`admin-reports-list__item${reportCount >= 3 ? " admin-reports-list__item--hot" : ""}`}>
                    <div className="admin-reports-list__meta">
                      <span className="muted">{new Date(r.created_at).toLocaleString()}</span>
                      {reportCount > 1 ? (
                        <span className="admin-reports-list__count">
                          {reportCount}x {t("pages.admin.userReports.reportedLabel")}
                        </span>
                      ) : null}
                    </div>
                    <div className="admin-reports-list__meta">
                      <span>
                        {t("pages.admin.userReports.reporter")}: {r.reporterEmail ?? r.reporter_id.slice(0, 8)}
                      </span>
                      <span>→</span>
                      <span>
                        {t("pages.admin.userReports.reported")}: {r.reportedEmail ?? r.reported_id.slice(0, 8)}
                      </span>
                    </div>
                    <div className="admin-reports-list__reason">{r.reason}</div>
                    <div className="admin-reports-list__actions">
                      <Link to={`/u/${r.reported_id}`} className="btn btn--small">
                        {t("pages.admin.userReports.viewProfile")}
                      </Link>
                      <button
                        type="button"
                        className="btn btn--small"
                        onClick={() => void onDismiss(r.id)}
                      >
                        {t("pages.admin.userReports.dismiss")}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
