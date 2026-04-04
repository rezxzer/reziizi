-- Fix: regexp_count() rejects flag "g" (global) — only "i" and similar are allowed; all matches are counted without "g".
-- Run after 20260401350000_add_anti_spam_flags.sql if comments/posts INSERT failed with that error.

create or replace function public.count_url_indicators(p text)
returns int
language sql
immutable
as $$
  select coalesce(
    regexp_count(lower(coalesce(p, '')), 'https?://', 1, 'i')::int
    + regexp_count(lower(coalesce(p, '')), 'www\.', 1, 'i')::int,
    0
  );
$$;
