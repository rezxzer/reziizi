-- REZIIZI: Search v2 — ranked post + profile search (FTS + ILIKE, privacy preserved).

create index if not exists posts_search_fts_idx
  on public.posts using gin (to_tsvector('simple', body));

comment on index public.posts_search_fts_idx is 'Full-text search (simple config) on posts.body for search_post_ids.';

-- Posts: unflagged only; FTS rank + prefix/position tie-breakers + recency.
create or replace function public.search_post_ids(p_query text, p_limit int)
returns table (id uuid)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  q text := trim(regexp_replace(coalesce(p_query, ''), '\s+', ' ', 'g'));
  lim int := least(greatest(coalesce(p_limit, 40), 1), 200);
  tsq tsquery;
begin
  if length(q) < 2 then
    return;
  end if;
  tsq := plainto_tsquery('simple', q);
  return query
  select p.id
  from public.posts p
  where not coalesce(p.is_flagged, false)
    and (
      (tsq <> ''::tsquery and to_tsvector('simple', p.body) @@ tsq)
      or p.body ilike '%' || q || '%'
    )
  order by
    case
      when tsq <> ''::tsquery and to_tsvector('simple', p.body) @@ tsq
        then ts_rank_cd(to_tsvector('simple', p.body), tsq)
      else 0::real
    end desc,
    case when lower(p.body) like lower(q) || '%' then 0 else 1 end,
    case
      when position(lower(q) in lower(p.body)) > 0
      then position(lower(q) in lower(p.body))
      else 999999
    end asc,
    p.created_at desc
  limit lim;
end;
$$;

comment on function public.search_post_ids(text, int) is
  'Search v2: ranked posts — FTS (simple) + ILIKE fallback; excludes is_flagged; order by ts_rank, prefix match, match position, created_at.';

-- Profiles: same privacy as client (searchable or self); email match quality then recency.
create or replace function public.search_profile_ids(p_query text, p_limit int, p_viewer_id uuid)
returns table (id uuid)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  q text := trim(regexp_replace(coalesce(p_query, ''), '\s+', ' ', 'g'));
  lim int := least(greatest(coalesce(p_limit, 40), 1), 200);
begin
  if length(q) < 2 then
    return;
  end if;
  return query
  select pr.id
  from public.profiles pr
  where pr.email is not null
    and pr.email ilike '%' || q || '%'
    and (
      coalesce(pr.searchable, true) = true
      or (p_viewer_id is not null and pr.id = p_viewer_id)
    )
  order by
    case
      when lower(pr.email) = lower(q) then 0
      when lower(pr.email) like lower(q) || '%' then 1
      else 2
    end,
    pr.created_at desc
  limit lim;
end;
$$;

comment on function public.search_profile_ids(text, int, uuid) is
  'Search v2: ranked profiles by email ILIKE; searchable or viewer self; exact / prefix / substring order.';

grant execute on function public.search_post_ids(text, int) to anon, authenticated;
grant execute on function public.search_profile_ids(text, int, uuid) to anon, authenticated;
