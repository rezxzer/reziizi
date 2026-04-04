import { supabase } from "./supabaseClient";

export type NotificationPreferences = {
  notifyOnComment: boolean;
  notifyOnReaction: boolean;
  notifyOnFollow: boolean;
};

export async function fetchNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  const { data, error } = await supabase
    .from("profiles")
    .select("notify_on_comment, notify_on_reaction, notify_on_follow")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const row = data as {
    notify_on_comment?: boolean | null;
    notify_on_reaction?: boolean | null;
    notify_on_follow?: boolean | null;
  } | null;

  return {
    notifyOnComment: row?.notify_on_comment ?? true,
    notifyOnReaction: row?.notify_on_reaction ?? true,
    notifyOnFollow: row?.notify_on_follow ?? true,
  };
}

export async function setNotificationPreferences(
  userId: string,
  prefs: NotificationPreferences,
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({
      notify_on_comment: prefs.notifyOnComment,
      notify_on_reaction: prefs.notifyOnReaction,
      notify_on_follow: prefs.notifyOnFollow,
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}
