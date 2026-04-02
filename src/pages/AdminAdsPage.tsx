import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeedTopAdForAdmin, saveFeedTopAd } from "../lib/ads.ts";
import { errorMessage } from "../lib/errors.ts";
import type { AdSlotRow } from "../types/db.ts";

export function AdminAdsPage(): ReactElement {
  const [row, setRow] = useState<AdSlotRow | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetchFeedTopAdForAdmin();
      setRow(r);
      if (r) {
        setTitle(r.title);
        setBody(r.body);
        setLinkUrl(r.link_url ?? "");
        setIsActive(r.is_active);
      }
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedMsg(null);
    try {
      await saveFeedTopAd({
        title,
        body,
        link_url: linkUrl.trim() || null,
        is_active: isActive,
      });
      setSavedMsg("Saved.");
      void load();
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">Advertisements</h1>
        <div className="card__body">
          <p className="muted">Feed top strip on the home page. Plain text only (no HTML).</p>
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

      {savedMsg ? (
        <p className="form__success" role="status">
          {savedMsg}
        </p>
      ) : null}

      {!loading && row ? (
        <section className="card">
          <h2 className="card__title">Feed top</h2>
          <form className="card__body form" onSubmit={(e) => void handleSubmit(e)}>
            <label className="form__label">
              Title
              <input
                className="form__input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                placeholder="Optional headline"
              />
            </label>
            <label className="form__label">
              Body
              <textarea
                className="form__input"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={2000}
                placeholder="Short text"
              />
            </label>
            <label className="form__label">
              Link URL
              <input
                className="form__input"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://…"
              />
            </label>
            <label className="form__label form__label--checkbox">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
              Active (show on home feed)
            </label>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </form>
        </section>
      ) : null}

      {!loading && !row ? (
        <p className="muted">No ad slot row (run migrations).</p>
      ) : null}
    </div>
  );
}
