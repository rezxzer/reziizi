import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { RPC, TABLE } from "../lib/api";

export function AdminApiPage(): ReactElement {
  const { t } = useI18n();
  const tables: string[] = Object.values(TABLE).sort((a, b) => a.localeCompare(b));
  const rpcs: string[] = Object.values(RPC).sort((a, b) => a.localeCompare(b));

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.api.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.api.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.api.publicTables")}</h2>
        <div className="card__body admin-api">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th scope="col">{t("pages.admin.api.colTable")}</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((name) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.api.clientRpcs")}</h2>
        <div className="card__body admin-api">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th scope="col">{t("pages.admin.api.colRpc")}</th>
              </tr>
            </thead>
            <tbody>
              {rpcs.map((name) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">{t("pages.admin.api.footerNote")}</p>
        </div>
      </section>
    </div>
  );
}
