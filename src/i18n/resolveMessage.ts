import type { Locale } from "./locale.ts";
import { messages } from "./messages.ts";

function getNested(obj: unknown, parts: readonly string[]): string | undefined {
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur !== null && typeof cur === "object" && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

/** Dot path, e.g. `layout.nav.home`. */
export function resolveMessage(locale: Locale, path: string): string | undefined {
  const parts: string[] = path.split(".").filter((s) => s.length > 0);
  const fromLocale: string | undefined = getNested(messages[locale], parts);
  if (fromLocale !== undefined) {
    return fromLocale;
  }
  return getNested(messages.en, parts);
}

/** `{name}` placeholders. */
export function interpolate(template: string, params?: Readonly<Record<string, string | number>>): string {
  if (params === undefined || Object.keys(params).length === 0) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_: string, key: string) => {
    const v: string | number | undefined = params[key];
    return v !== undefined ? String(v) : `{${key}}`;
  });
}
