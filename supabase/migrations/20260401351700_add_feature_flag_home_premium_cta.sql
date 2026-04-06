-- REZIIZI: optional Premium promo strip on home feed (admin can disable)

insert into public.feature_flags (key, enabled, description) values
  ('home_premium_cta', true, 'Premium promo card on home (links to Settings or Sign in)')
on conflict (key) do nothing;
