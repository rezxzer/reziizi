import { useQuery } from "@tanstack/react-query";
import { fetchFeatureFlags, type FeatureFlagsMap } from "../lib/featureFlags";
import { queryKeys } from "../lib/queryKeys";

/** Shared TanStack Query for `feature_flags` — deduped across Layout, HomePage, PostCard, etc. */
export function useAppFeatureFlags() {
  return useQuery<FeatureFlagsMap>({
    queryKey: queryKeys.featureFlags.map,
    queryFn: fetchFeatureFlags,
    staleTime: 60_000,
  });
}
