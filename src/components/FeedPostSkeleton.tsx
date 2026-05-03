import type { ReactElement } from "react";
import { useI18n } from "../contexts/I18nContext.tsx";

/** Ghost cards rendered while the home feed's first page is loading. */
export function FeedPostSkeleton(): ReactElement {
  const { t } = useI18n();
  return (
    <div className="feed-skeleton" role="status" aria-busy="true">
      <span className="sr-only">{t("pages.common.loading")}</span>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="feed-skeleton__card" aria-hidden="true">
          <div className="feed-skeleton__header">
            <div className="feed-skeleton__avatar" />
            <div className="feed-skeleton__author-col">
              <div className="feed-skeleton__line feed-skeleton__line--author" />
              <div className="feed-skeleton__line feed-skeleton__line--time" />
            </div>
          </div>
          <div className="feed-skeleton__body">
            <div className="feed-skeleton__line feed-skeleton__line--body" />
            <div className="feed-skeleton__line feed-skeleton__line--body feed-skeleton__line--short" />
          </div>
          <div className="feed-skeleton__footer" />
        </div>
      ))}
    </div>
  );
}
