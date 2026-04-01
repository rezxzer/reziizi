import type { ReactElement } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useUnreadNotificationCount } from "../hooks/useUnreadNotificationCount.ts";
import { ThemePreferenceControls } from "./ThemePreferenceControls.tsx";

export function Layout(): ReactElement {
  const { user, loading } = useAuth();
  const unreadNotifications = useUnreadNotificationCount();

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
          <NavLink to="/legal">Legal</NavLink>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
