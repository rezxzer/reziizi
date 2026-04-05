import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { getRouteAnnouncement } from "../lib/seo.ts";

/**
 * Announces the current view after SPA navigation (screen readers often skip title updates).
 */
export function RouteAnnouncer(): ReactElement {
  const { pathname, search } = useLocation();
  const { locale } = useI18n();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage("");
    const id: number = window.setTimeout(() => {
      setMessage(getRouteAnnouncement(pathname, locale, search));
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, search, locale]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}
