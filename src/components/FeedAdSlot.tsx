import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { fetchActiveFeedTopAd } from "../lib/ads.ts";
import type { AdSlotRow } from "../types/db.ts";

export function FeedAdSlot(): ReactElement | null {
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
  const headline: string = hasTitle ? ad.title.trim() : "Sponsored";

  const titleNode: ReactElement =
    ad.link_url && ad.link_url.length > 0 ? (
      <a className="feed-ad__title-link" href={ad.link_url} rel="noopener noreferrer" target="_blank">
        {headline}
      </a>
    ) : (
      <span className="feed-ad__title-text">{headline}</span>
    );

  return (
    <aside className="feed-ad" aria-label={hasTitle ? "Sponsored content" : "Sponsored"}>
      {hasTitle ? <p className="feed-ad__label">Sponsored</p> : null}
      <div className="feed-ad__content">
        <h3 className="feed-ad__title">{titleNode}</h3>
        {ad.body.trim().length > 0 ? <p className="feed-ad__body">{ad.body}</p> : null}
      </div>
    </aside>
  );
}
