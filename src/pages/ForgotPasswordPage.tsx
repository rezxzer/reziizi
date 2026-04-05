import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { getAuthRecoveryRedirectTo } from "../lib/authRedirect";
import { errorMessage } from "../lib/errors.ts";
import { supabase } from "../lib/supabaseClient";

export function ForgotPasswordPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSubmitting(true);
    try {
      const redirectTo = getAuthRecoveryRedirectTo();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectTo || undefined,
      });
      if (error) {
        toast.error(errorMessage(error));
        return;
      }
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="stack auth-flow-page">
      <section className="card">
        <h1 className="card__title">{t("pages.forgotPassword.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.forgotPassword.intro")}</p>
          {sent ? (
            <p className="form__success" role="status">
              {t("pages.forgotPassword.success")}
            </p>
          ) : (
            <form className="form" onSubmit={(ev) => void handleSubmit(ev)}>
              <label className="form__label">
                {t("pages.forgotPassword.emailLabel")}
                <input
                  className="form__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </label>
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? t("pages.forgotPassword.sending") : t("pages.forgotPassword.submit")}
              </button>
            </form>
          )}
          <p>
            <Link to="/login" className="inline-link">
              {t("pages.forgotPassword.backToLogin")}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
