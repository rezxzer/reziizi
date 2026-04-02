-- REZIIZI v3: optional sponsored strip above feed (admin-managed)

create table if not exists public.ad_slots (
  id uuid primary key default gen_random_uuid(),
  placement text not null unique,
  title text not null default '',
  body text not null default '',
  link_url text,
  is_active boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint ad_slots_placement_format check (placement ~ '^[a-z0-9_]+$')
);

create index if not exists ad_slots_placement_idx on public.ad_slots (placement);

alter table public.ad_slots enable row level security;

-- Public and logged-in users: only active slots (for display)
create policy "ad_slots_select_active"
  on public.ad_slots for select
  using (is_active = true);

-- Admins: see all rows (edit UI)
create policy "ad_slots_select_admin"
  on public.ad_slots for select
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create policy "ad_slots_insert_admin"
  on public.ad_slots for insert
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create policy "ad_slots_update_admin"
  on public.ad_slots for update
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create policy "ad_slots_delete_admin"
  on public.ad_slots for delete
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

insert into public.ad_slots (placement, title, body, link_url, is_active)
values ('feed_top', '', '', null, false)
on conflict (placement) do nothing;
