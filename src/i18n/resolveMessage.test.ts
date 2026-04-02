import { describe, expect, it } from "vitest";
import { interpolate, resolveMessage } from "./resolveMessage.ts";

describe("resolveMessage", () => {
  it("returns English layout string", () => {
    expect(resolveMessage("en", "layout.nav.home")).toBe("Home");
  });

  it("returns Georgian when locale is ka", () => {
    expect(resolveMessage("ka", "layout.nav.home")).toBe("მთავარი");
  });

  it("returns Russian when locale is ru", () => {
    expect(resolveMessage("ru", "layout.nav.home")).toBe("Главная");
  });

  it("returns undefined for unknown path", () => {
    expect(resolveMessage("en", "does.not.exist")).toBeUndefined();
  });
});

describe("interpolate", () => {
  it("replaces placeholders", () => {
    expect(interpolate("{count} unread", { count: 3 })).toBe("3 unread");
  });

  it("leaves unknown keys", () => {
    expect(interpolate("x {a}", {})).toBe("x {a}");
  });
});
