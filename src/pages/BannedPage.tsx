import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { supabase } from "../lib/supabaseClient.ts";

export function BannedPage(): ReactElement {
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
    <div className="stack">
      <section className="card">
        <h1 className="card__title">Account restricted</h1>
        <div className="card__body">
          <p>
            Your account cannot post, comment, react, or send messages until this restriction is lifted.
          </p>
          {detailLoading ? (
            <p className="muted" role="status">
              Loading details…
            </p>
          ) : null}
          {!detailLoading && banReason != null ? (
            <section className="banned-page__why" aria-labelledby="banned-why-heading">
              <h2 id="banned-why-heading" className="banned-page__why-title">
                Why
              </h2>
              <p className="banned-page__why-body">{banReason}</p>
            </section>
          ) : null}
          {!detailLoading && bannedAtLabel != null ? (
            <p className="muted">
              Restriction active since <strong>{bannedAtLabel}</strong>
            </p>
          ) : null}
          {user?.email ? (
            <p className="muted">
              Signed in as <strong>{user.email}</strong>
            </p>
          ) : null}
          <p className="muted">If you think this is a mistake, contact support.</p>
          <p>
            <button type="button" className="btn btn--primary" onClick={() => void handleSignOut()}>
              Sign out
            </button>
          </p>
          <p>
            <Link to="/legal">Legal</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
