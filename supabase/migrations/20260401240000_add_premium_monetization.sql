-- REZIIZI v3: manual premium / monetization baseline (admin-granted; payments later)

alter table public.profiles
  add column if not exists premium_until timestamptz null;

-- Block non-admins from setting premium on insert; only admins may change premium_until on update (via RPC).
create or replace function public.profiles_enforce_premium_only_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if TG_OP = 'INSERT' and NEW.premium_until is not null then
    raise exception 'premium_until cannot be set on profile insert';
  end if;
  if TG_OP = 'UPDATE' and (OLD.premium_until is distinct from NEW.premium_until) then
    if auth.uid() is null or not coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false) then
      raise exception 'premium_until can only be changed by admins';
    end if;
  end if;
  return NEW;
end;
$$;

drop trigger if exists profiles_premium_guard on public.profiles;
create trigger profiles_premium_guard
  before insert or update on public.profiles
  for each row execute procedure public.profiles_enforce_premium_only_admin();

create or replace function public.admin_set_user_premium_until(p_user_id uuid, p_premium_until timestamptz)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  if not coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false) then
    raise exception 'forbidden';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'cannot change own premium via this function';
  end if;
  update public.profiles
  set premium_until = p_premium_until
  where id = p_user_id;
end;
$$;

grant execute on function public.admin_set_user_premium_until(uuid, timestamptz) to authenticated;
