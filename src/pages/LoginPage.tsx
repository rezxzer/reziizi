import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { MIN_PASSWORD_LENGTH, isPasswordLongEnough } from "../lib/passwordPolicy.ts";
import { supabase } from "../lib/supabaseClient";

export function LoginPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (mode === "signup" && !isPasswordLongEnough(password)) {
      toast.error(t("settings.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
        if (signError) {
          toast.error(errorMessage(signError));
          return;
        }
      } else {
        const { error: signError } = await supabase.auth.signUp({ email, password });
        if (signError) {
          toast.error(errorMessage(signError));
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
        {t("pages.common.loading")}
      </div>
    );
  }

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title">
          {mode === "signin" ? t("pages.login.titleSignIn") : t("pages.login.titleSignUp")}
        </h2>
        <div className="card__body">
          <p className="muted">
            {t("pages.login.termsPrefix")}{" "}
            <Link to="/legal">{t("settings.termsLink")}</Link>.
          </p>
          <div className="auth-mode">
            <button
              type="button"
              className={`auth-mode__btn${mode === "signin" ? " auth-mode__btn--active" : ""}`}
              onClick={() => setMode("signin")}
            >
              {t("pages.login.modeSignIn")}
            </button>
            <button
              type="button"
              className={`auth-mode__btn${mode === "signup" ? " auth-mode__btn--active" : ""}`}
              onClick={() => setMode("signup")}
            >
              {t("pages.login.modeSignUp")}
            </button>
          </div>
          <form className="form" onSubmit={(e) => void handleSubmit(e)}>
            <label className="form__label">
              {t("pages.login.email")}
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
              {t("pages.login.password")}
              <input
                className="form__input"
                type="password"
                name="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === "signup" ? MIN_PASSWORD_LENGTH : 1}
              />
            </label>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting
                ? t("pages.login.submitWait")
                : mode === "signin"
                  ? t("pages.login.submitSignIn")
                  : t("pages.login.submitSignUp")}
            </button>
            {mode === "signin" ? (
              <p>
                <Link to="/forgot-password" className="inline-link">
                  {t("pages.login.forgotPasswordLink")}
                </Link>
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
