// Edge Function: create-mayar-payment
// Membuat tagihan Mayar (Single Payment Request) untuk membuka laporan lengkap.
//
// Body (JSON): { pesertaId, testType, nama, email? }
// Response:    { orderId, paymentUrl }  atau  { alreadyPaid: true }
//
// Nominal TIDAK diambil dari body — dibaca dari _shared/harga.ts.
//
// Secrets (Supabase → Edge Functions → Secrets):
//   MAYAR_API_KEY          — API key produksi dari web.mayar.id/api-keys
//   MAYAR_BASE_URL         — opsional; https://api.mayar.io untuk sandbox
//   FRONTEND_URL           — https://assesin.net
//   MAYAR_FALLBACK_EMAIL   — dipakai bila peserta tidak mengisi email (Mayar mewajibkan email)
//   MAYAR_FALLBACK_MOBILE  — opsional; Mayar mewajibkan nomor HP

import { HARGA_TES } from "../_shared/harga.ts"
import { adminClient, corsHeaders, json, mayarBase } from "../_shared/mayar.ts"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405)

  const apiKey = Deno.env.get("MAYAR_API_KEY")
  if (!apiKey) return json({ error: "Server belum dikonfigurasi (MAYAR_API_KEY)." }, 500)

  let body: { pesertaId?: string; testType?: string; nama?: string; email?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: "Body bukan JSON yang sah." }, 400)
  }

  const { pesertaId, testType } = body
  if (!pesertaId || !UUID.test(pesertaId)) return json({ error: "pesertaId tidak sah." }, 400)
  if (!testType || !(testType in HARGA_TES)) return json({ error: "Jenis tes tidak dikenal." }, 400)

  const amount       = HARGA_TES[testType]
  if (!(amount > 0)) return json({ error: "Laporan tes ini sedang gratis." }, 400)
  const nama         = (body.nama || "Peserta").slice(0, 100)
  const emailPeserta = body.email && EMAIL.test(body.email) ? body.email : null
  const email        = emailPeserta ?? Deno.env.get("MAYAR_FALLBACK_EMAIL")
  if (!email) return json({ error: "Server belum dikonfigurasi (MAYAR_FALLBACK_EMAIL)." }, 500)

  const admin = adminClient()

  // Sudah lunas? Jangan tagih dua kali.
  const { data: lunas } = await admin
    .from("payments").select("id")
    .eq("peserta_id", pesertaId).eq("test_type", testType).eq("status", "paid")
    .limit(1).maybeSingle()
  if (lunas) return json({ alreadyPaid: true })

  const orderId  = `ASSESIN-${testType.replace(/\s+/g, "").toUpperCase()}-${Date.now()}`
  const frontend = Deno.env.get("FRONTEND_URL") || "https://assesin.net"

  let res: Response
  try {
    res = await fetch(`${mayarBase()}/hl/v1/payment/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        name:        nama,
        email,
        amount,
        mobile:      Deno.env.get("MAYAR_FALLBACK_MOBILE") ?? "08000000000",
        redirectURL: `${frontend}/pembayaran-selesai`,
        description: `Laporan Lengkap ${testType} - AssesIN (${orderId})`,
        expiredAt:   new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      }),
    })
  } catch (e) {
    return json({ error: "Tidak bisa menghubungi Mayar.", detail: String(e) }, 502)
  }

  const payload = await res.json().catch(() => null)
  const d = payload?.data
  if (!res.ok || !d?.link || !d?.id) {
    console.error("[create-mayar-payment] Mayar menolak", res.status, JSON.stringify(payload))
    return json({ error: "Mayar menolak permintaan pembayaran.", detail: payload }, 502)
  }

  const { error } = await admin.from("payments").insert({
    order_id:             orderId,
    peserta_id:           pesertaId,
    test_type:            testType,
    nama,
    email:                emailPeserta,
    amount,
    status:               "pending",
    provider:             "mayar",
    mayar_payment_id:     d.id,
    mayar_transaction_id: d.transactionId ?? d.transaction_id ?? null,
  })
  if (error) {
    console.error("[create-mayar-payment] gagal simpan", error.message)
    return json({ error: "Gagal mencatat pembayaran.", detail: error.message }, 500)
  }

  return json({ orderId, paymentUrl: d.link })
})
