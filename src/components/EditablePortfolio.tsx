'use client'

import { useEffect, useState } from 'react'
import type { EducationItem, ExperienceItem, ProjectItem } from '@/data/portfolio'

const SK = { education: 'portfolio-education', experience: 'portfolio-experience', projects: 'portfolio-projects' }

function parse<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const s = localStorage.getItem(key)
    if (!s) return fallback
    const v = JSON.parse(s)
    return Array.isArray(v) ? (v as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function Logo({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} width={48} height={48} decoding="async" className="w-full h-full object-contain" />
}

type EditState = { section: 'education'; index: number | 'new' } | { section: 'experience'; index: number | 'new' } | { section: 'projects'; index: number | 'new' } | null

const emptyEducation: EducationItem = { school: '', degree: '', period: '', grade: '', skills: [], logo: '' }
const emptyExperience: ExperienceItem = { company: '', role: '', employmentType: 'Internship', period: '', duration: '', location: '', workArrangement: '', description: '', skills: [], logo: '' }
const emptyProject: ProjectItem = { title: '', description: '', period: '', link: '', tech: [] }

function strToArr(s: string): string[] {
  return s.split(',').map((x) => x.trim()).filter(Boolean)
}
function arrToStr(a: string[] | undefined): string {
  return (a && a.length) ? a.join(', ') : ''
}

interface Props {
  initialEducation: EducationItem[]
  initialExperience: ExperienceItem[]
  initialProjects: ProjectItem[]
  canEdit?: boolean
}

export function EditablePortfolio({ initialEducation, initialExperience, initialProjects, canEdit = false }: Props) {
  const [education, setEducation] = useState<EducationItem[]>(initialEducation)
  const [experience, setExperience] = useState<ExperienceItem[]>(initialExperience)
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [edit, setEdit] = useState<EditState>(null)

  useEffect(() => {
    const ed = parse(SK.education, initialEducation)
    const ex = parse(SK.experience, initialExperience)
    const pr = parse(SK.projects, initialProjects)
    setEducation(ed)
    setExperience(ex)
    setProjects(pr)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- load from localStorage once on mount

  useEffect(() => { save(SK.education, education) }, [education])
  useEffect(() => { save(SK.experience, experience) }, [experience])
  useEffect(() => { save(SK.projects, projects) }, [projects])
  useEffect(() => { if (!canEdit) setEdit(null) }, [canEdit])

  const add = (section: EditState['section']) => setEdit({ section, index: 'new' })
  const startEdit = (section: EditState['section'], index: number) => setEdit({ section, index })
  const cancelEdit = () => setEdit(null)

  const saveEducation = (item: EducationItem) => {
    if (edit?.section !== 'education') return
    if (edit.index === 'new') setEducation((p) => [...p, item])
    else setEducation((p) => p.map((x, i) => (i === edit.index ? item : x)))
    setEdit(null)
  }
  const saveExperience = (item: ExperienceItem) => {
    if (edit?.section !== 'experience') return
    if (edit.index === 'new') setExperience((p) => [...p, item])
    else setExperience((p) => p.map((x, i) => (i === edit.index ? item : x)))
    setEdit(null)
  }
  const saveProject = (item: ProjectItem) => {
    if (edit?.section !== 'projects') return
    if (edit.index === 'new') setProjects((p) => [...p, item])
    else setProjects((p) => p.map((x, i) => (i === edit.index ? item : x)))
    setEdit(null)
  }

  const removeEducation = (index: number) => { setEducation((p) => p.filter((_, i) => i !== index)); setEdit(null) }
  const removeExperience = (index: number) => { setExperience((p) => p.filter((_, i) => i !== index)); setEdit(null) }
  const removeProject = (index: number) => { setProjects((p) => p.filter((_, i) => i !== index)); setEdit(null) }

  return (
    <>
      <section id="education" className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="retro-section-title text-sm font-bold">Education</h2>
          {canEdit && (
            <button type="button" onClick={() => add('education')} className="text-xs text-[var(--accent)] retro-link">
              + Add
            </button>
          )}
        </div>
        <ul className="space-y-4">
          {education.map((item, i) => (
            <li key={i} className="retro-box retro-card p-4 bg-[var(--card-bg)] flex gap-4 items-start">
              {edit?.section === 'education' && edit.index === i ? (
                <EducationForm item={item} onSave={saveEducation} onCancel={cancelEdit} onRemove={() => removeEducation(i)} />
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[var(--ink)]">{item.school}</p>
                    <p className="text-[var(--muted)] text-xs mt-0.5 border-b border-dotted border-[var(--border)] pb-2">{item.degree} · {item.period}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {item.grade && <span className="retro-tag">GPA {item.grade}</span>}
                      {item.skills?.length ? <span className="text-[var(--muted)] text-xs">{item.skills.join(' · ')}</span> : null}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <div className="retro-stamp flex items-center justify-center shrink-0">{item.logo ? <Logo src={item.logo} alt="" /> : <span className="text-[var(--muted)] text-[9px]">Logo</span>}</div>
                    {canEdit && <button type="button" onClick={() => startEdit('education', i)} className="text-[10px] text-[var(--accent)]">Edit</button>}
                  </div>
                </>
              )}
            </li>
          ))}
          {edit?.section === 'education' && edit.index === 'new' && (
            <li className="retro-box p-4 bg-[var(--card-bg)]">
              <EducationForm item={emptyEducation} onSave={saveEducation} onCancel={cancelEdit} />
            </li>
          )}
        </ul>
      </section>

      <section id="experience" className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="retro-section-title text-sm font-bold">Experience</h2>
          {canEdit && <button type="button" onClick={() => add('experience')} className="text-xs text-[var(--accent)] retro-link">+ Add</button>}
        </div>
        <ul className="space-y-4">
          {experience.map((item, i) => (
            <li key={i} className="retro-box retro-card p-4 bg-[var(--card-bg)] flex gap-4 items-start">
              {edit?.section === 'experience' && edit.index === i ? (
                <ExperienceForm item={item} onSave={saveExperience} onCancel={cancelEdit} onRemove={() => removeExperience(i)} />
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[var(--ink)] text-sm">{item.role}</p>
                    <p className="text-[var(--muted)] text-xs mt-0.5">{item.company} · {item.period}{item.duration ? ` (${item.duration})` : ''}</p>
                    {(item.location || item.workArrangement) && <p className="text-[var(--muted)] text-xs">{[item.location, item.workArrangement].filter(Boolean).join(' · ')}</p>}
                    {item.description && (
                      <details className="retro-details mt-2">
                        <summary>What I did</summary>
                        <div className="retro-details-body text-xs leading-relaxed">{item.description}</div>
                      </details>
                    )}
                    {item.skills?.length ? <div className="mt-2 flex flex-wrap gap-1">{item.skills.map((s, j) => <span key={j} className="retro-tag">{s}</span>)}</div> : null}
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <div className="retro-stamp flex items-center justify-center shrink-0 bg-white">{item.logo ? <Logo src={item.logo} alt="" /> : <span className="text-[var(--muted)] text-[9px]">Logo</span>}</div>
                    {canEdit && <button type="button" onClick={() => startEdit('experience', i)} className="text-[10px] text-[var(--accent)]">Edit</button>}
                  </div>
                </>
              )}
            </li>
          ))}
          {edit?.section === 'experience' && edit.index === 'new' && (
            <li className="retro-box p-4 bg-[var(--card-bg)]">
              <ExperienceForm item={emptyExperience} onSave={saveExperience} onCancel={cancelEdit} />
            </li>
          )}
        </ul>
      </section>

      <section id="projects" className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="retro-section-title text-sm font-bold">Projects</h2>
          {canEdit && <button type="button" onClick={() => add('projects')} className="text-xs text-[var(--accent)] retro-link">+ Add</button>}
        </div>
        <ul className="space-y-4">
          {projects.map((item, i) => (
            <li key={i} className="retro-box retro-card p-4 bg-[var(--card-bg)]">
              {edit?.section === 'projects' && edit.index === i ? (
                <ProjectForm item={item} onSave={saveProject} onCancel={cancelEdit} onRemove={() => removeProject(i)} />
              ) : (
                <>
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-bold text-[var(--ink)] text-sm">
                      {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="retro-link">{item.title}</a> : item.title}
                    </p>
                    {canEdit && <button type="button" onClick={() => startEdit('projects', i)} className="text-[10px] text-[var(--accent)] shrink-0">Edit</button>}
                  </div>
                  <p className="text-[var(--muted)] text-xs mt-0.5">{item.period && <span>{item.period}</span>}{item.period && item.tech?.length ? ' · ' : ''}{item.tech?.length ? item.tech.join(', ') : ''}</p>
                  {item.description && (
                    <details className="retro-details mt-2">
                      <summary>About</summary>
                      <div className="retro-details-body text-xs">{item.description}</div>
                    </details>
                  )}
                </>
              )}
            </li>
          ))}
          {edit?.section === 'projects' && edit.index === 'new' && (
            <li className="retro-box p-4 bg-[var(--card-bg)]">
              <ProjectForm item={emptyProject} onSave={saveProject} onCancel={cancelEdit} />
            </li>
          )}
        </ul>
      </section>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mt-2 first:mt-0">
      <span className="text-[10px] text-[var(--muted)] uppercase">{label}</span>
      {children}
    </label>
  )
}

function EducationForm({ item, onSave, onCancel, onRemove }: { item: EducationItem; onSave: (x: EducationItem) => void; onCancel: () => void; onRemove?: () => void }) {
  const [school, setSchool] = useState(item.school)
  const [degree, setDegree] = useState(item.degree)
  const [period, setPeriod] = useState(item.period)
  const [grade, setGrade] = useState(item.grade ?? '')
  const [skills, setSkills] = useState(arrToStr(item.skills))
  const [logo, setLogo] = useState(item.logo ?? '')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ school, degree, period, grade: grade || undefined, skills: strToArr(skills), logo: logo || undefined })
  }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Field label="School"><input type="text" value={school} onChange={(e) => setSchool(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Degree"><input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Period"><input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g. Aug 2023 – Jan 2027" className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="GPA"><input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Skills (comma-separated)"><input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Logo URL"><input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="/logo-undip.png" className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <div className="flex gap-2 mt-3 flex-wrap">
        <button type="submit" className="px-2 py-1 text-xs bg-[var(--accent)] text-white">Save</button>
        <button type="button" onClick={onCancel} className="px-2 py-1 text-xs border border-[var(--border)]">Cancel</button>
        {onRemove && <button type="button" onClick={onRemove} className="px-2 py-1 text-xs text-red-600 border border-red-300">Remove</button>}
      </div>
    </form>
  )
}

function ExperienceForm({ item, onSave, onCancel, onRemove }: { item: ExperienceItem; onSave: (x: ExperienceItem) => void; onCancel: () => void; onRemove?: () => void }) {
  const [company, setCompany] = useState(item.company)
  const [role, setRole] = useState(item.role)
  const [employmentType, setEmploymentType] = useState(item.employmentType)
  const [period, setPeriod] = useState(item.period)
  const [duration, setDuration] = useState(item.duration ?? '')
  const [location, setLocation] = useState(item.location ?? '')
  const [workArrangement, setWorkArrangement] = useState(item.workArrangement ?? '')
  const [description, setDescription] = useState(item.description ?? '')
  const [skills, setSkills] = useState(arrToStr(item.skills))
  const [logo, setLogo] = useState(item.logo ?? '')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ company, role, employmentType, period, duration: duration || undefined, location: location || undefined, workArrangement: workArrangement || undefined, description: description || undefined, skills: strToArr(skills), logo: logo || undefined })
  }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Field label="Company"><input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Role"><input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Type"><input type="text" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} placeholder="Internship" className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Period"><input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Jan 2026 - Feb 2026" className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Duration"><input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="2 mos" className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Location"><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Work arrangement"><input type="text" value={workArrangement} onChange={(e) => setWorkArrangement(e.target.value)} placeholder="On-site" className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Skills (comma-separated)"><input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Logo URL"><input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="/logo-pama.png" className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <div className="flex gap-2 mt-3 flex-wrap">
        <button type="submit" className="px-2 py-1 text-xs bg-[var(--accent)] text-white">Save</button>
        <button type="button" onClick={onCancel} className="px-2 py-1 text-xs border border-[var(--border)]">Cancel</button>
        {onRemove && <button type="button" onClick={onRemove} className="px-2 py-1 text-xs text-red-600 border border-red-300">Remove</button>}
      </div>
    </form>
  )
}

function ProjectForm({ item, onSave, onCancel, onRemove }: { item: ProjectItem; onSave: (x: ProjectItem) => void; onCancel: () => void; onRemove?: () => void }) {
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [period, setPeriod] = useState(item.period ?? '')
  const [link, setLink] = useState(item.link ?? '')
  const [tech, setTech] = useState(arrToStr(item.tech))
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, description, period: period || undefined, link: link || undefined, tech: strToArr(tech) })
  }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Field label="Title"><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full border border-[var(--border)] px-2 py-1 text-sm" required /></Field>
      <Field label="Period"><input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Link"><input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <Field label="Tech (comma-separated)"><input type="text" value={tech} onChange={(e) => setTech(e.target.value)} className="w-full border border-[var(--border)] px-2 py-1 text-sm" /></Field>
      <div className="flex gap-2 mt-3 flex-wrap">
        <button type="submit" className="px-2 py-1 text-xs bg-[var(--accent)] text-white">Save</button>
        <button type="button" onClick={onCancel} className="px-2 py-1 text-xs border border-[var(--border)]">Cancel</button>
        {onRemove && <button type="button" onClick={onRemove} className="px-2 py-1 text-xs text-red-600 border border-red-300">Remove</button>}
      </div>
    </form>
  )
}
