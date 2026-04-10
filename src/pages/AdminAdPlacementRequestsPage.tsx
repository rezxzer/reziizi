import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  fetchAdPlacementRequestsForAdmin,
  updateAdPlacementRequestAdmin,
  type AdPlacementRequestWithProfile,
} from "../lib/adPlacementRequests.ts";
import { errorMessage } from "../lib/errors.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import type { AdPlacementRequestStatus } from "../types/db.ts";

type RowEditorProps = {
  row: AdPlacementRequestWithProfile;
  onUpdated: () => void;
  t: (key: string) => string;
  toast: ReturnType<typeof useToast>;
};

function AdminAdRequestRowEditor({ row, onUpdated, t, toast }: RowEditorProps): ReactElement {
  const [status, setStatus] = useState<AdPlacementRequestStatus>(row.status);
  const [note, setNote] = useState<string>(row.admin_note ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStatus(row.status);
    setNote(row.admin_note ?? "");
  }, [row.id, row.status, row.admin_note, row.updated_at]);

  async function handleSave(): Promise<void> {
    setSaving(true);
    try {
      await updateAdPlacementRequestAdmin(row.id, { status, admin_note: note });
      toast.success(t("pages.admin.adRequests.savedToast"));
      onUpdated();
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  const displayName: string =
    row.profiles?.display_name?.trim() && row.profiles.display_name.trim().length > 0
      ? row.profiles.display_name.trim()
      : row.user_id.slice(0, 8);

  return (
    <article className="card admin-ad-request-row">
      <div className="card__body stack">
        <p className="muted admin-ad-request-row__meta">
          {new Date(row.created_at).toLocaleString()} ·{" "}
          <Link className="inline-link" to={`/u/${row.user_id}`}>
            {t("pages.admin.adRequests.viewProfile")}
          </Link>{" "}
          ({displayName})
        </p>
        {row.proposed_title.trim().length > 0 ? (
          <p>
            <strong>{t("pages.admin.adRequests.colTitle")}:</strong> {row.proposed_title.trim()}
          </p>
        ) : null}
        <p className="admin-ad-request-row__body">{row.proposed_body.trim()}</p>
        {row.proposed_link_url ? (
          <p className="muted">
            <strong>{t("pages.admin.adRequests.colLink")}:</strong>{" "}
            <a href={row.proposed_link_url} rel="noopener noreferrer" target="_blank">
              {row.proposed_link_url}
            </a>
          </p>
        ) : null}
        <label className="form__label">
          {t("pages.admin.adRequests.colStatus")}
          <select
            className="form__input"
            value={status}
            onChange={(e) => setStatus(e.target.value as AdPlacementRequestStatus)}
          >
            <option value="pending">{t("pages.admin.adRequests.statusPending")}</option>
            <option value="approved">{t("pages.admin.adRequests.statusApproved")}</option>
            <option value="rejected">{t("pages.admin.adRequests.statusRejected")}</option>
          </select>
        </label>
        <label className="form__label">
          {t("pages.admin.adRequests.colNote")}
          <textarea
            className="form__input"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={2000}
            placeholder={t("pages.admin.adRequests.placeholderNote")}
          />
        </label>
        <button type="button" className="btn btn--primary" disabled={saving} onClick={() => void handleSave()}>
          {saving ? t("pages.admin.adRequests.saving") : t("pages.admin.adRequests.save")}
        </button>
      </div>
    </article>
  );
}

export function AdminAdPlacementRequestsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: queryKeys.adPlacementRequests.adminList,
    queryFn: () => fetchAdPlacementRequestsForAdmin(),
  });

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.adPlacementRequests.adminList });
  }, [queryClient]);

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.adRequests.title")}</h1>
        <div className="card__body">
          <p className="platform-test-notice" role="note">
            {t("pages.admin.adRequests.testModeBanner")}
          </p>
          <p className="muted">{t("pages.admin.adRequests.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
            {" · "}
            <Link to="/admin/ads">{t("pages.admin.ads.feedTopTitle")}</Link>
            {" · "}
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
        </div>
      </section>

      {listQuery.isLoading ? (
        <p className="page-loading" role="status">
          {t("pages.common.loading")}
        </p>
      ) : null}

      {listQuery.error ? <p className="form__error">{errorMessage(listQuery.error)}</p> : null}

      {!listQuery.isLoading && !listQuery.error && (listQuery.data?.length ?? 0) === 0 ? (
        <p className="muted">{t("pages.admin.adRequests.empty")}</p>
      ) : null}

      {!listQuery.isLoading && listQuery.data && listQuery.data.length > 0 ? (
        <div className="stack admin-ad-request-list">
          {listQuery.data.map((row) => (
            <AdminAdRequestRowEditor key={row.id} row={row} onUpdated={invalidate} t={t} toast={toast} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
