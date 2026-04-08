import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AvatarUploadSection } from "../components/AvatarUploadSection.tsx";
import { ThemePreferenceControls } from "../components/ThemePreferenceControls.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { normalizeLocale } from "../i18n/locale.ts";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import { MIN_PASSWORD_LENGTH, isPasswordLongEnough } from "../lib/passwordPolicy.ts";
import {
  fetchNotificationPreferences,
  setNotificationPreferences,
  type NotificationPreferences,
} from "../lib/notificationPreferences.ts";
import {
  PROFILE_BIO_MAX,
  PROFILE_DISPLAY_NAME_MAX,
  fetchProfileDisplay,
  normalizeProfileAboutField,
  updateProfileAbout,
} from "../lib/profileAbout.ts";
import { fetchProfileSearchable, setProfileSearchable } from "../lib/profilePrivacy.ts";
import { isBillingCheckoutEnabled } from "../lib/billingFlags.ts";
import { createPremiumCheckoutRedirectUrl } from "../lib/createCheckoutSession.ts";
import { deleteAccountViaEdgeFunction } from "../lib/deleteAccount.ts";
import { queryClient } from "../lib/queryClient.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { supabase } from "../lib/supabaseClient.ts";

/** Must match `settings.deleteAccountConfirmPlaceholder` / user instructions (Latin, all locales). */
const DELETE_CONFIRM_PHRASE: string = "DELETE";

