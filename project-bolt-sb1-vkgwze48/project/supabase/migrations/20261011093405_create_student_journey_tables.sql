/*
# Create student journey tables (single-tenant, no auth)

1. New Tables
- `student_journeys`: Stores each student's onboarding profile and career journey progress.
  - `id` (uuid, primary key)
  - `name` (text, student's full name)
  - `degree` (text, current course/degree)
  - `current_year` (int, current semester)
  - `career_goal` (text, ultimate career goal)
  - `skills` (jsonb, array of skill tag objects)
  - `cgpa_entries` (jsonb, array of CGPA entry objects)
  - `completed_steps` (jsonb, array of roadmap step IDs the student marked done)
  - `applied_jobs` (jsonb, array of job IDs the student applied to)
  - `saved_courses` (jsonb, array of course IDs the student saved/bookmarked)
  - `created_at` (timestamptz, when journey was created)
  - `updated_at` (timestamptz, last modification timestamp)

2. Security
- Enable RLS on `student_journeys`.
- This is a single-tenant app with no sign-in, so all CRUD is allowed for anon + authenticated.
- `USING (true)` is acceptable because the data is intentionally public/shared across sessions.
*/

CREATE TABLE IF NOT EXISTS student_journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  degree text NOT NULL,
  current_year int NOT NULL DEFAULT 1,
  career_goal text NOT NULL,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  cgpa_entries jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  applied_jobs jsonb NOT NULL DEFAULT '[]'::jsonb,
  saved_courses jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE student_journeys ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_journeys" ON student_journeys;
CREATE POLICY "anon_select_journeys" ON student_journeys FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_journeys" ON student_journeys;
CREATE POLICY "anon_insert_journeys" ON student_journeys FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_journeys" ON student_journeys;
CREATE POLICY "anon_update_journeys" ON student_journeys FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_journeys" ON student_journeys;
CREATE POLICY "anon_delete_journeys" ON student_journeys FOR DELETE
  TO anon, authenticated USING (true);
