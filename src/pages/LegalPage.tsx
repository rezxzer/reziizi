import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PlaceholderCard } from "../components/PlaceholderCard";

export function LegalPage(): ReactElement {
  return (
    <div className="stack">
      <PlaceholderCard title="Terms of Service & Privacy Policy" featureId="legal">
        <p>
          <Link to="/login">← Back to login</Link>
        </p>
        <article className="legal-article">
          <h3>Terms of Service (placeholder)</h3>
          <p>
            Replace with real copy. Static content for REZIIZI v1 MVP — no database in v1 for this page.
          </p>
          <h3>Privacy Policy (placeholder)</h3>
          <p>Describe how you handle user data when connected to Supabase.</p>
        </article>
      </PlaceholderCard>
    </div>
  );
}
