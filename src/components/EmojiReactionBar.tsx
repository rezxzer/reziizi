import type { ReactElement } from "react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  addEmojiReaction,
  EMOJI_GLYPH,
  EMOJI_ORDER,
  fetchPostEmojiState,
  removeEmojiReaction,
  type EmojiCode,
} from "../lib/emojiReactions.ts";
import { errorMessage } from "../lib/errors.ts";

type EmojiReactionBarProps = {
  postId: string;
};

const QUERY_KEY_ROOT = ["postEmojiState"] as const;

export function EmojiReactionBar({ postId }: EmojiReactionBarProps): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const myId: string | null = user?.id ?? null;
  const [pending, setPending] = useState<EmojiCode | null>(null);

  const stateQuery = useQuery({
    queryKey: [...QUERY_KEY_ROOT, postId, myId ?? "__anon__"],
    queryFn: () => fetchPostEmojiState(postId, myId),
    staleTime: 30_000,
  });

  async function toggle(emoji: EmojiCode): Promise<void> {
    if (!user || pending !== null) {
      return;
    }
    const data = stateQuery.data;
    const isMine: boolean = data?.mine.has(emoji) ?? false;
    setPending(emoji);
    try {
      if (isMine) {
        // Same emoji clicked twice → toggle off.
        await removeEmojiReaction(postId, user.id, emoji);
      } else {
        // Switching reaction: clear any existing emoji first so a user
        // ends up with at most one. Defensive against historical rows
        // that may have multiple — Slack-style behavior used to be allowed.
        const previous: ReadonlySet<EmojiCode> = data?.mine ?? new Set();
        for (const old of previous) {
          await removeEmojiReaction(postId, user.id, old);
        }
        await addEmojiReaction(postId, user.id, emoji);
      }
      await queryClient.invalidateQueries({ queryKey: [...QUERY_KEY_ROOT, postId, myId ?? "__anon__"] });
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setPending(null);
    }
  }

  const data = stateQuery.data;
  const disabled: boolean = !user || pending !== null;

  return (
    <div
      className="emoji-reactions"
      role="group"
      aria-label={t("pages.emojiReactions.ariaLabel")}
    >
      {EMOJI_ORDER.map((emoji) => {
        const count: number = data?.counts[emoji] ?? 0;
        const isMine: boolean = data?.mine.has(emoji) ?? false;
        const labelKey = `pages.emojiReactions.${emoji}` as const;
        return (
          <button
            key={emoji}
            type="button"
            className={`emoji-reactions__btn${isMine ? " emoji-reactions__btn--active" : ""}`}
            disabled={disabled}
            onClick={() => void toggle(emoji)}
            title={user ? t(labelKey) : t("pages.emojiReactions.signInHint")}
            aria-pressed={isMine}
          >
            <span className="emoji-reactions__glyph" aria-hidden="true">
              {EMOJI_GLYPH[emoji]}
            </span>
            {count > 0 ? (
              <span key={count} className="emoji-reactions__count count-bump">
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
