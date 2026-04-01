import type { ReactElement } from "react";
import { PlaceholderCard } from "../components/PlaceholderCard";

export function SettingsPage(): ReactElement {
  return (
    <div className="stack">
      <PlaceholderCard title="Settings Page" featureId="settings">
        <p>
          <strong>Flow:</strong> change password (Supabase) → log out → delete account (confirm).
        </p>
        <ul className="actions-list">
          <li>
            <button type="button" disabled>
              Change password
            </button>
          </li>
          <li>
            <button type="button" disabled>
              Log out
            </button>
          </li>
          <li>
            <button type="button" disabled>
              Delete account
            </button>
          </li>
        </ul>
      </PlaceholderCard>
    </div>
  );
}
