import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { MAX_BAN_REASON_LENGTH } from "../lib/banReason.ts";
import { extendPremiumIso, isPremiumActive } from "../lib/premium.ts";
import { fetchProfilesForAdmin, setUserBanned, setUserPremiumUntil } from "../lib/adminUsers.ts";
import type { ProfileRow } from "../types/db.ts";

function formatPremiumCell(premiumUntil: string | null): string {
  if (premiumUntil == null || premiumUntil.length === 0) {
    return "—";
  }
  if (!isPremiumActive(premiumUntil)) {
    return "expired";
  }
  try {
    return new Date(premiumUntil).toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return "—";
  }
}

export function AdminUsersPage(): ReactElement {
  const { user } = useAuth();
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [banTarget, setBanTarget] = useState<ProfileRow | null>(null);
  const [banReasonDraft, setBanReasonDraft] = useState<string>("");
  const banPanelRef = useRef<HTMLElement | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchProfilesForAdmin();
      setRows(list);
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

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
    setError(null);
    try {
      const row: ProfileRow | undefined = rows.find((x) => x.id === targetId);
      const until: string = extendPremiumIso(row?.premium_until ?? null, days);
      await setUserPremiumUntil(targetId, until);
      setRows((prev) =>
        prev.map((r) => (r.id === targetId ? { ...r, premium_until: until } : r)),
      );
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  async function clearPremium(targetId: string): Promise<void> {
    if (!user || targetId === user.id) {
      return;
    }
    if (!window.confirm("Clear premium for this user?")) {
      return;
    }
    setBusyId(targetId);
    setError(null);
    try {
      await setUserPremiumUntil(targetId, null);
      setRows((prev) =>
        prev.map((r) => (r.id === targetId ? { ...r, premium_until: null } : r)),
      );
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  function openBanDialog(target: ProfileRow): void {
    setError(null);
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
      setError(`Reason must be at most ${MAX_BAN_REASON_LENGTH} characters.`);
      return;
    }
    const targetId: string = banTarget.id;
    setBusyId(targetId);
    setError(null);
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
      setError(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  async function unbanUser(targetId: string): Promise<void> {
    if (!user || targetId === user.id) {
      return;
    }
    if (!window.confirm("Unban this user?")) {
      return;
    }
    setBusyId(targetId);
    setError(null);
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
      setError(errorMessage(e));
    } finally {
      setBusyId(null);
    }
  }

  function truncateReason(text: string | null, max: number): string {
    if (text == null || text.length === 0) {
      return "—";
    }
    if (text.length <= max) {
      return text;
    }
    return `${text.slice(0, max)}…`;
  }

  const tableActionsLocked: boolean = busyId !== null || banTarget !== null;

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">Users</h1>
        <div className="card__body">
          <p className="muted">
            Ban blocks posting, comments, reactions, and chat messages (read-only). Optional reason is shown to the user
            on <code className="admin-page__code">/banned</code>. Premium is admin-granted until a date (payments not
            wired yet).
          </p>
          <p>
            <Link to="/admin">← Admin overview</Link>
          </p>
        </div>
      </section>

      {loading ? (
        <p className="page-loading" role="status">
          Loading…
        </p>
      ) : null}

      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}

      {banTarget ? (
        <section ref={banPanelRef} className="card admin-users__ban-panel" aria-labelledby="ban-dialog-title">
          <h2 id="ban-dialog-title" className="card__title">
            Ban {banTarget.email ?? banTarget.id.slice(0, 8)}
          </h2>
          <div className="card__body">
            <label className="form__label" htmlFor="ban-reason">
              Reason (optional, shown to user)
            </label>
            <textarea
              id="ban-reason"
              className="form__input admin-users__ban-textarea"
              rows={4}
              maxLength={MAX_BAN_REASON_LENGTH}
              value={banReasonDraft}
              onChange={(e) => setBanReasonDraft(e.target.value)}
              placeholder="e.g. Spam, harassment, or a short note…"
            />
            <p className="muted">
              {banReasonDraft.length}/{MAX_BAN_REASON_LENGTH} characters
            </p>
            <p className="admin-users__ban-actions">
              <button
                type="button"
                className="btn btn--danger"
                disabled={busyId !== null}
                onClick={() => void confirmBan()}
              >
                {busyId === banTarget.id ? "…" : "Confirm ban"}
              </button>
              <button type="button" className="btn" disabled={busyId !== null} onClick={cancelBanDialog}>
                Cancel
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
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th scope="col">Banned</th>
                <th scope="col">Reason</th>
                <th scope="col">Premium</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isSelf: boolean = user?.id === r.id;
                return (
                  <tr key={r.id}>
                    <td>{r.email ?? r.id.slice(0, 8)}</td>
                    <td>{r.is_admin ? "yes" : "—"}</td>
                    <td>{r.is_banned ? "yes" : "—"}</td>
                    <td className="admin-users__reason-cell" title={r.ban_reason ?? undefined}>
                      {r.is_banned ? truncateReason(r.ban_reason, 48) : "—"}
                    </td>
                    <td>{formatPremiumCell(r.premium_until)}</td>
                    <td>
                      {isSelf ? (
                        <span className="muted">—</span>
                      ) : (
                        <div className="admin-users__actions">
                          <div className="admin-users__action-group">
                            <span className="admin-users__action-label">Moderation</span>
                            <button
                              type="button"
                              className={`btn btn--small${r.is_banned ? "" : " btn--danger"}`}
                              disabled={tableActionsLocked}
                              aria-label={r.is_banned ? `Unban ${r.email ?? r.id}` : `Ban ${r.email ?? r.id}`}
                              onClick={() => {
                                if (r.is_banned) {
                                  void unbanUser(r.id);
                                } else {
                                  openBanDialog(r);
                                }
                              }}
                            >
                              {busyId === r.id ? "…" : r.is_banned ? "Unban" : "Ban"}
                            </button>
                          </div>
                          <div className="admin-users__action-group admin-users__action-group--premium">
                            <span className="admin-users__action-label">Premium</span>
                            <div className="admin-users__premium-btns">
                              <button
                                type="button"
                                className="btn btn--small"
                                disabled={tableActionsLocked}
                                aria-label={`Add 30 days premium for ${r.email ?? r.id}`}
                                onClick={() => void extendPremiumDays(r.id, 30)}
                              >
                                {busyId === r.id ? "…" : "+30d"}
                              </button>
                              <button
                                type="button"
                                className="btn btn--small"
                                disabled={tableActionsLocked}
                                aria-label={`Add 365 days premium for ${r.email ?? r.id}`}
                                onClick={() => void extendPremiumDays(r.id, 365)}
                              >
                                {busyId === r.id ? "…" : "+365d"}
                              </button>
                              <button
                                type="button"
                                className="btn btn--small"
                                disabled={tableActionsLocked || r.premium_until == null}
                                aria-label={`Clear premium for ${r.email ?? r.id}`}
                                onClick={() => void clearPremium(r.id)}
                              >
                                {busyId === r.id ? "…" : "Clear prem."}
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
                Refresh
              </button>
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
