/*
# Convert student_journeys to multi-tenant with owner-scoped RLS

## What This Does
Converts the previously single-tenant student_journeys table into a multi-user table
where each user only sees and modifies their own journey data.

## Changes

### 1. Clean Up
- Deletes existing single-tenant test rows (they had no owning user).

### 2. New Column
- `user_id` (uuid, NOT NULL, DEFAULT auth.uid(), references auth.users with ON DELETE CASCADE)
  Added as nullable first (without FK), then set NOT NULL with DEFAULT, then FK added.

### 3. Index
- Index on user_id for fast lookups.

### 4. Security Changes (RLS Policies)
- All previous anon-accessible policies are dropped.
- New owner-scoped policies (TO authenticated, auth.uid() = user_id):
  - SELECT, INSERT, UPDATE, DELETE all scoped to the owning user.

### Important Notes
1. The app now requires sign-in. Unauthenticated users cannot access any journey data.
2. Existing test rows from single-tenant mode have been removed (no owner could be determined).
3. Email confirmation remains OFF.
*/

-- Step 1: Remove existing single-tenant test rows (they have no owning user)
DELETE FROM student_journeys;

-- Step 2: Add user_id column as nullable (without FK constraint first)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_journeys' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE student_journeys
      ADD COLUMN user_id uuid;
  END IF;
END $$;

-- Step 3: Set NOT NULL and DEFAULT auth.uid()
ALTER TABLE student_journeys
  ALTER COLUMN user_id SET NOT NULL,
  ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Step 4: Add FK constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'student_journeys_user_id_fkey'
  ) THEN
    ALTER TABLE student_journeys
      ADD CONSTRAINT student_journeys_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_student_journeys_user_id ON student_journeys(user_id);

-- Drop old anon-accessible policies
DROP POLICY IF EXISTS "anon_select_journeys" ON student_journeys;
DROP POLICY IF EXISTS "anon_insert_journeys" ON student_journeys;
DROP POLICY IF EXISTS "anon_update_journeys" ON student_journeys;
DROP POLICY IF EXISTS "anon_delete_journeys" ON student_journeys;

-- New owner-scoped policies (authenticated only)
DROP POLICY IF EXISTS "select_own_journey" ON student_journeys;
CREATE POLICY "select_own_journey" ON student_journeys FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_journey" ON student_journeys;
CREATE POLICY "insert_own_journey" ON student_journeys FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_journey" ON student_journeys;
CREATE POLICY "update_own_journey" ON student_journeys FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_journey" ON student_journeys;
CREATE POLICY "delete_own_journey" ON student_journeys FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
