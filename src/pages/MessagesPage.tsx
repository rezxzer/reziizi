import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Avatar } from "../components/Avatar.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useAppFeatureFlags } from "../hooks/useAppFeatureFlags";
import { FEATURE_FLAG_KEYS, isFeatureEnabled } from "../lib/featureFlags";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchMyConversations, type ConversationWithPeer } from "../lib/chat.ts";
import { errorMessage } from "../lib/errors.ts";

export function MessagesPage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const featureFlags = useAppFeatureFlags();
  const toast = useToast();
  const [items, setItems] = useState<ConversationWithPeer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const load = useCallback(async (): Promise<void> => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      const list = await fetchMyConversations(user.id);
      setItems(list);
      setLoadFailed(false);
    } catch (e: unknown) {
      toast.error(errorMessage(e));
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!isFeatureEnabled(featureFlags.data, FEATURE_FLAG_KEYS.navMessages)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="stack messages-page">
      {/* Hero Header */}
      <div className="page-hero inbox-shell__hero">
        <div className="page-hero__icon inbox-shell__hero-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="page-hero__text inbox-shell__hero-copy">
          <h1 className="page-hero__title">{t("pages.messages.title")}</h1>
          <p className="page-hero__subtitle">
            {t("pages.messages.introBefore")}
            <Link to="/search" className="inline-link">{t("pages.search.title")}</Link>
            {t("pages.messages.introAfter")}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      {!loading && !loadFailed ? (
        <div className="page-stats-bar inbox-shell__stats">
          <div className="page-stats-bar__item">
            <span className="page-stats-bar__value">{items.length}</span>
            <span className="page-stats-bar__label">Threads</span>
          </div>
        </div>
      ) : null}

      {/* Content */}
      <section className="card inbox-shell__card">
        {loading ? (
          <div className="page-loading-block">
            <div className="page-loading-block__spinner" />
            <p className="muted">{t("pages.common.loading")}</p>
          </div>
        ) : null}

        {!loading && loadFailed ? (
          <div className="page-empty-state messages-page__error-state" role="alert" aria-live="assertive">
            <div className="page-empty-state__icon messages-page__error-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div className="messages-page__error-copy">
              <p className="messages-page__error-title">{t("errors.routeTitle")}</p>
              <p className="page-empty-state__text">{t("errors.routeBody")}</p>
            </div>
            <div className="messages-page__error-actions">
              <button type="button" className="btn btn--primary" onClick={() => void load()}>
                {t("errors.tryAgain")}
              </button>
              <Link to="/search" className="btn">
                {t("pages.search.title")}
              </Link>
            </div>
          </div>
        ) : null}

        {!loading && !loadFailed && items.length === 0 ? (
          <div className="page-empty-state">
            <div className="page-empty-state__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="page-empty-state__text">{t("pages.messages.empty")}</p>
            <Link to="/search" className="btn btn--primary">{t("pages.search.title")}</Link>
          </div>
        ) : null}

        {!loading && !loadFailed && items.length > 0 ? (
          <ul className="conversation-list inbox-shell__list">
            {items.map((c) => (
              <li key={c.id}>
                <Link className="conversation-list__link" to={`/messages/${c.other_user_id}`}>
                  <span className="conversation-list__row">
                    <Avatar
                      imageUrl={c.peer_avatar_url}
                      label={c.peer_display_name ?? c.peer_email ?? c.other_user_id}
                      seed={c.other_user_id}
                      size="sm"
                    />
                    <span className="conversation-list__peer-info">
                      <span className="conversation-list__peer">
                        {c.peer_display_name ?? c.peer_email ?? c.other_user_id}
                      </span>
                      {c.peer_display_name && c.peer_email ? (
                        <span className="muted conversation-list__peer-email">{c.peer_email}</span>
                      ) : null}
                    </span>
                  </span>
                  <time className="conversation-list__time muted" dateTime={c.last_message_at}>
                    {new Date(c.last_message_at).toLocaleString()}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
