import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { fetchMyConversations, type ConversationWithPeer } from "../lib/chat.ts";
import { errorMessage } from "../lib/errors.ts";

export function MessagesPage(): ReactElement {
  const { user } = useAuth();
  const [items, setItems] = useState<ConversationWithPeer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    if (!user) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const list = await fetchMyConversations(user.id);
      setItems(list);
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="stack">
      <section className="card">
        <h1 className="card__title">Messages</h1>
        <div className="card__body">
          <p className="muted">
            Open a chat from <Link to="/search">Search</Link> (user results) or pick a thread below.
          </p>
          {loading ? (
            <p className="page-loading" role="status">
              Loading…
            </p>
          ) : null}
          {error ? (
            <p className="form__error" role="alert">
              {error}
            </p>
          ) : null}
          {!loading && !error && items.length === 0 ? (
            <p className="muted">No conversations yet.</p>
          ) : null}
          {!loading && !error && items.length > 0 ? (
            <ul className="conversation-list">
              {items.map((c) => (
                <li key={c.id}>
                  <Link className="conversation-list__link" to={`/messages/${c.other_user_id}`}>
                    <span className="conversation-list__peer">
                      {c.peer_email ?? c.other_user_id}
                    </span>
                    <time className="conversation-list__time muted" dateTime={c.last_message_at}>
                      {new Date(c.last_message_at).toLocaleString()}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </div>
  );
}
