import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AvatarUploadSection } from "../components/AvatarUploadSection.tsx";
import { ThemePreferenceControls } from "../components/ThemePreferenceControls.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { normalizeLocale } from "../i18n/locale.ts";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { MIN_PASSWORD_LENGTH, isPasswordLongEnough } from "../lib/passwordPolicy.ts";
import { fetchProfileSearchable, setProfileSearchable } from "../lib/profilePrivacy.ts";
import { deleteAccountViaEdgeFunction } from "../lib/deleteAccount.ts";
import { queryClient } from "../lib/queryClient.ts";
import { supabase } from "../lib/supabaseClient.ts";

/** Must match `settings.deleteAccountConfirmPlaceholder` / user instructions (Latin, all locales). */
const DELETE_CONFIRM_PHRASE: string = "DELETE";

export function SettingsPage(): ReactElement {
  const { t, locale, setLocale } = useI18n();
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, premiumUntil, loading: flagsLoading } = useProfileFlags();
  const [searchable, setSearchable] = useState<boolean>(true);
  const [privacyLoading, setPrivacyLoading] = useState<boolean>(true);
  const [privacyBusy, setPrivacyBusy] = useState<boolean>(false);
  const [privacyMsg, setPrivacyMsg] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>("");
  const [deleteBusy, setDeleteBusy] = useState<boolean>(false);

  async function handlePassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setPasswordMsg(null);
    if (!isPasswordLongEnough(newPassword)) {
      toast.error(t("settings.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
      return;
    }
    setPasswordBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordBusy(false);
    if (error) {
      toast.error(errorMessage(error));
      return;
    }
    setNewPassword("");
    setPasswordMsg(t("settings.passwordUpdated"));
  }

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut();
  }

  async function handleDeleteAccount(): Promise<void> {
    if (!user || deleteConfirmText !== DELETE_CONFIRM_PHRASE) {
      return;
    }
    setDeleteBusy(true);
    try {
      await deleteAccountViaEdgeFunction();
      queryClient.clear();
      await supabase.auth.signOut();
      navigate("/", { replace: true });
    } catch (err: unknown) {
      toast.error(t("settings.deleteAccountFailed", { message: errorMessage(err) }));
    } finally {
      setDeleteBusy(false);
    }
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
    setPrivacyMsg(null);
    setPrivacyBusy(true);
    try {
      await setProfileSearchable(user.id, searchable);
      setPrivacyMsg(t("settings.privacySaved"));
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setPrivacyBusy(false);
    }
  }

  const dateLocale: string | undefined =
    locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : undefined;

  return (
    <div className="stack">
      <section className="card">
        <h2 className="card__title" id="language-heading">
          {t("settings.language")}
        </h2>
        <div className="card__body">
          <p className="muted">{t("settings.languageHelp")}</p>
          <div className="form">
            <label className="form__label" htmlFor="settings-locale">
              {t("settings.language")}
            </label>
            <select
              id="settings-locale"
              className="form__input"
              value={locale}
              onChange={(ev) => setLocale(normalizeLocale(ev.target.value))}
            >
              <option value="en">{t("settings.languageEn")}</option>
              <option value="ka">{t("settings.languageKa")}</option>
              <option value="ru">{t("settings.languageRu")}</option>
            </select>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title" id="theme-heading">
          {t("settings.appearance")}
        </h2>
        <div className="card__body">
          <p className="muted">{t("settings.appearanceHint")}</p>
          <ThemePreferenceControls labelledBy="theme-heading" />
        </div>
      </section>

      {user ? <AvatarUploadSection userId={user.id} /> : null}

      <section className="card">
        <h2 className="card__title">{t("settings.account")}</h2>
        <div className="card__body">
          <p className="muted">
            {t("settings.signedInAs")} <strong>{user?.email ?? "—"}</strong>
          </p>
          <p className="muted">
            {t("settings.premium")}:{" "}
            {flagsLoading ? (
              t("settings.premiumLoading")
            ) : isPremium && premiumUntil != null ? (
              <>
                {t("settings.premiumActiveUntil")}{" "}
                <strong>
                  {new Date(premiumUntil).toLocaleDateString(dateLocale, { dateStyle: "medium" })}
                </strong>
              </>
            ) : (
              t("settings.premiumNone")
            )}
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("settings.privacy")}</h2>
        <div className="card__body">
          <p className="muted">{t("settings.privacyHint")}</p>
          {privacyLoading ? (
            <p className="page-loading" role="status">
              {t("settings.privacyLoading")}
            </p>
          ) : (
            <form className="form" onSubmit={(ev) => void handlePrivacySave(ev)}>
              <label className="form__label--checkbox">
                <input
                  type="checkbox"
                  checked={searchable}
                  onChange={(ev) => setSearchable(ev.target.checked)}
                />
                {t("settings.privacyCheckbox")}
              </label>
              <button type="submit" className="btn btn--primary" disabled={privacyBusy}>
                {privacyBusy ? t("settings.privacySaving") : t("settings.privacySave")}
              </button>
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
        <h2 className="card__title">{t("settings.changePassword")}</h2>
        <div className="card__body">
          <p className="muted">
            {t("settings.passwordMinHint", { min: MIN_PASSWORD_LENGTH })}{" "}
            <Link to="/security">{t("layout.nav.security")}</Link>.
          </p>
          <form className="form" onSubmit={(e) => void handlePassword(e)}>
            <label className="form__label">
              {t("settings.newPassword")}
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
              {passwordBusy ? t("settings.updatingPassword") : t("settings.updatePassword")}
            </button>
            {passwordMsg ? (
              <p className="form__success" role="status">
                {passwordMsg}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("settings.session")}</h2>
        <div className="card__body">
          <button type="button" className="btn" onClick={() => void handleLogout()}>
            {t("settings.logOut")}
          </button>
        </div>
      </section>

      {user ? (
        <section className="card">
          <h2 className="card__title">{t("settings.deleteAccount")}</h2>
          <div className="card__body">
            <p className="muted">{t("settings.deleteAccountHint")}</p>
            <p className="muted">{t("settings.deleteAccountTypeDelete")}</p>
            <div className="form">
              <label className="form__label" htmlFor="settings-delete-confirm">
                {t("settings.deleteAccountConfirmPlaceholder")}
              </label>
              <input
                id="settings-delete-confirm"
                className="form__input"
                type="text"
                autoComplete="off"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={t("settings.deleteAccountConfirmPlaceholder")}
                disabled={deleteBusy}
                aria-invalid={deleteConfirmText.length > 0 && deleteConfirmText !== DELETE_CONFIRM_PHRASE}
              />
              <button
                type="button"
                className="btn btn--danger"
                disabled={deleteBusy || deleteConfirmText !== DELETE_CONFIRM_PHRASE}
                onClick={() => void handleDeleteAccount()}
              >
                {deleteBusy ? t("settings.deleteAccountDeleting") : t("settings.deleteAccountSubmit")}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <p className="muted">
        <Link to="/legal">{t("settings.termsLink")}</Link>
      </p>
    </div>
  );
}
