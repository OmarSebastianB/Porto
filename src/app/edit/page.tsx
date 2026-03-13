'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed')
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-3 py-12">
      <div className="retro-box p-6 bg-[var(--card-bg)] max-w-sm mx-auto">
        <h1 className="text-lg font-bold text-[var(--ink)] mb-2">Unlock editing</h1>
        <p className="text-sm text-[var(--muted)] mb-4">Enter your edit password to add or edit education, experience, and projects.</p>
        <form onSubmit={handleSubmit}>
          <label className="block text-xs text-[var(--muted)] mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[var(--border)] px-3 py-2 text-sm mb-3"
            placeholder="Edit password"
            autoComplete="current-password"
            required
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-3 py-2 text-sm bg-[var(--accent)] text-white disabled:opacity-50">
              {loading ? '…' : 'Unlock'}
            </button>
            <Link href="/" className="px-3 py-2 text-sm border border-[var(--border)]">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
