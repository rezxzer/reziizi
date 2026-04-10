-- REZIIZI: optional promotional video for feed-top ad slot (admin upload; public read)

alter table public.ad_slots
  add column if not exists video_url text null;

comment on column public.ad_slots.video_url is
  'Optional. Public URL for sponsored strip video (bucket feed-ad-videos, path feed_top/*).';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'feed-ad-videos',
  'feed-ad-videos',
  true,
  52428800,
  array['video/mp4', 'video/webm']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "feed_ad_videos_select_public" on storage.objects;
create policy "feed_ad_videos_select_public"
  on storage.objects for select
  to public
  using (bucket_id = 'feed-ad-videos');

drop policy if exists "feed_ad_videos_insert_admin" on storage.objects;
create policy "feed_ad_videos_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'feed-ad-videos'
    and name ~ '^feed_top/[^/]+$'
    and exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

drop policy if exists "feed_ad_videos_update_admin" on storage.objects;
create policy "feed_ad_videos_update_admin"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'feed-ad-videos'
    and name ~ '^feed_top/[^/]+$'
    and exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  )
  with check (
    bucket_id = 'feed-ad-videos'
    and name ~ '^feed_top/[^/]+$'
    and exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

drop policy if exists "feed_ad_videos_delete_admin" on storage.objects;
create policy "feed_ad_videos_delete_admin"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'feed-ad-videos'
    and name ~ '^feed_top/[^/]+$'
    and exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );
