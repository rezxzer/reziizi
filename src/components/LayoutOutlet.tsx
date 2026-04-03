import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { RouteErrorBoundary } from "./RouteErrorBoundary.tsx";

/** Main content: route outlet + query reset + render error recovery. */
export function LayoutOutlet(): ReactElement {
  const { t } = useI18n();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <RouteErrorBoundary
          onReset={reset}
          title={t("errors.routeTitle")}
          body={t("errors.routeBody")}
          retryLabel={t("errors.tryAgain")}
          homeLink={t("errors.homeLink")}
        >
          <Outlet />
        </RouteErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
