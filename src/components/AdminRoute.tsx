import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";

type AdminRouteProps = {
  children: ReactElement;
};

export function AdminRoute({ children }: AdminRouteProps): ReactElement {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: flagsLoading } = useProfileFlags();
  const { t } = useI18n();

  if (authLoading || (user && flagsLoading)) {
    return (
      <div className="page-loading" role="status">
        {t("pages.common.loading")}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: "/admin" }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
