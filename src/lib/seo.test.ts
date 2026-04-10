import { describe, expect, it } from "vitest";
import { DEFAULT_DESCRIPTION, getRouteAnnouncement, getSeoForPath } from "./seo.ts";

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

  it("search, legal, and sponsored are indexable", () => {
    expect(getSeoForPath("/search", "en").robots).toBe("index,follow");
    expect(getSeoForPath("/legal", "en").robots).toBe("index,follow");
    expect(getSeoForPath("/sponsored", "en").robots).toBe("index,follow");
  });

  it("search with valid q uses dynamic title and description (en)", () => {
    const p = getSeoForPath("/search", "en", "?q=hello");
    expect(p.title).toBe("Search: hello");
    expect(p.description).toContain("hello");
    expect(p.robots).toBe("index,follow");
  });

  it("search with short q falls back to default search page", () => {
    const p = getSeoForPath("/search", "en", "?q=a");
    expect(p.title).toBe("Search");
  });

  it("public member profile is indexable", () => {
    const p = getSeoForPath("/u/550e8400-e29b-41d4-a716-446655440000", "en");
    expect(p.title).toBe("Member profile");
    expect(p.robots).toBe("index,follow");
  });

  it("public member followers and following lists are indexable", () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    const f = getSeoForPath(`/u/${id}/followers`, "en");
    expect(f.title).toBe("Followers");
    expect(f.robots).toBe("index,follow");
    const g = getSeoForPath(`/u/${id}/following`, "en");
    expect(g.title).toBe("Following");
    expect(g.robots).toBe("index,follow");
  });

  it("unknown path uses not-found SEO (noindex)", () => {
    const p = getSeoForPath("/does-not-exist", "en");
    expect(p.title).toBe("Page not found");
    expect(p.robots).toBe("noindex,nofollow");
  });
});

describe("getRouteAnnouncement", () => {
  it("uses page title from getSeoForPath (en)", () => {
    expect(getRouteAnnouncement("/", "en")).toBe("Navigated to Home");
    expect(getRouteAnnouncement("/login", "en")).toBe("Navigated to Log in");
    expect(getRouteAnnouncement("/admin/stats", "en")).toBe("Navigated to Admin");
  });

  it("matches unknown path not-found title (en)", () => {
    expect(getRouteAnnouncement("/weird-path", "en")).toBe("Navigated to Page not found");
  });

  it("is localized (ru)", () => {
    expect(getRouteAnnouncement("/", "ru")).toBe("Переход: Главная");
  });

  it("includes search query in title when q is valid (en)", () => {
    expect(getRouteAnnouncement("/search", "en", "?q=test")).toContain("test");
  });
});
