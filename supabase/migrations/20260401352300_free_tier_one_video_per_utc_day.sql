-- REZIIZI: Free tier — up to 1 post with video per UTC calendar day (premium/admin unchanged: unlimited video).
-- Storage `post-videos` insert/update: same rule so free users can upload when daily quota remains.

create or replace function public.posts_enforce_tier_limits()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  prow public.profiles%rowtype;
  adm boolean;
  prem boolean;
  can_unlimited_video boolean;
  lim int;
  body_len int;
  video_today int;
begin
  if TG_OP = 'UPDATE' then
    if new.body is not distinct from old.body
       and new.video_url is not distinct from old.video_url then
      return new;
    end if;
  end if;

  select * into prow from public.profiles where id = new.user_id;
  if not found then
    adm := false;
    prem := false;
  else
    adm := coalesce(prow.is_admin, false);
    prem := prow.premium_until is not null and prow.premium_until > now();
  end if;

  can_unlimited_video := adm or prem;
  lim := case when adm or prem then 5000 else 1000 end;

  if TG_OP = 'INSERT' or (TG_OP = 'UPDATE' and new.body is distinct from old.body) then
    body_len := char_length(new.body);
    if body_len > lim then
      raise exception 'post_body_tier_limit' using detail = lim::text;
    end if;
  end if;

  if new.video_url is not null and length(trim(new.video_url)) > 0 then
    if not can_unlimited_video then
      select count(*)::int into video_today
      from public.posts po
      where po.user_id = new.user_id
        and po.video_url is not null
        and length(trim(po.video_url)) > 0
        and (po.created_at at time zone 'UTC')::date = (now() at time zone 'UTC')::date
        and (TG_OP = 'INSERT' or po.id <> new.id);

      if video_today >= 1 then
        raise exception 'post_video_daily_limit_free';
      end if;
    end if;
  end if;

  return new;
end;
$$;

comment on function public.posts_enforce_tier_limits() is
  'Body: free 1000 / premium+admin 5000. Video: premium+admin unlimited; free max 1 post with video per UTC day (by post created_at).';

-- post-videos bucket: free tier when daily slot remains OR replacing video on a post that already has video (same post_id path).
drop policy if exists "post_videos_insert_own" on storage.objects;
create policy "post_videos_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'post-videos'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
    and exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and (
          coalesce(p.is_admin, false)
          or (p.premium_until is not null and p.premium_until > now())
          or (
            (
              select count(*)::int
              from public.posts po
              where po.user_id = auth.uid()
                and po.video_url is not null
                and length(trim(po.video_url)) > 0
                and (po.created_at at time zone 'UTC')::date = (now() at time zone 'UTC')::date
            ) < 1
          )
          or exists (
            select 1
            from public.posts po2
            where po2.user_id = auth.uid()
              and po2.id = ((string_to_array(name, '/'))[3])::uuid
              and po2.video_url is not null
              and length(trim(po2.video_url)) > 0
          )
        )
    )
  );

drop policy if exists "post_videos_update_own" on storage.objects;
create policy "post_videos_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'post-videos'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  )
  with check (
    bucket_id = 'post-videos'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
    and exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and (
          coalesce(p.is_admin, false)
          or (p.premium_until is not null and p.premium_until > now())
          or (
            (
              select count(*)::int
              from public.posts po
              where po.user_id = auth.uid()
                and po.video_url is not null
                and length(trim(po.video_url)) > 0
                and (po.created_at at time zone 'UTC')::date = (now() at time zone 'UTC')::date
            ) < 1
          )
          or exists (
            select 1
            from public.posts po2
            where po2.user_id = auth.uid()
              and po2.id = ((string_to_array(name, '/'))[3])::uuid
              and po2.video_url is not null
              and length(trim(po2.video_url)) > 0
          )
        )
    )
  );

-- Client: show remaining daily video slot for free users (UTC day).
create or replace function public.my_post_video_count_today()
returns integer
language sql
stable
security invoker
set search_path = public
as $$
  select count(*)::int
  from public.posts po
  where po.user_id = auth.uid()
    and po.video_url is not null
    and length(trim(po.video_url)) > 0
    and (po.created_at at time zone 'UTC')::date = (now() at time zone 'UTC')::date;
$$;

comment on function public.my_post_video_count_today() is
  'Returns how many of the current user posts have video_url set with created_at on the current UTC calendar day.';

grant execute on function public.my_post_video_count_today() to authenticated;
