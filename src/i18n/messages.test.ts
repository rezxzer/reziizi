import { describe, expect, it } from "vitest";
import { messages } from "./messages.ts";
import type { Locale } from "./locale.ts";

type AnyObj = Record<string, unknown>;

function collectPaths(node: unknown, prefix: string, out: Set<string>): void {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    out.add(prefix);
    return;
  }
  for (const [k, v] of Object.entries(node as AnyObj)) {
    const next: string = prefix.length > 0 ? `${prefix}.${k}` : k;
    collectPaths(v, next, out);
  }
}

describe("i18n messages", () => {
  const enPaths = new Set<string>();
  collectPaths(messages.en, "", enPaths);

  const locales: readonly Locale[] = ["ka", "ru"];

  for (const loc of locales) {
    it(`locale ${loc} has every leaf key present in en`, () => {
      const localePaths = new Set<string>();
      collectPaths(messages[loc], "", localePaths);
      const missing: string[] = [];
      for (const p of enPaths) {
        if (!localePaths.has(p)) {
          missing.push(p);
        }
      }
      const extra: string[] = [];
      for (const p of localePaths) {
        if (!enPaths.has(p)) {
          extra.push(p);
        }
      }
      expect({ missing, extra }).toEqual({ missing: [], extra: [] });
    });

    it(`locale ${loc} has no empty string values`, () => {
      const empties: string[] = [];
      function walk(node: unknown, prefix: string): void {
        if (typeof node === "string") {
          if (node.length === 0) {
            empties.push(prefix);
          }
          return;
        }
        if (node === null || typeof node !== "object" || Array.isArray(node)) {
          return;
        }
        for (const [k, v] of Object.entries(node as AnyObj)) {
          walk(v, prefix.length > 0 ? `${prefix}.${k}` : k);
        }
      }
      walk(messages[loc], "");
      expect(empties).toEqual([]);
    });
  }
});
