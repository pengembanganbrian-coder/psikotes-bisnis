-- Pembayaran via Mayar.id. Jalankan di Supabase → SQL Editor. Aman diulang.

ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS provider             TEXT DEFAULT 'duitku';
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS mayar_payment_id     TEXT;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS mayar_transaction_id TEXT;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS paid_at              TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS payments_mayar_payment_id     ON public.payments (mayar_payment_id);
CREATE INDEX IF NOT EXISTS payments_mayar_transaction_id ON public.payments (mayar_transaction_id);

-- Policy lama dari 20260527_create_payments.sql membuka baca/tulis untuk
-- semua orang (siapa pun bisa menulis status 'paid'). Edge Function memakai
-- service role yang melewati RLS, jadi policy ini tidak dibutuhkan.
DROP POLICY IF EXISTS "Anyone can read payments"         ON public.payments;
DROP POLICY IF EXISTS "Service role can insert payments" ON public.payments;
DROP POLICY IF EXISTS "Service role can update payments" ON public.payments;
DROP POLICY IF EXISTS "anon_insert_payments"             ON public.payments;
DROP POLICY IF EXISTS "anon_select_payments"             ON public.payments;

-- Browser cukup bertanya ya/tidak lewat fungsi ini.
CREATE OR REPLACE FUNCTION public.cek_pembayaran(p_peserta uuid, p_tes text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM payments
    WHERE peserta_id = p_peserta AND test_type = p_tes AND status = 'paid'
  );
$$;
REVOKE ALL ON FUNCTION public.cek_pembayaran(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cek_pembayaran(uuid, text) TO anon, authenticated;
