import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Avatar } from "../components/Avatar.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  fetchMessages,
  getOrCreateConversation,
  isValidUuid,
  sendMessage,
  subscribeToNewMessages,
} from "../lib/chat.ts";
import { errorMessage } from "../lib/errors.ts";
import { supabase } from "../lib/supabaseClient.ts";
import type { ChatMessageRow } from "../types/db.ts";

export function ChatThreadPage(): ReactElement {
  const { peerId } = useParams<{ peerId: string }>();
  const { user } = useAuth();
  const { t } = useI18n();
  const toast = useToast();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [peerEmail, setPeerEmail] = useState<string | null>(null);
  const [peerAvatarUrl, setPeerAvatarUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  /** Blocks thread UI: invalid peer, load failure, or self-message. */
  const [threadError, setThreadError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLLIElement | null>(null);

  const scrollToBottom = useCallback((): void => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!peerId || !isValidUuid(peerId) || !user) {
      return;
    }
    const peer: string = peerId;
    if (peer === user.id) {
      setThreadError(t("pages.chat.cannotMessageSelf"));
      setLoading(false);
      return;
    }

    let cancelled = false;
    let unsub: (() => void) | null = null;

    async function run(): Promise<void> {
      setLoading(true);
      setThreadError(null);
      setConversationId(null);
      setMessages([]);
      setPeerAvatarUrl(null);
      try {
        const { data: prof, error: profError } = await supabase
          .from("profiles")
          .select("email, avatar_url")
          .eq("id", peer)
          .maybeSingle();
        if (profError) {
          throw profError;
        }
        if (!cancelled) {
          const pr = prof as { email: string | null; avatar_url: string | null } | null;
          setPeerEmail(pr?.email ?? null);
          setPeerAvatarUrl(pr?.avatar_url ?? null);
        }

        const cid: string = await getOrCreateConversation(peer);
        if (cancelled) {
          return;
        }
        setConversationId(cid);

        const initial = await fetchMessages(cid);
        if (cancelled) {
          return;
        }
        setMessages(initial);

        unsub = subscribeToNewMessages(cid, (row: ChatMessageRow) => {
          setMessages((prev) => {
            if (prev.some((m) => m.id === row.id)) {
              return prev;
            }
            return [...prev, row];
          });
        });
      } catch (e: unknown) {
        if (!cancelled) {
          setThreadError(errorMessage(e));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [peerId, user, t]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!conversationId || !draft.trim() || sending) {
      return;
    }
    setSending(true);
    try {
      const row = await sendMessage(conversationId, draft);
      setDraft("");
      if (row) {
        setMessages((prev) => (prev.some((m) => m.id === row.id) ? prev : [...prev, row]));
      }
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setSending(false);
    }
  }

  if (!peerId || !isValidUuid(peerId)) {
    return (
      <div className="stack">
        <section className="card">
          <h1 className="card__title">{t("pages.chat.chatHeading")}</h1>
          <div className="card__body">
            <p className="form__error" role="alert">
              {t("pages.chat.invalidPeerId")}
            </p>
            <Link to="/messages">{t("pages.chat.backToMessages")}</Link>
          </div>
        </section>
      </div>
    );
  }

  const title: string = peerEmail ?? peerId;

  return (
    <div className="stack chat-page">
      <section className="card chat-thread">
        <div className="chat-thread__head">
          <div className="chat-thread__title-row">
            <Avatar imageUrl={peerAvatarUrl} label={title} size="md" />
            <h1 className="card__title chat-thread__title">{title}</h1>
          </div>
          <Link to="/messages" className="btn btn--small">
            {t("pages.chat.allThreads")}
          </Link>
        </div>
        <div className="card__body">
          {loading ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {!loading && threadError ? (
            <p className="form__error" role="alert">
              {threadError}
            </p>
          ) : null}
          {!loading && !threadError && conversationId ? (
            <>
              <ul className="chat-thread__messages" aria-live="polite">
                {messages.map((m) => {
                  const mine: boolean = m.sender_id === user?.id;
                  return (
                    <li
                      key={m.id}
                      className={mine ? "chat-bubble chat-bubble--mine" : "chat-bubble chat-bubble--theirs"}
                    >
                      <p className="chat-bubble__body">{m.body}</p>
                      <time className="chat-bubble__time muted" dateTime={m.created_at}>
                        {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </time>
                    </li>
                  );
                })}
                <li ref={bottomRef} aria-hidden="true" />
              </ul>
              <form className="chat-thread__form form" onSubmit={(e) => void handleSubmit(e)}>
                <label className="form__label chat-thread__label" htmlFor="chat-body">
                  {t("pages.chat.messageLabel")}
                </label>
                <textarea
                  id="chat-body"
                  className="form__input chat-thread__textarea"
                  rows={3}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t("pages.chat.messagePlaceholder")}
                  disabled={sending}
                />
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={sending || !draft.trim()}
                >
                  {sending ? t("pages.chat.sending") : t("pages.chat.send")}
                </button>
              </form>
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}
