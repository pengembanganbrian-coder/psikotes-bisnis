-- =====================================================
-- SQL untuk membuat tabel PAPI Kostick di Supabase
-- Jalankan di: Supabase Dashboard > SQL Editor
-- =====================================================

-- Tabel peserta PAPI
CREATE TABLE IF NOT EXISTS peserta_papi (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nama       text NOT NULL,
  nip        text,
  jabatan    text,
  created_at timestamptz DEFAULT now()
);

-- Tabel hasil PAPI (20 skala, masing-masing 0–9)
CREATE TABLE IF NOT EXISTS hasil_papi (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  peserta_id  uuid REFERENCES peserta_papi(id) ON DELETE CASCADE,
  profil      text,          -- top-3 skala tertinggi, e.g. "L, N, R"
  -- ROLES
  skor_g  int2 DEFAULT 0,    -- Role of Group Dependent
  skor_l  int2 DEFAULT 0,    -- Leadership Role
  skor_i  int2 DEFAULT 0,    -- Ease in Decision Making
  skor_t  int2 DEFAULT 0,    -- Pace Role
  skor_v  int2 DEFAULT 0,    -- Vigorous Type Role
  skor_s  int2 DEFAULT 0,    -- Social Extension Role
  skor_r  int2 DEFAULT 0,    -- Role of the Hard Worker
  skor_d  int2 DEFAULT 0,    -- Need to be Noticed
  skor_c  int2 DEFAULT 0,    -- Need to Change
  skor_e  int2 DEFAULT 0,    -- Emotional Resistant Role
  -- NEEDS
  skor_n  int2 DEFAULT 0,    -- Need for Achievement
  skor_a  int2 DEFAULT 0,    -- Need for Status
  skor_p  int2 DEFAULT 0,    -- Need for Control
  skor_x  int2 DEFAULT 0,    -- Need for Activity
  skor_b  int2 DEFAULT 0,    -- Need to Belong
  skor_o  int2 DEFAULT 0,    -- Need for Relationships
  skor_z  int2 DEFAULT 0,    -- Need for Affection
  skor_k  int2 DEFAULT 0,    -- Need to be Forceful
  skor_f  int2 DEFAULT 0,    -- Need to Support Authority
  skor_w  int2 DEFAULT 0,    -- Need for Rules
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (opsional, sesuaikan kebijakan)
ALTER TABLE peserta_papi ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_papi   ENABLE ROW LEVEL SECURITY;

-- Policy: siapa saja bisa INSERT (peserta mengisi tes)
CREATE POLICY "allow insert peserta_papi" ON peserta_papi
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow insert hasil_papi" ON hasil_papi
  FOR INSERT WITH CHECK (true);

-- Policy: hanya user terautentikasi yang bisa SELECT (admin dashboard)
CREATE POLICY "allow select peserta_papi" ON peserta_papi
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "allow select hasil_papi" ON hasil_papi
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: hanya user terautentikasi yang bisa DELETE
CREATE POLICY "allow delete peserta_papi" ON peserta_papi
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "allow delete hasil_papi" ON hasil_papi
  FOR DELETE USING (auth.role() = 'authenticated');
