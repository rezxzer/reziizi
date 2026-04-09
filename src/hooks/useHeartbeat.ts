import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { updateLastSeen } from "../lib/lastSeen.ts";

/** How often to send a heartbeat (ms). */
const HEARTBEAT_INTERVAL = 2 * 60 * 1000; // 2 minutes

/**
 * Periodically updates the current user's `last_seen_at` in the database.
 * Fires immediately on mount, then every 2 minutes while the user is authenticated.
 */
export function useHeartbeat(): void {
  const { user } = useAuth();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    // Fire immediately
    void updateLastSeen();

    intervalRef.current = setInterval(() => {
      void updateLastSeen();
    }, HEARTBEAT_INTERVAL);

    return () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user]);
}
