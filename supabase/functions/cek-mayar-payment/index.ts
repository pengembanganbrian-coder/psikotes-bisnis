// Edge Function: cek-mayar-payment
// Dipanggil browser saat menunggu pembayaran. Mencari tagihan milik peserta
// untuk tes ini lalu menanyakan statusnya langsung ke Mayar. Dengan begini
// laporan tetap terbuka walau webhook terlambat atau gagal.
//
// Body (JSON): { pesertaId, testType }
// Response:    { paid: boolean }

import { adminClient, corsHeaders, json, verifikasiKeMayar } from "../_shared/mayar.ts"

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405)

  const { pesertaId, testType } = await req.json().catch(() => ({}))
  if (!pesertaId || !testType) return json({ error: "pesertaId dan testType wajib diisi." }, 400)

  const admin = adminClient()
  const { data: rows, error } = await admin
    .from("payments")
    .select("id, order_id, amount, status, mayar_payment_id")
    .eq("peserta_id", pesertaId)
    .eq("test_type", testType)
    .in("status", ["pending", "paid"])
    .order("created_at", { ascending: false })
    .limit(5)
  if (error) return json({ error: error.message }, 500)

  try {
    for (const p of rows ?? []) {
      if (await verifikasiKeMayar(admin, p)) return json({ paid: true })
    }
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
  return json({ paid: false })
})
