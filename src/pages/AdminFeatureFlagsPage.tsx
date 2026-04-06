import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import {
  FEATURE_FLAG_KEYS,
  fetchFeatureFlagRows,
  setFeatureFlagEnabled,
  type FeatureFlagRow,
} from "../lib/featureFlags";
import { errorMessage } from "../lib/errors";
import { queryKeys } from "../lib/queryKeys";

function flagTitle(t: (key: string) => string, key: string): string {
  switch (key) {
    case FEATURE_FLAG_KEYS.feedTrendingTab:
      return t("pages.admin.features.feedTrendingTab");
    case FEATURE_FLAG_KEYS.feedAds:
      return t("pages.admin.features.feedAds");
    case FEATURE_FLAG_KEYS.postComments:
      return t("pages.admin.features.postComments");
    case FEATURE_FLAG_KEYS.navSearch:
      return t("pages.admin.features.navSearch");
    case FEATURE_FLAG_KEYS.navMessages:
      return t("pages.admin.features.navMessages");
    case FEATURE_FLAG_KEYS.homePremiumCta:
      return t("pages.admin.features.homePremiumCta");
    default:
      return `${t("pages.admin.features.unknownKey")}: ${key}`;
  }
}

function flagHelp(t: (key: string) => string, key: string): string {
  switch (key) {
    case FEATURE_FLAG_KEYS.feedTrendingTab:
      return t("pages.admin.features.feedTrendingTabHelp");
    case FEATURE_FLAG_KEYS.feedAds:
      return t("pages.admin.features.feedAdsHelp");
    case FEATURE_FLAG_KEYS.postComments:
      return t("pages.admin.features.postCommentsHelp");
    case FEATURE_FLAG_KEYS.navSearch:
      return t("pages.admin.features.navSearchHelp");
    case FEATURE_FLAG_KEYS.navMessages:
      return t("pages.admin.features.navMessagesHelp");
    case FEATURE_FLAG_KEYS.homePremiumCta:
      return t("pages.admin.features.homePremiumCtaHelp");
    default:
      return "";
  }
}

export function AdminFeatureFlagsPage(): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: queryKeys.featureFlags.adminRows,
    queryFn: fetchFeatureFlagRows,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ key, enabled }: { key: string; enabled: boolean }) => {
      await setFeatureFlagEnabled(key, enabled);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.featureFlags.map });
      await queryClient.invalidateQueries({ queryKey: queryKeys.featureFlags.adminRows });
      toast.success(t("pages.admin.features.savedToast"));
    },
    onError: (e: unknown) => {
      toast.error(errorMessage(e));
    },
  });

  const onToggle = useCallback(
    (row: FeatureFlagRow, enabled: boolean): void => {
      if (saveMutation.isPending) {
        return;
      }
      saveMutation.mutate({ key: row.key, enabled });
    },
    [saveMutation],
  );

  return (
    <div className="stack admin-page">
      <section className="card">
        <h1 className="card__title">{t("pages.admin.features.title")}</h1>
        <div className="card__body">
          <p className="muted">{t("pages.admin.features.intro")}</p>
          <p>
            <Link to="/admin">{t("pages.admin.backToOverview")}</Link>
          </p>
          <p>
            <Link to="/">{t("pages.admin.backToHome")}</Link>
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">{t("pages.admin.features.listHeading")}</h2>
        <div className="card__body">
          {listQuery.isPending ? (
            <p className="page-loading" role="status">
              {t("pages.common.loading")}
            </p>
          ) : null}
          {listQuery.isError ? (
            <p className="form__error" role="alert">
              {errorMessage(listQuery.error)}
            </p>
          ) : null}
          {Array.isArray(listQuery.data) ? (
            <ul className="admin-feature-flags">
              {listQuery.data.map((row) => (
                <li key={row.key} className="admin-feature-flags__item">
                  <label className="admin-feature-flags__label">
                    <input
                      type="checkbox"
                      checked={row.enabled}
                      disabled={saveMutation.isPending}
                      onChange={(ev) => {
                        onToggle(row, ev.target.checked);
                      }}
                    />
                    <span className="admin-feature-flags__text">
                      <strong>{flagTitle(t, row.key)}</strong>
                      {row.description.trim().length > 0 ? (
                        <span className="muted admin-feature-flags__db-desc"> — {row.description}</span>
                      ) : null}
                      {flagHelp(t, row.key).length > 0 ? (
                        <span className="admin-feature-flags__help muted">{flagHelp(t, row.key)}</span>
                      ) : null}
                    </span>
                  </label>
                  <code className="admin-feature-flags__key">{row.key}</code>
                </li>
              ))}
            </ul>
          ) : null}
          {saveMutation.isPending ? (
            <p className="muted" role="status">
              {t("pages.admin.features.saving")}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
