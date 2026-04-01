import type { NotificationRow } from "../types/db";
import { supabase } from "./supabaseClient";

export const NOTIFICATIONS_CHANGED_EVENT = "reziizi-notifications-changed";

export function dispatchNotificationsChanged(): void {
  window.dispatchEvent(new CustomEvent(NOTIFICATIONS_CHANGED_EVENT));
}

export type NotificationWithActor = NotificationRow & {
  actorEmail: string | null;
};

export async function fetchUnreadNotificationCount(): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);

  if (error) {
    throw error;
  }
  return count ?? 0;
}

export async function fetchNotifications(): Promise<NotificationWithActor[]> {
  const { data: rows, error } = await supabase
    .from("notifications")
    .select("id, user_id, type, actor_id, post_id, comment_id, read_at, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw error;
  }

  const list: NotificationRow[] = (rows ?? []) as NotificationRow[];
  if (list.length === 0) {
    return [];
  }

  const actorIds = [...new Set(list.map((n) => n.actor_id))];
  const { data: profiles, error: profError } = await supabase
    .from("profiles")
    .select("id, email")
    .in("id", actorIds);

  if (profError) {
    throw profError;
  }

  const emailById = new Map<string, string | null>();
  for (const p of profiles ?? []) {
    emailById.set(p.id, p.email);
  }

  return list.map((n) => ({
    ...n,
    actorEmail: emailById.get(n.actor_id) ?? null,
  }));
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId);
  if (error) {
    throw error;
  }
  dispatchNotificationsChanged();
}

export async function markAllNotificationsRead(): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .is("read_at", null);
  if (error) {
    throw error;
  }
  dispatchNotificationsChanged();
}
