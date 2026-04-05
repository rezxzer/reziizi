import type { ReactElement } from "react";
import { useI18n } from "../contexts/I18nContext.tsx";

/** Placeholder rows while user posts are loading on profile pages (matches post-card layout loosely). */
export function ProfilePostListSkeleton(): ReactElement {
  const { t } = useI18n();
  return (
    <div className="profile-post-list-skeleton" role="status" aria-busy="true">
      <span className="sr-only">{t("pages.common.loading")}</span>
      <div className="profile-post-list-skeleton__items" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="profile-post-skeleton">
            <div className="profile-post-skeleton__header">
              <div className="profile-post-skeleton__avatar" />
              <div className="profile-post-skeleton__meta">
                <div className="profile-post-skeleton__line profile-post-skeleton__line--author" />
                <div className="profile-post-skeleton__line profile-post-skeleton__line--time" />
              </div>
            </div>
            <div className="profile-post-skeleton__body">
              <div className="profile-post-skeleton__line profile-post-skeleton__line--body" />
              <div className="profile-post-skeleton__line profile-post-skeleton__line--body profile-post-skeleton__line--short" />
            </div>
            <div className="profile-post-skeleton__footer" />
          </div>
        ))}
      </div>
    </div>
  );
}
