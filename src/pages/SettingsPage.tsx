import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemePreferenceControls } from "../components/ThemePreferenceControls.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { supabase } from "../lib/supabaseClient.ts";

export function SettingsPage(): ReactElement {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);

  async function handlePassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMsg(null);
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordBusy(false);
    if (error) {
      setPasswordError(error.message);
      return;
    }
    setNewPassword("");
    setPasswordMsg("Password updated.");
  }

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut();
  }

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title" id="theme-heading">
          Appearance
        </h2>
        <div className="card__body">
          <p className="muted">Color theme (stored on this device).</p>
          <ThemePreferenceControls labelledBy="theme-heading" />
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Account</h2>
        <div className="card__body">
          <p className="muted">
            Signed in as <strong>{user?.email ?? "—"}</strong>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Change password</h2>
        <div className="card__body">
          <form className="form" onSubmit={(e) => void handlePassword(e)}>
            <label className="form__label">
              New password
              <input
                className="form__input"
                type="password"
                name="newPassword"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                required
              />
            </label>
            <button type="submit" className="btn btn--primary" disabled={passwordBusy}>
              {passwordBusy ? "Updating…" : "Update password"}
            </button>
            {passwordError ? (
              <p className="form__error" role="alert">
                {passwordError}
              </p>
            ) : null}
            {passwordMsg ? (
              <p className="form__success" role="status">
                {passwordMsg}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Session</h2>
        <div className="card__body">
          <button type="button" className="btn" onClick={() => void handleLogout()}>
            Log out
          </button>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Delete account</h2>
        <div className="card__body">
          <p className="muted">
            Account deletion is not available in the web app yet (requires a secure server flow). Contact
            support or use the Supabase dashboard for manual removal if needed.
          </p>
          <button type="button" className="btn btn--danger" disabled>
            Delete account (soon)
          </button>
        </div>
      </section>

      <p className="muted">
        <Link to="/legal">Terms &amp; Privacy</Link>
      </p>
    </div>
  );
}
