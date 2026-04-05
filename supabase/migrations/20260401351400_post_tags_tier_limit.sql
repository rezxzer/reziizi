-- REZIIZI: Max tags per post by tier — free 4, premium or admin 8 (matches tagParse.ts + PostForm).

create or replace function public.post_tags_enforce_tier_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
  cnt int;
  lim int;
  prow public.profiles%rowtype;
  can_premium boolean;
begin
  select p.user_id into uid from public.posts p where p.id = new.post_id;
  if uid is null then
    raise exception 'post_tags_post_not_found';
  end if;

  select count(*)::int into cnt from public.post_tags where post_id = new.post_id;
  cnt := cnt + 1;

  select * into prow from public.profiles where id = uid;
  if not found then
    can_premium := false;
  else
    can_premium := coalesce(prow.is_admin, false)
      or (prow.premium_until is not null and prow.premium_until > now());
  end if;

  lim := case when can_premium then 8 else 4 end;

  if cnt > lim then
    raise exception 'post_tags_tier_limit' using detail = lim::text;
  end if;

  return new;
end;
$$;

comment on function public.post_tags_enforce_tier_limit() is
  'Before insert on post_tags: free users max 4 tags per post; premium or admin max 8.';

drop trigger if exists post_tags_bi_tier_limit on public.post_tags;
create trigger post_tags_bi_tier_limit
  before insert on public.post_tags
  for each row execute procedure public.post_tags_enforce_tier_limit();
