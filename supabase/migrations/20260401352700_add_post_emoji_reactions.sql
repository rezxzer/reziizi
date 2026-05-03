-- REZIIZI: Sticker reactions — extra emoji reactions on posts (free, no payment).
-- Sits alongside the existing `reactions` table (👍 / 👎). Slack-style: one user
-- can leave multiple emoji on the same post, but only one of each kind.
--
-- emoji_code is constrained to a fixed catalog so we never render an unknown
-- emoji from user input. Adding new emojis later is a one-line ALTER + UI.

create table if not exists public.post_emoji_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  emoji_code text not null check (
    emoji_code in (
      'thumbs_up',
      'heart',
      'laugh',
      'wow',
      'fire',
      'celebrate',
      'clap'
    )
  ),
  created_at timestamptz not null default now(),
  unique (post_id, user_id, emoji_code)
);

create index if not exists post_emoji_reactions_post_id_idx
  on public.post_emoji_reactions (post_id);

-- RLS — public reads (so anonymous visitors see the counters), authed users
-- manage their own rows only.
alter table public.post_emoji_reactions enable row level security;

drop policy if exists post_emoji_reactions_select_anon on public.post_emoji_reactions;
create policy post_emoji_reactions_select_anon
  on public.post_emoji_reactions
  for select
  to anon
  using (true);

drop policy if exists post_emoji_reactions_select_auth on public.post_emoji_reactions;
create policy post_emoji_reactions_select_auth
  on public.post_emoji_reactions
  for select
  to authenticated
  using (true);

drop policy if exists post_emoji_reactions_insert_self on public.post_emoji_reactions;
create policy post_emoji_reactions_insert_self
  on public.post_emoji_reactions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists post_emoji_reactions_delete_self on public.post_emoji_reactions;
create policy post_emoji_reactions_delete_self
  on public.post_emoji_reactions
  for delete
  to authenticated
  using (auth.uid() = user_id);

comment on table public.post_emoji_reactions is
  'Free sticker reactions on posts. Slack-style: each (post_id, user_id, emoji_code) unique. Catalog enforced by check constraint; UI labels live in src/lib/emojiReactions.ts.';
