-- REZIIZI: post videos (feature 10) — Storage bucket `post-videos` + `posts.video_url`
-- Path convention matches images: posts/{user_id}/{post_id}/{filename}
-- At most one of image_url or video_url per post (CHECK).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-videos',
  'post-videos',
  true,
  52428800,
  array['video/mp4', 'video/webm']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "post_videos_select_public" on storage.objects;
create policy "post_videos_select_public"
  on storage.objects for select
  to public
  using (bucket_id = 'post-videos');

drop policy if exists "post_videos_insert_own" on storage.objects;
create policy "post_videos_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'post-videos'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
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
  );

drop policy if exists "post_videos_delete_own" on storage.objects;
create policy "post_videos_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'post-videos'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );

alter table public.posts
  add column if not exists video_url text null;

comment on column public.posts.video_url is
  'Optional. Public URL for post video (Supabase Storage, bucket post-videos). Mutually exclusive with image_url.';

alter table public.posts
  drop constraint if exists posts_one_media_type;

alter table public.posts
  add constraint posts_one_media_type
  check (
    not (image_url is not null and video_url is not null)
  );
