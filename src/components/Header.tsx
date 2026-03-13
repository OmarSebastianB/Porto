'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

export function Header() {
  const { canEdit, refetch } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    refetch()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-20 bg-[var(--paper)] border-b-2 border-[var(--border)]">
      <div className="max-w-xl mx-auto px-3 py-2 flex items-center justify-between">
        <Link href="/" className="font-bold text-[var(--ink)] text-sm tracking-tight">
          Portfolio
        </Link>
        <nav className="flex gap-3 text-xs items-center">
          <a href="/#about" className="text-[var(--muted)] retro-link">About</a>
          <a href="/#education" className="text-[var(--muted)] retro-link">Education</a>
          <a href="/#experience" className="text-[var(--muted)] retro-link">Experience</a>
          <a href="/#projects" className="text-[var(--muted)] retro-link">Projects</a>
          {canEdit ? (
            <button type="button" onClick={handleLogout} className="text-[var(--accent)] retro-link">
              Logout
            </button>
          ) : (
            <Link href="/edit" className="text-[var(--accent)] retro-link">
              Unlock
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
