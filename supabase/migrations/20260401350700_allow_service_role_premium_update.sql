-- REZIIZI: Allow service_role (server-side) to set profiles.premium_until for Stripe webhooks / billing automation.
-- Direct client updates remain admin-only via existing guard for authenticated users.

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
    -- Service role (Edge Functions, server keys): Stripe / billing automation
    if coalesce(auth.jwt() ->> 'role', '') = 'service_role' then
      return NEW;
    end if;
    if auth.uid() is null or not coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false) then
      raise exception 'premium_until can only be changed by admins';
    end if;
  end if;
  return NEW;
end;
$$;

comment on function public.profiles_enforce_premium_only_admin() is
  'Blocks non-admin users from changing premium_until; allows service_role (JWT) for server-side billing webhooks.';
