-- REZIIZI: Feed trending v2 — author diversity + time-bucketed jitter.
-- Replaces the deterministic v1 ordering. Same engagement+recency formula at the
-- core, but adds two anti-monotony adjustments so the feed does not show the same
-- author's posts back-to-back and the top-N rotates over time:
--
--   * author_rank decay: each subsequent post by the same author is multiplied by
--     0.7^(rank-1). Top post of a prolific user keeps full weight; their second
--     post is at 0.7x, third at 0.49x, etc. Ensures multiple authors surface even
--     if one user dominates engagement.
--   * jitter: ±15% multiplier seeded by a 5-minute time bucket and the post id.
--     Within a single 5-minute window the ordering is stable (so pagination /
--     scroll continuation works), but across windows the top-N rotates.
--
-- Signature is unchanged (p_limit, p_offset → table(id uuid)) — no client change.
-- security definer + ordering on aggregates, same as v1.

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
      p.user_id,
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
      ) as base_score
    from public.posts p
    where not coalesce(p.is_flagged, false)
  ),
  ranked as (
    select
      s.*,
      row_number() over (
        partition by s.user_id
        order by s.base_score desc, s.created_at desc
      ) as author_rank
    from scored s
  ),
  jittered as (
    select
      r.id,
      r.created_at,
      r.base_score
        * power(0.7::numeric, (r.author_rank - 1)::numeric)
        * (
          0.85
          + (
              abs(
                hashtext(
                  r.id::text
                  || '|'
                  || (extract(epoch from now())::bigint / 300)::text
                )
              )::numeric % 3000
            ) / 10000.0
        ) as final_score
    from ranked r
  )
  select j.id
  from jittered j
  order by j.final_score desc, j.created_at desc
  limit p_limit offset p_offset;
$$;

comment on function public.feed_trending_post_ids(int, int) is
  'Trending v2: HN-style score (reactions + 0.15*comments) / (age_hours + 2)^1.5 with author_rank decay 0.7^(rank-1) and 5-minute-bucketed +-15% jitter to break top-N stickiness; unflagged posts only.';
