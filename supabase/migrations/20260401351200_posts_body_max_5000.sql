-- REZIIZI: posts.body max length 5000 (was 10000 in init migration).
-- Upper bound 5000 for all tiers; per-tier free/premium limits — `20260401351300_posts_tier_free_premium.sql` + `postBodyLimits.ts`.
-- If migration fails: ensure no row has char_length(body) > 5000 (shorten or delete first).

do $$
declare
  r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    join pg_class t on c.conrelid = t.oid
    join pg_namespace n on t.relnamespace = n.oid
    where n.nspname = 'public'
      and t.relname = 'posts'
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) ~ 'char_length\(body\)'
  loop
    execute format('alter table public.posts drop constraint %I', r.conname);
  end loop;
end
$$;

alter table public.posts
  add constraint posts_body_length_check
  check (char_length(body) between 1 and 5000);

comment on constraint posts_body_length_check on public.posts is
  'Post body length 1..5000 characters (UI + client validation must match).';
