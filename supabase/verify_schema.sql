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
    'get_or_create_conversation',
    'notify_post_owner_on_comment',
    'notify_post_owner_on_reaction',
    'touch_conversation_on_message',
    'admin_set_user_banned',
    'admin_set_user_premium_until'
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
UNION ALL SELECT 'ad_slots', COUNT(*) FROM public.ad_slots;
