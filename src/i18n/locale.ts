export type Locale = "en" | "ka" | "ru";

export const LOCALE_STORAGE_KEY = "metafeed-locale";

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "ka", "ru"] as const;

export function normalizeLocale(raw: string | null | undefined): Locale {
  if (raw === "en" || raw === "ka" || raw === "ru") {
    return raw;
  }
  return "en";
}

/** Prefer saved locale; else match browser language (ka / ru), else English. */
export function detectInitialLocale(): Locale {
  try {
    const stored: string | null = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "ka" || stored === "ru") {
      return stored;
    }
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined") {
    const lang: string = navigator.language.toLowerCase();
    if (lang.startsWith("ka")) {
      return "ka";
    }
    if (lang.startsWith("ru")) {
      return "ru";
    }
  }
  return "en";
}
