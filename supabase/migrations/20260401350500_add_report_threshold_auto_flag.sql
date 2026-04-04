-- REZIIZI: Moderation automation — auto-flag post when distinct report count reaches threshold.
-- reports: unique (reporter_id, post_id) => count(*) per post_id = number of reporters.

create or replace function public.prevent_user_editing_spam_columns_posts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  adm boolean;
begin
  if coalesce(current_setting('reziizi.skip_spam_guard', true), '') = '1' then
    return new;
  end if;

  select coalesce(p.is_admin, false) into adm
  from public.profiles p
  where p.id = auth.uid();

  if adm then
    return new;
  end if;

  if new.is_flagged is distinct from old.is_flagged or new.spam_score is distinct from old.spam_score then
    new.is_flagged := old.is_flagged;
    new.spam_score := old.spam_score;
  end if;
  return new;
end;
$$;

create or replace function public.reports_after_insert_auto_flag_post()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  report_count int;
  already_flagged boolean;
  threshold int := 3;
begin
  select count(*)::int into report_count from public.reports where post_id = new.post_id;

  if report_count < threshold then
    return new;
  end if;

  select coalesce(p.is_flagged, false) into already_flagged
  from public.posts p
  where p.id = new.post_id;

  if not found then
    return new;
  end if;

  perform set_config('reziizi.skip_spam_guard', '1', true);

  update public.posts
  set is_flagged = true,
      spam_score = greatest(spam_score, 5)
  where id = new.post_id;

  if not already_flagged then
    insert into public.abuse_flags (post_id, reason) values (new.post_id, 'report_threshold');
  end if;

  return new;
end;
$$;

comment on function public.reports_after_insert_auto_flag_post() is
  'After each report insert: if total reports for that post_id >= 3, set is_flagged + spam_score (uses reziizi.skip_spam_guard for UPDATE trigger); audit abuse_flags reason report_threshold.';

drop trigger if exists reports_after_insert_auto_flag on public.reports;
create trigger reports_after_insert_auto_flag
  after insert on public.reports
  for each row execute procedure public.reports_after_insert_auto_flag_post();
