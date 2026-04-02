import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AvatarUploadSection } from "../components/AvatarUploadSection.tsx";
import { ThemePreferenceControls } from "../components/ThemePreferenceControls.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { MIN_PASSWORD_LENGTH, isPasswordLongEnough } from "../lib/passwordPolicy.ts";
import { fetchProfileSearchable, setProfileSearchable } from "../lib/profilePrivacy.ts";
import { supabase } from "../lib/supabaseClient.ts";

export function SettingsPage(): ReactElement {
  const { user } = useAuth();
  const { isPremium, premiumUntil, loading: flagsLoading } = useProfileFlags();
  const [searchable, setSearchable] = useState<boolean>(true);
  const [privacyLoading, setPrivacyLoading] = useState<boolean>(true);
  const [privacyBusy, setPrivacyBusy] = useState<boolean>(false);
  const [privacyError, setPrivacyError] = useState<string | null>(null);
  const [privacyMsg, setPrivacyMsg] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);

  async function handlePassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMsg(null);
    if (!isPasswordLongEnough(newPassword)) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    setPasswordBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordBusy(false);
    if (error) {
      setPasswordError(errorMessage(error));
      return;
    }
    setNewPassword("");
    setPasswordMsg("Password updated.");
  }

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    if (!user) {
      setPrivacyLoading(false);
      return;
    }
    let cancelled = false;
    setPrivacyLoading(true);
    void fetchProfileSearchable(user.id)
      .then((v) => {
        if (!cancelled) {
          setSearchable(v);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSearchable(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPrivacyLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handlePrivacySave(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!user) {
      return;
    }
    setPrivacyError(null);
    setPrivacyMsg(null);
    setPrivacyBusy(true);
    try {
      await setProfileSearchable(user.id, searchable);
      setPrivacyMsg("Privacy settings saved.");
    } catch (err: unknown) {
      setPrivacyError(errorMessage(err));
    } finally {
      setPrivacyBusy(false);
    }
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

      {user ? <AvatarUploadSection userId={user.id} /> : null}

      <section className="card">
        <h2 className="card__title">Account</h2>
        <div className="card__body">
          <p className="muted">
            Signed in as <strong>{user?.email ?? "—"}</strong>
          </p>
          <p className="muted">
            Premium:{" "}
            {flagsLoading ? (
              "…"
            ) : isPremium && premiumUntil != null ? (
              <>
                active until{" "}
                <strong>
                  {new Date(premiumUntil).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </strong>
              </>
            ) : (
              "none"
            )}
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Privacy</h2>
        <div className="card__body">
          <p className="muted">Control whether your account appears when others search by email on the Search page.</p>
          {privacyLoading ? (
            <p className="page-loading" role="status">
              Loading…
            </p>
          ) : (
            <form className="form" onSubmit={(ev) => void handlePrivacySave(ev)}>
              <label className="form__label--checkbox">
                <input
                  type="checkbox"
                  checked={searchable}
                  onChange={(ev) => setSearchable(ev.target.checked)}
                />
                Show my profile in email search results
              </label>
              <button type="submit" className="btn btn--primary" disabled={privacyBusy}>
                {privacyBusy ? "Saving…" : "Save privacy"}
              </button>
              {privacyError ? (
                <p className="form__error" role="alert">
                  {privacyError}
                </p>
              ) : null}
              {privacyMsg ? (
                <p className="form__success" role="status">
                  {privacyMsg}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Change password</h2>
        <div className="card__body">
          <p className="muted">
            Use at least {MIN_PASSWORD_LENGTH} characters. See also{" "}
            <Link to="/security">Security</Link>.
          </p>
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
