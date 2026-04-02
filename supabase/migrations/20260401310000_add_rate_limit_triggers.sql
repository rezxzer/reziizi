-- REZIIZI: per-user rate limits enforced in PostgreSQL (rolling windows).
-- Applies to INSERT only; counts existing rows in the window (new row not yet visible to COUNT).
--
-- Limits (tune here if needed):
--   posts:          12 / minute
--   comments:       45 / minute
--   chat_messages:  90 / minute
--   reports:        24 / rolling 24 hours

create index if not exists posts_user_id_created_at_rate_idx
  on public.posts (user_id, created_at desc);

create index if not exists comments_user_id_created_at_rate_idx
  on public.comments (user_id, created_at desc);

create index if not exists chat_messages_sender_id_created_at_rate_idx
  on public.chat_messages (sender_id, created_at desc);

create index if not exists reports_reporter_id_created_at_rate_idx
  on public.reports (reporter_id, created_at desc);

-- --- Posts ---

create or replace function public.enforce_post_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c int;
begin
  select count(*)::int into c
  from public.posts
  where user_id = new.user_id
    and created_at > now() - interval '1 minute';
  if c >= 12 then
    raise exception 'Too many posts. Wait a minute and try again.';
  end if;
  return new;
end;
$$;

drop trigger if exists posts_rate_limit_before_insert on public.posts;
create trigger posts_rate_limit_before_insert
  before insert on public.posts
  for each row execute procedure public.enforce_post_rate_limit();

-- --- Comments ---

create or replace function public.enforce_comment_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c int;
begin
  select count(*)::int into c
  from public.comments
  where user_id = new.user_id
    and created_at > now() - interval '1 minute';
  if c >= 45 then
    raise exception 'Too many comments. Wait a minute and try again.';
  end if;
  return new;
end;
$$;

drop trigger if exists comments_rate_limit_before_insert on public.comments;
create trigger comments_rate_limit_before_insert
  before insert on public.comments
  for each row execute procedure public.enforce_comment_rate_limit();

-- --- Chat messages ---

create or replace function public.enforce_chat_message_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c int;
begin
  select count(*)::int into c
  from public.chat_messages
  where sender_id = new.sender_id
    and created_at > now() - interval '1 minute';
  if c >= 90 then
    raise exception 'Too many messages. Slow down for a moment.';
  end if;
  return new;
end;
$$;

drop trigger if exists chat_messages_rate_limit_before_insert on public.chat_messages;
create trigger chat_messages_rate_limit_before_insert
  before insert on public.chat_messages
  for each row execute procedure public.enforce_chat_message_rate_limit();

-- --- Reports ---

create or replace function public.enforce_report_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c int;
begin
  select count(*)::int into c
  from public.reports
  where reporter_id = new.reporter_id
    and created_at > now() - interval '24 hours';
  if c >= 24 then
    raise exception 'Report limit reached. Try again later.';
  end if;
  return new;
end;
$$;

drop trigger if exists reports_rate_limit_before_insert on public.reports;
create trigger reports_rate_limit_before_insert
  before insert on public.reports
  for each row execute procedure public.enforce_report_rate_limit();
