import { matchPath } from "react-router-dom";
import type { Bundle } from "../i18n/messages.ts";
import { messages } from "../i18n/messages.ts";
import type { Locale } from "../i18n/locale.ts";
import { interpolate, resolveMessage } from "../i18n/resolveMessage.ts";

export const SITE_NAME = "REZIIZI";

export const DEFAULT_DESCRIPTION: string = messages.en.seo.defaultDescription;

export type RobotsDirective = "index,follow" | "noindex,nofollow";

export type PageSeo = {
  title: string;
  description: string;
  robots: RobotsDirective;
};

type RouteKey = keyof Bundle["seo"]["routes"];

const ROUTE_DEFS: readonly { pattern: string; key: RouteKey; robots: RobotsDirective }[] = [
  { pattern: "/u/:userId/followers", key: "userFollowers", robots: "index,follow" },
  { pattern: "/u/:userId/following", key: "userFollowing", robots: "index,follow" },
  { pattern: "/u/:userId", key: "userProfile", robots: "index,follow" },
  { pattern: "/messages/:peerId", key: "chatPeer", robots: "noindex,nofollow" },
  { pattern: "/messages", key: "messages", robots: "noindex,nofollow" },
  { pattern: "/notifications", key: "notifications", robots: "noindex,nofollow" },
  { pattern: "/profile", key: "profile", robots: "noindex,nofollow" },
  { pattern: "/settings", key: "settings", robots: "noindex,nofollow" },
  { pattern: "/login", key: "login", robots: "noindex,nofollow" },
  { pattern: "/banned", key: "banned", robots: "noindex,nofollow" },
  { pattern: "/search", key: "search", robots: "index,follow" },
  { pattern: "/legal", key: "legal", robots: "index,follow" },
  { pattern: "/security", key: "security", robots: "index,follow" },
  { pattern: "/", key: "home", robots: "index,follow" },
];

function pageFromRouteKey(locale: Locale, key: RouteKey, robots: RobotsDirective): PageSeo {
  const title: string =
    resolveMessage(locale, `seo.routes.${key}.title`) ?? resolveMessage("en", `seo.routes.${key}.title`) ?? "";
  const description: string =
    resolveMessage(locale, `seo.routes.${key}.description`) ??
    resolveMessage("en", `seo.routes.${key}.description`) ??
    "";
  return { title, description, robots };
}

function adminSeo(locale: Locale): PageSeo {
  const title: string =
    resolveMessage(locale, "seo.admin.title") ?? resolveMessage("en", "seo.admin.title") ?? "Admin";
  const description: string =
    resolveMessage(locale, "seo.admin.description") ??
    resolveMessage("en", "seo.admin.description") ??
    "";
  return {
    title,
    description,
    robots: "noindex,nofollow",
  };
}

/** Resolve SEO for the current pathname (first matching route wins; admin prefix first). */
export function getSeoForPath(pathname: string, locale: Locale): PageSeo {
  if (pathname.startsWith("/admin")) {
    return adminSeo(locale);
  }
  for (const entry of ROUTE_DEFS) {
    const m = matchPath({ path: entry.pattern, end: true }, pathname);
    if (m != null) {
      return pageFromRouteKey(locale, entry.key, entry.robots);
    }
  }
  return {
    title: SITE_NAME,
    description:
      resolveMessage(locale, "seo.defaultDescription") ??
      resolveMessage("en", "seo.defaultDescription") ??
      DEFAULT_DESCRIPTION,
    robots: "index,follow",
  };
}

/**
 * Phrase for screen readers when the client-side route changes (aria-live).
 * Uses `seo.announcer` from messages (`{title}` placeholder).
 */
export function getRouteAnnouncement(pathname: string, locale: Locale): string {
  const page: PageSeo = getSeoForPath(pathname, locale);
  const tmpl: string =
    resolveMessage(locale, "seo.announcer") ?? resolveMessage("en", "seo.announcer") ?? "Navigated to {title}";
  return interpolate(tmpl, { title: page.title });
}

function ensureMetaByName(name: string, content: string): void {
  let el: HTMLMetaElement | null = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function ensureMetaByProperty(property: string, content: string): void {
  let el: HTMLMetaElement | null = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function ensureCanonical(href: string): void {
  let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Updates document title, meta description, robots, Open Graph, Twitter card, and canonical URL.
 * Safe to call on every client navigation.
 */
export function applyPageSeo(pathname: string, locale: Locale): void {
  const page: PageSeo = getSeoForPath(pathname, locale);
  const fullTitle: string =
    page.title === SITE_NAME ? SITE_NAME : `${page.title} · ${SITE_NAME}`;
  document.title = fullTitle;

  ensureMetaByName("description", page.description);
  ensureMetaByName("robots", page.robots);

  ensureMetaByProperty("og:site_name", SITE_NAME);
  ensureMetaByProperty("og:type", "website");
  ensureMetaByProperty("og:title", fullTitle);
  ensureMetaByProperty("og:description", page.description);

  ensureMetaByName("twitter:card", "summary_large_image");
  ensureMetaByName("twitter:title", fullTitle);
  ensureMetaByName("twitter:description", page.description);

  const origin: string = typeof window !== "undefined" ? window.location.origin : "";
  const path: string = pathname || "/";
  const url: string = origin ? `${origin}${path === "" ? "/" : path}` : path;
  ensureMetaByProperty("og:url", url);
  ensureCanonical(url);
}
