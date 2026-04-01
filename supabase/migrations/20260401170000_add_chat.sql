-- REZIIZI v2: direct messages (1:1) — conversations + chat_messages + RLS + get_or_create RPC
-- Requires: profiles (auth.users)

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references auth.users (id) on delete cascade,
  user_b uuid not null references auth.users (id) on delete cascade,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint conversations_user_order check (user_a < user_b),
  constraint conversations_unique_pair unique (user_a, user_b)
);

create index if not exists conversations_user_a_idx on public.conversations (user_a);
create index if not exists conversations_user_b_idx on public.conversations (user_b);
create index if not exists conversations_last_msg_idx on public.conversations (last_message_at desc);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(trim(body)) >= 1 and char_length(body) <= 8000),
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_conversation_created_idx
  on public.chat_messages (conversation_id, created_at);

alter table public.conversations enable row level security;

create policy "conversations_select_participant"
  on public.conversations for select
  using (auth.uid() = user_a or auth.uid() = user_b);

-- Inserts only via get_or_create_conversation (security definer)

alter table public.chat_messages enable row level security;

create policy "chat_messages_select_participant"
  on public.chat_messages for select
  using (
    exists (
      select 1
      from public.conversations c
      where c.id = chat_messages.conversation_id
        and (auth.uid() = c.user_a or auth.uid() = c.user_b)
    )
  );

create policy "chat_messages_insert_sender"
  on public.chat_messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1
      from public.conversations c
      where c.id = conversation_id
        and (auth.uid() = c.user_a or auth.uid() = c.user_b)
    )
  );

create or replace function public.touch_conversation_on_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists chat_messages_touch_conversation on public.chat_messages;
create trigger chat_messages_touch_conversation
  after insert on public.chat_messages
  for each row execute procedure public.touch_conversation_on_message();

create or replace function public.get_or_create_conversation(p_other_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  a uuid;
  b uuid;
  cid uuid;
begin
  if me is null then
    raise exception 'not authenticated';
  end if;
  if p_other_user_id = me then
    raise exception 'invalid peer';
  end if;
  if p_other_user_id < me then
    a := p_other_user_id;
    b := me;
  else
    a := me;
    b := p_other_user_id;
  end if;

  insert into public.conversations (user_a, user_b)
  values (a, b)
  on conflict (user_a, user_b) do nothing
  returning id into cid;

  if cid is null then
    select c.id into cid
    from public.conversations c
    where c.user_a = a and c.user_b = b;
  end if;

  return cid;
end;
$$;

grant execute on function public.get_or_create_conversation(uuid) to authenticated;

-- Realtime: new DMs (client subscribes with conversation_id filter)
alter publication supabase_realtime add table public.chat_messages;
