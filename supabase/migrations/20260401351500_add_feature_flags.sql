-- REZIIZI: admin-toggled feature flags (public read; home hides UI when off — no "disabled" message)

create table if not exists public.feature_flags (
  key text primary key,
  enabled boolean not null default true,
  description text not null default '',
  constraint feature_flags_key_format check (key ~ '^[a-z][a-z0-9_]*$')
);

alter table public.feature_flags enable row level security;

-- Anyone (including anon) can read — needed for public home feed without sign-in.
create policy "feature_flags_select_public"
  on public.feature_flags for select
  using (true);

create policy "feature_flags_update_admin"
  on public.feature_flags for update
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

insert into public.feature_flags (key, enabled, description) values
  ('feed_trending_tab', true, 'Trending sort tab on home feed'),
  ('feed_ads', true, 'Sponsored strip above feed (still requires active ad slot)')
on conflict (key) do nothing;
