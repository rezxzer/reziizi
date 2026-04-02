-- REZIIZI v3: allow admins to UPDATE any profile row (ban, premium_until, etc.)
--
-- Problem: "profiles_update_own" only permits auth.uid() = id. Admin RPCs
-- (admin_set_user_banned, admin_set_user_premium_until) UPDATE other users' rows;
-- with RLS evaluated for the invoker, those updates can fail silently or error.
-- This policy ORs with the own-row policy for authenticated admins.

drop policy if exists "profiles_update_admin" on public.profiles;

create policy "profiles_update_admin"
  on public.profiles for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and coalesce(p.is_admin, false) = true
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and coalesce(p.is_admin, false) = true
    )
  );
