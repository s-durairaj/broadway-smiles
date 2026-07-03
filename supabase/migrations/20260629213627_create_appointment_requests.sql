/*
# Create appointment_requests table

## Purpose
Stores appointment requests collected by the chatbot widget on the Broadway Smiles website.

## New Tables
- `appointment_requests`
  - `id` (uuid, primary key) — auto-generated unique identifier
  - `name` (text, not null) — patient's full name
  - `phone` (text, not null) — patient's phone number
  - `preferred_date` (text) — preferred appointment date entered by patient
  - `preferred_time` (text) — preferred appointment time slot
  - `reason` (text) — reason for visit / service requested
  - `created_at` (timestamptz) — when the request was submitted

## Security
- RLS enabled on `appointment_requests`
- Anon + authenticated INSERT allowed so the public chatbot can submit requests
- NO public SELECT — patients cannot read other patients' data
- Service role (used by office staff/admin) can read all rows via bypass

## Notes
1. No auth is required to submit — the chatbot runs as the anon role
2. SELECT is intentionally restricted; office staff access data via Supabase dashboard
*/

CREATE TABLE IF NOT EXISTS appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  preferred_date text,
  preferred_time text,
  reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_appointment_requests" ON appointment_requests;
CREATE POLICY "anon_insert_appointment_requests" ON appointment_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);
