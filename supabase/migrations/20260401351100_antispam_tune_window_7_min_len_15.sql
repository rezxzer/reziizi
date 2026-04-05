-- REZIIZI: Anti-spam (49) — Phase A tune: duplicate window 7 min, min normalized body length 15 for duplicate heuristic.
-- Product decision: project.md → Anti-spam (49) → „პროდუქტის გადაწყვეტილება“.

create or replace function public.spam_duplicate_eligible(p text)
returns boolean
language sql
immutable
as $$
  select length(public.normalize_body_for_spam(p)) >= 15;
$$;

comment on function public.spam_duplicate_eligible(text) is
  'Duplicate-within-window anti-spam applies only when normalized body length >= 15 (reduces false positives on very short posts).';

create or replace function public.posts_antispam_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  dup_exists boolean;
  link_c int;
begin
  dup_exists := false;
  if public.spam_duplicate_eligible(new.body) then
    select exists (
      select 1
      from public.posts
      where user_id = new.user_id
        and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
        and created_at > now() - interval '7 minutes'
    ) into dup_exists;
  end if;

  if dup_exists then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 10;
  end if;

  link_c := public.count_url_indicators(new.body);
  if link_c > 2 then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 5;
  end if;

  return new;
end;
$$;

create or replace function public.comments_antispam_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  dup_exists boolean;
  link_c int;
begin
  dup_exists := false;
  if public.spam_duplicate_eligible(new.body) then
    select exists (
      select 1
      from public.comments
      where user_id = new.user_id
        and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
        and created_at > now() - interval '7 minutes'
    ) into dup_exists;
  end if;

  if dup_exists then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 10;
  end if;

  link_c := public.count_url_indicators(new.body);
  if link_c > 1 then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 5;
  end if;

  return new;
end;
$$;

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

    dup_exists := false;
    if public.spam_duplicate_eligible(new.body) then
      select exists (
        select 1
        from public.posts
        where user_id = new.user_id
          and id <> new.id
          and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
          and created_at > now() - interval '7 minutes'
      ) into dup_exists;
    end if;

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

    dup_exists := false;
    if public.spam_duplicate_eligible(new.body) then
      select exists (
        select 1
        from public.comments
        where user_id = new.user_id
          and id <> new.id
          and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
          and created_at > now() - interval '7 minutes'
      ) into dup_exists;
    end if;

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
