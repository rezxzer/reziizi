import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { applyPageSeo } from "../lib/seo.ts";

/** Client-side SEO: title, meta, Open Graph, canonical — per route (see `getSeoForPath`). */
export function RouteSeo(): null {
  const { pathname, search } = useLocation();
  const { locale } = useI18n();

  useEffect(() => {
    applyPageSeo(pathname, locale, search);
  }, [pathname, search, locale]);

  return null;
}
