-- Tabel payments untuk melacak pembayaran unlock laporan AssesIN
CREATE TABLE IF NOT EXISTS public.payments (
  id                        UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at                TIMESTAMPTZ DEFAULT now() NOT NULL,
  order_id                  TEXT        UNIQUE NOT NULL,
  peserta_id                UUID        NOT NULL,
  test_type                 TEXT        NOT NULL,          -- 'MBTI' | 'DISC' | 'PAPI' | 'DASS' | 'Love Language' | 'MSDT'
  nama                      TEXT,
  email                     TEXT,
  amount                    INTEGER     NOT NULL,          -- dalam rupiah, mis. 39000
  status                    TEXT        DEFAULT 'pending'  -- 'pending' | 'paid' | 'failed'
    CHECK (status IN ('pending', 'paid', 'failed')),
  duitku_reference          TEXT
);

-- Index untuk lookup cepat saat cek status bayar
CREATE INDEX IF NOT EXISTS payments_peserta_test_status
  ON public.payments (peserta_id, test_type, status);

-- Row Level Security: anon bisa SELECT payments milik sendiri (cek via peserta_id)
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policy: siapa pun bisa baca (read-only) — fine karena peserta_id adalah UUID acak
CREATE POLICY "Anyone can read payments" ON public.payments
  FOR SELECT USING (true);

-- Policy: hanya service_role (Edge Function) yang bisa INSERT & UPDATE
CREATE POLICY "Service role can insert payments" ON public.payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update payments" ON public.payments
  FOR UPDATE USING (true);
