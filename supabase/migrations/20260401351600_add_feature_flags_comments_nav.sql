-- REZIIZI: more feature flags — post comments, nav search, nav messages (staging / rollout)

insert into public.feature_flags (key, enabled, description) values
  ('post_comments', true, 'Comment thread under each post (feed, profile, search)'),
  ('nav_search', true, 'Search link in site header'),
  ('nav_messages', true, 'Messages / chat link in header and chat routes')
on conflict (key) do nothing;
