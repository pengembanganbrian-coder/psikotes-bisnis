// Edge Function: duitku-webhook
// Menerima notifikasi pembayaran dari Duitku dan memperbarui status di DB.
//
// URL webhook — daftarkan di Duitku Dashboard → Project → Callback URL:
//   https://<project-ref>.supabase.co/functions/v1/duitku-webhook
//
// Duitku mengirim POST JSON dengan field: merchantCode, amount,
// merchantOrderId, productDetail, additionalParam, paymentCode,
// resultCode, merchantUserId, reference, signature

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req: Request) => {
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
      .update({ status, duitku_reference: reference })
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

// MD5 murni (tanpa dependency eksternal) — Duitku mewajibkan MD5 untuk
// signature webhook, dan itu tidak didukung oleh Web Crypto (SubtleCrypto)
// standar sehingga tidak bisa dibuat lewat crypto.subtle.digest biasa.
async function md5hex(input: string): Promise<string> {
  function rotl(x: number, c: number) { return (x << c) | (x >>> (32 - c)) }
  function toBytesUtf8(str: string) { return new TextEncoder().encode(str) }

  const K = new Int32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ])
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ]

  const msg = toBytesUtf8(input)
  const bitLen = msg.length * 8
  const padLen = (((msg.length + 8) >> 6) + 1) << 6
  const padded = new Uint8Array(padLen)
  padded.set(msg)
  padded[msg.length] = 0x80
  const view = new DataView(padded.buffer)
  view.setUint32(padLen - 8, bitLen >>> 0, true)
  view.setUint32(padLen - 4, Math.floor(bitLen / 0x100000000), true)

  let [a0, b0, c0, d0] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]

  for (let chunk = 0; chunk < padLen; chunk += 64) {
    const M = new Int32Array(16)
    for (let i = 0; i < 16; i++) M[i] = view.getInt32(chunk + i * 4, true)

    let [a, b, c, d] = [a0, b0, c0, d0]
    for (let i = 0; i < 64; i++) {
      let f = 0, g = 0
      if (i < 16)      { f = (b & c) | (~b & d);        g = i }
      else if (i < 32) { f = (d & b) | (~d & c);        g = (5 * i + 1) % 16 }
      else if (i < 48) { f = b ^ c ^ d;                 g = (3 * i + 5) % 16 }
      else             { f = c ^ (b | ~d);              g = (7 * i) % 16 }
      const tmp = d
      d = c
      c = b
      b = b + rotl((a + f + K[i] + M[g]) | 0, S[i])
      a = tmp
    }
    a0 = (a0 + a) | 0; b0 = (b0 + b) | 0; c0 = (c0 + c) | 0; d0 = (d0 + d) | 0
  }

  const out = new Uint8Array(16)
  const outView = new DataView(out.buffer)
  outView.setInt32(0, a0, true); outView.setInt32(4, b0, true)
  outView.setInt32(8, c0, true); outView.setInt32(12, d0, true)
  return Array.from(out).map(b => b.toString(16).padStart(2, "0")).join("")
}
