import SelFigural from './SelFigural'

// Tampilan soal dan pilihan tes kognitif, dipakai halaman tes dan pembahasan.

/** Isi soal sesuai jenis subtes. */
export function TampilSoal({ soal }) {
  if (soal.jenis === 'deret') return (
    <p style={{ fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
      {soal.deret.join(',  ')},  <span style={{ color: 'var(--accent)' }}>?</span>
    </p>
  )
  if (soal.jenis === 'analogi') {
    const [a, b, c] = soal.analogi
    return (
      <p style={{ fontSize: 'clamp(17px, 4.6vw, 22px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.6 }}>
        {a} : {b} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>=</span> {c} : <span style={{ color: 'var(--accent)' }}>?</span>
      </p>
    )
  }
  if (soal.jenis === 'logika') return (
    <div style={{ textAlign: 'left', maxWidth: '560px', margin: '0 auto' }}>
      {soal.premis.map(p => <p key={p} style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.6, marginBottom: '6px' }}>• {p}</p>)}
      <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent)', marginTop: '12px' }}>{soal.tanya || 'Kesimpulan yang pasti benar adalah…'}</p>
    </div>
  )
  return (
    <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, auto)', gap: '6px', padding: '8px', borderRadius: '14px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      {soal.grid.map((sel, i) => (
        <div key={i} style={{ background: 'var(--surface)', borderRadius: '8px', border: sel ? '1px solid var(--border)' : '2px dashed var(--accent)' }}>
          <SelFigural sel={sel} ukuran={84} />
        </div>
      ))}
    </div>
  )
}

/** Isi satu pilihan jawaban. */
export function TampilOpsi({ soal, opsi }) {
  if (soal.jenis === 'matriks') return <SelFigural sel={opsi} ukuran={64} />
  return <span>{opsi}</span>
}
