// Edge Function: create-midtrans-token
// Membuat Snap token Midtrans dan menyimpan record ke tabel payments.
//
// Body (JSON): { pesertaId, testType, nama, email, amount }
// Response:    { token, orderId }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

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

    const serverKey  = Deno.env.get("MIDTRANS_SERVER_KEY")!
    const isProd     = Deno.env.get("MIDTRANS_IS_PRODUCTION") === "true"
    const snapUrl    = isProd
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions"

    const orderId = `ASSESIN-${testType.replace(/\s+/g, "").toUpperCase()}-${Date.now()}`

    // Buat Snap token di Midtrans
    const mtRes = await fetch(snapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(serverKey + ":")}`,
      },
      body: JSON.stringify({
        transaction_details: { order_id: orderId, gross_amount: amount },
        customer_details:    { first_name: nama, ...(email ? { email } : {}) },
        item_details: [{
          id:       testType,
          price:    amount,
          quantity: 1,
          name:     `Laporan Lengkap ${testType} — AssesIN`,
        }],
        callbacks: {
          finish: `${Deno.env.get("FRONTEND_URL") || "https://assesin.com"}/pembayaran-selesai`,
        },
      }),
    })

    const mtData = await mtRes.json()

    if (!mtData.token) {
      console.error("Midtrans error:", mtData)
      return new Response(
        JSON.stringify({ error: "Gagal membuat token Midtrans", detail: mtData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Simpan ke DB
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    await supabase.from("payments").insert({
      order_id:   orderId,
      peserta_id: pesertaId,
      test_type:  testType,
      nama,
      email:      email || null,
      amount,
      snap_token: mtData.token,
      status:     "pending",
    })

    return new Response(
      JSON.stringify({ token: mtData.token, orderId }),
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
