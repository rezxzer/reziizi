import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { MAX_BAN_REASON_LENGTH } from "../lib/banReason.ts";
import { extendPremiumIso, isPremiumActive } from "../lib/premium.ts";
import { fetchProfilesForAdmin, setUserBanned, setUserPremiumUntil } from "../lib/adminUsers.ts";
import type { ProfileRow } from "../types/db.ts";

function formatPremiumCell(premiumUntil: string | null, emDash: string, expired: string): string {
  if (premiumUntil == null || premiumUntil.length === 0) {
    return emDash;
  }
  if (!isPremiumActive(premiumUntil)) {
    return expired;
  }
  try {
    return new Date(premiumUntil).toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return emDash;
  }
}

export function AdminUsersPage(): ReactElement {
  const { user } = useAuth();
  const { t } = useI18n();
  const toast = useToast();
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [banTarget, setBanTarget] = useState<ProfileRow | null>(null);
  const [banReasonDraft, setBanReasonDraft] = useState<string>("");
  const banPanelRef = useRef<HTMLElement | null>(null);

  const emDash: string = t("pages.admin.users.emDash");

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const list = await fetchProfilesForAdmin();
      setRows(list);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (banTarget == null) {
      return;
    }
    const id: number = requestAnimationFrame(() => {
      banPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => cancelAnimationFrame(id);
  }, [banTarget]);

  async function extendPremiumDays(targetId: string, days: number): Promise<void> {
    if (!user || targetId === user.id) {
      return;
    }
    setBusyId(targetId);
    try {
      const row: ProfileRow | undefined = rows.find((x) => x.id === targetId);
      const until: string = extendPremiumIso(row?.premium_until ?? null, days);
      await setUserPremiumUntil(targetId, until);
      setRows((prev) =>
        prev.map((r) => (r.id === targetId ? { ...r, premium_until: until } : r)),
      );
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  async function clearPremium(targetId: string): Promise<void> {
    if (!user || targetId === user.id) {
      return;
    }
    if (!window.confirm(t("pages.admin.users.confirmClearPremium"))) {
      return;
    }
    setBusyId(targetId);
    try {
      await setUserPremiumUntil(targetId, null);
      setRows((prev) =>
        prev.map((r) => (r.id === targetId ? { ...r, premium_until: null } : r)),
      );
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  function openBanDialog(target: ProfileRow): void {
    setBanReasonDraft("");
    setBanTarget(target);
  }

  function cancelBanDialog(): void {
    setBanTarget(null);
    setBanReasonDraft("");
  }

  async function confirmBan(): Promise<void> {
    if (!user || !banTarget || banTarget.id === user.id) {
      return;
    }
    const trimmed: string = banReasonDraft.trim();
    if (trimmed.length > MAX_BAN_REASON_LENGTH) {
      toast.error(t("pages.admin.users.banReasonTooLong", { max: MAX_BAN_REASON_LENGTH }));
      return;
    }
    const targetId: string = banTarget.id;
    setBusyId(targetId);
    try {
      await setUserBanned(targetId, true, trimmed.length > 0 ? trimmed : null);
      const nowIso: string = new Date().toISOString();
      setRows((prev) =>
        prev.map((r) =>
          r.id === targetId
            ? {
                ...r,
                is_banned: true,
                ban_reason: trimmed.length > 0 ? trimmed : null,
                banned_at: nowIso,
              }
            : r,
        ),
      );
      cancelBanDialog();
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  async function unbanUser(targetId: string): Promise<void> {
    if (!user || targetId === user.id) {
      return;
    }
    if (!window.confirm(t("pages.admin.users.confirmUnban"))) {
      return;
    }
    setBusyId(targetId);
    try {
      await setUserBanned(targetId, false);
      setRows((prev) =>
        prev.map((r) =>
          r.id === targetId
            ? { ...r, is_banned: false, ban_reason: null, banned_at: null }
            : r,
        ),
      );
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  function truncateReason(text: string | null, max: number, dash: string): string {
    if (text == null || text.length === 0) {
      return dash;
    }
    if (text.length <= max) {
      return text;
    }
    return `${text.slice(0, max)}…`;
  }

  const tableActionsLocked: boolean = busyId !== null || banTarget !== null;

  function displayName(r: ProfileRow): string {
    return r.email ?? r.id.slice(0, 8);
  }

  function ariaName(r: ProfileRow): string {
    return r.email ?? r.id;
  }

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.users.title")}</h1>
        <div className="card__body">
          <p className="muted">
            {t("pages.admin.users.introBefore")}
            <code className="admin-page__code">/banned</code>
            {t("pages.admin.users.introAfter")}
          </p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
        </div>
      </section>

      {loading ? (
        <p className="page-loading" role="status">
          {t("pages.common.loading")}
        </p>
      ) : null}

      {banTarget ? (
        <section ref={banPanelRef} className="card admin-users__ban-panel" aria-labelledby="ban-dialog-title">
          <h2 id="ban-dialog-title" className="card__title">
            {t("pages.admin.users.banTitle", { name: displayName(banTarget) })}
          </h2>
          <div className="card__body">
            <label className="form__label" htmlFor="ban-reason">
              {t("pages.admin.users.reasonLabel")}
            </label>
            <textarea
              id="ban-reason"
              className="form__input admin-users__ban-textarea"
              rows={4}
              maxLength={MAX_BAN_REASON_LENGTH}
              value={banReasonDraft}
              onChange={(e) => setBanReasonDraft(e.target.value)}
              placeholder={t("pages.admin.users.reasonPlaceholder")}
            />
            <p className="muted">
              {t("pages.admin.users.charCount", {
                current: banReasonDraft.length,
                max: MAX_BAN_REASON_LENGTH,
              })}
            </p>
            <p className="admin-users__ban-actions">
              <button
                type="button"
                className="btn btn--danger"
                disabled={busyId !== null}
                onClick={() => void confirmBan()}
              >
                {busyId === banTarget.id ? "…" : t("pages.admin.users.confirmBan")}
              </button>
              <button type="button" className="btn" disabled={busyId !== null} onClick={cancelBanDialog}>
                {t("pages.admin.users.cancel")}
              </button>
            </p>
          </div>
        </section>
      ) : null}

      <section className="card">
        <div className="card__body admin-users">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th scope="col">{t("pages.admin.users.colEmail")}</th>
                <th scope="col">{t("pages.admin.users.colAdmin")}</th>
                <th scope="col">{t("pages.admin.users.colBanned")}</th>
                <th scope="col">{t("pages.admin.users.colReason")}</th>
                <th scope="col">{t("pages.admin.users.colPremium")}</th>
                <th scope="col">{t("pages.admin.users.colActions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isSelf: boolean = user?.id === r.id;
                return (
                  <tr key={r.id}>
                    <td>{displayName(r)}</td>
                    <td>{r.is_admin ? t("pages.admin.users.yes") : emDash}</td>
                    <td>{r.is_banned ? t("pages.admin.users.yes") : emDash}</td>
                    <td className="admin-users__reason-cell" title={r.ban_reason ?? undefined}>
                      {r.is_banned ? truncateReason(r.ban_reason, 48, emDash) : emDash}
                    </td>
                    <td>
                      {formatPremiumCell(r.premium_until, emDash, t("pages.admin.users.premiumExpired"))}
                    </td>
                    <td>
                      {isSelf ? (
                        <span className="muted">{emDash}</span>
                      ) : (
                        <div className="admin-users__actions">
                          <div className="admin-users__action-group">
                            <span className="admin-users__action-label">
                              {t("pages.admin.users.labelModeration")}
                            </span>
                            <button
                              type="button"
                              className={`btn btn--small${r.is_banned ? "" : " btn--danger"}`}
                              disabled={tableActionsLocked}
                              aria-label={
                                r.is_banned
                                  ? t("pages.admin.users.ariaUnban", { name: ariaName(r) })
                                  : t("pages.admin.users.ariaBan", { name: ariaName(r) })
                              }
                              onClick={() => {
                                if (r.is_banned) {
                                  void unbanUser(r.id);
                                } else {
                                  openBanDialog(r);
                                }
                              }}
                            >
                              {busyId === r.id ? "…" : r.is_banned ? t("pages.admin.users.unban") : t("pages.admin.users.ban")}
                            </button>
                          </div>
                          <div className="admin-users__action-group admin-users__action-group--premium">
                            <span className="admin-users__action-label">{t("pages.admin.users.labelPremium")}</span>
                            <div className="admin-users__premium-btns">
                              <button
                                type="button"
                                className="btn btn--small"
                                disabled={tableActionsLocked}
                                aria-label={t("pages.admin.users.ariaPrem30", { name: ariaName(r) })}
                                onClick={() => void extendPremiumDays(r.id, 30)}
                              >
                                {busyId === r.id ? "…" : "+30d"}
                              </button>
                              <button
                                type="button"
                                className="btn btn--small"
                                disabled={tableActionsLocked}
                                aria-label={t("pages.admin.users.ariaPrem365", { name: ariaName(r) })}
                                onClick={() => void extendPremiumDays(r.id, 365)}
                              >
                                {busyId === r.id ? "…" : "+365d"}
                              </button>
                              <button
                                type="button"
                                className="btn btn--small"
                                disabled={tableActionsLocked || r.premium_until == null}
                                aria-label={t("pages.admin.users.ariaClearPrem", { name: ariaName(r) })}
                                onClick={() => void clearPremium(r.id)}
                              >
                                {busyId === r.id ? "…" : t("pages.admin.users.clearPrem")}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!loading ? (
            <p>
              <button type="button" className="btn btn--small" onClick={() => void load()}>
                {t("pages.admin.refresh")}
              </button>
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
