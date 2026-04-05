import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationWithActor,
} from "../lib/notifications.ts";
import { queryKeys } from "../lib/queryKeys.ts";

export function NotificationsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: queryKeys.notifications.list,
    queryFn: () => fetchNotifications(),
  });

  const markReadMut = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list });
    },
    onError: (e: unknown): void => {
      toast.error(errorMessage(e));
    },
  });

  const markAllMut = useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list });
    },
    onError: (e: unknown): void => {
      toast.error(errorMessage(e));
    },
  });

  const items: NotificationWithActor[] = listQuery.data ?? [];
  const loading: boolean = listQuery.isPending;
  const error: string | null = listQuery.isError ? errorMessage(listQuery.error) : null;
  const busy: boolean = markReadMut.isPending || markAllMut.isPending;
  const unreadCount: number = items.filter((n) => n.read_at === null).length;

  return (
    <div className="stack notifications-page">
      <section className="card">
        <div className="notifications-page__head">
          <h1 className="card__title">{t("pages.notifications.title")}</h1>
          {items.length > 0 && unreadCount > 0 ? (
            <button
              type="button"
              className="btn btn--small"
              disabled={busy}
              onClick={() => void markAllMut.mutateAsync()}
            >
              {t("pages.notifications.markAllRead")}
            </button>
          ) : null}
        </div>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.notifications.loading")}
            </p>
          ) : null}
          {error ? (
            <p className="form__error" role="alert">
              {error}
            </p>
          ) : null}
          {!loading && items.length === 0 && !error ? (
            <p className="muted">{t("pages.notifications.empty")}</p>
          ) : null}
          {!loading && items.length > 0 ? (
            <ul className="notification-list">
              {items.map((n) => (
                <NotificationRowItem
                  key={n.id}
                  n={n}
                  disabled={busy}
                  onRead={() => void markReadMut.mutateAsync(n.id)}
                />
              ))}
            </ul>
          ) : null}
          <p className="muted">
            <Link to="/" className="inline-link">
              {t("pages.notifications.backToFeed")}
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
  const { t } = useI18n();
  const actor: string = n.actorEmail ?? n.actor_id.slice(0, 8);
  const time: string = new Date(n.created_at).toLocaleString();
  const unread: boolean = n.read_at === null;
  const text: string =
    n.type === "comment"
      ? t("pages.notifications.msgComment", { actor })
      : n.type === "reaction"
        ? t("pages.notifications.msgReaction", { actor })
        : t("pages.notifications.msgFollow", { actor });

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
                · {t("pages.notifications.postLabel")} <code>{n.post_id.slice(0, 8)}…</code>
              </span>
            ) : n.type === "follow" ? (
              <span className="notification-list__ids">
                {" "}
                ·{" "}
                <Link className="inline-link" to={`/u/${n.actor_id}`}>
                  {t("pages.notifications.viewProfile")}
                </Link>
              </span>
            ) : null}
          </p>
        </div>
      </div>
      {unread ? (
        <button type="button" className="btn btn--small" disabled={disabled} onClick={onRead}>
          {t("pages.notifications.markRead")}
        </button>
      ) : null}
    </li>
  );
}
