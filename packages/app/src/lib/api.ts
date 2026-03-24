const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

export type Worker = {
  id: string
  name: string
  bio: string | null
  avatar: string | null
  phone: string | null
  email: string | null
  walletAddress: string | null
  isActive: boolean
  isVerified: boolean
  createdAt: string
  category: { id: string; name: string; icon: string | null }
  location: { city: string; state: string | null; country: string } | null
}

export async function getWorker(id: string): Promise<Worker | null> {
  const res = await fetch(`${API_URL}/workers/${id}`, { next: { revalidate: 60 } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch worker')
  const json = await res.json()
  return json.data as Worker
}
