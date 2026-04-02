import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { submitPostReport } from "../lib/reports.ts";

type ReportPostControlProps = {
  postId: string;
  isOwner: boolean;
};

export function ReportPostControl({ postId, isOwner }: ReportPostControlProps): ReactElement | null {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user || isOwner) {
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      await submitPostReport(postId, reason);
      setMessage("Report sent. Thanks.");
      setReason("");
      setOpen(false);
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="report-post">
      {!open ? (
        <button type="button" className="btn btn--small report-post__toggle" onClick={() => setOpen(true)}>
          Report
        </button>
      ) : (
        <form className="report-post__form form" onSubmit={(e) => void handleSubmit(e)}>
          <label className="form__label" htmlFor={`report-reason-${postId}`}>
            Why are you reporting this post?
          </label>
          <textarea
            id={`report-reason-${postId}`}
            className="form__input report-post__textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Brief reason…"
            disabled={busy}
            maxLength={2000}
            required
          />
          <div className="report-post__actions">
            <button type="submit" className="btn btn--primary btn--small" disabled={busy}>
              {busy ? "Sending…" : "Submit report"}
            </button>
            <button
              type="button"
              className="btn btn--small"
              disabled={busy}
              onClick={() => {
                setOpen(false);
                setError(null);
                setReason("");
              }}
            >
              Cancel
            </button>
          </div>
          {error ? (
            <p className="form__error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      )}
      {message ? (
        <p className="form__success report-post__msg" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
