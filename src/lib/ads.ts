import type { AdSlotRow } from "../types/db";
import { supabase } from "./supabaseClient";

export const FEED_TOP_PLACEMENT: string = "feed_top";

/** Active slot shown above the home feed (public). */
export async function fetchActiveFeedTopAd(): Promise<AdSlotRow | null> {
  const { data, error } = await supabase
    .from("ad_slots")
    .select("id, placement, title, body, link_url, is_active, updated_at")
    .eq("placement", FEED_TOP_PLACEMENT)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const row = data as AdSlotRow;
  const hasContent: boolean =
    row.title.trim().length > 0 || row.body.trim().length > 0 || (row.link_url?.trim().length ?? 0) > 0;
  if (!hasContent) {
    return null;
  }
  return row;
}

/** Admin: load feed_top row (including inactive). */
export async function fetchFeedTopAdForAdmin(): Promise<AdSlotRow | null> {
  const { data, error } = await supabase
    .from("ad_slots")
    .select("id, placement, title, body, link_url, is_active, updated_at")
    .eq("placement", FEED_TOP_PLACEMENT)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return (data as AdSlotRow) ?? null;
}

export async function saveFeedTopAd(input: {
  title: string;
  body: string;
  link_url: string | null;
  is_active: boolean;
}): Promise<void> {
  const { error } = await supabase
    .from("ad_slots")
    .update({
      title: input.title.trim(),
      body: input.body.trim(),
      link_url: input.link_url?.trim() || null,
      is_active: input.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("placement", FEED_TOP_PLACEMENT);

  if (error) {
    throw error;
  }
}