export function SettingsPage(): ReactElement {
  const { t, locale, setLocale } = useI18n();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { isPremium, premiumUntil, loading: flagsLoading } = useProfileFlags();
  const [searchable, setSearchable] = useState<boolean>(true);
  const [privacyLoading, setPrivacyLoading] = useState<boolean>(true);
  const [privacyBusy, setPrivacyBusy] = useState<boolean>(false);
  const [privacyMsg, setPrivacyMsg] = useState<string | null>(null);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPreferences>({
    notifyOnComment: true,
    notifyOnReaction: true,
    notifyOnFollow: true,
  });
  const [notifLoading, setNotifLoading] = useState<boolean>(true);
  const [notifBusy, setNotifBusy] = useState<boolean>(false);
  const [notifMsg, setNotifMsg] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>("");
  const [deleteBusy, setDeleteBusy] = useState<boolean>(false);
  const [aboutDisplayName, setAboutDisplayName] = useState<string>("");
  const [aboutBio, setAboutBio] = useState<string>("");
  const [aboutLoading, setAboutLoading] = useState<boolean>(true);
  const [aboutBusy, setAboutBusy] = useState<boolean>(false);
  const [aboutMsg, setAboutMsg] = useState<string | null>(null);
  const [checkoutBusy, setCheckoutBusy] = useState<boolean>(false);

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

  async function handlePremiumCheckout(): Promise<void> {
    if (!user || checkoutBusy) {
      return;
    }
    setCheckoutBusy(true);
    try {
      const url = await createPremiumCheckoutRedirectUrl(30);
      window.location.assign(url);
    } catch (err: unknown) {
      toast.error(errorMessage(err));
      setCheckoutBusy(false);
    }
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

  useEffect(() => {
    if (!user) {
      setAboutLoading(false);
      return;
    }
    let cancelled = false;
    setAboutLoading(true);
    void fetchProfileDisplay(user.id)
      .then((row) => {
        if (!cancelled) {
          setAboutDisplayName(row.display_name ?? "");
          setAboutBio(row.bio ?? "");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAboutDisplayName("");
          setAboutBio("");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setAboutLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      setNotifLoading(false);
      return;
    }
    let cancelled = false;
    setNotifLoading(true);
    void fetchNotificationPreferences(user.id)
      .then((p) => {
        if (!cancelled) {
          setNotifPrefs(p);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNotifPrefs({
            notifyOnComment: true,
            notifyOnReaction: true,
            notifyOnFollow: true,
          });
        }
      })
      .finally(() => {
        if (!cancelled) {
          setNotifLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!isBillingCheckoutEnabled()) {
      return;
    }
    const v = searchParams.get("checkout");
    if (v !== "success" && v !== "cancelled") {
      return;
    }
    if (!user) {
      return;
    }
    if (v === "success") {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.flags(user.id) });
      toast.success(t("settings.premiumCheckoutSuccess"));
    } else {
      toast.show(t("settings.premiumCheckoutCancelled"), "info");
    }
    const next = new URLSearchParams(searchParams);
    next.delete("checkout");
    setSearchParams(next, { replace: true });
  }, [user, searchParams, setSearchParams, t, toast]);

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

  async function handleProfileAboutSave(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!user) {
      return;
    }
    setAboutMsg(null);
    const dn = normalizeProfileAboutField(aboutDisplayName);
    const b = normalizeProfileAboutField(aboutBio);
    if (dn != null && dn.length > PROFILE_DISPLAY_NAME_MAX) {
      toast.error(t("settings.displayNameTooLong", { max: PROFILE_DISPLAY_NAME_MAX }));
      return;
    }
    if (b != null && b.length > PROFILE_BIO_MAX) {
      toast.error(t("settings.bioTooLong", { max: PROFILE_BIO_MAX }));
      return;
    }
    setAboutBusy(true);
    try {
      await updateProfileAbout(user.id, { display_name: dn, bio: b });
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.display(user.id) });
      setAboutMsg(t("settings.profileAboutSaved"));
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setAboutBusy(false);
    }
  }

  async function handleNotificationPrefsSave(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!user) {
      return;
    }
    setNotifMsg(null);
    setNotifBusy(true);
    try {
      await setNotificationPreferences(user.id, notifPrefs);
      setNotifMsg(t("settings.notificationsSaved"));
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setNotifBusy(false);
    }
  }

  const dateLocale: string | undefined =
    locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : undefined;

  return (
    <div className="stack settings-page">
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
        <h2 className="card__title">{t("settings.profileAbout")}</h2>
        <div className="card__body">
          <p className="muted">{t("settings.profileAboutHint")}</p>
          {!user ? null : aboutLoading ? (
            <p className="page-loading" role="status">
              {t("settings.profileAboutLoading")}
            </p>
          ) : (
            <form className="form" onSubmit={(ev) => void handleProfileAboutSave(ev)}>
              <label className="form__label" htmlFor="settings-display-name">
                {t("settings.displayName")}
              </label>
              <input
                id="settings-display-name"
                className="form__input"
                type="text"
                maxLength={PROFILE_DISPLAY_NAME_MAX}
                autoComplete="nickname"
                value={aboutDisplayName}
                onChange={(ev) => setAboutDisplayName(ev.target.value)}
                placeholder={t("settings.displayNamePlaceholder")}
              />
              <label className="form__label" htmlFor="settings-bio">
                {t("settings.bio")}
              </label>
              <textarea
                id="settings-bio"
                className="form__input"
                rows={4}
                maxLength={PROFILE_BIO_MAX}
                value={aboutBio}
                onChange={(ev) => setAboutBio(ev.target.value)}
                placeholder={t("settings.bioPlaceholder")}
              />
              <button type="submit" className="btn btn--primary" disabled={aboutBusy}>
                {aboutBusy ? t("settings.profileAboutSaving") : t("settings.profileAboutSave")}
              </button>
              {aboutMsg ? (
                <p className="form__success" role="status">
                  {aboutMsg}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </section>

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
          <h3 className="settings-premium-billing-title">{t("settings.premiumBillingTitle")}</h3>
          {isBillingCheckoutEnabled() ? (
            <>
              <p className="muted">{t("settings.premiumCheckoutHint")}</p>
              <button
                type="button"
                className="btn btn--primary"
                disabled={!user || checkoutBusy || flagsLoading}
                onClick={() => void handlePremiumCheckout()}
              >
                {checkoutBusy ? t("settings.premiumCheckoutBusy") : t("settings.premiumCheckoutSubscribe")}
              </button>
            </>
          ) : (
            <div className="settings-premium-plan">
              <h4 className="settings-premium-plan__title">{t("settings.premiumPlanSectionTitle")}</h4>
              <p className="muted">{t("settings.premiumPlanLead")}</p>
              <p className="settings-premium-plan__benefits-heading">{t("settings.premiumPlanBenefitsTitle")}</p>
              <ul className="settings-premium-plan__list">
                <li>{t("settings.premiumPlanBenefit1")}</li>
                <li>{t("settings.premiumPlanBenefit2")}</li>
                <li>{t("settings.premiumPlanBenefit3")}</li>
                <li>{t("settings.premiumPlanBenefit4")}</li>
              </ul>
              <p className="settings-premium-plan__future-title">{t("settings.premiumPlanFutureTitle")}</p>
              <p className="muted settings-premium-plan__future-body">{t("settings.premiumPlanFutureBody")}</p>
              <p className="muted">{t("settings.premiumPlanDuration")}</p>
              <p className="muted">{t("settings.premiumPlanPrice")}</p>
              <p className="muted">{t("settings.premiumPlanWaitNote")}</p>
              <p className="muted settings-premium-plan__readme">{t("settings.premiumCheckoutDisabledHint")}</p>
            </div>
          )}
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
        <h2 className="card__title">{t("settings.notificationsSection")}</h2>
        <div className="card__body">
          <p className="muted">{t("settings.notificationsHint")}</p>
          {!user ? null : notifLoading ? (
            <p className="page-loading" role="status">
              {t("settings.notificationsLoading")}
            </p>
          ) : (
            <form className="form" onSubmit={(ev) => void handleNotificationPrefsSave(ev)}>
              <label className="form__label--checkbox">
                <input
                  type="checkbox"
                  checked={notifPrefs.notifyOnComment}
                  onChange={(ev) =>
                    setNotifPrefs((p) => ({ ...p, notifyOnComment: ev.target.checked }))
                  }
                />
                {t("settings.notifyOnComment")}
              </label>
              <label className="form__label--checkbox">
                <input
                  type="checkbox"
                  checked={notifPrefs.notifyOnReaction}
                  onChange={(ev) =>
                    setNotifPrefs((p) => ({ ...p, notifyOnReaction: ev.target.checked }))
                  }
                />
                {t("settings.notifyOnReaction")}
              </label>
              <label className="form__label--checkbox">
                <input
                  type="checkbox"
                  checked={notifPrefs.notifyOnFollow}
                  onChange={(ev) =>
                    setNotifPrefs((p) => ({ ...p, notifyOnFollow: ev.target.checked }))
                  }
                />
                {t("settings.notifyOnFollow")}
              </label>
              <button type="submit" className="btn btn--primary" disabled={notifBusy}>
                {notifBusy ? t("settings.notificationsSaving") : t("settings.notificationsSave")}
              </button>
              {notifMsg ? (
                <p className="form__success" role="status">
                  {notifMsg}
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
        <section className="card settings-delete-zone">
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
