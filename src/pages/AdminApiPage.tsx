import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { RPC, TABLE } from "../lib/api";

export function AdminApiPage(): ReactElement {
  const tables: string[] = Object.values(TABLE).sort((a, b) => a.localeCompare(b));
  const rpcs: string[] = Object.values(RPC).sort((a, b) => a.localeCompare(b));

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">API catalog</h1>
        <div className="card__body">
          <p className="muted">
            REZIIZI talks to <strong>Supabase</strong> (PostgREST + Auth + Realtime). There is no custom HTTP API in
            this repo — the app uses <code className="admin-page__code">@supabase/supabase-js</code> with Row Level
            Security. Names below are the canonical registry (<code className="admin-page__code">src/lib/api</code>).
            Column-level notes and migration order: <code className="admin-page__code">supabase/SCHEMA.md</code> in the
            repo.
          </p>
          <p>
            <Link to="/admin">← Admin overview</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Public tables</h2>
        <div className="card__body admin-api">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th scope="col">public.table</th>
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
        <h2 className="card__title">Client RPCs</h2>
        <div className="card__body admin-api">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th scope="col">public function (RPC)</th>
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
          <p className="muted">
            Triggers and internal helpers (e.g. <code>handle_new_user</code>) are not listed here — see migrations.
          </p>
        </div>
      </section>
    </div>
  );
}
