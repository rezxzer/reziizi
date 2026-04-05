import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { supabase } from "../lib/supabaseClient.ts";

export function BannedPage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const [banReason, setBanReason] = useState<string | null>(null);
  const [bannedAt, setBannedAt] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setDetailLoading(false);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    void supabase
      .from("profiles")
      .select("ban_reason, banned_at")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) {
          return;
        }
        if (error || data == null) {
          setBanReason(null);
          setBannedAt(null);
        } else {
          const row = data as { ban_reason?: string | null; banned_at?: string | null };
          setBanReason(row.ban_reason != null && String(row.ban_reason).length > 0 ? String(row.ban_reason) : null);
          setBannedAt(row.banned_at != null && String(row.banned_at).length > 0 ? String(row.banned_at) : null);
        }
        setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handleSignOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  let bannedAtLabel: string | null = null;
  if (bannedAt != null && bannedAt.length > 0) {
    try {
      bannedAtLabel = new Date(bannedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    } catch {
      bannedAtLabel = null;
    }
  }

  return (
    <div className="stack banned-page">
      <section className="card">
        <h1 className="card__title">{t("pages.bannedPage.title")}</h1>
        <div className="card__body">
          <p>{t("pages.bannedPage.intro")}</p>
          {detailLoading ? (
            <p className="muted" role="status">
              {t("pages.bannedPage.loadingDetails")}
            </p>
          ) : null}
          {!detailLoading && banReason != null ? (
            <section className="banned-page__why" aria-labelledby="banned-why-heading">
              <h2 id="banned-why-heading" className="banned-page__why-title">
                {t("pages.bannedPage.whyHeading")}
              </h2>
              <p className="banned-page__why-body">{banReason}</p>
            </section>
          ) : null}
          {!detailLoading && bannedAtLabel != null ? (
            <p className="muted">
              {t("pages.bannedPage.activeSincePrefix")}{" "}
              <strong>{bannedAtLabel}</strong>
            </p>
          ) : null}
          {user?.email ? (
            <p className="muted">
              {t("pages.bannedPage.signedInAsPrefix")}{" "}
              <strong>{user.email}</strong>
            </p>
          ) : null}
          <p className="muted">{t("pages.bannedPage.contactSupport")}</p>
          <p>
            <button type="button" className="btn btn--primary" onClick={() => void handleSignOut()}>
              {t("pages.bannedPage.signOut")}
            </button>
          </p>
          <p>
            <Link to="/legal">{t("pages.bannedPage.legalLink")}</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
