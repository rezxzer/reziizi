-- REZIIZI v2: trending feed — order posts by sum(reactions.value), then created_at
-- Requires: posts, reactions

create or replace function public.feed_trending_post_ids(p_limit int, p_offset int)
returns table (id uuid)
language sql
stable
security invoker
set search_path = public
as $$
  select p.id
  from public.posts p
  left join public.reactions r on r.post_id = p.id
  group by p.id
  order by coalesce(sum(r.value), 0) desc, p.created_at desc
  limit p_limit offset p_offset;
$$;

grant execute on function public.feed_trending_post_ids(int, int) to anon, authenticated;
