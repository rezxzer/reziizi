-- REZIIZI: Anti-spam (49) expansion — re-run duplicate + link heuristics when post/comment body is edited.
-- INSERT-only heuristics left a gap (clean post → edit to spam). See project.md → Anti-spam (49).

create or replace function public.prevent_user_editing_spam_columns_posts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  adm boolean;
  dup_exists boolean;
  link_c int;
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

  if new.body is distinct from old.body then
    new.is_flagged := false;
    new.spam_score := 0;

    select exists (
      select 1
      from public.posts
      where user_id = new.user_id
        and id <> new.id
        and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
        and created_at > now() - interval '5 minutes'
    ) into dup_exists;

    if dup_exists then
      new.is_flagged := true;
      new.spam_score := new.spam_score + 10;
    end if;

    link_c := public.count_url_indicators(new.body);
    if link_c > 2 then
      new.is_flagged := true;
      new.spam_score := new.spam_score + 5;
    end if;
  end if;

  if new.is_flagged is distinct from old.is_flagged or new.spam_score is distinct from old.spam_score then
    if new.body is not distinct from old.body then
      new.is_flagged := old.is_flagged;
      new.spam_score := old.spam_score;
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.prevent_user_editing_spam_columns_comments()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  adm boolean;
  dup_exists boolean;
  link_c int;
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

  if new.body is distinct from old.body then
    new.is_flagged := false;
    new.spam_score := 0;

    select exists (
      select 1
      from public.comments
      where user_id = new.user_id
        and id <> new.id
        and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
        and created_at > now() - interval '5 minutes'
    ) into dup_exists;

    if dup_exists then
      new.is_flagged := true;
      new.spam_score := new.spam_score + 10;
    end if;

    link_c := public.count_url_indicators(new.body);
    if link_c > 1 then
      new.is_flagged := true;
      new.spam_score := new.spam_score + 5;
    end if;
  end if;

  if new.is_flagged is distinct from old.is_flagged or new.spam_score is distinct from old.spam_score then
    if new.body is not distinct from old.body then
      new.is_flagged := old.is_flagged;
      new.spam_score := old.spam_score;
    end if;
  end if;

  return new;
end;
$$;

comment on function public.prevent_user_editing_spam_columns_posts() is
  'Non-admins cannot set spam columns directly; on body change, re-apply duplicate/link heuristics (same as INSERT). Honors reziizi.skip_spam_guard.';

comment on function public.prevent_user_editing_spam_columns_comments() is
  'Non-admins cannot set spam columns directly; on body change, re-apply duplicate/link heuristics (same as INSERT). Honors reziizi.skip_spam_guard.';

-- Audit row when a post becomes flagged via UPDATE (INSERT path unchanged).

create or replace function public.abuse_flags_after_post_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(current_setting('reziizi.skip_spam_guard', true), '') = '1' then
    return new;
  end if;
  if new.is_flagged and not coalesce(old.is_flagged, false) then
    insert into public.abuse_flags (post_id, reason) values (new.id, 'auto');
  end if;
  return new;
end;
$$;

drop trigger if exists posts_abuse_flags_after_update on public.posts;
create trigger posts_abuse_flags_after_update
  after update on public.posts
  for each row execute procedure public.abuse_flags_after_post_update();

create or replace function public.abuse_flags_after_comment_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(current_setting('reziizi.skip_spam_guard', true), '') = '1' then
    return new;
  end if;
  if new.is_flagged and not coalesce(old.is_flagged, false) then
    insert into public.abuse_flags (comment_id, reason) values (new.id, 'auto');
  end if;
  return new;
end;
$$;

drop trigger if exists comments_abuse_flags_after_update on public.comments;
create trigger comments_abuse_flags_after_update
  after update on public.comments
  for each row execute procedure public.abuse_flags_after_comment_update();
