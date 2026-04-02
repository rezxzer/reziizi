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
| `notifications` | Comment/reaction notifications for post owner |
| `tags` | Tag slugs |
| `post_tags` | Post ↔ tag links |
| `conversations` | Chat threads (pair of user ids) |
| `chat_messages` | Messages in a conversation |
| `reports` | User reports on posts |
| `ad_slots` | Sponsored slots (e.g. `feed_top`) |

### `profiles`

- `id` (PK, FK → `auth.users`)
- `email`, `created_at`
- `avatar_url` (nullable; public Storage URL, bucket `avatars`)
- `is_admin`, `is_banned`
- `ban_reason`, `banned_at` (ban UX; cleared on unban)
- `premium_until` (monetization / admin grant)
- `searchable` (privacy: email search opt-out)
- Triggers: `profiles_lock_is_admin…`, `profiles_premium_guard`, `on_auth_user_created` → `handle_new_user`

### `posts`

- `id`, `user_id`, `body`, `image_url` (nullable; public Storage URL for post image), `created_at`, `updated_at`

### `reactions`

- `id`, `post_id`, `user_id`, `value` (−1 \| 1), `created_at` — unique `(post_id, user_id)`

### `comments`

- `id`, `post_id`, `user_id`, `body`, `created_at`, `updated_at`

### `notifications`

- `id`, `user_id` (recipient), `type` (`comment` \| `reaction`), `actor_id`, `post_id`, `comment_id`, `read_at`, `created_at`

### `tags` / `post_tags`

- `tags`: `id`, `slug`, `created_at`
- `post_tags`: `post_id`, `tag_id` (composite PK in migration)

### `conversations`

- `id`, `user_a`, `user_b`, `last_message_at`, `created_at` — ordered pair semantics via RPC

### `chat_messages`

- `id`, `conversation_id`, `sender_id`, `body`, `created_at`

### `reports`

- `id`, `reporter_id`, `post_id`, `reason`, `created_at` — unique reporter/post where applicable (see migration)

### `ad_slots`

- `id`, `placement` (unique), `title`, `body`, `link_url`, `is_active`, `updated_at`

## RPCs (invoked from web client)

| Name | Role |
|------|------|
| `feed_post_ids_by_tag` | Tag feed ordering |
| `feed_trending_post_ids` | Trending feed |
| `get_or_create_conversation` | Chat thread id |
| `admin_set_user_banned` | Admin ban/unban (+ reason) |
| `admin_set_user_premium_until` | Admin premium window |

Other `public` functions exist for triggers (e.g. `handle_new_user`, `notify_post_owner_on_*`); not called directly from the app.

## Storage (Supabase)

Not in `public`; configured in `storage.buckets` / policies on `storage.objects`. See migrations `20260401280000_add_storage_post_images.sql`, `20260401300000_add_profiles_avatar_url_and_storage_avatars.sql`.

| Bucket id | Public read | File limit | Allowed MIME | Object path pattern |
|-----------|-------------|------------|--------------|---------------------|
| `post-images` | yes | 5 MiB | `image/jpeg`, `image/png`, `image/webp`, `image/gif` | `posts/{user_id}/{post_id}/{filename}` |
| `avatars` | yes | 2 MiB | same image MIMEs | `avatars/{user_id}/{filename}` |

Authenticated users may **insert/update/delete** post images only under `posts/{their_user_id}/...`, and avatars only under `avatars/{their_user_id}/...`.

## RLS

All listed tables use **Row Level Security**. Policies are defined per migration; admins use `is_admin` and/or `SECURITY DEFINER` RPCs where applicable.

## Verification

Run `verify_schema.sql` in the SQL Editor after deploying migrations.
