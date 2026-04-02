import { describe, expect, it } from "vitest";
import { DEFAULT_DESCRIPTION, getRouteAnnouncement, getSeoForPath, SITE_NAME } from "./seo.ts";

describe("getSeoForPath", () => {
  it("home is indexable (en)", () => {
    const p = getSeoForPath("/", "en");
    expect(p.title).toBe("Home");
    expect(p.description).toBe(DEFAULT_DESCRIPTION);
    expect(p.robots).toBe("index,follow");
  });

  it("home title is localized (ru)", () => {
    expect(getSeoForPath("/", "ru").title).toBe("Главная");
  });

  it("login and profile are noindex", () => {
    expect(getSeoForPath("/login", "en").robots).toBe("noindex,nofollow");
    expect(getSeoForPath("/profile", "en").robots).toBe("noindex,nofollow");
  });

  it("admin prefix is noindex", () => {
    expect(getSeoForPath("/admin", "en").robots).toBe("noindex,nofollow");
    expect(getSeoForPath("/admin/moderation", "en").robots).toBe("noindex,nofollow");
  });

  it("search and legal are indexable", () => {
    expect(getSeoForPath("/search", "en").robots).toBe("index,follow");
    expect(getSeoForPath("/legal", "en").robots).toBe("index,follow");
  });

  it("unknown path falls back to site default", () => {
    const p = getSeoForPath("/does-not-exist", "en");
    expect(p.title).toBe(SITE_NAME);
    expect(p.robots).toBe("index,follow");
  });
});

describe("getRouteAnnouncement", () => {
  it("uses page title from getSeoForPath (en)", () => {
    expect(getRouteAnnouncement("/", "en")).toBe("Navigated to Home");
    expect(getRouteAnnouncement("/login", "en")).toBe("Navigated to Log in");
    expect(getRouteAnnouncement("/admin/stats", "en")).toBe("Navigated to Admin");
  });

  it("matches unknown path fallback title (en)", () => {
    expect(getRouteAnnouncement("/weird-path", "en")).toBe(`Navigated to ${SITE_NAME}`);
  });

  it("is localized (ru)", () => {
    expect(getRouteAnnouncement("/", "ru")).toBe("Переход: Главная");
  });
});
