import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";

export function SecurityPage(): ReactElement {
  const { t } = useI18n();
  return (
    <div className="stack security-page">
      <nav className="legal-page__nav" aria-label={t("pages.security.navAria")}>
        <Link to="/" className="inline-link">
          {t("pages.chrome.backHome")}
        </Link>
        <span className="legal-page__sep" aria-hidden="true">
          ·
        </span>
        <Link to="/settings" className="inline-link">
          {t("layout.nav.settings")}
        </Link>
        <span className="legal-page__sep" aria-hidden="true">
          ·
        </span>
        <Link to="/legal" className="inline-link">
          {t("layout.nav.legal")}
        </Link>
      </nav>

      <article className="card legal-page__article">
        <h1 className="card__title">{t("pages.security.title")}</h1>
        <div className="card__body">
          <p className="muted security-page__lead">{t("pages.security.intro")}</p>

          <section className="legal-section" aria-labelledby="sec-auth-heading">
            <h2 id="sec-auth-heading" className="legal-section__title">
              {t("pages.security.sectionAuth")}
            </h2>
            <ul className="legal-list">
              <li>{t("pages.security.sectionAuthLi1")}</li>
              <li>
                {t("pages.security.sectionAuthLi2")}{" "}
                <Link to="/settings" className="inline-link">
                  {t("layout.nav.settings")}
                </Link>
                {t("pages.security.sectionAuthLi2End")}
              </li>
            </ul>
          </section>

          <section className="legal-section" aria-labelledby="sec-data-heading">
            <h2 id="sec-data-heading" className="legal-section__title">
              {t("pages.security.sectionData")}
            </h2>
            <p>{t("pages.security.sectionDataP1")}</p>
            <p>{t("pages.security.sectionDataP2")}</p>
          </section>

          <section className="legal-section" aria-labelledby="sec-transport-heading">
            <h2 id="sec-transport-heading" className="legal-section__title">
              {t("pages.security.sectionTransport")}
            </h2>
            <p>{t("pages.security.sectionTransportP")}</p>
          </section>

          <section className="legal-section" aria-labelledby="sec-privacy-heading">
            <h2 id="sec-privacy-heading" className="legal-section__title">
              {t("pages.security.sectionPrivacy")}
            </h2>
            <p>
              {t("pages.security.privacyIntro")}{" "}
              <Link to="/settings" className="inline-link">
                {t("pages.security.privacySettingsPrivacy")}
              </Link>
              . {t("pages.security.privacySeeAlso")}{" "}
              <Link to="/legal" className="inline-link">
                {t("settings.termsLink")}
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
