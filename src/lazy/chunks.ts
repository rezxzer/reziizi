/**
 * Lazy route chunks — smaller initial bundle; loads on navigation.
 * Named exports from pages are wrapped as default for React.lazy.
 */
import { lazy } from "react";

export const AdminPage = lazy(async () => {
  const m = await import("../pages/AdminPage.tsx");
  return { default: m.AdminPage };
});

export const AdminModerationPage = lazy(async () => {
  const m = await import("../pages/AdminModerationPage.tsx");
  return { default: m.AdminModerationPage };
});

export const AdminReportsPage = lazy(async () => {
  const m = await import("../pages/AdminReportsPage.tsx");
  return { default: m.AdminReportsPage };
});

export const AdminUsersPage = lazy(async () => {
  const m = await import("../pages/AdminUsersPage.tsx");
  return { default: m.AdminUsersPage };
});

export const AdminStatsPage = lazy(async () => {
  const m = await import("../pages/AdminStatsPage.tsx");
  return { default: m.AdminStatsPage };
});

export const AdminAdsPage = lazy(async () => {
  const m = await import("../pages/AdminAdsPage.tsx");
  return { default: m.AdminAdsPage };
});

export const AdminApiPage = lazy(async () => {
  const m = await import("../pages/AdminApiPage.tsx");
  return { default: m.AdminApiPage };
});

export const MessagesPage = lazy(async () => {
  const m = await import("../pages/MessagesPage.tsx");
  return { default: m.MessagesPage };
});

export const ChatThreadPage = lazy(async () => {
  const m = await import("../pages/ChatThreadPage.tsx");
  return { default: m.ChatThreadPage };
});

export const NotificationsPage = lazy(async () => {
  const m = await import("../pages/NotificationsPage.tsx");
  return { default: m.NotificationsPage };
});

export const UserProfilePage = lazy(async () => {
  const m = await import("../pages/UserProfilePage.tsx");
  return { default: m.UserProfilePage };
});

export const UserFollowListPage = lazy(async () => {
  const m = await import("../pages/UserFollowListPage.tsx");
  return { default: m.UserFollowListPage };
});

export const NotFoundPage = lazy(async () => {
  const m = await import("../pages/NotFoundPage.tsx");
  return { default: m.NotFoundPage };
});
