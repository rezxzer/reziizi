import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { fetchActiveFeedTopAd } from "../lib/ads.ts";
import { safeHttpUrl } from "../lib/safeUrl.ts";
import type { AdSlotRow } from "../types/db.ts";

export function FeedAdSlot(): ReactElement | null {
  const { t } = useI18n();
  const [ad, setAd] = useState<AdSlotRow | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchActiveFeedTopAd()
      .then((row) => {
        if (!cancelled) {
          setAd(row);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error || !ad) {
    return null;
  }

  const hasTitle: boolean = ad.title.trim().length > 0;
  const hasBody: boolean = ad.body.trim().length > 0;
  const safeLink: string | null = safeHttpUrl(ad.link_url);
  const videoSrc: string | null = ad.video_url?.trim() ? ad.video_url.trim() : null;

  const titleNode: ReactElement | null = hasTitle ? (
    <h3 className="feed-ad__title">
      {safeLink ? (
        <a className="feed-ad__title-link" href={safeLink} rel="noopener noreferrer" target="_blank">
          {ad.title.trim()}
        </a>
      ) : (
        <span className="feed-ad__title-text">{ad.title.trim()}</span>
      )}
    </h3>
  ) : null;

  return (
    <aside className="feed-ad" aria-label={t("pages.home.feedAdSponsoredContent")}>
      <p className="feed-ad__label">
        <Link className="feed-ad__label-link" to="/sponsored">
          {t("pages.home.feedAdSponsored")}
        </Link>
      </p>
      <div className="feed-ad__content">
        {titleNode}
        {hasBody ? <p className="feed-ad__body">{ad.body.trim()}</p> : null}
        {videoSrc ? (
          <div className="feed-ad__video-wrap">
            <video
              className="feed-ad__video"
              controls
              playsInline
              preload="metadata"
              src={videoSrc}
            >
              {t("pages.home.feedAdVideoFallback")}
            </video>
          </div>
        ) : null}
        {!hasTitle && safeLink ? (
          <p className="feed-ad__footer-link">
            <a className="feed-ad__title-link" href={safeLink} rel="noopener noreferrer" target="_blank">
              {t("pages.home.feedAdExternalCta")}
            </a>
          </p>
        ) : null}
      </div>
    </aside>
  );
}
