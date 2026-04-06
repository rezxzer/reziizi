import { TABLE } from "./api/registry";
import { supabase } from "./supabaseClient";

/**
 * Keys seeded in migrations:
 * `20260401351500…`, `20260401351600…`, `20260401351700_add_feature_flag_home_premium_cta.sql`.
 * New flags: INSERT in a migration + map labels in `AdminFeatureFlagsPage` + wire UI.
 */
export const FEATURE_FLAG_KEYS = {
  feedTrendingTab: "feed_trending_tab",
  feedAds: "feed_ads",
  postComments: "post_comments",
  navSearch: "nav_search",
  navMessages: "nav_messages",
  /** Home feed: Premium promo card (Settings / Sign in). */
  homePremiumCta: "home_premium_cta",
} as const;

export type FeatureFlagKey = (typeof FEATURE_FLAG_KEYS)[keyof typeof FEATURE_FLAG_KEYS];

export type FeatureFlagsMap = Record<string, boolean>;

export type FeatureFlagRow = {
  key: string;
  enabled: boolean;
  description: string;
};

/** Fetch all flags; missing keys default to enabled in callers. */
export async function fetchFeatureFlags(): Promise<FeatureFlagsMap> {
  const { data, error } = await supabase.from(TABLE.feature_flags).select("key, enabled");

  if (error) {
    throw error;
  }

  const out: FeatureFlagsMap = {};
  for (const row of data ?? []) {
    const k = row.key as string;
    out[k] = Boolean(row.enabled);
  }
  return out;
}

/** Admin: full rows (same table, RLS allows admin). */
export async function fetchFeatureFlagRows(): Promise<FeatureFlagRow[]> {
  const { data, error } = await supabase
    .from(TABLE.feature_flags)
    .select("key, enabled, description")
    .order("key", { ascending: true });

  if (error) {
    throw error;
  }
  return (data ?? []) as FeatureFlagRow[];
}

export async function setFeatureFlagEnabled(key: string, enabled: boolean): Promise<void> {
  const { error } = await supabase.from(TABLE.feature_flags).update({ enabled }).eq("key", key);

  if (error) {
    throw error;
  }
}

export function isFeatureEnabled(map: FeatureFlagsMap | undefined, key: string): boolean {
  if (!map || !(key in map)) {
    return true;
  }
  return map[key] !== false;
}
