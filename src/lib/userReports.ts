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

/** Row returned by the admin listing. */
export type UserReportRow = {
  id: string;
  reporter_id: string;
  reported_id: string;
  reason: string;
  created_at: string;
  reporterEmail: string | null;
  reportedEmail: string | null;
};

/**
 * Fetch all user reports for admin review (newest first, limit 200).
 * Enriches with reporter and reported email from profiles.
 */
export async function fetchUserReportsForAdmin(): Promise<UserReportRow[]> {
  const { data, error } = await supabase
    .from("user_reports")
    .select("id, reporter_id, reported_id, reason, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as { id: string; reporter_id: string; reported_id: string; reason: string; created_at: string }[];
  if (rows.length === 0) {
    return [];
  }

  const allIds = [...new Set(rows.flatMap((r) => [r.reporter_id, r.reported_id]))];
  const { data: profs, error: profError } = await supabase.from("profiles").select("id, email").in("id", allIds);
  if (profError) {
    throw profError;
  }

  const emailById = new Map<string, string | null>();
  for (const p of profs ?? []) {
    const row = p as { id: string; email: string | null };
    emailById.set(row.id, row.email);
  }

  return rows.map((r) => ({
    ...r,
    reporterEmail: emailById.get(r.reporter_id) ?? null,
    reportedEmail: emailById.get(r.reported_id) ?? null,
  }));
}

/**
 * Delete a user report (admin only).
 */
export async function deleteUserReportAsAdmin(reportId: string): Promise<void> {
  const { error } = await supabase.from("user_reports").delete().eq("id", reportId);
  if (error) {
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
