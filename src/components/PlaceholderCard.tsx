import type { ReactElement, ReactNode } from "react";
import { useI18n } from "../contexts/I18nContext.tsx";

type PlaceholderCardProps = {
  title: string;
  featureId: string;
  children?: ReactNode;
};

export function PlaceholderCard({
  title,
  featureId,
  children,
}: PlaceholderCardProps): ReactElement {
  const { t } = useI18n();
  return (
    <section className="card" aria-labelledby={`${featureId}-title`}>
      <h2 id={`${featureId}-title`} className="card__title">
        {title}{" "}
        <span className="badge badge--progress" title={t("pages.common.scaffoldInProgressHint")}>
          {t("pages.common.scaffoldInProgress")}
        </span>
      </h2>
      <div className="card__body">{children}</div>
    </section>
  );
}
