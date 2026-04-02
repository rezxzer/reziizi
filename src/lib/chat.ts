import type { ChatMessageRow, ConversationRow, ProfileRow } from "../types/db";
import { supabase } from "./supabaseClient";

const MESSAGE_PAGE_SIZE = 200;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidUuid(raw: string): boolean {
  return UUID_RE.test(raw);
}

export type ConversationWithPeer = ConversationRow & {
  other_user_id: string;
  peer_email: string | null;
};

export async function getOrCreateConversation(otherUserId: string): Promise<string> {
  const { data, error } = await supabase.rpc("get_or_create_conversation", {
    p_other_user_id: otherUserId,
  });
  if (error) {
    throw error;
  }
  if (typeof data !== "string" || data.length === 0) {
    throw new Error("Invalid conversation id from server");
  }
  return data;
}

function otherParticipant(row: ConversationRow, me: string): string {
  return row.user_a === me ? row.user_b : row.user_a;
}

export async function fetchMyConversations(me: string): Promise<ConversationWithPeer[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, user_a, user_b, last_message_at, created_at")
    .or(`user_a.eq.${me},user_b.eq.${me}`)
    .order("last_message_at", { ascending: false });

  if (error) {
    throw error;
  }

  const rows: ConversationRow[] = (data ?? []) as ConversationRow[];
  if (rows.length === 0) {
    return [];
  }

  const peerIds: string[] = rows.map((r) => otherParticipant(r, me));
  const { data: profs, error: profError } = await supabase
    .from("profiles")
    .select(
      "id, email, avatar_url, created_at, is_admin, is_banned, ban_reason, banned_at, premium_until, searchable",
    )
    .in("id", peerIds);

  if (profError) {
    throw profError;
  }

  const emailById = new Map<string, string | null>();
  for (const p of (profs ?? []) as ProfileRow[]) {
    emailById.set(p.id, p.email);
  }

  return rows.map((r) => ({
    ...r,
    other_user_id: otherParticipant(r, me),
    peer_email: emailById.get(otherParticipant(r, me)) ?? null,
  }));
}

export async function fetchMessages(conversationId: string): Promise<ChatMessageRow[]> {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, conversation_id, sender_id, body, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(MESSAGE_PAGE_SIZE);

  if (error) {
    throw error;
  }
  return (data ?? []) as ChatMessageRow[];
}

export async function sendMessage(conversationId: string, body: string): Promise<ChatMessageRow | null> {
  const trimmed: string = body.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const uid: string | undefined = userData.user?.id;
  if (!uid) {
    throw new Error("Not signed in");
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      conversation_id: conversationId,
      sender_id: uid,
      body: trimmed,
    })
    .select("id, conversation_id, sender_id, body, created_at")
    .single();

  if (error) {
    throw error;
  }
  return data as ChatMessageRow;
}

export function subscribeToNewMessages(
  conversationId: string,
  onInsert: (row: ChatMessageRow) => void,
): () => void {
  const channel = supabase
    .channel(`chat:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const row = payload.new as ChatMessageRow;
        onInsert(row);
      },
    )
    .subscribe();

  return (): void => {
    void supabase.removeChannel(channel);
  };
}
