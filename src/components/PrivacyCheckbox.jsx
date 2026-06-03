import { Link } from 'react-router-dom'

export default function PrivacyCheckbox({ checked, onChange, error, id = 'privacy-consent' }) {
  return (
    <div style={{ marginTop: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          style={{ marginTop: '3px', accentColor: 'var(--accent)', width: '15px', height: '15px', cursor: 'pointer', flexShrink: 0 }}
        />
        <label htmlFor={id} style={{ fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: '1.65' }}>
          Saya telah membaca dan menyetujui{' '}
          <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            Kebijakan Privasi
          </Link>
          {' '}dan{' '}
          <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            Syarat & Ketentuan
          </Link>
          {' '}AssesIN
        </label>
      </div>
      {error && (
        <p style={{ color: '#f87171', fontSize: '11px', marginTop: '6px', paddingLeft: '25px' }}>{error}</p>
      )}
    </div>
  )
}
