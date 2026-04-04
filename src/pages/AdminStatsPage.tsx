import type { ReactElement } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchPlatformMetrics, type PlatformMetrics } from "../lib/adminStats.ts";
import { errorMessage } from "../lib/errors.ts";

const METRIC_CONFIG: { key: keyof PlatformMetrics; labelPath: string }[] = [
  { key: "profiles", labelPath: "pages.admin.stats.metricProfiles" },
  { key: "posts", labelPath: "pages.admin.stats.metricPosts" },
  { key: "comments", labelPath: "pages.admin.stats.metricComments" },
  { key: "reactions", labelPath: "pages.admin.stats.metricReactions" },
  { key: "reports", labelPath: "pages.admin.stats.metricReports" },
  { key: "tags", labelPath: "pages.admin.stats.metricTags" },
  { key: "post_tags", labelPath: "pages.admin.stats.metricPostTags" },
  { key: "conversations", labelPath: "pages.admin.stats.metricConversations" },
  { key: "chat_messages", labelPath: "pages.admin.stats.metricChatMessages" },
  { key: "notifications", labelPath: "pages.admin.stats.metricNotifications" },
  { key: "ad_slots", labelPath: "pages.admin.stats.metricAdSlots" },
];

export function AdminStatsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const rows = useMemo(
    () => METRIC_CONFIG.map(({ key, labelPath }) => ({ key, label: t(labelPath) })),
    [t],
  );

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const m = await fetchPlatformMetrics();
      setMetrics(m);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
      setMetrics(null);
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
        <h1 className="card__title">{t("pages.admin.stats.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.stats.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.stats.metricsTitle")}</h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {!loading && metrics ? (
            <ul className="admin-stats admin-stats--wide">
              {rows.map(({ key, label }) => (
                <li key={key} className="admin-stats__item">
                  <span className="admin-stats__label">{label}</span>
                  <span className="admin-stats__value">{metrics[key]}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {!loading ? (
            <button type="button" className="btn btn--small" onClick={() => void load()}>
              {t("pages.admin.refresh")}
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
