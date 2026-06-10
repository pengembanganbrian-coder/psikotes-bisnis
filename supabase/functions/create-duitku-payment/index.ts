// Edge Function: create-duitku-payment
// Membuat invoice Duitku dan menyimpan record ke tabel payments.
//
// Body (JSON): { pesertaId, testType, nama, email, amount }
// Response:    { reference, paymentUrl }
//
// Env vars yang dibutuhkan di Supabase (set via Dashboard → Edge Functions → Secrets):
//   DUITKU_MERCHANT_CODE   — kode merchant dari dashboard Duitku Sandbox
//   DUITKU_API_KEY         — API key dari dashboard Duitku Sandbox
//   DUITKU_IS_PRODUCTION   — kosongkan (atau "false") untuk sandbox
//   FRONTEND_URL           — https://assesin.net

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { pesertaId, testType, nama, email, amount } = await req.json()

    if (!pesertaId || !testType || !amount) {
      return new Response(
        JSON.stringify({ error: "pesertaId, testType, dan amount wajib diisi" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const merchantCode = Deno.env.get("DUITKU_MERCHANT_CODE")!
    const apiKey       = Deno.env.get("DUITKU_API_KEY")!
    const isProd       = Deno.env.get("DUITKU_IS_PRODUCTION") === "true"
    const baseUrl      = isProd
      ? "https://passport.duitku.com/webapi"
      : "https://sandbox.duitku.com/webapi"

    const merchantOrderId = `ASSESIN-${testType.replace(/\s+/g, "").toUpperCase()}-${Date.now()}`
    const callbackUrl     = `${Deno.env.get("SUPABASE_URL")}/functions/v1/duitku-webhook`
    const returnUrl       = `${Deno.env.get("FRONTEND_URL") || "https://assesin.net"}/pembayaran-selesai`

    // Signature: HMAC-SHA256(merchantCode + merchantOrderId + amount, apiKey)
    const signature = await hmacSHA256(`${merchantCode}${merchantOrderId}${amount}`, apiKey)

    const payload: Record<string, unknown> = {
      merchantCode,
      paymentAmount:   amount,
      merchantOrderId,
      productDetails:  `Laporan Lengkap ${testType} — AssesIN`,
      customerVaName:  nama || "Peserta",
      callbackUrl,
      returnUrl,
      expiryPeriod:    60,
      signature,
    }
    if (email) payload.email = email

    const duitkuRes = await fetch(`${baseUrl}/api/merchant/createInvoice`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body:    JSON.stringify(payload),
    })

    const duitkuData = await duitkuRes.json()

    if (duitkuData.statusCode !== "00" || !duitkuData.reference) {
      console.error("Duitku error:", duitkuData)
      return new Response(
        JSON.stringify({ error: "Gagal membuat invoice Duitku", detail: duitkuData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Simpan ke DB (snap_token digunakan untuk menyimpan duitku reference)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    await supabase.from("payments").insert({
      order_id:   merchantOrderId,
      peserta_id: pesertaId,
      test_type:  testType,
      nama,
      email:      email || null,
      amount,
      snap_token: duitkuData.reference,
      status:     "pending",
    })

    return new Response(
      JSON.stringify({ reference: duitkuData.reference, paymentUrl: duitkuData.paymentUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})

async function hmacSHA256(message: string, key: string): Promise<string> {
  const enc     = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    "raw", enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false, ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("")
}
