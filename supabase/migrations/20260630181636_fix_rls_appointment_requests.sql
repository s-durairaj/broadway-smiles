DROP POLICY IF EXISTS "anon_insert_appointment_requests" ON appointment_requests;

CREATE POLICY "anon_insert_appointment_requests" ON appointment_requests
FOR INSERT TO anon
WITH CHECK (
  char_length(trim(name)) > 0 AND
  char_length(trim(phone)) > 0
);
