-- =====================================================================
-- Ruang Tes Kemampuan: Pauli Digital & Tes Kemampuan Kognitif
-- Jalankan di: Supabase Dashboard > SQL Editor. Aman dijalankan ulang.
--
-- Pola sama dengan tes beta (supabase-tes-baru-tables.sql): skor jsonb,
-- id peserta dibuat di klien. Hak akses mengikuti 20261006_laporan_saya.sql:
-- pengunjung hanya boleh INSERT; SELECT/UPDATE/DELETE hanya admin.
-- =====================================================================

-- ── 1. Tabel ─────────────────────────────────────────────────────────
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['pauli', 'kognitif'] LOOP
    EXECUTE format($f$
      CREATE TABLE IF NOT EXISTS public.peserta_%1$s (
        id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        nama       text NOT NULL,
        nip        text,          -- email peserta
        jabatan    text,          -- "usia th · jenis kelamin"
        created_at timestamptz DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS public.hasil_%1$s (
        id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        peserta_id uuid REFERENCES public.peserta_%1$s(id) ON DELETE CASCADE,
        skor       jsonb NOT NULL,
        ringkasan  text,
        jawaban    jsonb,
        created_at timestamptz DEFAULT now()
      );
    $f$, t);
  END LOOP;
END $$;

-- ── 2. Hak akses ─────────────────────────────────────────────────────
DO $$
DECLARE
  t text;
  pol record;
BEGIN
  FOREACH t IN ARRAY ARRAY['peserta_pauli', 'hasil_pauli', 'peserta_kognitif', 'hasil_kognitif'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, t);
    END LOOP;
    EXECUTE format('CREATE POLICY "insert %1$s" ON public.%1$I FOR INSERT TO anon, authenticated WITH CHECK (true)', t);
    EXECUTE format('CREATE POLICY "admin select %1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admin update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admin delete %1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.is_admin())', t);
  END LOOP;
END $$;

-- ── 3. laporan_saya() ditambah dua tes baru ──────────────────────────
-- Isi sama dengan 20261006_laporan_saya.sql, plus blok Pauli & Kognitif.
CREATE OR REPLACE FUNCTION public.laporan_saya()
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_email text;
BEGIN
  SELECT lower(trim(email)) INTO v_email
  FROM auth.users
  WHERE id = auth.uid() AND email_confirmed_at IS NOT NULL;

  IF v_email IS NULL OR v_email = '' THEN
    RETURN '[]'::jsonb;
  END IF;

  RETURN (
    SELECT coalesce(jsonb_agg(s.x ORDER BY (s.x->>'created_at') DESC), '[]'::jsonb)
    FROM (
    SELECT jsonb_build_object(
      'jenis', 'MBTI', 'id', p.id, 'nama', p.nama, 'email', p.email,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta p
    LEFT JOIN LATERAL (SELECT * FROM hasil_tes WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.email)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'DISC', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_disc p
    LEFT JOIN LATERAL (SELECT * FROM hasil_disc WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'PAPI', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_papi p
    LEFT JOIN LATERAL (SELECT * FROM hasil_papi WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'DASS', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_dass p
    LEFT JOIN LATERAL (SELECT * FROM hasil_dass WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'Love Language', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_love_language p
    LEFT JOIN LATERAL (SELECT * FROM hasil_love_language WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'MSDT', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_msdt p
    LEFT JOIN LATERAL (SELECT * FROM hasil_msdt WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'Big Five', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_bigfive p
    LEFT JOIN LATERAL (SELECT * FROM hasil_bigfive WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'RIASEC', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_riasec p
    LEFT JOIN LATERAL (SELECT * FROM hasil_riasec WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'Resiliensi', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_resiliensi p
    LEFT JOIN LATERAL (SELECT * FROM hasil_resiliensi WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'Peran Tim', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_peran_tim p
    LEFT JOIN LATERAL (SELECT * FROM hasil_peran_tim WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'Pauli', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_pauli p
    LEFT JOIN LATERAL (SELECT * FROM hasil_pauli WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    UNION ALL
    SELECT jsonb_build_object(
      'jenis', 'Kognitif', 'id', p.id, 'nama', p.nama, 'email', p.nip,
      'jabatan', p.jabatan, 'created_at', p.created_at, 'hasil', to_jsonb(h),
      'lunas', EXISTS (SELECT 1 FROM payments WHERE peserta_id = p.id AND status = 'paid')
    ) AS x
    FROM peserta_kognitif p
    LEFT JOIN LATERAL (SELECT * FROM hasil_kognitif WHERE peserta_id = p.id ORDER BY created_at DESC LIMIT 1) h ON true
    WHERE lower(trim(p.nip)) = v_email
    ) s
  );
END $$;
REVOKE ALL ON FUNCTION public.laporan_saya() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.laporan_saya() TO authenticated;
