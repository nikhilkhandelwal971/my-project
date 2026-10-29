/*
# Add branch, target CGPA, and optional entrance/board fields to student_journeys

## What This Does
Extends the student_journeys table to support a multi-branch engineering platform
with flexible onboarding for freshers and students from any engineering branch.

## Changes

### 1. New Columns (all additive, no data loss)
- `branch` (text, nullable): Engineering branch selected during onboarding.
  One of: CSE, AIML, Data Science, ECE, Electrical, Mechanical, Civil, Others.
  Nullable so existing rows (if any) are not broken.
- `target_cgpa` (numeric, nullable): For 1st-sem freshers with no CGPA yet,
  the target CGPA they want to achieve in Semester 1. Optional.
- `board_percentage` (text, nullable): Optional 12th Board percentage or
  State Exam score. Stored as text to allow flexible formats (e.g. "92.5%",
  "Rank 4500"). Nullable.
- `entrance_exam_rank` (text, nullable): Optional JEE / State CET / other
  entrance exam rank. NOT mandatory. Stored as text to allow flexible formats
  (e.g. "JEE Adv Rank 12000", "Skip"). Nullable.

### 2. Security
- No policy changes. Existing owner-scoped RLS policies remain in effect.

### Important Notes
1. All new columns are nullable — no existing data is lost or invalidated.
2. branch is free text but the frontend constrains it to a fixed list.
3. target_cgpa is numeric so it can be charted alongside real CGPA entries.
4. JEE / entrance exam rank is explicitly optional — the frontend provides a
   "Skip / Not Applicable" button and never requires it.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_journeys' AND column_name = 'branch'
  ) THEN
    ALTER TABLE student_journeys
      ADD COLUMN branch text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_journeys' AND column_name = 'target_cgpa'
  ) THEN
    ALTER TABLE student_journeys
      ADD COLUMN target_cgpa numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_journeys' AND column_name = 'board_percentage'
  ) THEN
    ALTER TABLE student_journeys
      ADD COLUMN board_percentage text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_journeys' AND column_name = 'entrance_exam_rank'
  ) THEN
    ALTER TABLE student_journeys
      ADD COLUMN entrance_exam_rank text;
  END IF;
END $$;
