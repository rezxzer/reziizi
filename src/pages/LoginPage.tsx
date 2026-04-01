import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";

export function LoginPage(): ReactElement {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
        if (signError) {
          setError(signError.message);
          return;
        }
      } else {
        const { error: signError } = await supabase.auth.signUp({ email, password });
        if (signError) {
          setError(signError.message);
          return;
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="page-loading" role="status">
        Loading…
      </div>
    );
  }

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">{mode === "signin" ? "Log in" : "Create account"}</h2>
        <div className="card__body">
          <p className="muted">
            By continuing you agree to our <Link to="/legal">Terms &amp; Privacy</Link>.
          </p>
          <div className="auth-mode">
            <button
              type="button"
              className={`auth-mode__btn${mode === "signin" ? " auth-mode__btn--active" : ""}`}
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`auth-mode__btn${mode === "signup" ? " auth-mode__btn--active" : ""}`}
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </div>
          <form className="form" onSubmit={(e) => void handleSubmit(e)}>
            <label className="form__label">
              Email
              <input
                className="form__input"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="form__label">
              Password
              <input
                className="form__input"
                type="password"
                name="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </label>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
            </button>
            {error ? (
              <p className="form__error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
