-- User reports: users can report other users for spam, harassment, etc.
-- Separate from post reports (which target specific posts).

CREATE TABLE user_reports (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason       text NOT NULL CHECK (char_length(trim(reason)) >= 1 AND char_length(reason) <= 2000),
  created_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_reports_no_self CHECK (reporter_id <> reported_id),
  CONSTRAINT user_reports_one_per_pair UNIQUE (reporter_id, reported_id)
);

CREATE INDEX idx_user_reports_reported ON user_reports(reported_id, created_at DESC);
CREATE INDEX idx_user_reports_created ON user_reports(created_at DESC);

COMMENT ON TABLE user_reports IS
  'User-level reports (spam, harassment, etc). Admins review in admin panel.';

ALTER TABLE user_reports ENABLE ROW LEVEL SECURITY;

-- Users see their own reports; admins see all
CREATE POLICY user_reports_select ON user_reports
  FOR SELECT USING (
    reporter_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin IS TRUE
    )
  );

-- Users can insert their own reports
CREATE POLICY user_reports_insert ON user_reports
  FOR INSERT WITH CHECK (
    auth.uid() = reporter_id
  );

-- Only admins can delete (dismiss) reports
CREATE POLICY user_reports_delete ON user_reports
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin IS TRUE
    )
  );
