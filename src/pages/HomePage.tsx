import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PlaceholderCard } from "../components/PlaceholderCard";

export function HomePage(): ReactElement {
  return (
    <div className="stack">
      <PlaceholderCard title="Post Feed" featureId="feed">
        <p>
          <strong>Flow:</strong> load initial posts (limit 10) → scroll or &quot;Load more&quot; → next
          batch.
        </p>
        <p>
          <strong>Backend:</strong> Supabase <code>posts</code> (paginated) — schema + RLS later.
        </p>
        <p className="muted">Placeholder list — no data yet.</p>
        <ul className="post-list post-list--dummy">
          <li>Post preview slot 1</li>
          <li>Post preview slot 2</li>
        </ul>
      </PlaceholderCard>
      <PlaceholderCard title="Posts + Reactions (scaffold)" featureId="posts-reactions">
        <p>
          <strong>Posts System</strong> — create/delete own posts. <strong>Reactions</strong> — 👍 / 👎
          per post.
        </p>
        <p>
          Components: <code>PostForm</code>, <code>ReactionButtons</code> (to be wired).
        </p>
      </PlaceholderCard>
      <p>
        <Link to="/login">Go to auth</Link>
      </p>
    </div>
  );
}
