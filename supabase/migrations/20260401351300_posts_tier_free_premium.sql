-- REZIIZI: Free vs Premium post limits — body length (1000 free / 5000 premium+admin), video_url only for premium or admin.
-- Client: postBodyLimits.ts + PostForm; Storage: post-videos insert/update requires premium or admin.

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
  can_video boolean;
  lim int;
  body_len int;
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

  can_video := adm or prem;
  lim := case when can_video then 5000 else 1000 end;

  if TG_OP = 'INSERT' or (TG_OP = 'UPDATE' and new.body is distinct from old.body) then
    body_len := char_length(new.body);
    if body_len > lim then
      raise exception 'post_body_tier_limit' using detail = lim::text;
    end if;
  end if;

  if new.video_url is not null and length(trim(new.video_url)) > 0 then
    if not can_video then
      raise exception 'post_video_requires_premium';
    end if;
  end if;

  return new;
end;
$$;

comment on function public.posts_enforce_tier_limits() is
  'Free: body max 1000 chars, no video_url. Premium or admin: body max 5000, video allowed. Runs before rate limit / anti-spam.';

drop trigger if exists posts_aa_tier_limits_before_insert on public.posts;
create trigger posts_aa_tier_limits_before_insert
  before insert on public.posts
  for each row execute procedure public.posts_enforce_tier_limits();

drop trigger if exists posts_aa_tier_limits_before_update on public.posts;
create trigger posts_aa_tier_limits_before_update
  before update on public.posts
  for each row execute procedure public.posts_enforce_tier_limits();

-- post-videos: only premium or admin can upload (delete unchanged — free users can remove own objects).
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
        )
    )
  );
