'use client'

import { EditablePortfolio } from '@/components/EditablePortfolio'
import { useAuth } from '@/components/AuthProvider'
import type { EducationItem, ExperienceItem, ProjectItem } from '@/data/portfolio'

interface Props {
  initialEducation: EducationItem[]
  initialExperience: ExperienceItem[]
  initialProjects: ProjectItem[]
}

export function PortfolioWithAuth(props: Props) {
  const { canEdit } = useAuth()
  return <EditablePortfolio {...props} canEdit={canEdit ?? false} />
}
