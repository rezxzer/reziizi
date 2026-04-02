import type { ReportRow } from "../types/db";
import { supabase } from "./supabaseClient";

const REASON_MAX = 2000;

export function validateReportReason(raw: string): string | null {
  const t: string = raw.trim();
  if (t.length < 1) {
    return "Enter a reason.";
  }
  if (t.length > REASON_MAX) {
    return `Reason must be at most ${REASON_MAX} characters.`;
  }
  return null;
}

export async function submitPostReport(postId: string, reason: string): Promise<void> {
  const err = validateReportReason(reason);
  if (err) {
    throw new Error(err);
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid: string | undefined = userData.user?.id;
  if (!uid) {
    throw new Error("Sign in to report.");
  }

  const { error } = await supabase.from("reports").insert({
    reporter_id: uid,
    post_id: postId,
    reason: reason.trim(),
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("You already reported this post.");
    }
    throw error;
  }
}

export type ReportWithReporterEmail = ReportRow & {
  reporterEmail: string | null;
};

export async function fetchReportsForAdmin(): Promise<ReportWithReporterEmail[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("id, reporter_id, post_id, reason, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    throw error;
  }

  const rows: ReportRow[] = (data ?? []) as ReportRow[];
  if (rows.length === 0) {
    return [];
  }

  const ids: string[] = [...new Set(rows.map((r) => r.reporter_id))];
  const { data: profs, error: profError } = await supabase.from("profiles").select("id, email").in("id", ids);

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
  }));
}

export async function deleteReportAsAdmin(reportId: string): Promise<void> {
  const { error } = await supabase.from("reports").delete().eq("id", reportId);
  if (error) {
    throw error;
  }
}
