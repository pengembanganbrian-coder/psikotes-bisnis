// Edge Function: duitku-webhook
// Menerima notifikasi pembayaran dari Duitku dan memperbarui status di DB.
//
// URL webhook — daftarkan di Duitku Dashboard → Project → Callback URL:
//   https://<project-ref>.supabase.co/functions/v1/duitku-webhook
//
// Duitku mengirim POST JSON dengan field: merchantCode, amount,
// merchantOrderId, productDetail, additionalParam, paymentCode,
// resultCode, merchantUserId, reference, signature

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200 })
  }

  try {
    const body = await req.json()
    const {
      merchantCode,
      amount,
      merchantOrderId,
      resultCode,
      reference,
      signature,
    } = body

    // Verifikasi signature: MD5(merchantCode + amount + merchantOrderId + apiKey)
    const apiKey      = Deno.env.get("DUITKU_API_KEY")!
    const expectedSig = await md5hex(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)

    if (expectedSig !== signature) {
      console.warn("Signature tidak valid:", { merchantOrderId, expectedSig, signature })
      return new Response("Signature tidak valid", { status: 403 })
    }

    // resultCode "00" = berhasil, lainnya = gagal/pending
    const status = resultCode === "00" ? "paid" : "failed"

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { error } = await supabase
      .from("payments")
      .update({ status, midtrans_transaction_id: reference })
      .eq("order_id", merchantOrderId)

    if (error) {
      console.error("DB update error:", error)
      return new Response("DB error", { status: 500 })
    }

    console.log(`Payment ${merchantOrderId} → ${status} (ref: ${reference})`)
    return new Response("OK", { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(String(err), { status: 500 })
  }
})

async function md5hex(input: string): Promise<string> {
  const data   = new TextEncoder().encode(input)
  const buffer = await crypto.subtle.digest("MD5", data)
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("")
}
