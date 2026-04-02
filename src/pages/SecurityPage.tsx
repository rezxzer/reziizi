import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export function SecurityPage(): ReactElement {
  return (
    <div className="stack security-page">
      <nav className="legal-page__nav" aria-label="Security navigation">
        <Link to="/" className="inline-link">
          ← Home
        </Link>
        <span className="legal-page__sep" aria-hidden="true">
          ·
        </span>
        <Link to="/settings" className="inline-link">
          Settings
        </Link>
        <span className="legal-page__sep" aria-hidden="true">
          ·
        </span>
        <Link to="/legal" className="inline-link">
          Legal
        </Link>
      </nav>

      <article className="card">
        <h1 className="card__title">Security</h1>
        <div className="card__body">
          <p className="muted">How REZIIZI approaches security in the MVP (high level).</p>

          <section className="legal-section" aria-labelledby="sec-auth-heading">
            <h2 id="sec-auth-heading" className="legal-section__title">
              Account &amp; passwords
            </h2>
            <ul className="legal-list">
              <li>
                New passwords and password changes must be at least{" "}
                <strong>8 characters</strong> (enforced in the app; Supabase Auth stores credentials securely).
              </li>
              <li>
                Use a <strong>unique password</strong> for this site; sign out from{" "}
                <Link to="/settings">Settings</Link> on shared devices.
              </li>
            </ul>
          </section>

          <section className="legal-section" aria-labelledby="sec-data-heading">
            <h2 id="sec-data-heading" className="legal-section__title">
              Data access
            </h2>
            <p>
              The backend uses <strong>Row Level Security (RLS)</strong> on database tables so clients only access data
              allowed by policy (e.g. your own profile updates, public posts, admin tools for admins).
            </p>
            <p>
              API keys in the web app are <strong>anon</strong> keys (limited by RLS). Never put service-role or
              secret keys in the frontend or public repos.
            </p>
          </section>

          <section className="legal-section" aria-labelledby="sec-transport-heading">
            <h2 id="sec-transport-heading" className="legal-section__title">
              Transport &amp; hosting
            </h2>
            <p>
              Use <strong>HTTPS</strong> in production. When deployed (e.g. Vercel), HTTP security headers can be set
              via hosting config to reduce common web risks (clickjacking, MIME sniffing, referrer leakage).
            </p>
          </section>

          <section className="legal-section" aria-labelledby="sec-privacy-heading">
            <h2 id="sec-privacy-heading" className="legal-section__title">
              Privacy controls
            </h2>
            <p>
              Control email search visibility under <Link to="/settings">Settings → Privacy</Link>. See also{" "}
              <Link to="/legal">Terms &amp; Privacy</Link>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
