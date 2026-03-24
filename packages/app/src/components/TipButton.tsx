'use client'

import { useState } from 'react'

export function TipButton({ workerId, workerName }: { workerId: string; workerName: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} style={primaryBtn}>
        💸 Tip Worker
      </button>

      {open && (
        <div style={overlay}>
          <div style={modal}>
            <h2 style={{ marginTop: 0 }}>Tip {workerName}</h2>
            <p style={{ color: '#666', fontSize: 14 }}>
              Tip functionality (Issue #41) — connect your Stellar wallet to send a tip.
            </p>
            <p style={{ fontSize: 12, color: '#999' }}>Worker ID: {workerId}</p>
            <button onClick={() => setOpen(false)} style={closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const primaryBtn: React.CSSProperties = {
  padding: '10px 20px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 14,
}

const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
}

const modal: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: 32,
  minWidth: 320,
  maxWidth: 480,
  width: '90%',
}

const closeBtn: React.CSSProperties = {
  marginTop: 16,
  padding: '8px 16px',
  border: '1px solid #ccc',
  borderRadius: 8,
  background: '#fff',
  cursor: 'pointer',
}
