import { supabase } from "./supabaseClient.ts";

export type TrendingTag = {
  tag: string;
  post_count: number;
};

/**
 * Fetch trending tags (most used in last 7 days).
 */
export async function fetchTrendingTags(limit = 10): Promise<TrendingTag[]> {
  const { data, error } = await supabase.rpc("trending_tags", { p_limit: limit });

  if (error) {
    // Silently return empty — trending sidebar is non-critical
    console.warn("[trendingTags]", error.message);
    return [];
  }

  return (data ?? []) as TrendingTag[];
}
