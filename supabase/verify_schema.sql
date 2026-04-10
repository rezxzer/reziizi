-- REZIIZI — Supabase დამონტაჟების შემოწმება
-- გაუშვი მთლიანად (Run) და შედეგები ჩაგიგდე ჩატში (ან სქრინშოტი).

-- === 1) public ცხრილები ===
SELECT table_name AS public_table
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- === 2) RLS ჩართულია თუ არა (TRUE = ჩართული) ===
SELECT c.relname AS table_name, c.relrowsecurity AS rls_on
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
ORDER BY c.relname;

-- === 3) პოლიტიკების რაოდენობა ცხრილზე ===
SELECT tablename, COUNT(*)::int AS policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- === 4) მნიშვნელოვანი public ფუნქციები / RPC (სახელები) ===
SELECT p.proname AS function_name
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.prokind = 'f'
  AND p.proname IN (
    'handle_new_user',
    'feed_post_ids_by_tag',
    'feed_trending_post_ids',
    'search_post_ids',
    'search_profile_ids',
    'user_commented_post_ids',
    'my_post_video_count_today',
    'get_or_create_conversation',
    'notify_post_owner_on_comment',
    'notify_post_owner_on_reaction',
    'notify_followed_user_on_follow',
    'touch_conversation_on_message',
    'admin_set_user_banned',
    'admin_set_user_premium_until',
    'enforce_post_rate_limit',
    'enforce_comment_rate_limit',
    'enforce_chat_message_rate_limit',
    'enforce_report_rate_limit',
    'normalize_body_for_spam',
    'spam_duplicate_eligible',
    'count_url_indicators',
    'prevent_user_editing_spam_columns_posts',
    'prevent_user_editing_spam_columns_comments',
    'posts_enforce_tier_limits',
    'post_tags_enforce_tier_limit',
    'posts_antispam_before_insert',
    'comments_antispam_before_insert',
    'abuse_flags_after_post_insert',
    'abuse_flags_after_comment_insert',
    'abuse_flags_after_post_update',
    'abuse_flags_after_comment_update',
    'reports_after_insert_auto_flag_post'
  )
ORDER BY p.proname;

-- === 5) ტრიგერი auth.users → პროფილი (signup) ===
SELECT trigger_name, event_manipulation, action_timing
FROM information_schema.triggers
WHERE event_object_schema = 'auth'
  AND event_object_table = 'users'
ORDER BY trigger_name;

-- === 6) Realtime publication (chat_messages უნდა იყოს სიაში, თუ chat migration გაშვებულია) ===
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
  AND schemaname = 'public'
ORDER BY tablename;

-- === 7) რიგები ცხრილებში (0 = ცარიელი; თუ ERROR — შესაბამისი ცხრილი/მიგრაცია აკლია) ===
SELECT 'profiles' AS tbl, COUNT(*)::bigint AS rows FROM public.profiles
UNION ALL SELECT 'posts', COUNT(*) FROM public.posts
UNION ALL SELECT 'reactions', COUNT(*) FROM public.reactions
UNION ALL SELECT 'comments', COUNT(*) FROM public.comments
UNION ALL SELECT 'notifications', COUNT(*) FROM public.notifications
UNION ALL SELECT 'tags', COUNT(*) FROM public.tags
UNION ALL SELECT 'post_tags', COUNT(*) FROM public.post_tags
UNION ALL SELECT 'conversations', COUNT(*) FROM public.conversations
UNION ALL SELECT 'chat_messages', COUNT(*) FROM public.chat_messages
UNION ALL SELECT 'reports', COUNT(*) FROM public.reports
UNION ALL SELECT 'ad_slots', COUNT(*) FROM public.ad_slots
UNION ALL SELECT 'ad_placement_requests', COUNT(*) FROM public.ad_placement_requests
UNION ALL SELECT 'follows', COUNT(*) FROM public.follows
UNION ALL SELECT 'abuse_flags', COUNT(*) FROM public.abuse_flags;

-- === 8) profiles: display_name + bio (profile polish) ===
SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profiles'
  AND column_name IN ('display_name', 'bio')
ORDER BY column_name;

-- === 9) ad_slots: optional promo video URL ===
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'ad_slots'
  AND column_name = 'video_url';
