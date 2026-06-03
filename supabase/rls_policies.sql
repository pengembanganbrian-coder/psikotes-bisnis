-- ============================================================
-- AssesIN — Database Setup + Row Level Security Policies
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================
-- Security model:
--   anon  (public)       : INSERT only on participant/result tables
--   authenticated (admin): FULL access to all tables
-- ============================================================

-- ── Buat tabel payments jika belum ada ───────────────────────

CREATE TABLE IF NOT EXISTS payments (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id                TEXT UNIQUE NOT NULL,
  peserta_id              UUID NOT NULL,
  test_type               TEXT NOT NULL,
  nama                    TEXT,
  email                   TEXT,
  amount                  INTEGER NOT NULL,
  snap_token              TEXT,
  status                  TEXT NOT NULL DEFAULT 'pending',  -- pending | paid | failed
  midtrans_transaction_id TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS payments_updated_at ON payments;
CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Enable RLS on all tables ─────────────────────────────────

ALTER TABLE peserta               ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_tes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE peserta_disc          ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_disc            ENABLE ROW LEVEL SECURITY;
ALTER TABLE peserta_papi          ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_papi            ENABLE ROW LEVEL SECURITY;
ALTER TABLE peserta_dass          ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_dass            ENABLE ROW LEVEL SECURITY;
ALTER TABLE peserta_love_language ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_love_language   ENABLE ROW LEVEL SECURITY;
ALTER TABLE peserta_msdt          ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_msdt            ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_profile           ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments              ENABLE ROW LEVEL SECURITY;

-- ── Drop existing policies (safe to re-run) ──────────────────

DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT schemaname, tablename, policyname
           FROM pg_policies
           WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                   r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- ════════════════════════════════════════════════════════════
-- MBTI
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_peserta"
  ON peserta FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_peserta"
  ON peserta FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_hasil_tes"
  ON hasil_tes FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_hasil_tes"
  ON hasil_tes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- DISC
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_peserta_disc"
  ON peserta_disc FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_peserta_disc"
  ON peserta_disc FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_hasil_disc"
  ON hasil_disc FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_hasil_disc"
  ON hasil_disc FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- PAPI
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_peserta_papi"
  ON peserta_papi FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_peserta_papi"
  ON peserta_papi FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_hasil_papi"
  ON hasil_papi FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_hasil_papi"
  ON hasil_papi FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- DASS
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_peserta_dass"
  ON peserta_dass FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_peserta_dass"
  ON peserta_dass FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_hasil_dass"
  ON hasil_dass FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_hasil_dass"
  ON hasil_dass FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- Love Language
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_peserta_ll"
  ON peserta_love_language FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_peserta_ll"
  ON peserta_love_language FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_hasil_ll"
  ON hasil_love_language FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_hasil_ll"
  ON hasil_love_language FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- MSDT
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_peserta_msdt"
  ON peserta_msdt FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_peserta_msdt"
  ON peserta_msdt FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_hasil_msdt"
  ON hasil_msdt FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_all_hasil_msdt"
  ON hasil_msdt FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- Job Profile (admin only)
-- ════════════════════════════════════════════════════════════
CREATE POLICY "admin_all_job_profile"
  ON job_profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- Payments
-- anon: INSERT (via Edge Function) + SELECT (cek status bayar)
-- authenticated (admin): full access
-- ════════════════════════════════════════════════════════════
CREATE POLICY "anon_insert_payments"
  ON payments FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_select_payments"
  ON payments FOR SELECT TO anon USING (true);

CREATE POLICY "admin_all_payments"
  ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- Verifikasi — jalankan ini untuk cek hasilnya:
-- ════════════════════════════════════════════════════════════
-- SELECT schemaname, tablename, policyname, roles, cmd
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
