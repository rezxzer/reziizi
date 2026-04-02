-- REZIIZI: Avatar (feature 4) — profile photo URL + Storage bucket `avatars`

alter table public.profiles
  add column if not exists avatar_url text null;

comment on column public.profiles.avatar_url is
  'Optional. Public URL for profile image (Supabase Storage, bucket avatars).';

-- Bucket: smaller limit than post images (2 MiB) — profile photos only
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "avatars_select_public" on storage.objects;
create policy "avatars_select_public"
  on storage.objects for select
  to public
  using (bucket_id = 'avatars');

drop policy if exists "avatars_insert_own" on storage.objects;
create policy "avatars_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (string_to_array(name, '/'))[1] = 'avatars'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );

drop policy if exists "avatars_update_own" on storage.objects;
create policy "avatars_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (string_to_array(name, '/'))[1] = 'avatars'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (string_to_array(name, '/'))[1] = 'avatars'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );

drop policy if exists "avatars_delete_own" on storage.objects;
create policy "avatars_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (string_to_array(name, '/'))[1] = 'avatars'
    and (string_to_array(name, '/'))[2] = auth.uid()::text
  );
