import type { ReactElement } from "react";
import { PlaceholderCard } from "../components/PlaceholderCard";

export function ProfilePage(): ReactElement {
  return (
    <div className="stack">
      <PlaceholderCard title="Profile Page" featureId="profile">
        <p>
          <strong>Flow:</strong> load user (email) + user posts from Supabase.
        </p>
        <p className="muted">File: <code>src/pages/Profile.tsx</code> in spec — implemented as ProfilePage.tsx</p>
        <p>Email: —</p>
        <p>Posts: —</p>
      </PlaceholderCard>
    </div>
  );
}
