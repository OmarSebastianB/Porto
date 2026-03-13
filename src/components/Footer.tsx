import Link from 'next/link'
import { personalInfo } from '@/data/portfolio'

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-[var(--card-bg)] mt-auto relative z-10">
      <div className="max-w-xl mx-auto px-3 py-3 text-center text-xs text-[var(--muted)]">
        <Link href="/" className="retro-link">Portfolio</Link>
        {' · '}
        <a href={`mailto:${personalInfo.email}`} className="retro-link">Contact</a>
      </div>
    </footer>
  )
}
