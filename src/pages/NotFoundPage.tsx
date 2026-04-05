import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";

/** Catch-all route — unknown paths (replaces silent redirect to `/`). */
export function NotFoundPage(): ReactElement {
  const { t } = useI18n();
  return (
    <div className="stack not-found-page">
      <section className="card" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="card__title">
          {t("pages.notFoundPage.title")}
        </h1>
        <div className="card__body">
          <p className="muted">{t("pages.notFoundPage.body")}</p>
          <p>
            <Link to="/" className="inline-link">
              {t("pages.notFoundPage.homeLink")}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
