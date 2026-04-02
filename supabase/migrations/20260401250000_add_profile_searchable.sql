-- REZIIZI v3: privacy — opt out of appearing in email-based user search

alter table public.profiles
  add column if not exists searchable boolean not null default true;

comment on column public.profiles.searchable is 'When false, profile is hidden from email search (Settings / Privacy).';
