import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useCardTilt } from "../hooks/useCardTilt.ts";
import { useHeartbeat } from "../hooks/useHeartbeat.ts";
import { useScrollParallax } from "../hooks/useScrollParallax.ts";
import { useUnreadNotificationCount } from "../hooks/useUnreadNotificationCount.ts";
import { useAppFeatureFlags } from "../hooks/useAppFeatureFlags";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { FEATURE_FLAG_KEYS, isFeatureEnabled } from "../lib/featureFlags";
import { RouteAnnouncer } from "./RouteAnnouncer.tsx";
import { RouteSeo } from "./RouteSeo.tsx";
import { LayoutOutlet } from "./LayoutOutlet.tsx";
import { CursorTrail } from "./CursorTrail.tsx";
import { StarField } from "./StarField.tsx";
import { ThemePreferenceControls } from "./ThemePreferenceControls.tsx";

const ALLOWED_WHEN_BANNED: readonly string[] = ["/banned", "/login", "/legal"];

function navLinkClass({ isActive }: { isActive: boolean }): string {
  return isActive ? "layout__nav-link active" : "layout__nav-link";
}

export function Layout(): ReactElement {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const { isAdmin, isBanned, loading: flagsLoading } = useProfileFlags();
  useHeartbeat();
  useCardTilt();
  useScrollParallax();
  const unreadNotifications = useUnreadNotificationCount();
  const featureFlags = useAppFeatureFlags();
  const showNavSearch = isFeatureEnabled(featureFlags.data, FEATURE_FLAG_KEYS.navSearch);
  const showNavMessages = isFeatureEnabled(featureFlags.data, FEATURE_FLAG_KEYS.navMessages);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdminRoute: boolean = pathname.startsWith("/admin");

  useEffect(() => {
    setAdminMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

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
      <StarField />
      <CursorTrail />
      <RouteSeo />
      <RouteAnnouncer />
      <a className="skip-link" href="#main-content">
        {t("layout.skipToMain")}
      </a>
      <header className="layout__header" translate="no">
        <Link className="layout__brand" to="/" aria-label={t("layout.brandAria")}>
          Meta<span>feed</span>
        </Link>
        <button
          type="button"
          className="layout__mobile-menu-btn"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          aria-label={
            mobileMenuOpen ? t("layout.mobileMenuClose") : t("layout.mobileMenuOpen")
          }
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
        >
          <span aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={mobileMenuOpen ? "layout__nav layout__nav--open" : "layout__nav"}
          aria-label={t("layout.navAria")}
        >
          <NavLink to="/" end className={navLinkClass}>
            {t("layout.nav.home")}
          </NavLink>
          {showNavSearch ? (
            <NavLink to="/search" className={navLinkClass}>
              {t("layout.nav.search")}
            </NavLink>
          ) : null}
          {!loading && !user ? (
            <NavLink to="/login" className={navLinkClass}>
              {t("layout.nav.login")}
            </NavLink>
          ) : null}
          {user && showNavMessages ? (
            <NavLink to="/messages" className={navLinkClass}>
              {t("layout.nav.messages")}
            </NavLink>
          ) : null}
          {user ? (
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `layout__nav-link layout__nav-notify${isActive ? " active" : ""}`
              }
            >
              {t("layout.nav.notifications")}
              <span className="notif-dot" />
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
          <NavLink to="/profile" className={navLinkClass}>
            {t("layout.nav.profile")}
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            {t("layout.nav.settings")}
          </NavLink>
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
                <NavLink to="/admin/user-reports">{t("layout.nav.userReports")}</NavLink>
                <NavLink to="/admin/blocks">{t("layout.nav.blocks")}</NavLink>
                <NavLink to="/admin/stats">{t("layout.nav.stats")}</NavLink>
                <NavLink to="/admin/ads">{t("layout.nav.ads")}</NavLink>
                <NavLink to="/admin/features">{t("layout.nav.features")}</NavLink>
                <NavLink to="/admin/api">{t("layout.nav.api")}</NavLink>
              </div>
            </details>
          ) : null}
          <NavLink to="/security" className={navLinkClass}>
            {t("layout.nav.security")}
          </NavLink>
          <NavLink to="/legal" className={navLinkClass}>
            {t("layout.nav.legal")}
          </NavLink>
        </nav>
        <div className="layout__nav-right">
          <div className="theme-pill">
            <ThemePreferenceControls />
          </div>
          <div className="layout__user-avatar">{user?.email?.slice(0, 2).toUpperCase() ?? "RZ"}</div>
        </div>
      </header>
      {mobileMenuOpen ? (
        <button
          type="button"
          className="layout__mobile-backdrop"
          aria-label={t("layout.mobileMenuClose")}
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        />
      ) : null}
      <main id="main-content" className="layout__main" tabIndex={-1}>
        <LayoutOutlet />
      </main>
    </div>
  );
}
