-- REZIIZI: post images — Storage bucket + policies (feature 11; MVP: images only, no video)
-- Path convention: posts/{user_id}/{post_id}/{filename}

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images',
  'post-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Read: public bucket URLs; allow anon + authenticated SELECT on objects in this bucket
drop policy if exists "post_images_select_public" on storage.objects;
create policy "post_images_select_public"
  on storage.objects for select
  to public
  using (bucket_id = 'post-images');

-- Upload: only under posts/{auth.uid()}/...
drop policy if exists "post_images_insert_own" on storage.objects;
create policy "post_images_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'post-images'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );

-- Replace/update own objects (same path prefix)
drop policy if exists "post_images_update_own" on storage.objects;
create policy "post_images_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'post-images'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  )
  with check (
    bucket_id = 'post-images'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );

-- Delete own objects (post delete / cleanup)
drop policy if exists "post_images_delete_own" on storage.objects;
create policy "post_images_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'post-images'
    and (string_to_array(name, '/'))[1] = 'posts'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );
