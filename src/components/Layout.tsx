import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useUnreadNotificationCount } from "../hooks/useUnreadNotificationCount.ts";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { RouteAnnouncer } from "./RouteAnnouncer.tsx";
import { RouteSeo } from "./RouteSeo.tsx";
import { ThemePreferenceControls } from "./ThemePreferenceControls.tsx";

const ALLOWED_WHEN_BANNED: readonly string[] = ["/banned", "/login", "/legal"];

export function Layout(): ReactElement {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const { isAdmin, isBanned, loading: flagsLoading } = useProfileFlags();
  const unreadNotifications = useUnreadNotificationCount();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const isAdminRoute: boolean = pathname.startsWith("/admin");

  useEffect(() => {
    setAdminMenuOpen(false);
  }, [pathname]);

  const blockBanned: boolean =
    !loading &&
    !flagsLoading &&
    Boolean(user) &&
    isBanned &&
    !ALLOWED_WHEN_BANNED.includes(pathname);

  if (blockBanned) {
    return <Navigate to="/banned" replace />;
  }

  return (
    <div className="layout">
      <RouteSeo />
      <RouteAnnouncer />
      <a className="skip-link" href="#main-content">
        {t("layout.skipToMain")}
      </a>
      <header className="layout__header" translate="no">
        <Link className="layout__brand" to="/" aria-label={t("layout.brandAria")}>
          REZIIZI
        </Link>
        <div className="layout__theme">
          <ThemePreferenceControls />
        </div>
        <nav className="layout__nav" aria-label={t("layout.navAria")}>
          <NavLink to="/" end>
            {t("layout.nav.home")}
          </NavLink>
          <NavLink to="/search">{t("layout.nav.search")}</NavLink>
          {!loading && !user ? (
            <NavLink to="/login">{t("layout.nav.login")}</NavLink>
          ) : null}
          {user ? (
            <NavLink to="/messages">{t("layout.nav.messages")}</NavLink>
          ) : null}
          {user ? (
            <NavLink to="/notifications" className="layout__nav-notify">
              {t("layout.nav.notifications")}
              {unreadNotifications > 0 ? (
                <span
                  className="nav-badge"
                  aria-label={t("layout.unreadBadge", { count: unreadNotifications })}
                >
                  {unreadNotifications > 99 ? "99+" : unreadNotifications}
                </span>
              ) : null}
            </NavLink>
          ) : null}
          <NavLink to="/profile">{t("layout.nav.profile")}</NavLink>
          <NavLink to="/settings">{t("layout.nav.settings")}</NavLink>
          {user && !flagsLoading && isAdmin ? (
            <details
              className="layout__nav-details"
              open={adminMenuOpen}
              onToggle={(e) => {
                setAdminMenuOpen((e.currentTarget as HTMLDetailsElement).open);
              }}
            >
              <summary
                className={
                  isAdminRoute
                    ? "layout__nav-details__summary layout__nav-details__summary--active"
                    : "layout__nav-details__summary"
                }
              >
                {t("layout.nav.admin")}
              </summary>
              <div
                className="layout__nav-details__panel"
                role="group"
                aria-label={t("layout.nav.adminMenuAria")}
              >
                <NavLink to="/admin" end>
                  {t("layout.nav.adminOverview")}
                </NavLink>
                <NavLink to="/admin/users">{t("layout.nav.users")}</NavLink>
                <NavLink to="/admin/moderation">{t("layout.nav.moderation")}</NavLink>
                <NavLink to="/admin/reports">{t("layout.nav.reports")}</NavLink>
                <NavLink to="/admin/stats">{t("layout.nav.stats")}</NavLink>
                <NavLink to="/admin/ads">{t("layout.nav.ads")}</NavLink>
                <NavLink to="/admin/api">{t("layout.nav.api")}</NavLink>
              </div>
            </details>
          ) : null}
          <NavLink to="/security">{t("layout.nav.security")}</NavLink>
          <NavLink to="/legal">{t("layout.nav.legal")}</NavLink>
        </nav>
      </header>
      <main id="main-content" className="layout__main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}
