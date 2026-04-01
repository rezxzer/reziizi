-- REZIIZI v2: notifications (comment / reaction on your posts) + RLS + triggers
-- Requires: posts, comments, reactions

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('comment', 'reaction')),
  actor_id uuid not null references auth.users (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  comment_id uuid references public.comments (id) on delete set null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx on public.notifications (user_id, created_at desc);
create index if not exists notifications_user_unread_idx on public.notifications (user_id) where read_at is null;

alter table public.notifications enable row level security;

create policy "notifications_select_own"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "notifications_update_own"
  on public.notifications for update
  using (auth.uid() = user_id);

-- Inserts only via triggers (security definer), not from clients

create or replace function public.notify_post_owner_on_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
begin
  select p.user_id into owner_id from public.posts p where p.id = new.post_id;
  if owner_id is null then
    return new;
  end if;
  if owner_id = new.user_id then
    return new;
  end if;
  insert into public.notifications (user_id, type, actor_id, post_id, comment_id)
  values (owner_id, 'comment', new.user_id, new.post_id, new.id);
  return new;
end;
$$;

drop trigger if exists on_comment_notify_owner on public.comments;
create trigger on_comment_notify_owner
  after insert on public.comments
  for each row execute procedure public.notify_post_owner_on_comment();

create or replace function public.notify_post_owner_on_reaction()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
begin
  select p.user_id into owner_id from public.posts p where p.id = new.post_id;
  if owner_id is null then
    return new;
  end if;
  if owner_id = new.user_id then
    return new;
  end if;
  insert into public.notifications (user_id, type, actor_id, post_id, comment_id)
  values (owner_id, 'reaction', new.user_id, new.post_id, null);
  return new;
end;
$$;

drop trigger if exists on_reaction_notify_owner on public.reactions;
create trigger on_reaction_notify_owner
  after insert on public.reactions
  for each row execute procedure public.notify_post_owner_on_reaction();
