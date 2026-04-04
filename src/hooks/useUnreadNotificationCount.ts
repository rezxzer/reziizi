import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import {
  fetchUnreadNotificationCount,
  NOTIFICATIONS_BROADCAST_CHANNEL,
  NOTIFICATIONS_CHANGED_EVENT,
} from "../lib/notifications.ts";
import { queryKeys } from "../lib/queryKeys.ts";

const POLL_MS = 30_000;

export function useUnreadNotificationCount(): number {
  const { user } = useAuth();
  const queryClient = useQueryClient();
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

  useEffect(() => {
    if (!user || typeof BroadcastChannel === "undefined") {
      return;
    }
    const bc = new BroadcastChannel(NOTIFICATIONS_BROADCAST_CHANNEL);
    bc.onmessage = (): void => {
      void refresh();
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list });
    };
    return (): void => {
      bc.close();
    };
  }, [user, refresh, queryClient]);

  return count;
}
