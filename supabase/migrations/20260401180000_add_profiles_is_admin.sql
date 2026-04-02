-- REZIIZI v3: admin flag on profiles + trigger (non-admins cannot flip is_admin)
-- First admin: SQL Editor — UPDATE public.profiles SET is_admin = true WHERE id = '<user uuid>';

alter table public.profiles
  add column if not exists is_admin boolean not null default false;

create or replace function public.profiles_lock_is_admin_for_non_admins()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_admin boolean;
begin
  -- No JWT (SQL Editor / service): allow promotion (first admin setup).
  if auth.uid() is null then
    return new;
  end if;

  select coalesce(p.is_admin, false) into caller_admin
  from public.profiles p
  where p.id = auth.uid();

  if caller_admin is not true then
    new.is_admin := old.is_admin;
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_lock_is_admin on public.profiles;
create trigger profiles_lock_is_admin
  before update on public.profiles
  for each row execute procedure public.profiles_lock_is_admin_for_non_admins();
