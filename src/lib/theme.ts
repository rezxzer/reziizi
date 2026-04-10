export const THEME_STORAGE_KEY = "metafeed-theme";

export type ThemePreference = "light" | "dark" | "system";

export function parseStoredPreference(raw: string | null): ThemePreference {
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }
  return "system";
}

export function getStoredThemePreference(): ThemePreference {
  try {
    return parseStoredPreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

export function effectiveThemeFromPreference(pref: ThemePreference): "light" | "dark" {
  if (pref === "light") {
    return "light";
  }
  if (pref === "dark") {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyThemeToDocument(effective: "light" | "dark"): void {
  document.documentElement.setAttribute("data-theme", effective);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", effective === "dark" ? "#0f1115" : "#f8f9fc");
  }
}
