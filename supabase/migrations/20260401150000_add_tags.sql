-- REZIIZI v2: tags + post_tags + RPC for paginated feed by tag
-- Requires: public.posts

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  created_at timestamptz not null default now(),
  constraint tags_slug_format check (
    char_length(slug) between 1 and 40
    and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  )
);

create table if not exists public.post_tags (
  post_id uuid not null references public.posts (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (post_id, tag_id)
);

create index if not exists post_tags_tag_id_idx on public.post_tags (tag_id);
create index if not exists post_tags_post_id_idx on public.post_tags (post_id);

alter table public.tags enable row level security;
alter table public.post_tags enable row level security;

create policy "tags_select_all"
  on public.tags for select
  using (true);

create policy "tags_insert_authenticated"
  on public.tags for insert
  with check (auth.uid() is not null);

create policy "post_tags_select_all"
  on public.post_tags for select
  using (true);

create policy "post_tags_insert_own_post"
  on public.post_tags for insert
  with check (
    exists (
      select 1 from public.posts p
      where p.id = post_tags.post_id and p.user_id = auth.uid()
    )
  );

create policy "post_tags_delete_own_post"
  on public.post_tags for delete
  using (
    exists (
      select 1 from public.posts p
      where p.id = post_tags.post_id and p.user_id = auth.uid()
    )
  );

create or replace function public.feed_post_ids_by_tag(p_slug text, p_limit int, p_offset int)
returns table (id uuid)
language sql
stable
security invoker
set search_path = public
as $$
  select p.id
  from public.posts p
  inner join public.post_tags pt on pt.post_id = p.id
  inner join public.tags t on t.id = pt.tag_id
  where t.slug = p_slug
  order by p.created_at desc
  limit p_limit offset p_offset;
$$;

grant execute on function public.feed_post_ids_by_tag(text, int, int) to anon, authenticated;
