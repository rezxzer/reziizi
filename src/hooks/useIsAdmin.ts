import { useProfileFlags } from "./useProfileFlags.ts";

export function useIsAdmin(): { isAdmin: boolean; loading: boolean } {
  const { isAdmin, loading } = useProfileFlags();
  return { isAdmin, loading };
}
