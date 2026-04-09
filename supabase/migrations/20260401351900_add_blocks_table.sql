-- Block system: users can block other users.
-- Blocked users cannot: see blocker's profile, follow, message, or interact.

CREATE TABLE blocks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT blocks_no_self CHECK (blocker_id <> blocked_id),
  CONSTRAINT blocks_unique UNIQUE (blocker_id, blocked_id)
);

CREATE INDEX idx_blocks_blocker ON blocks(blocker_id, blocked_id);
CREATE INDEX idx_blocks_blocked ON blocks(blocked_id, blocker_id);

COMMENT ON TABLE blocks IS
  'User blocks. When A blocks B: B cannot see A profile, follow A, or message A.';

-- RLS
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Users can see blocks they created or blocks against them
CREATE POLICY blocks_select ON blocks
  FOR SELECT USING (
    auth.uid() = blocker_id OR auth.uid() = blocked_id
  );

-- Users can only insert blocks they create
CREATE POLICY blocks_insert ON blocks
  FOR INSERT WITH CHECK (
    auth.uid() = blocker_id
  );

-- Users can only delete (unblock) blocks they created
CREATE POLICY blocks_delete ON blocks
  FOR DELETE USING (
    auth.uid() = blocker_id
  );

-- When blocking, also remove any existing follow relationships in both directions
-- and any pending follow requests in both directions.
CREATE OR REPLACE FUNCTION block_user_cleanup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Remove follow in both directions
  DELETE FROM follows
  WHERE (follower_id = NEW.blocker_id AND following_id = NEW.blocked_id)
     OR (follower_id = NEW.blocked_id AND following_id = NEW.blocker_id);

  -- Remove follow requests in both directions
  DELETE FROM follow_requests
  WHERE (requester_id = NEW.blocker_id AND target_id = NEW.blocked_id)
     OR (requester_id = NEW.blocked_id AND target_id = NEW.blocker_id);

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_block_cleanup
  AFTER INSERT ON blocks
  FOR EACH ROW
  EXECUTE FUNCTION block_user_cleanup();
