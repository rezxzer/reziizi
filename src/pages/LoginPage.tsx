import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [signupNotice, setSignupNotice] = useState<{
    kind: "success" | "info";
    message: string;
  } | null>(null);
  const [resendBusy, setResendBusy] = useState(false);
  const [resendCooldownSec, setResendCooldownSec] = useState(0);

  useEffect(() => {
    if (resendCooldownSec <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setResendCooldownSec((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, [resendCooldownSec]);

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSignupNotice(null);
    if (mode === "signup") {
      if (!isPasswordLongEnough(password)) {
        toast.error(t("settings.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
        return;
      }
      if (password !== confirmPassword) {
        toast.error(t("pages.login.passwordsDoNotMatch"));
        return;
      }
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
        const { data, error: signError } = await supabase.auth.signUp({ email, password });
        if (signError) {
          toast.error(errorMessage(signError));
          return;
        }
        const hasNewIdentity = (data.user?.identities?.length ?? 0) > 0;
        if (hasNewIdentity) {
          const message = t("pages.login.checkEmailForConfirmation");
          setSignupNotice({ kind: "success", message });
          toast.success(message);
        } else {
          setSignupNotice({
            kind: "info",
            message: t("pages.login.emailAlreadyRegisteredHint"),
          });
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResendConfirmation(): Promise<void> {
    if (!email || resendBusy || resendCooldownSec > 0) {
      return;
    }
    setResendBusy(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (error) {
        toast.error(errorMessage(error));
        return;
      }
      toast.success(t("pages.login.resendSuccess"));
      setResendCooldownSec(60);
    } finally {
      setResendBusy(false);
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
    <div className="stack login-page">
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
              onClick={() => {
                setMode("signin");
                setConfirmPassword("");
                setSignupNotice(null);
              }}
            >
              {t("pages.login.modeSignIn")}
            </button>
            <button
              type="button"
              className={`auth-mode__btn${mode === "signup" ? " auth-mode__btn--active" : ""}`}
              onClick={() => {
                setMode("signup");
                setSignupNotice(null);
              }}
            >
              {t("pages.login.modeSignUp")}
            </button>
          </div>
          <form className="form" onSubmit={(e) => void handleSubmit(e)}>
            {mode === "signup" && signupNotice ? (
              <div className="stack">
                <p
                  className={signupNotice.kind === "success" ? "form__success" : "form__error"}
                  role="status"
                >
                  {signupNotice.kind === "success"
                    ? t("pages.login.confirmationPendingTitle")
                    : signupNotice.message}
                </p>
                <p className="muted form__hint">
                  {signupNotice.kind === "success"
                    ? t("pages.login.confirmationPendingBody", { email })
                    : t("pages.login.checkEmailForConfirmation")}
                </p>
                <button
                  type="button"
                  className="btn btn--small"
                  onClick={() => void handleResendConfirmation()}
                  disabled={resendBusy || resendCooldownSec > 0}
                >
                  {resendBusy
                    ? t("pages.login.resendSending")
                    : resendCooldownSec > 0
                      ? t("pages.login.resendCooldown", { seconds: resendCooldownSec })
                      : t("pages.login.resendCta")}
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    setMode("signin");
                    setSignupNotice(null);
                  }}
                >
                  {t("pages.login.backToSignIn")}
                </button>
              </div>
            ) : (
              <>
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
                {mode === "signup" ? (
                  <label className="form__label">
                    {t("pages.login.confirmPassword")}
                    <input
                      className="form__input"
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={MIN_PASSWORD_LENGTH}
                    />
                  </label>
                ) : null}
                {mode === "signup" ? (
                  <p className="muted form__hint">
                    {t("pages.login.checkEmailForConfirmation")}{" "}
                    {t("pages.login.emailAlreadyRegisteredHint")}
                  </p>
                ) : null}
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
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
