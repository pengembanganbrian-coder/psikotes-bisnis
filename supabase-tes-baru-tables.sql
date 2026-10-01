-- =====================================================================
-- TABEL 4 TES BARU (BETA): Big Five, RIASEC, Resiliensi, Peran dalam Tim
-- Jalankan di: Supabase Dashboard > SQL Editor
--
-- Pola sama dengan tes lain (peserta_* + hasil_*), tetapi skor disimpan
-- sebagai jsonb ({ "O": 72, "C": 65, ... }) supaya satu struktur bisa
-- dipakai keempat tes. Kolom `ringkasan` dipakai daftar & ekspor dashboard.
--
-- id peserta dibuat di sisi klien (crypto.randomUUID), sehingga pengunjung
-- anonim cukup diberi izin INSERT -- tidak perlu izin SELECT.
--
-- Aman dijalankan ulang.
-- =====================================================================

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['bigfive', 'riasec', 'resiliensi', 'peran_tim'] LOOP
    EXECUTE format($f$
      CREATE TABLE IF NOT EXISTS peserta_%1$s (
        id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        nama       text NOT NULL,
        nip        text,          -- email peserta
        jabatan    text,          -- "usia th · jenis kelamin"
        created_at timestamptz DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS hasil_%1$s (
        id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        peserta_id uuid REFERENCES peserta_%1$s(id) ON DELETE CASCADE,
        skor       jsonb NOT NULL,
        ringkasan  text,
        jawaban    jsonb,
        created_at timestamptz DEFAULT now()
      );
      ALTER TABLE peserta_%1$s ENABLE ROW LEVEL SECURITY;
      ALTER TABLE hasil_%1$s   ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "insert peserta_%1$s" ON peserta_%1$s;
      DROP POLICY IF EXISTS "insert hasil_%1$s"   ON hasil_%1$s;
      DROP POLICY IF EXISTS "select peserta_%1$s" ON peserta_%1$s;
      DROP POLICY IF EXISTS "select hasil_%1$s"   ON hasil_%1$s;
      DROP POLICY IF EXISTS "delete peserta_%1$s" ON peserta_%1$s;
      DROP POLICY IF EXISTS "delete hasil_%1$s"   ON hasil_%1$s;

      -- Siapa saja boleh mengisi tes
      CREATE POLICY "insert peserta_%1$s" ON peserta_%1$s FOR INSERT WITH CHECK (true);
      CREATE POLICY "insert hasil_%1$s"   ON hasil_%1$s   FOR INSERT WITH CHECK (true);
      -- Hanya admin (login) yang boleh melihat & menghapus
      CREATE POLICY "select peserta_%1$s" ON peserta_%1$s FOR SELECT USING (auth.role() = 'authenticated');
      CREATE POLICY "select hasil_%1$s"   ON hasil_%1$s   FOR SELECT USING (auth.role() = 'authenticated');
      CREATE POLICY "delete peserta_%1$s" ON peserta_%1$s FOR DELETE USING (auth.role() = 'authenticated');
      CREATE POLICY "delete hasil_%1$s"   ON hasil_%1$s   FOR DELETE USING (auth.role() = 'authenticated');
    $f$, t);
  END LOOP;
END $$;

-- Tabel payments: kolom test_type bertipe TEXT bebas, jadi nilai baru
-- ('Big Five', 'RIASEC', 'Resiliensi', 'Peran Tim') tidak perlu migrasi.
-- PENTING untuk integrasi pembayaran (Mayar.id): harga harus ditentukan di
-- server berdasarkan test_type -- jangan memakai angka yang dikirim browser.
-- Harga tes baru: 15.000 per tes.
