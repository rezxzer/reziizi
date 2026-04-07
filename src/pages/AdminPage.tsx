import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchPlatformMetrics, type PlatformMetrics } from "../lib/adminStats.ts";
import { errorMessage } from "../lib/errors.ts";

type AdminStats = {
  profiles: number;
  posts: number;
  comments: number;
  reactions: number;
};

const NAV_ITEMS: {
  to: string;
  labelKey: string;
  icon: string;
  color: string;
}[] = [
  { to: "/admin/moderation", labelKey: "pages.admin.overview.linkModeration", icon: "\u{1F6E1}", color: "var(--danger)" },
  { to: "/admin/users", labelKey: "pages.admin.overview.linkUsers", icon: "\u{1F465}", color: "var(--accent-blue)" },
  { to: "/admin/reports", labelKey: "pages.admin.overview.linkReports", icon: "\u{1F4CB}", color: "var(--accent-tertiary)" },
  { to: "/admin/stats", labelKey: "pages.admin.overview.linkStats", icon: "\u{1F4CA}", color: "var(--accent-secondary)" },
  { to: "/admin/ads", labelKey: "pages.admin.overview.linkAds", icon: "\u{1F4E2}", color: "var(--success)" },
  { to: "/admin/features", labelKey: "pages.admin.overview.linkFeatures", icon: "\u{2699}", color: "var(--muted)" },
  { to: "/admin/api", labelKey: "pages.admin.overview.linkApi", icon: "\u{1F4E6}", color: "var(--text-tertiary)" },
];

function formatCount(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return String(n);
}

export function AdminPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [allMetrics, setAllMetrics] = useState<PlatformMetrics | null>(null);
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
      setAllMetrics(m);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
      setStats(null);
      setAllMetrics(null);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">{t("pages.admin.overview.title")}</h1>
        <div className="admin-dashboard__header-actions">
          <button
            type="button"
            className="btn btn--small"
            onClick={() => void load()}
            disabled={loading}
          >
            {loading ? "..." : t("pages.admin.refresh")}
          </button>
          <Link to="/" className="admin-dashboard__home-link">
            {t("pages.admin.backToHome")}
          </Link>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="admin-dashboard__stats-row">
        {loading ? (
          <p className="page-loading" role="status">
            {t("pages.common.loading")}
          </p>
        ) : stats ? (
          <>
            <div className="admin-stat-card admin-stat-card--profiles">
              <span className="admin-stat-card__icon">{"\u{1F464}"}</span>
              <div className="admin-stat-card__content">
                <span className="admin-stat-card__value">{formatCount(stats.profiles)}</span>
                <span className="admin-stat-card__label">{t("pages.admin.overview.statProfiles")}</span>
              </div>
            </div>
            <div className="admin-stat-card admin-stat-card--posts">
              <span className="admin-stat-card__icon">{"\u{1F4DD}"}</span>
              <div className="admin-stat-card__content">
                <span className="admin-stat-card__value">{formatCount(stats.posts)}</span>
                <span className="admin-stat-card__label">{t("pages.admin.overview.statPosts")}</span>
              </div>
            </div>
            <div className="admin-stat-card admin-stat-card--comments">
              <span className="admin-stat-card__icon">{"\u{1F4AC}"}</span>
              <div className="admin-stat-card__content">
                <span className="admin-stat-card__value">{formatCount(stats.comments)}</span>
                <span className="admin-stat-card__label">{t("pages.admin.overview.statComments")}</span>
              </div>
            </div>
            <div className="admin-stat-card admin-stat-card--reactions">
              <span className="admin-stat-card__icon">{"\u{2764}"}</span>
              <div className="admin-stat-card__content">
                <span className="admin-stat-card__value">{formatCount(stats.reactions)}</span>
                <span className="admin-stat-card__label">{t("pages.admin.overview.statReactions")}</span>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Extra quick metrics */}
      {!loading && allMetrics ? (
        <div className="admin-dashboard__extra-stats">
          <span className="admin-extra-stat">
            <span className="admin-extra-stat__value">{formatCount(allMetrics.reports)}</span>
            <span className="admin-extra-stat__label">{t("pages.admin.stats.metricReports")}</span>
          </span>
          <span className="admin-extra-stat">
            <span className="admin-extra-stat__value">{formatCount(allMetrics.conversations)}</span>
            <span className="admin-extra-stat__label">{t("pages.admin.stats.metricConversations")}</span>
          </span>
          <span className="admin-extra-stat">
            <span className="admin-extra-stat__value">{formatCount(allMetrics.chat_messages)}</span>
            <span className="admin-extra-stat__label">{t("pages.admin.stats.metricChatMessages")}</span>
          </span>
          <span className="admin-extra-stat">
            <span className="admin-extra-stat__value">{formatCount(allMetrics.notifications)}</span>
            <span className="admin-extra-stat__label">{t("pages.admin.stats.metricNotifications")}</span>
          </span>
        </div>
      ) : null}

      {/* Navigation cards */}
      <div className="admin-dashboard__nav-grid">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="admin-nav-card"
            style={{ "--nav-card-accent": item.color } as React.CSSProperties}
          >
            <span className="admin-nav-card__icon">{item.icon}</span>
            <span className="admin-nav-card__label">{t(item.labelKey)}</span>
          </Link>
        ))}
      </div>

      {/* Promote hint */}
      <div className="admin-dashboard__hint">
        <p className="muted">
          {t("pages.admin.overview.promoteHintBefore")}{" "}
          <code className="admin-page__code">
            {`update public.profiles set is_admin = true where id = '…';`}
          </code>
        </p>
      </div>
    </div>
  );
}
