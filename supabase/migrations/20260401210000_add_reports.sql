-- REZIIZI v3: user reports on posts + RLS (reporter, admin read all, admin delete)

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  reason text not null check (char_length(trim(reason)) >= 1 and char_length(reason) <= 2000),
  created_at timestamptz not null default now(),
  constraint reports_one_per_user_post unique (reporter_id, post_id)
);

create index if not exists reports_created_at_idx on public.reports (created_at desc);
create index if not exists reports_post_id_idx on public.reports (post_id);

alter table public.reports enable row level security;

create policy "reports_select_own_or_admin"
  on public.reports for select
  using (
    reporter_id = auth.uid()
    or exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create policy "reports_insert_own"
  on public.reports for insert
  with check (auth.uid() = reporter_id);

create policy "reports_delete_admin"
  on public.reports for delete
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );
