import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { isPremiumActive } from "../lib/premium.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { supabase } from "../lib/supabaseClient.ts";

type ProfileFlagsRow = {
  is_admin: boolean;
  is_banned: boolean;
  premium_until: string | null;
};

/** Cached via TanStack Query — shared across Layout, PostForm, Settings, etc. */
export function useProfileFlags(): {
  isAdmin: boolean;
  isBanned: boolean;
  isPremium: boolean;
  premiumUntil: string | null;
  loading: boolean;
} {
  const { user, loading: authLoading } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: queryKeys.profile.flags(user?.id ?? "__none__"),
    queryFn: async (): Promise<ProfileFlagsRow> => {
      const { data: row, error } = await supabase
        .from("profiles")
        .select("is_admin, is_banned, premium_until")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) {
        throw error;
      }
      const r = row as {
        is_admin?: boolean;
        is_banned?: boolean;
        premium_until?: string | null;
      } | null;
      return {
        is_admin: Boolean(r?.is_admin),
        is_banned: Boolean(r?.is_banned),
        premium_until:
          r?.premium_until != null && String(r.premium_until).length > 0 ? String(r.premium_until) : null,
      };
    },
    enabled: Boolean(user) && !authLoading,
    staleTime: 60_000,
  });

  const isPremium: boolean = useMemo(() => isPremiumActive(data?.premium_until ?? null), [data?.premium_until]);

  const loading: boolean = authLoading || (Boolean(user) && isPending);

  return {
    isAdmin: data?.is_admin ?? false,
    isBanned: data?.is_banned ?? false,
    isPremium,
    premiumUntil: data?.premium_until ?? null,
    loading,
  };
}
