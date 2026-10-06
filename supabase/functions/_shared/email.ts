// Email "laporan lengkap sudah terbuka" yang dikirim setelah pembayaran lunas.
//
// Secrets:
//   RESEND_API_KEY  — API key Resend (Sending access) untuk domain assesin.net
//   EMAIL_BALASAN   — opsional; alamat Reply-To (default: kontak di beranda)
//   FRONTEND_URL    — https://www.assesin.net
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2"

const NAMA_TES: Record<string, string> = {
  MBTI: "Tes MBTI",
  DISC: "Tes DISC",
  PAPI: "Tes PAPI Kostick",
  DASS: "Tes DASS-21",
  "Love Language": "Tes Love Language",
  MSDT: "Tes MSDT",
  "Big Five": "Tes Kepribadian Big Five",
  RIASEC: "Tes Minat Karier RIASEC",
  Resiliensi: "Tes Resiliensi Kerja",
  "Peran Tim": "Tes Peran dalam Tim",
  Pauli: "Tes Pauli Digital",
  Kognitif: "Tes Kemampuan Kognitif",
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!))

export type DataEmail = { email: string | null; nama: string | null; test_type: string; order_id: string }

/**
 * Kirim email berisi tombol masuk ke Laporan saya. Tombolnya berupa link masuk
 * sekali klik (magic link) bila bisa dibuat; bila tidak, link biasa ke
 * /laporan-saya. Kegagalan hanya dicatat ke log — pembayaran tetap sah.
 */
export async function kirimEmailLaporan(admin: SupabaseClient, p: DataEmail): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY")
  if (!apiKey || !p.email) {
    console.warn("[email] dilewati", p.order_id, !apiKey ? "RESEND_API_KEY belum diisi" : "tanpa email")
    return
  }

  const situs = (Deno.env.get("FRONTEND_URL") || "https://www.assesin.net").replace(/\/+$/, "")
  const halaman = `${situs}/laporan-saya`

  // Link masuk sekali klik. Untuk email yang belum pernah login, GoTrue
  // membuat akunnya sekalian; akun peserta tidak punya akses admin.
  let tombol = halaman
  const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: p.email,
    options: { redirectTo: halaman },
  })
  if (link?.properties?.action_link) tombol = link.properties.action_link
  else console.warn("[email] magic link gagal, pakai link biasa", p.order_id, linkErr?.message)

  const namaTes = NAMA_TES[p.test_type] ?? p.test_type
  const sapaan = p.nama ? `Halo ${escapeHtml(p.nama)},` : "Halo,"

  const html = `<div style="margin:0;padding:24px 12px;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;">
    <tr><td style="padding:28px 28px 8px;">
      <p style="margin:0;font-size:20px;font-weight:700;color:#111827;">Asses<span style="color:#4f46e5;">IN</span></p>
    </td></tr>
    <tr><td style="padding:8px 28px 4px;">
      <h1 style="margin:0 0 12px;font-size:20px;line-height:1.4;color:#111827;">Laporan lengkap ${escapeHtml(namaTes)} Anda sudah terbuka</h1>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#374151;">${sapaan}</p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#374151;">Terima kasih, pembayaran Anda sudah kami terima. Laporan lengkap bisa dibuka kapan saja dan dari perangkat mana pun lewat Laporan saya.</p>
      <a href="${tombol}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 24px;border-radius:10px;">Buka laporan saya</a>
      <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">Tombol di atas hanya berlaku sementara. Setelah kedaluwarsa, buka <a href="${halaman}" style="color:#4f46e5;">${halaman.replace(/^https?:\/\//, "")}</a> lalu masukkan email ini untuk mendapat link masuk baru.</p>
    </td></tr>
    <tr><td style="padding:20px 28px 28px;">
      <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">No. pesanan: ${escapeHtml(p.order_id)}. Ada kendala? Balas email ini.</p>
    </td></tr>
  </table>
</div>`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "AssesIN <noreply@assesin.net>",
      to: [p.email],
      reply_to: Deno.env.get("EMAIL_BALASAN") || "psikologikantor@proton.me",
      subject: `Laporan lengkap ${namaTes} Anda sudah terbuka`,
      html,
    }),
  })
  if (!res.ok) console.error("[email] Resend menolak", p.order_id, res.status, await res.text())
  else console.log("[email] terkirim", p.order_id)
}
