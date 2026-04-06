import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
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
  const { t } = useI18n();
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
        <h1 className="card__title">{t("pages.admin.overview.title")}</h1>
        <div className="card__body">
          <p className="muted">
            {t("pages.admin.overview.promoteHintBefore")}{" "}
            <code className="admin-page__code">
              {`update public.profiles set is_admin = true where id = '…';`}
            </code>
          </p>
          <p>
            <Link to="/admin/moderation">{t("pages.admin.overview.linkModeration")}</Link>
          </p>
          <p>
            <Link to="/admin/users">{t("pages.admin.overview.linkUsers")}</Link>
          </p>
          <p>
            <Link to="/admin/reports">{t("pages.admin.overview.linkReports")}</Link>
          </p>
          <p>
            <Link to="/admin/stats">{t("pages.admin.overview.linkStats")}</Link>
          </p>
          <p>
            <Link to="/admin/ads">{t("pages.admin.overview.linkAds")}</Link>
          </p>
          <p>
            <Link to="/admin/api">{t("pages.admin.overview.linkApi")}</Link>
          </p>
          <p>
            <Link to="/admin/features">{t("pages.admin.overview.linkFeatures")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.overview.countsTitle")}</h2>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {!loading && stats ? (
            <ul className="admin-stats">
              <li className="admin-stats__item">
                <span className="admin-stats__label">{t("pages.admin.overview.statProfiles")}</span>
                <span className="admin-stats__value">{stats.profiles}</span>
              </li>
              <li className="admin-stats__item">
                <span className="admin-stats__label">{t("pages.admin.overview.statPosts")}</span>
                <span className="admin-stats__value">{stats.posts}</span>
              </li>
              <li className="admin-stats__item">
                <span className="admin-stats__label">{t("pages.admin.overview.statComments")}</span>
                <span className="admin-stats__value">{stats.comments}</span>
              </li>
              <li className="admin-stats__item">
                <span className="admin-stats__label">{t("pages.admin.overview.statReactions")}</span>
                <span className="admin-stats__value">{stats.reactions}</span>
              </li>
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
