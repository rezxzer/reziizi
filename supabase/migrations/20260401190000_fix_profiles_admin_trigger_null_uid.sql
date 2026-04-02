-- Fix: SQL Editor / Table Editor have no JWT — auth.uid() is null; first admin UPDATE was blocked.
-- Idempotent: replaces function from 20260401180000 with null-uid branch.

create or replace function public.profiles_lock_is_admin_for_non_admins()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_admin boolean;
begin
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
