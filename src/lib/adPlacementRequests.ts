import { TABLE } from "./api/registry.ts";
import { supabase } from "./supabaseClient.ts";
import type { AdPlacementRequestRow, AdPlacementRequestStatus } from "../types/db.ts";

export type AdPlacementRequestWithProfile = AdPlacementRequestRow & {
  profiles: { display_name: string | null } | null;
};

export async function submitAdPlacementRequest(params: {
  proposed_title: string;
  proposed_body: string;
  proposed_link_url: string | null;
}): Promise<void> {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    throw new Error("Not signed in");
  }
  const title: string = params.proposed_title.trim();
  const body: string = params.proposed_body.trim();
  const link: string | null = params.proposed_link_url?.trim() || null;
  const { error } = await supabase.from(TABLE.ad_placement_requests).insert({
    user_id: user.id,
    proposed_title: title,
    proposed_body: body,
    proposed_link_url: link,
  });
  if (error) {
    throw error;
  }
}

export async function fetchMyAdPlacementRequests(userId: string): Promise<AdPlacementRequestRow[]> {
  const { data, error } = await supabase
    .from(TABLE.ad_placement_requests)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return (data ?? []) as AdPlacementRequestRow[];
}

export async function fetchAdPlacementRequestsForAdmin(): Promise<AdPlacementRequestWithProfile[]> {
  const { data, error } = await supabase
    .from(TABLE.ad_placement_requests)
    .select("*, profiles(display_name)")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return (data ?? []) as AdPlacementRequestWithProfile[];
}

export async function updateAdPlacementRequestAdmin(
  id: string,
  patch: { status: AdPlacementRequestStatus; admin_note: string | null },
): Promise<void> {
  const { error } = await supabase
    .from(TABLE.ad_placement_requests)
    .update({
      status: patch.status,
      admin_note: patch.admin_note?.trim() || null,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
}
