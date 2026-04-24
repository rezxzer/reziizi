import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  fetchMyAdPlacementRequests,
  submitAdPlacementRequest,
} from "../lib/adPlacementRequests.ts";
import { errorMessage } from "../lib/errors.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { safeHttpUrl } from "../lib/safeUrl.ts";
import type { AdPlacementRequestRow, AdPlacementRequestStatus } from "../types/db.ts";

function statusLabel(t: (k: string) => string, s: AdPlacementRequestStatus): string {
  if (s === "pending") {
    return t("pages.sponsored.statusPending");
  }
  if (s === "approved") {
    return t("pages.sponsored.statusApproved");
  }
  return t("pages.sponsored.statusRejected");
}

export function SponsoredPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const mineQuery = useQuery({
    queryKey: user ? queryKeys.adPlacementRequests.mine(user.id) : ["adPlacementRequests", "mine", "__none__"],
    queryFn: () => fetchMyAdPlacementRequests(user!.id),
    enabled: Boolean(user),
  });

  const submitMutation = useMutation({
    mutationFn: () => {
      const trimmedLink: string = linkUrl.trim();
      const normalizedLink: string | null = trimmedLink.length > 0 ? safeHttpUrl(trimmedLink) : null;
      return submitAdPlacementRequest({
        proposed_title: title,
        proposed_body: body,
        proposed_link_url: normalizedLink,
      });
    },
    onSuccess: () => {
      toast.success(t("pages.sponsored.successToast"));
      setTitle("");
      setBody("");
      setLinkUrl("");
      if (user) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.adPlacementRequests.mine(user.id) });
      }
    },
    onError: (err: unknown) => {
      toast.error(errorMessage(err));
    },
  });

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!user) {
      return;
    }
    if (body.trim().length < 10) {
      toast.error(t("pages.sponsored.fieldBodyHint"));
      return;
    }
    const trimmedLink: string = linkUrl.trim();
    if (trimmedLink.length > 0 && safeHttpUrl(trimmedLink) === null) {
      toast.error(t("pages.sponsored.fieldLinkInvalid"));
      return;
    }
    submitMutation.mutate();
  }

  const list: AdPlacementRequestRow[] = mineQuery.data ?? [];

  return (
    <div className="stack legal-page">
      <nav className="legal-page__nav" aria-label={t("pages.legal.navAria")}>
        <Link to="/" className="inline-link">
          ← {t("layout.nav.home")}
        </Link>
      </nav>
      <article className="legal-page__article card">
        <h1 className="card__title">{t("pages.sponsored.title")}</h1>
        <div className="card__body stack">
          <p className="platform-test-notice" role="note">
            {t("pages.sponsored.testModeBanner")}
          </p>
          <p className="muted">{t("pages.sponsored.intro")}</p>
          <section>
            <h2 className="settings-premium-billing-title">{t("pages.sponsored.howItWorksTitle")}</h2>
            <p className="muted">{t("pages.sponsored.howItWorksBody")}</p>
          </section>

          {!user ? (
            <section className="stack">
              <h2 className="settings-premium-billing-title">{t("pages.sponsored.signInTitle")}</h2>
              <p className="muted">{t("pages.sponsored.signInBody")}</p>
              <p>
                <Link to="/login" state={{ from: "/sponsored" }} className="btn btn--primary">
                  {t("pages.sponsored.signInLink")}
                </Link>
              </p>
            </section>
          ) : (
            <section className="stack">
              <h2 className="settings-premium-billing-title">{t("pages.sponsored.formTitle")}</h2>
              <form className="form" onSubmit={(ev) => void onSubmit(ev)}>
                <label className="form__label">
                  {t("pages.sponsored.fieldTitle")}
                  <input
                    className="form__input"
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    maxLength={200}
                    autoComplete="off"
                  />
                  <span className="form__hint">{t("pages.sponsored.fieldTitleHint")}</span>
                </label>
                <label className="form__label">
                  {t("pages.sponsored.fieldBody")}
                  <textarea
                    className="form__input"
                    rows={5}
                    value={body}
                    onChange={(ev) => setBody(ev.target.value)}
                    maxLength={2000}
                    required
                    minLength={10}
                  />
                  <span className="form__hint">{t("pages.sponsored.fieldBodyHint")}</span>
                </label>
                <label className="form__label">
                  {t("pages.sponsored.fieldLink")}
                  <input
                    className="form__input"
                    type="url"
                    value={linkUrl}
                    onChange={(ev) => setLinkUrl(ev.target.value)}
                    placeholder="https://"
                    maxLength={2000}
                  />
                  <span className="form__hint">{t("pages.sponsored.fieldLinkHint")}</span>
                </label>
                <button type="submit" className="btn btn--primary" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? t("pages.sponsored.submitting") : t("pages.sponsored.submit")}
                </button>
              </form>
            </section>
          )}

          {user ? (
            <section>
              <h2 className="settings-premium-billing-title">{t("pages.sponsored.myRequestsTitle")}</h2>
              {mineQuery.isLoading ? (
                <p className="page-loading" role="status">
                  {t("pages.common.loading")}
                </p>
              ) : list.length === 0 ? (
                <p className="muted">{t("pages.sponsored.emptyMine")}</p>
              ) : (
                <ul className="sponsored-request-list">
                  {list.map((row) => (
                    <li key={row.id} className="sponsored-request-list__item card">
                      <p className="muted sponsored-request-list__meta">
                        {new Date(row.created_at).toLocaleString()}
                        {" · "}
                        <strong>{statusLabel(t, row.status)}</strong>
                      </p>
                      {row.proposed_title.trim().length > 0 ? (
                        <p>
                          <strong>{row.proposed_title.trim()}</strong>
                        </p>
                      ) : null}
                      <p style={{ whiteSpace: "pre-wrap" }}>{row.proposed_body.trim()}</p>
                      {row.proposed_link_url ? (
                        <p className="muted">
                          <a href={row.proposed_link_url} rel="noopener noreferrer" target="_blank">
                            {row.proposed_link_url}
                          </a>
                        </p>
                      ) : null}
                      {row.admin_note && row.admin_note.trim().length > 0 ? (
                        <p className="muted">
                          <strong>{t("pages.sponsored.adminNoteFromTeam")}:</strong> {row.admin_note.trim()}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}
        </div>
      </article>
    </div>
  );
}
