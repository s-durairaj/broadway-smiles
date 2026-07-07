/*
# Create page_views table for traffic analytics

## Purpose
Logs every page visit so the practice can see which pages get the most traffic,
where visitors come from, and when site activity peaks.

## New Table: page_views
| Column      | Type        | Description                                      |
|-------------|-------------|--------------------------------------------------|
| id          | uuid (PK)   | Auto-generated unique row ID                     |
| page        | text        | URL pathname viewed (e.g. "/", "/contact")       |
| referrer    | text        | Where the visitor came from (empty = direct)     |
| user_agent  | text        | Browser/device string for device-type analysis   |
| session_id  | text        | Client-generated UUID per browser session        |
| created_at  | timestamptz | Timestamp of the visit (UTC)                     |

## Security
- RLS enabled — table is locked by default.
- INSERT allowed for anon + authenticated so the frontend (anon key) can log visits.
- No SELECT policy for anon: raw data is only readable via the Supabase dashboard
  or service-role queries, keeping visitor data private.
*/

CREATE TABLE IF NOT EXISTS page_views (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page        text NOT NULL,
  referrer    text NOT NULL DEFAULT '',
  user_agent  text NOT NULL DEFAULT '',
  session_id  text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_page_views" ON page_views;
CREATE POLICY "anon_insert_page_views" ON page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
