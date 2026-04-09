-- Private profile support + follow requests
-- When is_private = true, non-followers cannot see posts/bio/stats.
-- Following a private profile creates a follow_request instead of a direct follow.

-- 1. Add is_private column to profiles
ALTER TABLE profiles
  ADD COLUMN is_private boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN profiles.is_private IS
  'When true, only approved followers can see posts, bio, and stats.';

-- 2. Create follow_requests table
CREATE TABLE follow_requests (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT follow_requests_no_self CHECK (requester_id <> target_id),
  CONSTRAINT follow_requests_unique UNIQUE (requester_id, target_id)
);

CREATE INDEX idx_follow_requests_target ON follow_requests(target_id, created_at DESC);
CREATE INDEX idx_follow_requests_requester ON follow_requests(requester_id, target_id);

COMMENT ON TABLE follow_requests IS
  'Pending follow requests for private profiles. Accepted → row deleted + inserted into follows.';

-- 3. RLS for follow_requests
ALTER TABLE follow_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can see requests they sent or received
CREATE POLICY follow_requests_select ON follow_requests
  FOR SELECT USING (
    auth.uid() = requester_id OR auth.uid() = target_id
  );

-- Authenticated users can insert their own requests
CREATE POLICY follow_requests_insert ON follow_requests
  FOR INSERT WITH CHECK (
    auth.uid() = requester_id
  );

-- Requester can cancel, target can delete (accept/reject)
CREATE POLICY follow_requests_delete ON follow_requests
  FOR DELETE USING (
    auth.uid() = requester_id OR auth.uid() = target_id
  );

-- 4. RPC: accept a follow request (atomic: delete request + insert follow)
CREATE OR REPLACE FUNCTION accept_follow_request(p_requester_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_target_id uuid := auth.uid();
BEGIN
  IF v_target_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Delete the request (verify it exists and belongs to us)
  DELETE FROM follow_requests
  WHERE requester_id = p_requester_id
    AND target_id = v_target_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Follow request not found';
  END IF;

  -- Insert the follow (ignore if already exists)
  INSERT INTO follows (follower_id, following_id)
  VALUES (p_requester_id, v_target_id)
  ON CONFLICT (follower_id, following_id) DO NOTHING;
END;
$$;
