# REZIIZI — public schema overview

Single reference for **Supabase `public`** tables and client-called RPCs.  
Authoritative DDL lives in `migrations/` (apply in timestamp order). TypeScript row shapes: `src/types/db.ts`.  
Canonical names for the app: `src/lib/api/registry.ts`.

## Migration order (file names)

See `.cursor/rules/reziizi.mdc` or list `supabase/migrations/*.sql` sorted by name.

## Tables

| Table | Purpose |
|-------|---------|
| `profiles` | One row per auth user; flags, ban/premium/searchability |
| `posts` | Feed posts |
| `reactions` | Post votes (−1 / +1), unique per (post, user) |
| `comments` | Post comments |
| `notifications` | Comment/reaction/follow notifications (recipient `user_id`) |
| `tags` | Tag slugs |
| `post_tags` | Post ↔ tag links |
| `conversations` | Chat threads (pair of user ids) |
| `chat_messages` | Messages in a conversation |
| `reports` | User reports on posts |
| `ad_slots` | Sponsored slots (e.g. `feed_top`) |
| `follows` | User A follows user B (directed) |
| `abuse_flags` | Audit rows when content is auto-flagged (FK to post, comment, or optional `message_id`) |

### `profiles`

- `id` (PK, FK → `auth.users`)
- `email`, `created_at`
- `avatar_url` (nullable; public Storage URL, bucket `avatars`)
- `is_admin`, `is_banned`
- `ban_reason`, `banned_at` (ban UX; cleared on unban)
- `premium_until` (monetization / admin grant)
- `searchable` (privacy: email search opt-out)
- `notify_on_comment`, `notify_on_reaction`, `notify_on_follow` (default `true`; when `false`, triggers skip creating that notification type — see `20260401350200_add_notification_preferences.sql`)
- Triggers: `profiles_lock_is_admin…`, `profiles_premium_guard`, `on_auth_user_created` → `handle_new_user`

### `posts`

- `id`, `user_id`, `body`, `image_url` (nullable; bucket `post-images`), `video_url` (nullable; bucket `post-videos`) — **at most one** of `image_url` / `video_url` non-null (`posts_one_media_type` CHECK), `created_at`, `updated_at`
- `is_flagged` (boolean; when true, row is hidden from public SELECT via RLS except author + admins), `spam_score` (int; heuristic)

### `follows`

- `follower_id`, `following_id` (composite PK; both FK → `auth.users` ON DELETE CASCADE), `created_at`
- CHECK `follower_id <> following_id`

### `reactions`

- `id`, `post_id`, `user_id`, `value` (−1 \| 1), `created_at` — unique `(post_id, user_id)`

### `comments`

- `id`, `post_id`, `user_id`, `body`, `created_at`, `updated_at`
- `is_flagged`, `spam_score` (same semantics as `posts`)

### `abuse_flags`

- `id`, optional `post_id` / `comment_id` / `message_id` (exactly one set; CHECK), `reason` (default `auto`), `created_at`
- RLS: SELECT for admins only; inserts from triggers (SECURITY DEFINER), not from the web client

### `notifications`

- `id`, `user_id` (recipient), `type` (`comment` \| `reaction` \| `follow`), `actor_id`, `post_id` (null for `follow`), `comment_id`, `read_at`, `created_at`
- Triggers: new comment/reaction on a post → owner; new `follows` row → `following_id` receives `follow` (see `20260401340000_add_follow_notifications.sql`)

### `tags` / `post_tags`

- `tags`: `id`, `slug`, `created_at`
- `post_tags`: `post_id`, `tag_id` (composite PK in migration)

### `conversations`

- `id`, `user_a`, `user_b`, `last_message_at`, `created_at` — ordered pair semantics via RPC

### `chat_messages`

- `id`, `conversation_id`, `sender_id`, `body`, `created_at`

### `reports`

- `id`, `reporter_id`, `post_id`, `reason`, `created_at` — unique `(reporter_id, post_id)` (one report per user per post)

### Moderation automation (reports → auto-flag)

Migration: `20260401350500_add_report_threshold_auto_flag.sql`.

- **AFTER INSERT** on `reports`: if total reports for that `post_id` ≥ **3**, update `posts` — `is_flagged = true`, `spam_score = greatest(spam_score, 5)`; if newly flagged, insert `abuse_flags` with `reason = report_threshold`.
- Updates use session `reziizi.skip_spam_guard = 1` so `prevent_user_editing_spam_columns_posts` allows the change (same pattern as other server-side spam updates).

### `ad_slots`

- `id`, `placement` (unique), `title`, `body`, `link_url`, `is_active`, `updated_at`

## Rate limits (DB triggers)

BEFORE INSERT on **`posts`**, **`comments`**, **`chat_messages`**, **`reports`**. Counts existing rows in a rolling window; `SECURITY DEFINER` counts bypass RLS edge cases. Migration: `20260401310000_add_rate_limit_triggers.sql`.

