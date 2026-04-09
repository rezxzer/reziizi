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
      {/* ── Hero Header ── */}
      <div className="page-hero">
        <div className="page-hero__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 ? (
            <span className="page-hero__badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
          ) : null}
        </div>
        <div className="page-hero__text">
          <h1 className="page-hero__title">{t("pages.notifications.title")}</h1>
          <p className="page-hero__subtitle">
            {unreadCount > 0
              ? `${unreadCount} unread`
              : items.length > 0
                ? `${items.length} total`
                : ""}
          </p>
        </div>
        {items.length > 0 && unreadCount > 0 ? (
          <button
            type="button"
            className="btn btn--primary btn--small page-hero__action"
            disabled={busy}
            onClick={() => void markAllMut.mutateAsync()}
          >
            {t("pages.notifications.markAllRead")}
          </button>
        ) : null}
      </div>

      {/* ── Stats Bar ── */}
      {!loading && !error ? (
        <div className="page-stats-bar">
          <div className="page-stats-bar__item">
            <span className="page-stats-bar__value">{items.length}</span>
            <span className="page-stats-bar__label">Total</span>
          </div>
          <div className="page-stats-bar__item page-stats-bar__item--accent">
            <span className="page-stats-bar__value">{unreadCount}</span>
            <span className="page-stats-bar__label">Unread</span>
          </div>
          <div className="page-stats-bar__item">
            <span className="page-stats-bar__value">{items.length - unreadCount}</span>
            <span className="page-stats-bar__label">Read</span>
          </div>
        </div>
      ) : null}

      {/* ── Content ── */}
      <section className="card">
        {loading ? (
          <div className="page-loading-block">
            <div className="page-loading-block__spinner" />
            <p className="muted">{t("pages.notifications.loading")}</p>
          </div>
        ) : null}

        {error ? (
          <p className="form__error" role="alert">{error}</p>
        ) : null}

        {!loading && items.length === 0 && !error ? (
          <div className="page-empty-state">
            <div className="page-empty-state__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="page-empty-state__text">{t("pages.notifications.empty")}</p>
            <Link to="/" className="btn btn--primary">{t("pages.notifications.backToFeed")}</Link>
          </div>
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

        {!loading && items.length > 0 ? (
          <div className="page-bottom-link">
            <Link to="/" className="inline-link">{t("pages.notifications.backToFeed")}</Link>
          </div>
        ) : null}
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
