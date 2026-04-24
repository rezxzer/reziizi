import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { MIN_PASSWORD_LENGTH, isPasswordLongEnough } from "../lib/passwordPolicy.ts";
import { supabase } from "../lib/supabaseClient";

export function ResetPasswordPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const navigate = useNavigate();
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const hashHasRecovery = window.location.hash.includes("type=recovery");

    async function init(): Promise<void> {
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) {
          return;
        }
        if (error) {
          setTimedOut(true);
        } else {
          setRecoveryReady(true);
        }
        return;
      }
      if (hashHasRecovery) {
        setRecoveryReady(true);
      }
    }
    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryReady(true);
      }
    });

    // Fallback only when no code and no recovery hash — otherwise the exchange
    // result or the auth event is authoritative and must not race a timer.
    let timer: number | null = null;
    if (!code && !hashHasRecovery) {
      timer = window.setTimeout(() => {
        if (!cancelled) {
          setTimedOut(true);
        }
      }, 6000);
    }

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!isPasswordLongEnough(password)) {
      toast.error(t("settings.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
      return;
    }
    if (password !== confirm) {
      toast.error(t("pages.resetPassword.mismatch"));
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(errorMessage(error));
        return;
      }
      toast.success(t("pages.resetPassword.success"));
      navigate("/", { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  const showInvalid: boolean = timedOut && !recoveryReady;

  return (
    <div className="stack auth-flow-page">
      <section className="card">
        <h1 className="card__title">{t("pages.resetPassword.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.resetPassword.intro")}</p>
          {showInvalid ? (
            <p className="form__error" role="alert">
              {t("pages.resetPassword.invalidOrExpired")}
            </p>
          ) : null}
          {recoveryReady ? (
            <form className="form" onSubmit={(ev) => void handleSubmit(ev)}>
              <label className="form__label">
                {t("pages.resetPassword.passwordLabel")}
                <input
                  className="form__input"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                />
              </label>
              <label className="form__label">
                {t("pages.resetPassword.confirmLabel")}
                <input
                  className="form__input"
                  type="password"
                  name="confirm"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(ev) => setConfirm(ev.target.value)}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                />
              </label>
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? t("pages.resetPassword.submitWait") : t("pages.resetPassword.submit")}
              </button>
            </form>
          ) : !showInvalid ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          <p>
            <Link to="/login" className="inline-link">
              {t("pages.resetPassword.backToLogin")}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
