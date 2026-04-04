import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchFeedTopAdForAdmin, saveFeedTopAd } from "../lib/ads.ts";
import { errorMessage } from "../lib/errors.ts";
import type { AdSlotRow } from "../types/db.ts";

export function AdminAdsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const [row, setRow] = useState<AdSlotRow | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
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
      toast.error(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSaving(true);
    try {
      await saveFeedTopAd({
        title,
        body,
        link_url: linkUrl.trim() || null,
        is_active: isActive,
      });
      toast.success(t("pages.admin.ads.savedToast"));
      void load();
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.ads.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.ads.intro")}</p>
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

      {!loading && row ? (
        <section className="card">
          <h2 className="card__title">{t("pages.admin.ads.feedTopTitle")}</h2>
          <form className="card__body form" onSubmit={(e) => void handleSubmit(e)}>
            <label className="form__label">
              {t("pages.admin.ads.fieldTitle")}
              <input
                className="form__input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                placeholder={t("pages.admin.ads.phTitle")}
              />
            </label>
            <label className="form__label">
              {t("pages.admin.ads.fieldBody")}
              <textarea
                className="form__input"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={2000}
                placeholder={t("pages.admin.ads.phBody")}
              />
            </label>
            <label className="form__label">
              {t("pages.admin.ads.fieldLinkUrl")}
              <input
                className="form__input"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder={t("pages.admin.ads.phUrl")}
              />
            </label>
            <label className="form__label form__label--checkbox">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
              {t("pages.admin.ads.activeLabel")}
            </label>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? t("pages.admin.ads.saving") : t("pages.admin.ads.save")}
            </button>
          </form>
        </section>
      ) : null}

      {!loading && !row ? <p className="muted">{t("pages.admin.ads.noSlot")}</p> : null}
    </div>
  );
}
