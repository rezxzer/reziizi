-- REZIIZI: Trending tags — returns the most-used tags in the last 7 days
-- ordered by usage count descending, limited to p_limit results.

create or replace function public.trending_tags(p_limit int default 10)
returns table(tag text, post_count bigint)
language sql stable security invoker
as $$
  select t.slug as tag, count(pt.post_id) as post_count
  from public.post_tags pt
  join public.tags t on t.id = pt.tag_id
  join public.posts p on p.id = pt.post_id
  where p.created_at >= now() - interval '7 days'
    and not coalesce(p.is_flagged, false)
  group by t.slug
  order by post_count desc, t.slug asc
  limit p_limit;
$$;

comment on function public.trending_tags(int) is
  'Returns the most-used tags from unflagged posts in the last 7 days.';

grant execute on function public.trending_tags(int) to anon, authenticated;
