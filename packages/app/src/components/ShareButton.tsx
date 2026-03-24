'use client'

export function ShareButton({ url }: { url: string }) {
  const copy = () => navigator.clipboard.writeText(url)
  return (
    <button onClick={copy} style={btn}>
      Share Profile
    </button>
  )
}

const btn: React.CSSProperties = {
  padding: '10px 20px',
  border: '1px solid #ccc',
  borderRadius: 8,
  background: '#fff',
  cursor: 'pointer',
  fontSize: 14,
}
