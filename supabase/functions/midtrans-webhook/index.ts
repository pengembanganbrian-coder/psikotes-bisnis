// Edge Function: midtrans-webhook
// Menerima notifikasi pembayaran dari Midtrans dan memperbarui status di DB.
// URL webhook di Midtrans Dashboard → arahkan ke:
//   https://<project>.supabase.co/functions/v1/midtrans-webhook

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const {
      order_id,
      transaction_status,
      fraud_status,
      transaction_id,
      gross_amount,
      signature_key,
      status_code,
    } = body

    // Verifikasi signature Midtrans
    const serverKey = Deno.env.get("MIDTRANS_SERVER_KEY")!
    const expectedSig = await hashSHA512(`${order_id}${status_code}${gross_amount}${serverKey}`)
    if (expectedSig !== signature_key) {
      console.warn("Signature tidak valid:", { order_id, expectedSig, signature_key })
      return new Response("Signature tidak valid", { status: 403 })
    }

    // Tentukan status pembayaran
    let status = "pending"
    if (transaction_status === "capture" || transaction_status === "settlement") {
      if (!fraud_status || fraud_status === "accept") {
        status = "paid"
      } else {
        status = "failed"
      }
    } else if (["cancel", "deny", "expire", "failure"].includes(transaction_status)) {
      status = "failed"
    }

    // Update DB
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { error } = await supabase
      .from("payments")
      .update({ status, midtrans_transaction_id: transaction_id })
      .eq("order_id", order_id)

    if (error) {
      console.error("DB update error:", error)
      return new Response("DB error", { status: 500 })
    }

    console.log(`Payment ${order_id} → ${status}`)
    return new Response("OK", { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(String(err), { status: 500 })
  }
})

async function hashSHA512(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest("SHA-512", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}
