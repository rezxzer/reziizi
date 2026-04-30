import type { ReactElement } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { errorMessage as formatError } from "../lib/errors.ts";
import { supabase } from "../lib/supabaseClient";

type ReactionButtonsProps = {
  postId: string;
  thumbsUp: number;
  thumbsDown: number;
  myReaction: -1 | 1 | null;
  onChanged: () => void;
};

export function ReactionButtons({
  postId,
  thumbsUp,
  thumbsDown,
  myReaction,
  onChanged,
}: ReactionButtonsProps): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  async function apply(next: -1 | 1): Promise<void> {
    if (!user || busy) {
      return;
    }
    setBusy(true);
    try {
      if (myReaction === next) {
        const { error } = await supabase
          .from("reactions")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) {
          toast.error(formatError(error));
          return;
        }
      } else if (myReaction === null) {
        const { error } = await supabase.from("reactions").insert({
          post_id: postId,
          user_id: user.id,
          value: next,
        });
        if (error) {
          toast.error(formatError(error));
          return;
        }
      } else {
        const { error } = await supabase
          .from("reactions")
          .update({ value: next })
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) {
          toast.error(formatError(error));
          return;
        }
      }
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  const disabled = !user || busy;

  return (
    <div className="reactions" aria-label={t("pages.reactions.ariaLabel")}>
      <div className="reactions__buttons">
        <button
          type="button"
          className={`reactions__btn${myReaction === 1 ? " reactions__btn--active" : ""}`}
          disabled={disabled}
          onClick={() => void apply(1)}
          title={user ? t("pages.reactions.thumbsUp") : t("pages.reactions.signInToReact")}
        >
          👍 <span key={thumbsUp} className="reactions__count count-bump">{thumbsUp}</span>
        </button>
        <button
          type="button"
          className={`reactions__btn${myReaction === -1 ? " reactions__btn--active" : ""}`}
          disabled={disabled}
          onClick={() => void apply(-1)}
          title={user ? t("pages.reactions.thumbsDown") : t("pages.reactions.signInToReact")}
        >
          👎 <span key={thumbsDown} className="reactions__count count-bump">{thumbsDown}</span>
        </button>
      </div>
    </div>
  );
}
