-- REZIIZI: user applications for feed-top sponsored placement; admin reviews (separate from ad_slots manual edit).

create table if not exists public.ad_placement_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  proposed_title text not null default '',
  proposed_body text not null,
  proposed_link_url text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ad_placement_requests_title_len check (char_length(proposed_title) <= 200),
  constraint ad_placement_requests_body_len check (
    char_length(proposed_body) <= 2000
    and char_length(trim(proposed_body)) >= 10
  ),
  constraint ad_placement_requests_link_len check (
    proposed_link_url is null or char_length(proposed_link_url) <= 2000
  ),
  constraint ad_placement_requests_admin_note_len check (
    admin_note is null or char_length(admin_note) <= 2000
  )
);

create index if not exists ad_placement_requests_created_at_idx
  on public.ad_placement_requests (created_at desc);

create index if not exists ad_placement_requests_status_idx
  on public.ad_placement_requests (status);

alter table public.ad_placement_requests enable row level security;

create policy "ad_placement_requests_select_own_or_admin"
  on public.ad_placement_requests for select
  using (
    user_id = auth.uid()
    or exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create policy "ad_placement_requests_insert_own"
  on public.ad_placement_requests for insert
  with check (auth.uid() = user_id);

create policy "ad_placement_requests_update_admin"
  on public.ad_placement_requests for update
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create or replace function public.ad_placement_requests_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ad_placement_requests_touch_updated_at on public.ad_placement_requests;
create trigger ad_placement_requests_touch_updated_at
  before update on public.ad_placement_requests
  for each row execute procedure public.ad_placement_requests_touch_updated_at();
