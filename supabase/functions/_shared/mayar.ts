// Helper bersama untuk integrasi Mayar.id.
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2"
import { kirimEmailLaporan } from "./email.ts"

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })

// Produksi https://api.mayar.id, sandbox https://api.mayar.io
export const mayarBase = () => Deno.env.get("MAYAR_BASE_URL") ?? "https://api.mayar.id"

export const adminClient = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)

export type Payment = {
  id: string
  order_id: string
  amount: number
  status: string
  mayar_payment_id: string | null
}

/**
 * Tanya status ke API Mayar (GET /hl/v1/payment/{id}) lalu tandai 'paid' bila
 * Mayar bilang lunas dan nominalnya cocok. Inilah satu-satunya jalan sebuah
 * pembayaran menjadi 'paid' — isi webhook sendiri tidak dipercaya karena Mayar
 * tidak menandatanganinya.
 */
export async function verifikasiKeMayar(admin: SupabaseClient, p: Payment): Promise<boolean> {
  if (p.status === "paid") return true
  if (!p.mayar_payment_id) return false

  const res = await fetch(`${mayarBase()}/hl/v1/payment/${p.mayar_payment_id}`, {
    headers: { Authorization: `Bearer ${Deno.env.get("MAYAR_API_KEY")}` },
  })
  const body = await res.json().catch(() => null)
  const d = body?.data
  if (!res.ok || !d) {
    console.warn("[mayar] gagal cek status", p.order_id, res.status, JSON.stringify(body))
    return false
  }

  if (String(d.status).toLowerCase() !== "paid") return false
  if (Number(d.amount) !== p.amount) {
    console.error("[mayar] nominal tidak cocok", p.order_id, d.amount, p.amount)
    return false
  }

  // Hanya mengubah baris yang masih 'pending': bila webhook dan pengecekan
  // dari browser jalan bersamaan, cuma satu yang mendapat baris ini, sehingga
  // email laporan terkirim tepat sekali.
  const { data: diubah, error } = await admin
    .from("payments")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", p.id)
    .eq("status", "pending")
    .select("email, nama, test_type, order_id")
  if (error) throw new Error(`Gagal menandai lunas: ${error.message}`)
  console.log(`[mayar] ${p.order_id} → paid`)

  if (diubah?.length) {
    try {
      await kirimEmailLaporan(admin, diubah[0])
    } catch (e) {
      console.error("[email] gagal", p.order_id, String(e))
    }
  }
  return true
}
