import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchFeedTopAdForAdmin, saveFeedTopAd } from "../lib/ads.ts";
import { errorMessage } from "../lib/errors.ts";
import {
  removeStoredFeedAdVideoByPublicUrl,
  uploadFeedAdVideo,
  validateFeedAdVideoFile,
} from "../lib/feedAdVideoStorage.ts";
import type { AdSlotRow } from "../types/db.ts";

export function AdminAdsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [row, setRow] = useState<AdSlotRow | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [videoBusy, setVideoBusy] = useState(false);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const r = await fetchFeedTopAdForAdmin();
      setRow(r);
      if (r) {
        setTitle(r.title);
        setBody(r.body);
        setLinkUrl(r.link_url ?? "");
        setVideoUrl(r.video_url ?? "");
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

  async function persistSlot(patch: {
    title: string;
    body: string;
    link_url: string | null;
    video_url: string | null;
    is_active: boolean;
  }): Promise<void> {
    await saveFeedTopAd({
      title: patch.title,
      body: patch.body,
      link_url: patch.link_url,
      video_url: patch.video_url,
      is_active: patch.is_active,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSaving(true);
    try {
      await persistSlot({
        title,
        body,
        link_url: linkUrl.trim() || null,
        video_url: videoUrl.trim() || null,
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

  async function handleVideoSelected(fileList: FileList | null): Promise<void> {
    const file: File | undefined = fileList?.[0];
    if (!file) {
      return;
    }
    const err = validateFeedAdVideoFile(file);
    if (err === "mime") {
      toast.error(t("pages.admin.ads.videoInvalidMime"));
      return;
    }
    if (err === "size") {
      toast.error(t("pages.admin.ads.videoInvalidSize"));
      return;
    }
    setVideoBusy(true);
    try {
      if (videoUrl.trim().length > 0) {
        await removeStoredFeedAdVideoByPublicUrl(videoUrl.trim());
      }
      const { publicUrl } = await uploadFeedAdVideo(file);
      setVideoUrl(publicUrl);
      await persistSlot({
        title,
        body,
        link_url: linkUrl.trim() || null,
        video_url: publicUrl,
        is_active: isActive,
      });
      toast.success(t("pages.admin.ads.savedToast"));
      void load();
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setVideoBusy(false);
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    }
  }

  async function handleRemoveVideo(): Promise<void> {
    if (videoUrl.trim().length === 0) {
      return;
    }
    setVideoBusy(true);
    try {
      await removeStoredFeedAdVideoByPublicUrl(videoUrl.trim());
      setVideoUrl("");
      await persistSlot({
        title,
        body,
        link_url: linkUrl.trim() || null,
        video_url: null,
        is_active: isActive,
      });
      toast.success(t("pages.admin.ads.savedToast"));
      void load();
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setVideoBusy(false);
    }
  }

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.ads.title")}</h1>
        <div className="card__body">
          <p className="platform-test-notice" role="note">
            {t("pages.admin.ads.testModeBanner")}
          </p>
          <p className="muted">{t("pages.admin.ads.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
          <p>
            <Link to="/admin/ad-requests" className="inline-link">
              {t("pages.admin.ads.linkReviewRequests")}
            </Link>
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

            <div className="form__label">
              <span>{t("pages.admin.ads.fieldVideo")}</span>
              <p className="form__hint">{t("pages.admin.ads.videoHelp")}</p>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm"
                className="sr-only"
                aria-label={t("pages.admin.ads.pickVideoAria")}
                onChange={(e) => void handleVideoSelected(e.target.files)}
              />
              <div className="admin-ads-video-actions">
                <button
                  type="button"
                  className="btn btn--small"
                  disabled={videoBusy}
                  onClick={() => videoInputRef.current?.click()}
                >
                  {videoBusy ? t("pages.admin.ads.uploadingVideo") : t("pages.admin.ads.pickVideo")}
                </button>
                {videoUrl.trim().length > 0 ? (
                  <button
                    type="button"
                    className="btn btn--small btn--danger"
                    disabled={videoBusy}
                    onClick={() => void handleRemoveVideo()}
                  >
                    {t("pages.admin.ads.removeVideo")}
                  </button>
                ) : null}
              </div>
              {videoUrl.trim().length > 0 ? (
                <div className="admin-ads-video-preview">
                  <video
                    className="admin-ads-video-preview__el"
                    controls
                    playsInline
                    preload="metadata"
                    src={videoUrl.trim()}
                  >
                    {t("pages.home.feedAdVideoFallback")}
                  </video>
                </div>
              ) : null}
            </div>

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
