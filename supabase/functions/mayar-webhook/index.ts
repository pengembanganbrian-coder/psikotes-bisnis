// Edge Function: mayar-webhook
// Menerima notifikasi dari Mayar lalu MEMVERIFIKASI ULANG ke API Mayar sebelum
// menandai lunas. Isi webhook tidak dipercaya (Mayar tidak menandatanganinya);
// webhook hanya pemicu.
//
// Deploy tanpa verifikasi JWT (Mayar tidak mengirim JWT Supabase):
//   supabase functions deploy mayar-webhook --no-verify-jwt
//
// Daftarkan URL ini di Mayar (Integrasi → Webhook), termasuk token rahasia:
//   https://<project>.supabase.co/functions/v1/mayar-webhook?token=<MAYAR_WEBHOOK_TOKEN>

import { adminClient, Payment, verifikasiKeMayar } from "../_shared/mayar.ts"

const ok = (body: unknown = { received: true }) =>
  new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } })

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

const COLS = "id, order_id, amount, status, mayar_payment_id"
const ID_AMAN = /^[A-Za-z0-9-]+$/

Deno.serve(async (req: Request) => {
  const expected = Deno.env.get("MAYAR_WEBHOOK_TOKEN")
  if (!expected) return new Response("Server belum dikonfigurasi.", { status: 500 })
  const token = new URL(req.url).searchParams.get("token") ?? ""
  if (!safeEqual(token, expected)) return new Response("Unauthorized", { status: 401 })
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 })

  const body = await req.json().catch(() => null)
  if (!body) return new Response("Body bukan JSON yang sah.", { status: 400 })

  const event: string = body.event ?? ""
  const d = body.data ?? {}
  // Bentuk payload Mayar tidak terdokumentasi lengkap — cetak untuk audit.
  console.log("[mayar-webhook]", event, JSON.stringify(d))

  if (event !== "payment.received") return ok({ received: true, ignored: event })

  const admin = adminClient()

  // Id di payload bisa berupa id payment request atau id transaksi; coba semua.
  const kandidat = [d.productId, d.paymentLinkId, d.id, d.transactionId, d.transaction_id]
    .filter((v): v is string => typeof v === "string" && ID_AMAN.test(v))

  let rows: Payment[] = []
  if (kandidat.length) {
    const list = kandidat.join(",")
    const { data } = await admin
      .from("payments").select(COLS)
      .or(`mayar_payment_id.in.(${list}),mayar_transaction_id.in.(${list})`)
    rows = data ?? []
  }

  // Cadangan: tagihan pending terbaru dengan nominal yang sama (≤ 48 jam).
  // Aman karena setiap kandidat tetap diverifikasi ke API Mayar.
  if (!rows.length && d.amount) {
    const { data } = await admin
      .from("payments").select(COLS)
      .eq("provider", "mayar").eq("status", "pending").eq("amount", Number(d.amount))
      .gte("created_at", new Date(Date.now() - 48 * 3600 * 1000).toISOString())
      .order("created_at", { ascending: false })
      .limit(10)
    rows = data ?? []
  }

  const terbayar: string[] = []
  try {
    for (const p of rows) {
      if (p.status !== "paid" && await verifikasiKeMayar(admin, p)) terbayar.push(p.order_id)
    }
  } catch (e) {
    // 500 → Mayar mengulang, jadi pembayaran sah tidak hilang.
    console.error("[mayar-webhook]", String(e))
    return new Response("Gagal memperbarui pembayaran.", { status: 500 })
  }

  if (!terbayar.length) console.warn("[mayar-webhook] tidak ada tagihan baru yang lunas")
  return ok({ received: true, applied: terbayar })
})
