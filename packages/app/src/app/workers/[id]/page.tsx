import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorker } from '@/lib/api'
import { TipButton } from '@/components/TipButton'
import { ShareButton } from '@/components/ShareButton'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const worker = await getWorker(params.id)
  if (!worker) return { title: 'Worker Not Found' }
  return {
    title: `${worker.name} — ${worker.category.name} | BlueCollar`,
    description: worker.bio ?? `${worker.name} is a verified ${worker.category.name} on BlueCollar.`,
  }
}

export default async function WorkerProfilePage({ params }: Props) {
  const worker = await getWorker(params.id)
  if (!worker) notFound()

  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'}/workers/${worker.id}`
  const listedDate = new Date(worker.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <main style={container}>
      <div style={card}>
        {/* Avatar */}
        <div style={avatarWrap}>
          {worker.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={worker.avatar} alt={worker.name} style={avatarImg} />
          ) : (
            <div style={avatarFallback}>{worker.name[0]}</div>
          )}
        </div>

        {/* Name + badges */}
        <div style={headerRow}>
          <h1 style={{ margin: 0, fontSize: 24 }}>{worker.name}</h1>
          <div style={badges}>
            <span style={categoryBadge}>
              {worker.category.icon ?? ''} {worker.category.name}
            </span>
            {worker.isVerified && <span style={verifiedBadge}>✓ Verified</span>}
          </div>
        </div>

        {/* Location */}
        {worker.location && (
          <p style={meta}>
            📍 {worker.location.city}{worker.location.state ? `, ${worker.location.state}` : ''}, {worker.location.country}
          </p>
        )}

        {/* Bio */}
        {worker.bio && <p style={bio}>{worker.bio}</p>}

        {/* Contact */}
        <div style={section}>
          <h2 style={sectionTitle}>Contact</h2>
          {worker.phone && <p style={meta}>📞 {worker.phone}</p>}
          {worker.email && <p style={meta}>✉️ {worker.email}</p>}
          {!worker.phone && !worker.email && <p style={meta}>No contact info listed.</p>}
        </div>

        {/* Wallet */}
        {worker.walletAddress && (
          <div style={section}>
            <h2 style={sectionTitle}>Stellar Wallet</h2>
            <p style={{ ...meta, fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {worker.walletAddress}
            </p>
          </div>
        )}

        {/* Listed date */}
        <p style={{ ...meta, color: '#9ca3af', marginTop: 16 }}>Listed on {listedDate}</p>

        {/* Actions */}
        <div style={actions}>
          <TipButton workerId={worker.id} workerName={worker.name} />
          <ShareButton url={profileUrl} />
        </div>
      </div>
    </main>
  )
}

// --- inline styles ---
const container: React.CSSProperties = { minHeight: '100vh', background: '#f9fafb', padding: '40px 16px' }
const card: React.CSSProperties = { maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
const avatarWrap: React.CSSProperties = { display: 'flex', justifyContent: 'center', marginBottom: 24 }
const avatarImg: React.CSSProperties = { width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }
const avatarFallback: React.CSSProperties = { width: 120, height: 120, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 700 }
const headerRow: React.CSSProperties = { textAlign: 'center', marginBottom: 8 }
const badges: React.CSSProperties = { display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }
const categoryBadge: React.CSSProperties = { background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: 999, fontSize: 13 }
const verifiedBadge: React.CSSProperties = { background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: 999, fontSize: 13 }
const meta: React.CSSProperties = { margin: '4px 0', fontSize: 14, color: '#4b5563' }
const bio: React.CSSProperties = { fontSize: 15, color: '#374151', lineHeight: 1.6, margin: '16px 0' }
const section: React.CSSProperties = { marginTop: 24, borderTop: '1px solid #f3f4f6', paddingTop: 16 }
const sectionTitle: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }
const actions: React.CSSProperties = { display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }
