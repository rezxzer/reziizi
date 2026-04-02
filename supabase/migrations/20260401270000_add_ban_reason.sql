/* REZIIZI: profiles ban_reason, banned_at; admin_set_user_banned 3-arg */

alter table public.profiles
  add column if not exists ban_reason text null,
  add column if not exists banned_at timestamptz null;

alter table public.profiles drop constraint if exists profiles_ban_reason_len;
alter table public.profiles
  add constraint profiles_ban_reason_len check (ban_reason is null or char_length(ban_reason) <= 500);

comment on column public.profiles.ban_reason is 'Shown to the banned user on the restricted account page (admin-set).';
comment on column public.profiles.banned_at is 'When the current ban was applied; cleared on unban.';

/* Replace 2-arg RPC with 3-arg (p_reason optional) */
drop function if exists public.admin_set_user_banned(uuid, boolean);

create or replace function public.admin_set_user_banned(
  p_user_id uuid,
  p_banned boolean,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reason text;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  if not coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false) then
    raise exception 'forbidden';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'cannot change own ban via this function';
  end if;

  if p_banned then
    v_reason := nullif(trim(coalesce(p_reason, '')), '');
    if v_reason is not null and char_length(v_reason) > 500 then
      raise exception 'reason too long';
    end if;
    update public.profiles
    set
      is_banned = true,
      ban_reason = v_reason,
      banned_at = now()
    where id = p_user_id;
  else
    update public.profiles
    set
      is_banned = false,
      ban_reason = null,
      banned_at = null
    where id = p_user_id;
  end if;
end;
$$;

grant execute on function public.admin_set_user_banned(uuid, boolean, text) to authenticated;
