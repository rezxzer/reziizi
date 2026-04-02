-- REZIIZI v3: ban flag + write restrictions + admin RPC

alter table public.profiles
  add column if not exists is_banned boolean not null default false;

create or replace function public.admin_set_user_banned(p_user_id uuid, p_banned boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  if not coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false) then
    raise exception 'forbidden';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'cannot change own ban via this function';
  end if;
  update public.profiles
  set is_banned = p_banned
  where id = p_user_id;
end;
$$;

grant execute on function public.admin_set_user_banned(uuid, boolean) to authenticated;

-- Posts
drop policy if exists "posts_insert_own" on public.posts;
create policy "posts_insert_own"
  on public.posts for insert
  with check (
    auth.uid() = user_id
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );

drop policy if exists "posts_update_own" on public.posts;
create policy "posts_update_own"
  on public.posts for update
  using (
    auth.uid() = user_id
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );

-- Comments
drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own"
  on public.comments for insert
  with check (
    auth.uid() = user_id
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );

drop policy if exists "comments_update_own" on public.comments;
create policy "comments_update_own"
  on public.comments for update
  using (
    auth.uid() = user_id
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );

-- Reactions
drop policy if exists "reactions_insert_own" on public.reactions;
create policy "reactions_insert_own"
  on public.reactions for insert
  with check (
    auth.uid() = user_id
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );

drop policy if exists "reactions_update_own" on public.reactions;
create policy "reactions_update_own"
  on public.reactions for update
  using (
    auth.uid() = user_id
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );

-- Chat messages
drop policy if exists "chat_messages_insert_sender" on public.chat_messages;
create policy "chat_messages_insert_sender"
  on public.chat_messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1
      from public.conversations c
      where c.id = chat_messages.conversation_id
        and (auth.uid() = c.user_a or auth.uid() = c.user_b)
    )
    and not coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
  );
