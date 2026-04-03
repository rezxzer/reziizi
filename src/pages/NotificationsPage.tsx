import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { errorMessage } from "../lib/errors.ts";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationWithActor,
} from "../lib/notifications.ts";

export function NotificationsPage(): ReactElement {
  const [items, setItems] = useState<NotificationWithActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchNotifications();
      setItems(list);
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleReadOne(id: string): Promise<void> {
    setBusy(true);
    try {
      await markNotificationRead(id);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
      );
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleReadAll(): Promise<void> {
    setBusy(true);
    try {
      const now = new Date().toISOString();
      await markAllNotificationsRead();
      setItems((prev) => prev.map((n) => ({ ...n, read_at: now })));
    } catch (e: unknown) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  const unreadCount = items.filter((n) => n.read_at === null).length;

  return (
    <div className="stack">
      <section className="card">
        <div className="notifications-page__head">
          <h1 className="card__title">Notifications</h1>
          {items.length > 0 && unreadCount > 0 ? (
            <button type="button" className="btn btn--small" disabled={busy} onClick={() => void handleReadAll()}>
              Mark all read
            </button>
          ) : null}
        </div>
        <div className="card__body">
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
          {!loading && items.length === 0 && !error ? (
            <p className="muted">
              No notifications yet. Comments and reactions on your posts and new followers appear here.
            </p>
          ) : null}
          {!loading && items.length > 0 ? (
            <ul className="notification-list">
              {items.map((n) => (
                <NotificationRowItem
                  key={n.id}
                  n={n}
                  disabled={busy}
                  onRead={() => void handleReadOne(n.id)}
                />
              ))}
            </ul>
          ) : null}
          <p className="muted">
            <Link to="/" className="inline-link">
              Back to feed
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

type RowProps = {
  n: NotificationWithActor;
  disabled: boolean;
  onRead: () => void;
};

function NotificationRowItem({ n, disabled, onRead }: RowProps): ReactElement {
  const actor = n.actorEmail ?? n.actor_id.slice(0, 8);
  const time = new Date(n.created_at).toLocaleString();
  const unread = n.read_at === null;
  const text =
    n.type === "comment"
      ? `${actor} commented on your post`
      : n.type === "reaction"
        ? `${actor} reacted to your post`
        : `${actor} started following you`;

  return (
    <li className={`notification-list__item${unread ? " notification-list__item--unread" : ""}`}>
      <div className="notification-list__text notification-list__text--with-avatar">
        <Avatar imageUrl={n.actorAvatarUrl} label={actor} size="sm" />
        <div className="notification-list__copy">
        <p className="notification-list__msg">{text}</p>
        <p className="notification-list__meta muted">
          <time dateTime={n.created_at}>{time}</time>
          {n.post_id != null ? (
            <span className="notification-list__ids">
              {" "}
              · post <code>{n.post_id.slice(0, 8)}…</code>
            </span>
          ) : n.type === "follow" ? (
            <span className="notification-list__ids">
              {" "}
              ·{" "}
              <Link className="inline-link" to={`/u/${n.actor_id}`}>
                View profile
              </Link>
            </span>
          ) : null}
        </p>
        </div>
      </div>
      {unread ? (
        <button type="button" className="btn btn--small" disabled={disabled} onClick={onRead}>
          Mark read
        </button>
      ) : null}
    </li>
  );
}
