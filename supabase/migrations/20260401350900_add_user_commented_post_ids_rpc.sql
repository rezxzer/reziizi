-- REZIIZI: Profile "Commented" tab — distinct posts a user commented on, ordered by most recent comment activity.

create index if not exists comments_user_id_created_at_idx
  on public.comments (user_id, created_at desc);

create or replace function public.user_commented_post_ids(
  p_user_id uuid,
  p_limit int,
  p_offset int
)
returns table (id uuid)
language sql
stable
security invoker
set search_path = public
as $$
  select t.post_id as id
  from (
    select post_id, max(created_at) as last_at
    from public.comments
    where user_id = p_user_id
    group by post_id
  ) t
  order by t.last_at desc
  limit p_limit offset p_offset;
$$;

grant execute on function public.user_commented_post_ids(uuid, int, int) to anon, authenticated;

comment on function public.user_commented_post_ids(uuid, int, int) is
  'Distinct post ids the user commented on, newest comment activity first; client loads posts with RLS.';
