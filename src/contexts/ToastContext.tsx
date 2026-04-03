import type { ReactElement, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useI18n } from "./I18nContext.tsx";

export type ToastVariant = "error" | "success" | "info";

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

export type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void;
  error: (message: string) => void;
  success: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_MS = 5000;

function ToastRegion({
  toasts,
  onDismiss,
}: {
  toasts: readonly ToastItem[];
  onDismiss: (id: string) => void;
}): ReactElement {
  const { t } = useI18n();
  if (toasts.length === 0) {
    return <></>;
  }
  return (
    <div
      className="toast-region"
      role="region"
      aria-label={t("layout.toastRegionAria")}
      aria-live="polite"
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          className={`toast toast--${item.variant}`}
          role={item.variant === "error" ? "alert" : "status"}
        >
          <span className="toast__msg">{item.message}</span>
          <button
            type="button"
            className="toast__dismiss"
            onClick={() => onDismiss(item.id)}
            aria-label={t("layout.toastDismiss")}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }): ReactElement {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = "info"): void => {
      const id: string =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => remove(id), TOAST_MS);
    },
    [remove],
  );

  const error = useCallback((message: string): void => show(message, "error"), [show]);
  const success = useCallback((message: string): void => show(message, "success"), [show]);

  const value: ToastContextValue = useMemo(
    () => ({ show, error, success }),
    [show, error, success],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastRegion toasts={toasts} onDismiss={remove} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (ctx === null) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
