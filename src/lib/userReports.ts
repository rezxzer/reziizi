import { supabase } from "./supabaseClient.ts";

const REASON_MAX = 2000;

export function validateUserReportReason(raw: string): string | null {
  const t = raw.trim();
  if (t.length < 1) {
    return "Enter a reason.";
  }
  if (t.length > REASON_MAX) {
    return `Reason must be at most ${REASON_MAX} characters.`;
  }
  return null;
}

/**
 * Submit a report against another user.
 */
export async function submitUserReport(reportedId: string, reason: string): Promise<void> {
  const err = validateUserReportReason(reason);
  if (err) {
    throw new Error(err);
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid = userData.user?.id;
  if (!uid) {
    throw new Error("Sign in to report.");
  }
  if (uid === reportedId) {
    throw new Error("Cannot report yourself.");
  }

  const { error } = await supabase.from("user_reports").insert({
    reporter_id: uid,
    reported_id: reportedId,
    reason: reason.trim(),
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("You already reported this user.");
    }
    throw error;
  }
}

/**
 * Check if the viewer has already reported this user.
 */
export async function fetchHasReportedUser(viewerId: string, targetId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_reports")
    .select("id")
    .eq("reporter_id", viewerId)
    .eq("reported_id", targetId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data != null;
}