| Table | Max | Window |
|-------|-----|--------|
| `posts` | 12 | 1 minute |
| `comments` | 45 | 1 minute |
| `chat_messages` | 90 | 1 minute |
| `reports` | 24 | 24 hours |

Errors surface as PostgREST messages (e.g. `Too many posts. Wait a minute and try again.`).

## Anti-spam (DB triggers)

Migrations: `20260401350000_add_anti_spam_flags.sql` (MVP), `20260401350600_antispam_recheck_on_body_update.sql` (recompute on edit).

- **BEFORE INSERT** (`posts_zz_antispam_before_insert`, `comments_zz_antispam_before_insert`): duplicate text within **5 minutes** (normalized body) → flag + score; **link count** over limit (posts: more than 2 URL-like patterns, comments: more than 1) → flag + score.
- **BEFORE UPDATE** (`prevent_user_editing_spam_columns_*`): non-admins cannot set `is_flagged` / `spam_score` directly; when **`body` changes**, spam fields are recomputed from scratch (same duplicate/link rules as INSERT; duplicate check excludes current row `id`). Honors `reziizi.skip_spam_guard` (e.g. report auto-flag).
- **AFTER INSERT**: optional row in `abuse_flags` when `is_flagged`.
- **AFTER UPDATE** (`abuse_flags_after_post_update`, `abuse_flags_after_comment_update`): if `is_flagged` becomes true and was false, insert `abuse_flags` with `reason = auto` — skipped when `skip_spam_guard = 1` (avoids duplicate row with report-threshold path).
- **SELECT RLS**: `posts` / `comments` — unflagged rows visible to all; flagged visible to **author** and **admins** only (soft hide for others).

Helpers: `normalize_body_for_spam`, `count_url_indicators` (uses `regexp_count(text, pattern, 1, 'i')` — no `g` flag (`regexp_count` does not support global); PostgreSQL 15+).

## RPCs (invoked from web client)

| Name | Role |
|------|------|
| `feed_post_ids_by_tag` | Tag feed ordering |
| `feed_trending_post_ids` | Trending feed — score = (net reactions + 0.15×non-flagged comment count) / (age_hours + 2)^1.5 (age floor 15 min); unflagged posts only; see migration `20260401350300_improve_feed_trending_ranking.sql` |
| `search_post_ids` | Search v2 — ranked post ids: FTS (`simple`) + `ts_rank_cd`, ILIKE fallback; excludes `is_flagged`; GIN on `to_tsvector('simple', body)` — `20260401350400_add_search_v2_rpcs.sql` |
| `search_profile_ids` | Search v2 — ranked profile ids by email match (exact / prefix / substring); `searchable` or self row; same privacy as legacy client query |
| `get_or_create_conversation` | Chat thread id |
| `admin_set_user_banned` | Admin ban/unban (+ reason) |
| `admin_set_user_premium_until` | Admin premium window |

Other `public` functions exist for triggers (e.g. `handle_new_user`, `notify_post_owner_on_*`, `notify_followed_user_on_follow`, `enforce_*_rate_limit`, anti-spam helpers above); not called directly from the app.

## Storage (Supabase)

Not in `public`; configured in `storage.buckets` / policies on `storage.objects`. See migrations `20260401280000_add_storage_post_images.sql`, `20260401320000_add_post_videos_storage_and_video_url.sql`, `20260401300000_add_profiles_avatar_url_and_storage_avatars.sql`.

| Bucket id | Public read | File limit | Allowed MIME | Object path pattern |
|-----------|-------------|------------|--------------|---------------------|
| `post-images` | yes | 5 MiB | `image/jpeg`, `image/png`, `image/webp`, `image/gif` | `posts/{user_id}/{post_id}/{filename}` |
| `post-videos` | yes | 50 MiB | `video/mp4`, `video/webm` | `posts/{user_id}/{post_id}/{filename}` |
| `avatars` | yes | 2 MiB | same image MIMEs | `avatars/{user_id}/{filename}` |

Authenticated users may **insert/update/delete** post images and post videos only under `posts/{their_user_id}/...`, and avatars only under `avatars/{their_user_id}/...`.

### Account deletion (Edge Function)

User-initiated deletion is implemented by the **`delete-account`** Edge Function (not SQL-only): it removes objects under **`avatars/{user_id}/`**, **`post-images`** prefix `posts/{user_id}/`, and **`post-videos`** prefix `posts/{user_id}/`, then deletes the **`auth.users`** row (public rows cascade per FKs — see **`ACCOUNT_DELETION_DESIGN.md`**). Deploy: `supabase functions deploy delete-account`.

## RLS

All listed tables use **Row Level Security**. Policies are defined per migration; admins use `is_admin` and/or `SECURITY DEFINER` RPCs where applicable.

## Verification

Run `verify_schema.sql` in the SQL Editor after deploying migrations.
