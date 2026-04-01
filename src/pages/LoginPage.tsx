import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PlaceholderCard } from "../components/PlaceholderCard";

export function LoginPage(): ReactElement {
  return (
    <div className="stack">
      <PlaceholderCard title="Authentication + User System" featureId="auth">
        <p>
          <strong>Flow:</strong> email / password → Supabase Auth → session.
        </p>
        <form className="form form--dummy" onSubmit={(e) => e.preventDefault()}>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" disabled placeholder="scaffold" />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              disabled
              placeholder="scaffold"
            />
          </label>
          <button type="submit" disabled>
            Sign in / Sign up
          </button>
        </form>
      </PlaceholderCard>
      <PlaceholderCard title="Legal / Privacy (feature 51)" featureId="legal-link">
        <p>
          <Link to="/legal">Terms &amp; Privacy</Link> — required on registration / login UI.
        </p>
      </PlaceholderCard>
    </div>
  );
}
