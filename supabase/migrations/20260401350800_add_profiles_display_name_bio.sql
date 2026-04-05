-- REZIIZI: Public profile display name + bio (editable by owner; readable by everyone via existing SELECT policy).

alter table public.profiles
  add column if not exists display_name text null,
  add column if not exists bio text null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_display_name_len'
  ) then
    alter table public.profiles
      add constraint profiles_display_name_len check (display_name is null or char_length(display_name) <= 80);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_bio_len'
  ) then
    alter table public.profiles
      add constraint profiles_bio_len check (bio is null or char_length(bio) <= 500);
  end if;
end $$;

comment on column public.profiles.display_name is 'Optional public display name; shown on profile and avatar label when set.';
comment on column public.profiles.bio is 'Optional public short bio; shown on profile.';
