-- REZIIZI: post image URL (feature 11) — public URL from Storage `post-images` bucket

alter table public.posts
  add column if not exists image_url text null;

comment on column public.posts.image_url is
  'Optional. Public URL for the post image (Supabase Storage, bucket post-images).';
