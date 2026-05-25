-- =====================================================
-- SQL untuk membuat tabel DASS-21 di Supabase
-- Jalankan di: Supabase Dashboard > SQL Editor
-- =====================================================

-- Tabel peserta DASS
CREATE TABLE IF NOT EXISTS peserta_dass (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nama       text NOT NULL,
  nip        text,
  jabatan    text,    -- unit kerja
  created_at timestamptz DEFAULT now()
);

-- Tabel hasil DASS-21
-- Skor sudah dikali 2 (sesuai norma DASS-21), range 0–42 per skala
CREATE TABLE IF NOT EXISTS hasil_dass (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  peserta_id        uuid REFERENCES peserta_dass(id) ON DELETE CASCADE,
  -- Skor (×2): 0–42 per dimensi
  skor_depresi      int2 NOT NULL DEFAULT 0 CHECK (skor_depresi  BETWEEN 0 AND 42),
  skor_anxietas     int2 NOT NULL DEFAULT 0 CHECK (skor_anxietas BETWEEN 0 AND 42),
  skor_stres        int2 NOT NULL DEFAULT 0 CHECK (skor_stres    BETWEEN 0 AND 42),
  -- Kategori: Normal / Ringan / Sedang / Berat / Sangat Berat
  kategori_depresi  text NOT NULL,
  kategori_anxietas text NOT NULL,
  kategori_stres    text NOT NULL,
  created_at        timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE peserta_dass ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_dass   ENABLE ROW LEVEL SECURITY;

-- Policy: siapa saja bisa INSERT (peserta mengisi tes)
CREATE POLICY "allow insert peserta_dass" ON peserta_dass
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow insert hasil_dass" ON hasil_dass
  FOR INSERT WITH CHECK (true);

-- Policy: hanya user terautentikasi yang bisa SELECT (admin dashboard)
CREATE POLICY "allow select peserta_dass" ON peserta_dass
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "allow select hasil_dass" ON hasil_dass
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: hanya user terautentikasi yang bisa DELETE
CREATE POLICY "allow delete peserta_dass" ON peserta_dass
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "allow delete hasil_dass" ON hasil_dass
  FOR DELETE USING (auth.role() = 'authenticated');

-- ── Norma DASS-21 untuk referensi ──────────────────────────────────
-- Depresi  : Normal 0-9, Ringan 10-13, Sedang 14-20, Berat 21-27, Sangat Berat ≥28
-- Kecemasan: Normal 0-7, Ringan 8-9,  Sedang 10-14, Berat 15-19, Sangat Berat ≥20
-- Stres    : Normal 0-14, Ringan 15-18, Sedang 19-25, Berat 26-33, Sangat Berat ≥34
