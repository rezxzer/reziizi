import type { ReactElement } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
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
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [reactionError, setReactionError] = useState<string | null>(null);

  async function apply(next: -1 | 1): Promise<void> {
    if (!user || busy) {
      return;
    }
    setBusy(true);
    setReactionError(null);
    try {
      if (myReaction === next) {
        const { error } = await supabase
          .from("reactions")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) {
          setReactionError(formatError(error));
          return;
        }
      } else if (myReaction === null) {
        const { error } = await supabase.from("reactions").insert({
          post_id: postId,
          user_id: user.id,
          value: next,
        });
        if (error) {
          setReactionError(formatError(error));
          return;
        }
      } else {
        const { error } = await supabase
          .from("reactions")
          .update({ value: next })
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) {
          setReactionError(formatError(error));
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
    <div className="reactions" aria-label="Reactions">
      <div className="reactions__buttons">
        <button
          type="button"
          className={`reactions__btn${myReaction === 1 ? " reactions__btn--active" : ""}`}
          disabled={disabled}
          onClick={() => void apply(1)}
          title={user ? "Thumbs up" : "Sign in to react"}
        >
          👍 <span className="reactions__count">{thumbsUp}</span>
        </button>
        <button
          type="button"
          className={`reactions__btn${myReaction === -1 ? " reactions__btn--active" : ""}`}
          disabled={disabled}
          onClick={() => void apply(-1)}
          title={user ? "Thumbs down" : "Sign in to react"}
        >
          👎 <span className="reactions__count">{thumbsDown}</span>
        </button>
      </div>
      {reactionError ? (
        <p className="reactions__error form__error" role="alert">
          {reactionError}
        </p>
      ) : null}
    </div>
  );
}
