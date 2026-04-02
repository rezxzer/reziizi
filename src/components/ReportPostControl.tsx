import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { errorMessage } from "../lib/errors.ts";
import { submitPostReport } from "../lib/reports.ts";

type ReportPostControlProps = {
  postId: string;
  isOwner: boolean;
};

export function ReportPostControl({ postId, isOwner }: ReportPostControlProps): ReactElement | null {
  const { t } = useI18n();
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
      setMessage(t("pages.report.success"));
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
          {t("pages.report.report")}
        </button>
      ) : (
        <form className="report-post__form form" onSubmit={(e) => void handleSubmit(e)}>
          <label className="form__label" htmlFor={`report-reason-${postId}`}>
            {t("pages.report.whyLabel")}
          </label>
          <textarea
            id={`report-reason-${postId}`}
            className="form__input report-post__textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("pages.report.placeholder")}
            disabled={busy}
            maxLength={2000}
            required
          />
          <div className="report-post__actions">
            <button type="submit" className="btn btn--primary btn--small" disabled={busy}>
              {busy ? t("pages.report.sending") : t("pages.report.submit")}
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
              {t("pages.report.cancel")}
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
