import dynamic from 'next/dynamic'
import { personalInfo, education, experience, projects } from '@/data/portfolio'
import { PortfolioWithAuth } from '@/components/PortfolioWithAuth'

const PhotoPicker = dynamic(
  () => import('@/components/PhotoPicker').then(m => ({ default: m.PhotoPicker })),
  { ssr: false, loading: () => <div className="w-28 h-28 shrink-0 border-2 border-[var(--border)] bg-[var(--card-bg)]" /> }
)

export default function HomePage() {
  return (
    <div className="max-w-xl mx-auto px-3 py-5">
      <section id="about" className="mb-8 retro-box retro-card p-4 bg-[var(--card-bg)]">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <PhotoPicker initialPhoto={personalInfo.photo} />
          <div className="min-w-0">
            <h1 className="text-base font-bold text-[var(--ink)] tracking-tight border-b border-[var(--border)] pb-1 inline-block">
              {personalInfo.name}
            </h1>
            <p className="text-[var(--accent)] text-sm mt-1">{personalInfo.title}</p>
            {personalInfo.bio && <p className="text-[var(--muted)] text-sm mt-2">{personalInfo.bio}</p>}
            <a href={`mailto:${personalInfo.email}`} className="text-sm text-[var(--accent)] retro-link mt-2 inline-block">
              {personalInfo.email}
            </a>
          </div>
        </div>
      </section>

      <PortfolioWithAuth
        initialEducation={education}
        initialExperience={experience}
        initialProjects={projects}
      />
    </div>
  )
}
