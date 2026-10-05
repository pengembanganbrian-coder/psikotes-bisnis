-- =====================================================================
-- LAPORAN SAYA + PERBAIKAN KEAMANAN DATA PESERTA
-- Jalankan di Supabase → SQL Editor. Aman dijalankan ulang.
--
-- 1. Sebelumnya setiap pengguna yang login (auth.role() = 'authenticated')
--    dianggap admin, dan beberapa tabel (peserta, hasil_tes, *_disc,
--    *_love_language, *_msdt) malah terbuka penuh untuk publik. Karena
--    pendaftaran Supabase Auth terbuka, siapa pun bisa membaca & menghapus
--    data peserta. Sekarang hanya akun di tabel admins yang bisa membaca,
--    mengubah, atau menghapus; pengunjung tetap bisa INSERT (mengerjakan tes).
-- 2. laporan_saya(): peserta yang login lewat link email melihat tes-tes
--    yang dikerjakan dengan email itu, tanpa bisa membaca data orang lain.
-- =====================================================================

-- ── 1. Daftar admin ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admins (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;  -- tanpa policy: hanya lewat is_admin()

-- Akun admin yang sudah ada (dibuat 2026-05-31, keduanya milik pemilik AssesIN).
INSERT INTO public.admins (user_id)
SELECT id FROM auth.users
WHERE lower(email) IN ('brianlagiapa@gmail.com', 'pengembangan.brian@gmail.com')
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid());
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ── 2. Policy tabel peserta & hasil ──────────────────────────────────
DO $$
DECLARE
  t text;
  pol record;
BEGIN
  FOREACH t IN ARRAY ARRAY['peserta', 'hasil_tes', 'peserta_disc', 'hasil_disc', 'peserta_papi', 'hasil_papi', 'peserta_dass', 'hasil_dass', 'peserta_love_language', 'hasil_love_language', 'peserta_msdt', 'hasil_msdt', 'peserta_bigfive', 'hasil_bigfive', 'peserta_riasec', 'hasil_riasec', 'peserta_resiliensi', 'hasil_resiliensi', 'peserta_peran_tim', 'hasil_peran_tim'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, t);
    END LOOP;
    -- Pengunjung (anon) dan peserta yang login boleh menyimpan hasil tes.
    EXECUTE format('CREATE POLICY "insert %1$s" ON public.%1$I FOR INSERT TO anon, authenticated WITH CHECK (true)', t);
    EXECUTE format('CREATE POLICY "admin select %1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admin update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admin delete %1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.is_admin())', t);
  END LOOP;
END $$;

-- job_profile hanya untuk admin.
DO $$
DECLARE pol record;
BEGIN
  ALTER TABLE public.job_profile ENABLE ROW LEVEL SECURITY;
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'job_profile' LOOP
    EXECUTE format('DROP POLICY %I ON public.job_profile', pol.policyname);
  END LOOP;
  CREATE POLICY "admin all job_profile" ON public.job_profile FOR ALL TO authenticated
    USING (public.is_admin()) WITH CHECK (public.is_admin());
END $$;

-- ── 3. laporan_saya() ────────────────────────────────────────────────
-- Email diambil dari akun yang login dan wajib sudah terverifikasi (link
-- masuk lewat email membuktikan kepemilikan), bukan dari parameter.
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
    ) s
  );
END $$;
REVOKE ALL ON FUNCTION public.laporan_saya() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.laporan_saya() TO authenticated;
