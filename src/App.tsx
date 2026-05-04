import type { ReactElement } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { RouteFallback } from "./components/RouteFallback.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { AdminRoute } from "./components/AdminRoute.tsx";
import {
  AdminAdsPage,
  AdminAdPlacementRequestsPage,
  AdminBlocksPage,
  AdminFeatureFlagsPage,
  AdminApiPage,
  AdminModerationPage,
  AdminPage,
  AdminReportsPage,
  AdminStatsPage,
  AdminUserReportsPage,
  AdminUsersPage,
  BannedPage,
  ChatThreadPage,
  ForgotPasswordPage,
  LegalPage,
  MessagesPage,
  NotificationsPage,
  ReelsPage,
  ResetPasswordPage,
  SecurityPage,
  SponsoredPage,
  UserFollowListPage,
  UserProfilePage,
  NotFoundPage,
} from "./lazy/chunks.ts";

export default function App(): ReactElement {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/u/:userId/followers" element={<UserFollowListPage />} />
          <Route path="/u/:userId/following" element={<UserFollowListPage />} />
          <Route path="/u/:userId" element={<UserProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages/:peerId"
            element={
              <ProtectedRoute>
                <ChatThreadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/sponsored" element={<SponsoredPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/banned" element={<BannedPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/moderation"
            element={
              <AdminRoute>
                <AdminModerationPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminRoute>
                <AdminReportsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <AdminRoute>
                <AdminStatsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/ads"
            element={
              <AdminRoute>
                <AdminAdsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/ad-requests"
            element={
              <AdminRoute>
                <AdminAdPlacementRequestsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/features"
            element={
              <AdminRoute>
                <AdminFeatureFlagsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/user-reports"
            element={
              <AdminRoute>
                <AdminUserReportsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/blocks"
            element={
              <AdminRoute>
                <AdminBlocksPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/api"
            element={
              <AdminRoute>
                <AdminApiPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
