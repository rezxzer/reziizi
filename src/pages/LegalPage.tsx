import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export function LegalPage(): ReactElement {
  return (
    <div className="stack legal-page">
      <nav className="legal-page__nav" aria-label="Legal navigation">
        <Link to="/" className="inline-link">
          ← Home
        </Link>
        <span className="legal-page__sep" aria-hidden="true">
          ·
        </span>
        <Link to="/login" className="inline-link">
          Login
        </Link>
      </nav>

      <article className="card legal-page__article">
        <h1 className="legal-page__title">Legal information</h1>
        <p className="legal-page__updated muted">Last updated: April 1, 2026 · REZIIZI v1 (MVP)</p>

        <section className="legal-section" id="terms" aria-labelledby="terms-heading">
          <h2 id="terms-heading" className="legal-section__title">
            Terms of Service
          </h2>
          <p>
            Welcome to <strong>REZIIZI</strong>. By creating an account or using the service, you agree to these
            terms. If you do not agree, do not use the service.
          </p>
          <h3 className="legal-section__subtitle">1. The service</h3>
          <p>
            REZIIZI is an early-stage social product. Features, availability, and data may change without notice. The
            service is provided &quot;as is&quot; without warranties of any kind.
          </p>
          <h3 className="legal-section__subtitle">2. Your account</h3>
          <p>
            You are responsible for keeping your login credentials confidential and for activity under your account.
            You must provide a valid email address where required. You may stop using the service at any time.
          </p>
          <h3 className="legal-section__subtitle">3. User content</h3>
          <p>
            You retain rights to content you post. By posting, you grant REZIIZI the rights needed to operate the
            service (e.g. store, display, and distribute your posts to other users as designed). Do not post unlawful,
            abusive, or infringing content. We may remove content or restrict access if we believe it is necessary for
            safety, legal compliance, or service integrity.
          </p>
          <h3 className="legal-section__subtitle">4. Acceptable use</h3>
          <p>
            Do not attempt to disrupt the service, access others&apos; accounts without permission, scrape data at scale
            in violation of these terms, or use the service for illegal purposes.
          </p>
          <h3 className="legal-section__subtitle">5. Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, REZIIZI and its operators are not liable for indirect, incidental,
            or consequential damages arising from your use of the service.
          </p>
          <h3 className="legal-section__subtitle">6. Changes</h3>
          <p>
            We may update these terms. Continued use after changes constitutes acceptance of the updated terms. The
            &quot;Last updated&quot; date at the top of this page will be revised when material changes are made.
          </p>
        </section>

        <section className="legal-section" id="privacy" aria-labelledby="privacy-heading">
          <h2 id="privacy-heading" className="legal-section__title">
            Privacy Policy
          </h2>
          <p>This policy describes how REZIIZI handles information when you use the MVP.</p>
          <h3 className="legal-section__subtitle">1. What we collect</h3>
          <ul className="legal-list">
            <li>
              <strong>Account data:</strong> email address and authentication data processed by our auth provider
              (Supabase Auth).
            </li>
            <li>
              <strong>Profile data:</strong> information stored in your profile (e.g. email shown in the app) as
              implemented in the product.
            </li>
            <li>
              <strong>Content you create:</strong> posts and reactions you submit, with associated timestamps and
              identifiers needed to operate the feed and social features.
            </li>
            <li>
              <strong>Technical data:</strong> standard logs and metadata that infrastructure providers may collect when
              you use a web application (e.g. IP address, device/browser signals) as configured on hosting and
              database services.
            </li>
          </ul>
          <h3 className="legal-section__subtitle">2. How we use data</h3>
          <p>We use this information to run the service: authenticate you, show posts and reactions, protect the platform, and improve stability and security.</p>
          <h3 className="legal-section__subtitle">3. Service providers</h3>
          <p>
            REZIIZI uses <strong>Supabase</strong> for authentication, database storage, and related infrastructure.
            Data is processed according to Supabase&apos;s terms and practices in addition to this policy. Review
            Supabase documentation and your project settings for retention and regional options.
          </p>
          <h3 className="legal-section__subtitle">4. Retention and deletion</h3>
          <p>
            We retain data as long as needed to operate the MVP. Account deletion or full erasure flows may be added
            over time; until then, contact the operator if you need assistance. Some data may remain in backups for a
            limited period.
          </p>
          <h3 className="legal-section__subtitle">5. Your choices</h3>
          <p>
            You can access and update certain information through the app (e.g. password via settings where available).
            You may opt out by discontinuing use and requesting account closure when supported.
          </p>
          <h3 className="legal-section__subtitle">6. Contact</h3>
          <p>For privacy-related questions about this MVP, contact the project operator using the channel published for REZIIZI (placeholder until a public contact is set).</p>
        </section>
      </article>
    </div>
  );
}
