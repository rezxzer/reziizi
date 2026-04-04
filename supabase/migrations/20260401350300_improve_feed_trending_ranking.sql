-- REZIIZI: Feed tuning — trending score with recency decay + light comment weight.
-- Replaces naive order (net reactions only). SECURITY DEFINER: same public ordering for all users;
-- excludes flagged posts explicitly; comment count uses non-flagged rows only.

create or replace function public.feed_trending_post_ids(p_limit int, p_offset int)
returns table (id uuid)
language sql
stable
security definer
set search_path = public
as $$
  with scored as (
    select
      p.id,
      p.created_at,
      (
        coalesce((
          select sum(r.value)
          from public.reactions r
          where r.post_id = p.id
        ), 0)
        + 0.15 * coalesce((
          select count(*)::numeric
          from public.comments c
          where c.post_id = p.id
            and not coalesce(c.is_flagged, false)
        ), 0)
      ) / power(
        greatest(extract(epoch from (now() - p.created_at)) / 3600.0, 0.25) + 2.0,
        1.5
      ) as trend_score
    from public.posts p
    where not coalesce(p.is_flagged, false)
  )
  select scored.id
  from scored
  order by scored.trend_score desc, scored.created_at desc
  limit p_limit offset p_offset;
$$;

comment on function public.feed_trending_post_ids(int, int) is
  'Trending: (net reactions + 0.15 * visible comment count) / (age_hours + 2)^1.5; age floor 15m; unflagged posts only; tie-break created_at desc.';
