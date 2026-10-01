-- =====================================================================
-- PERBAIKAN KEAMANAN PEMBAYARAN + TABEL JOB PROFILE
-- Jalankan di: Supabase Dashboard > SQL Editor. Aman dijalankan ulang.
--
-- 1. Tabel payments sebelumnya mengizinkan pengunjung anonim INSERT dan
--    SELECT bebas. Akibatnya siapa pun bisa menulis baris status 'paid'
--    sendiri (paywall jebol) dan membaca nama/email semua pembayar.
--    Penulisan pembayaran dilakukan webhook memakai service role, jadi
--    izin anonim tidak dibutuhkan. Pengecekan status dari browser diganti
--    fungsi cek_pembayaran() yang hanya menjawab ya/tidak.
-- 2. Tabel job_profile dipakai halaman Job Profile & Job Person Match di
--    dashboard, tetapi belum pernah dibuat di database.
-- =====================================================================

-- ── 1. payments ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_insert_payments" ON payments;
DROP POLICY IF EXISTS "anon_select_payments" ON payments;

CREATE OR REPLACE FUNCTION cek_pembayaran(p_peserta uuid, p_tes text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM payments
    WHERE peserta_id = p_peserta AND test_type = p_tes AND status = 'paid'
  );
$$;

REVOKE ALL ON FUNCTION cek_pembayaran(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION cek_pembayaran(uuid, text) TO anon, authenticated;

-- ── 2. job_profile ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_profile (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_jabatan text NOT NULL,
  skor_d       integer NOT NULL DEFAULT 0,
  skor_i       integer NOT NULL DEFAULT 0,
  skor_s       integer NOT NULL DEFAULT 0,
  skor_c       integer NOT NULL DEFAULT 0,
  created_at   timestamptz DEFAULT now()
);
ALTER TABLE job_profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_all_job_profile" ON job_profile;
CREATE POLICY "admin_all_job_profile"
  ON job_profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Agar PostgREST langsung mengenali tabel & fungsi baru
NOTIFY pgrst, 'reload schema';
