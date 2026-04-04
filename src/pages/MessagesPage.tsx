import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Avatar } from "../components/Avatar.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { fetchMyConversations, type ConversationWithPeer } from "../lib/chat.ts";
import { errorMessage } from "../lib/errors.ts";

export function MessagesPage(): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
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

  return (
    <div className="stack">
      <section className="card">
        <h1 className="card__title">{t("pages.messages.title")}</h1>
        <div className="card__body">
          <p className="muted">
            {t("pages.messages.introBefore")}
            <Link to="/search">{t("pages.search.title")}</Link>
            {t("pages.messages.introAfter")}
          </p>
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {!loading && !loadFailed && items.length === 0 ? (
            <p className="muted">{t("pages.messages.empty")}</p>
          ) : null}
          {!loading && !loadFailed && items.length > 0 ? (
            <ul className="conversation-list">
              {items.map((c) => (
                <li key={c.id}>
                  <Link className="conversation-list__link" to={`/messages/${c.other_user_id}`}>
                    <span className="conversation-list__row">
                      <Avatar
                        imageUrl={c.peer_avatar_url}
                        label={c.peer_email ?? c.other_user_id}
                        size="sm"
                      />
                      <span className="conversation-list__peer">
                        {c.peer_email ?? c.other_user_id}
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
        </div>
      </section>
    </div>
  );
}
