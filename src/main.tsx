import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { I18nProvider, useI18n } from "./contexts/I18nContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { queryClient } from "./lib/queryClient.ts";
import "./styles.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

function AppErrorBoundary({ children }: { children: ReactNode }): ReactNode {
  const { t } = useI18n();
  return (
    <ErrorBoundary
      title={t("errors.routeTitle")}
      body={t("errors.appBoundaryBody")}
      reloadLabel={t("errors.reload")}
      homeLinkLabel={t("errors.homeLink")}
    >
      {children}
    </ErrorBoundary>
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <I18nProvider>
          <ToastProvider>
            <ThemeProvider>
              <AuthProvider>
                <AppErrorBoundary>
                  <App />
                </AppErrorBoundary>
              </AuthProvider>
            </ThemeProvider>
          </ToastProvider>
        </I18nProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
