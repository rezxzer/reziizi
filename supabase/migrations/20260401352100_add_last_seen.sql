-- Last seen / online status.
-- `last_seen_at` is updated periodically by the client (heartbeat).
-- A user is "online" if last_seen_at is within the last 5 minutes.

ALTER TABLE profiles
  ADD COLUMN last_seen_at timestamptz;

COMMENT ON COLUMN profiles.last_seen_at IS
  'Last activity timestamp. Updated by client heartbeat. NULL = never seen / offline.';

-- RPC to update last_seen_at for the current user (lightweight, called on interval).
CREATE OR REPLACE FUNCTION update_last_seen()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET last_seen_at = now()
  WHERE id = auth.uid();
END;
$$;
