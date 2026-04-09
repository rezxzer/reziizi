import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchBlocksForAdmin, type BlockRow } from "../lib/blocks.ts";
import { errorMessage } from "../lib/errors.ts";

export function AdminBlocksPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [rows, setRows] = useState<BlockRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const r = await fetchBlocksForAdmin();
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

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">
          {t("pages.admin.blocks.title")}
          {rows.length > 0 ? (
            <span className="admin-moderation-count">{rows.length}</span>
          ) : null}
        </h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.blocks.intro")}</p>
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
          {rows.length === 0 && !loading ? (
            <p className="muted">{t("pages.admin.blocks.empty")}</p>
          ) : (
            <ul className="admin-reports-list">
              {rows.map((r) => (
                <li key={r.id} className="admin-reports-list__item">
                  <div className="admin-reports-list__meta">
                    <span className="muted">{new Date(r.created_at).toLocaleString()}</span>
                  </div>
                  <div className="admin-reports-list__meta">
                    <span>
                      {t("pages.admin.blocks.blocker")}: {r.blockerEmail ?? r.blocker_id.slice(0, 8)}
                    </span>
                    <span>→</span>
                    <span>
                      {t("pages.admin.blocks.blocked")}: {r.blockedEmail ?? r.blocked_id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="admin-reports-list__actions">
                    <Link to={`/u/${r.blocker_id}`} className="btn btn--small">
                      {t("pages.admin.blocks.viewBlocker")}
                    </Link>
                    <Link to={`/u/${r.blocked_id}`} className="btn btn--small">
                      {t("pages.admin.blocks.viewBlocked")}
                    </Link>
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
