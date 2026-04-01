import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { fetchUnreadNotificationCount, NOTIFICATIONS_CHANGED_EVENT } from "../lib/notifications.ts";

const POLL_MS = 30_000;

export function useUnreadNotificationCount(): number {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const refresh = useCallback(async (): Promise<void> => {
    if (!user) {
      setCount(0);
      return;
    }
    try {
      const n = await fetchUnreadNotificationCount();
      setCount(n);
    } catch {
      setCount(0);
    }
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const id = window.setInterval(() => void refresh(), POLL_MS);
    return () => window.clearInterval(id);
  }, [user, refresh]);

  useEffect(() => {
    function onFocus(): void {
      void refresh();
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refresh]);

  useEffect(() => {
    function onChanged(): void {
      void refresh();
    }
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, onChanged);
  }, [refresh]);

  return count;
}
