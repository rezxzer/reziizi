-- REZIIZI: notifications for new followers (extends notifications.type + nullable post_id)
-- Requires: notifications, follows

-- Drop existing CHECK constraints on notifications (historically: single type check)
do $$
declare
  r record;
begin
  for r in (
    select c.conname
    from pg_constraint c
    join pg_class t on c.conrelid = t.oid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'notifications'
      and c.contype = 'c'
  ) loop
    execute format('alter table public.notifications drop constraint %I', r.conname);
  end loop;
end $$;

alter table public.notifications alter column post_id drop not null;

alter table public.notifications
  add constraint notifications_type_check
  check (type in ('comment', 'reaction', 'follow'));

alter table public.notifications
  add constraint notifications_post_id_matches_type
  check (
    (type in ('comment', 'reaction') and post_id is not null)
    or (type = 'follow' and post_id is null)
  );

create or replace function public.notify_followed_user_on_follow()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.follower_id = new.following_id then
    return new;
  end if;
  insert into public.notifications (user_id, type, actor_id, post_id, comment_id)
  values (new.following_id, 'follow', new.follower_id, null, null);
  return new;
end;
$$;

drop trigger if exists on_follow_notify_followed on public.follows;
create trigger on_follow_notify_followed
  after insert on public.follows
  for each row execute procedure public.notify_followed_user_on_follow();
