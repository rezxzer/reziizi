-- REZIIZI: Notifications v2 — per-type opt-out on profiles; triggers respect flags (default true).

alter table public.profiles
  add column if not exists notify_on_comment boolean not null default true,
  add column if not exists notify_on_reaction boolean not null default true,
  add column if not exists notify_on_follow boolean not null default true;

comment on column public.profiles.notify_on_comment is 'When false, no in-app notifications for comments on your posts.';
comment on column public.profiles.notify_on_reaction is 'When false, no in-app notifications for reactions on your posts.';
comment on column public.profiles.notify_on_follow is 'When false, no in-app notifications for new followers.';

-- --- Triggers: skip insert when recipient opted out ---

create or replace function public.notify_post_owner_on_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
  want boolean;
begin
  select p.user_id into owner_id from public.posts p where p.id = new.post_id;
  if owner_id is null then
    return new;
  end if;
  if owner_id = new.user_id then
    return new;
  end if;
  select coalesce(pr.notify_on_comment, true) into want
  from public.profiles pr
  where pr.id = owner_id;
  if want is false then
    return new;
  end if;
  insert into public.notifications (user_id, type, actor_id, post_id, comment_id)
  values (owner_id, 'comment', new.user_id, new.post_id, new.id);
  return new;
end;
$$;

create or replace function public.notify_post_owner_on_reaction()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
  want boolean;
begin
  select p.user_id into owner_id from public.posts p where p.id = new.post_id;
  if owner_id is null then
    return new;
  end if;
  if owner_id = new.user_id then
    return new;
  end if;
  select coalesce(pr.notify_on_reaction, true) into want
  from public.profiles pr
  where pr.id = owner_id;
  if want is false then
    return new;
  end if;
  insert into public.notifications (user_id, type, actor_id, post_id, comment_id)
  values (owner_id, 'reaction', new.user_id, new.post_id, null);
  return new;
end;
$$;

create or replace function public.notify_followed_user_on_follow()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  want boolean;
begin
  if new.follower_id = new.following_id then
    return new;
  end if;
  select coalesce(pr.notify_on_follow, true) into want
  from public.profiles pr
  where pr.id = new.following_id;
  if want is false then
    return new;
  end if;
  insert into public.notifications (user_id, type, actor_id, post_id, comment_id)
  values (new.following_id, 'follow', new.follower_id, null, null);
  return new;
end;
$$;
