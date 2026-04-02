import type { ReactElement, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "../i18n/locale.ts";
import { LOCALE_STORAGE_KEY, detectInitialLocale } from "../i18n/locale.ts";
import { interpolate, resolveMessage } from "../i18n/resolveMessage.ts";

export type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (path: string, params?: Readonly<Record<string, string | number>>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }): ReactElement {
  const [locale, setLocaleState] = useState<Locale>(() => detectInitialLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const lang: Record<Locale, string> = { en: "en", ka: "ka", ru: "ru" };
    document.documentElement.lang = lang[locale];
  }, [locale]);

  const t = useCallback(
    (path: string, params?: Readonly<Record<string, string | number>>) => {
      const raw: string = resolveMessage(locale, path) ?? path;
      return interpolate(raw, params);
    },
    [locale],
  );

  const value: I18nContextValue = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx: I18nContextValue | null = useContext(I18nContext);
  if (ctx === null) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
