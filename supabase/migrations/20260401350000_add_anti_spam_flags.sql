-- REZIIZI: Anti-spam MVP (49) — abuse_flags, is_flagged / spam_score, triggers, RLS
-- See project.md → Anti-spam (49).

-- --- Helpers (immutable) ---

create or replace function public.normalize_body_for_spam(p text)
returns text
language sql
immutable
as $$
  select trim(regexp_replace(lower(coalesce(p, '')), '\s+', ' ', 'g'));
$$;

-- Counts http(s):// and www. patterns (MVP heuristic; see project.md).
create or replace function public.count_url_indicators(p text)
returns int
language sql
immutable
as $$
  -- regexp_count: do not use flag "g" (global) — unsupported; all matches are counted. Use "i" only.
  select coalesce(
    regexp_count(lower(coalesce(p, '')), 'https?://', 1, 'i')::int
    + regexp_count(lower(coalesce(p, '')), 'www\.', 1, 'i')::int,
    0
  );
$$;

-- --- Columns on posts / comments ---

alter table public.posts
  add column if not exists is_flagged boolean not null default false,
  add column if not exists spam_score int not null default 0;

alter table public.comments
  add column if not exists is_flagged boolean not null default false,
  add column if not exists spam_score int not null default 0;

comment on column public.posts.is_flagged is 'Soft-hide from public lists when true (author and admins still see).';
comment on column public.posts.spam_score is 'Heuristic score; higher = more suspicious.';
comment on column public.comments.is_flagged is 'Soft-hide from public when true (author and admins still see).';
comment on column public.comments.spam_score is 'Heuristic score; higher = more suspicious.';

create index if not exists posts_is_flagged_spam_score_idx
  on public.posts (is_flagged desc, spam_score desc, created_at desc);

create index if not exists comments_is_flagged_spam_score_idx
  on public.comments (is_flagged desc, spam_score desc, created_at desc);

-- --- abuse_flags (audit / future admin) ---

create table if not exists public.abuse_flags (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts (id) on delete cascade,
  comment_id uuid references public.comments (id) on delete cascade,
  message_id uuid references public.chat_messages (id) on delete cascade,
  reason text not null default 'auto',
  created_at timestamptz not null default now(),
  constraint abuse_flags_one_target check (
    (post_id is not null)::int + (comment_id is not null)::int + (message_id is not null)::int = 1
  )
);

create index if not exists abuse_flags_post_id_idx on public.abuse_flags (post_id) where post_id is not null;
create index if not exists abuse_flags_comment_id_idx on public.abuse_flags (comment_id) where comment_id is not null;

alter table public.abuse_flags enable row level security;

create policy "abuse_flags_select_admin"
  on public.abuse_flags for select
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  );

-- --- RLS: replace open SELECT on posts / comments ---

drop policy if exists "posts_select_all" on public.posts;
create policy "posts_select_visible"
  on public.posts for select
  using (
    not coalesce(is_flagged, false)
    or auth.uid() = user_id
    or exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  );

drop policy if exists "comments_select_all" on public.comments;
create policy "comments_select_visible"
  on public.comments for select
  using (
    not coalesce(is_flagged, false)
    or auth.uid() = user_id
    or exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  );

-- --- Admins may update spam fields (approve / adjust) ---

create policy "posts_update_admin"
  on public.posts for update
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  );

create policy "comments_update_admin"
  on public.comments for update
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.is_admin, false) = true
    )
  );

-- --- Block non-admins from changing spam columns (owner UPDATE still allowed for body/media) ---

create or replace function public.prevent_user_editing_spam_columns_posts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  adm boolean;
begin
  select coalesce(p.is_admin, false) into adm
  from public.profiles p
  where p.id = auth.uid();

  if adm then
    return new;
  end if;

  if new.is_flagged is distinct from old.is_flagged or new.spam_score is distinct from old.spam_score then
    new.is_flagged := old.is_flagged;
    new.spam_score := old.spam_score;
  end if;
  return new;
end;
$$;

drop trigger if exists posts_prevent_spam_user_edit on public.posts;
create trigger posts_prevent_spam_user_edit
  before update on public.posts
  for each row execute procedure public.prevent_user_editing_spam_columns_posts();

create or replace function public.prevent_user_editing_spam_columns_comments()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  adm boolean;
begin
  select coalesce(p.is_admin, false) into adm
  from public.profiles p
  where p.id = auth.uid();

  if adm then
    return new;
  end if;

  if new.is_flagged is distinct from old.is_flagged or new.spam_score is distinct from old.spam_score then
    new.is_flagged := old.is_flagged;
    new.spam_score := old.spam_score;
  end if;
  return new;
end;
$$;

drop trigger if exists comments_prevent_spam_user_edit on public.comments;
create trigger comments_prevent_spam_user_edit
  before update on public.comments
  for each row execute procedure public.prevent_user_editing_spam_columns_comments();

-- --- BEFORE INSERT: duplicate window + link limits (runs after rate-limit trigger — name zz) ---

create or replace function public.posts_antispam_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  dup_exists boolean;
  link_c int;
begin
  select exists (
    select 1
    from public.posts
    where user_id = new.user_id
      and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
      and created_at > now() - interval '5 minutes'
  ) into dup_exists;

  if dup_exists then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 10;
  end if;

  link_c := public.count_url_indicators(new.body);
  if link_c > 2 then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 5;
  end if;

  return new;
end;
$$;

drop trigger if exists posts_zz_antispam_before_insert on public.posts;
create trigger posts_zz_antispam_before_insert
  before insert on public.posts
  for each row execute procedure public.posts_antispam_before_insert();

create or replace function public.comments_antispam_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  dup_exists boolean;
  link_c int;
begin
  select exists (
    select 1
    from public.comments
    where user_id = new.user_id
      and public.normalize_body_for_spam(body) = public.normalize_body_for_spam(new.body)
      and created_at > now() - interval '5 minutes'
  ) into dup_exists;

  if dup_exists then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 10;
  end if;

  link_c := public.count_url_indicators(new.body);
  if link_c > 1 then
    new.is_flagged := true;
    new.spam_score := new.spam_score + 5;
  end if;

  return new;
end;
$$;

drop trigger if exists comments_zz_antispam_before_insert on public.comments;
create trigger comments_zz_antispam_before_insert
  before insert on public.comments
  for each row execute procedure public.comments_antispam_before_insert();

-- --- AFTER INSERT: audit row when flagged ---

create or replace function public.abuse_flags_after_post_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_flagged then
    insert into public.abuse_flags (post_id, reason) values (new.id, 'auto');
  end if;
  return new;
end;
$$;

drop trigger if exists posts_abuse_flags_after_insert on public.posts;
create trigger posts_abuse_flags_after_insert
  after insert on public.posts
  for each row execute procedure public.abuse_flags_after_post_insert();

create or replace function public.abuse_flags_after_comment_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_flagged then
    insert into public.abuse_flags (comment_id, reason) values (new.id, 'auto');
  end if;
  return new;
end;
$$;

drop trigger if exists comments_abuse_flags_after_insert on public.comments;
create trigger comments_abuse_flags_after_insert
  after insert on public.comments
  for each row execute procedure public.abuse_flags_after_comment_insert();
