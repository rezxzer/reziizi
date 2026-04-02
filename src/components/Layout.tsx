import type { ReactElement } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useUnreadNotificationCount } from "../hooks/useUnreadNotificationCount.ts";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { ThemePreferenceControls } from "./ThemePreferenceControls.tsx";

const ALLOWED_WHEN_BANNED: readonly string[] = ["/banned", "/login", "/legal"];

export function Layout(): ReactElement {
  const { pathname } = useLocation();
  const { user, loading } = useAuth();
  const { isAdmin, isBanned, loading: flagsLoading } = useProfileFlags();
  const unreadNotifications = useUnreadNotificationCount();

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
      <header className="layout__header">
        <strong className="layout__brand">REZIIZI</strong>
        <div className="layout__theme">
          <ThemePreferenceControls />
        </div>
        <nav className="layout__nav" aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/search">Search</NavLink>
          {!loading && !user ? (
            <NavLink to="/login">Login</NavLink>
          ) : null}
          {user ? (
            <NavLink to="/messages">Messages</NavLink>
          ) : null}
          {user ? (
            <NavLink to="/notifications" className="layout__nav-notify">
              Notifications
              {unreadNotifications > 0 ? (
                <span className="nav-badge" aria-label={`${unreadNotifications} unread`}>
                  {unreadNotifications > 99 ? "99+" : unreadNotifications}
                </span>
              ) : null}
            </NavLink>
          ) : null}
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin">Admin</NavLink>
          ) : null}
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin/users">Users</NavLink>
          ) : null}
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin/moderation">Moderation</NavLink>
          ) : null}
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin/reports">Reports</NavLink>
          ) : null}
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin/stats">Stats</NavLink>
          ) : null}
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin/ads">Ads</NavLink>
          ) : null}
          {user && !flagsLoading && isAdmin ? (
            <NavLink to="/admin/api">API</NavLink>
          ) : null}
          <NavLink to="/security">Security</NavLink>
          <NavLink to="/legal">Legal</NavLink>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
