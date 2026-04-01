import type { ReactElement } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function Layout(): ReactElement {
  return (
    <div className="layout">
      <header className="layout__header">
        <strong className="layout__brand">REZIIZI</strong>
        <nav className="layout__nav" aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/login">Login</NavLink>
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
