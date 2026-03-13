export interface EducationItem {
  school: string
  degree: string
  period: string
  grade?: string
  skills?: string[]
  logo?: string
}

export interface ExperienceItem {
  company: string
  role: string
  employmentType: string
  period: string
  duration?: string
  location?: string
  workArrangement?: string
  description?: string
  skills?: string[]
  logo?: string
}

export interface ProjectItem {
  title: string
  description: string
  period?: string
  link?: string
  tech?: string[]
}

export const personalInfo = {
  name: 'Omar Sebastian Birawa',
  title: 'College student',
  bio: '',
  email: 'speedroadster345@gmail.com',
  photo: '',
}

export const education: EducationItem[] = [
  {
    school: 'Diponegoro University',
    degree: 'Bachelor of Engineering - BE, Electrical and Electronics Engineering',
    period: 'Aug 2023 – Jan 2027',
    grade: '3.41',
    skills: ['Python (Programming Language)', 'MySQL'],
    logo: '/logo-undip.png',
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Pamapersada Nusantara',
    role: 'Digital Transformation Intern',
    employmentType: 'Internship',
    period: 'Jan 2026 - Feb 2026',
    duration: '2 mos',
    location: 'Jakarta, Indonesia',
    workArrangement: 'On-site',
    description:
      'I made a data visualization web that plots a road based on VHMS data. The web was built using Python and Dash. The main impact of this project is to determine missing data from a system called H2D that recommends speed for fuel saving, and also plots the road a dumptruck just passed.',
    skills: ['Python (Programming Language)', 'Visualisasi Data', '+2 skills'],
    logo: '/logo-pama.png',
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Project Title',
    description: 'Brief description of the project and your role.',
    period: '2023',
    link: 'https://github.com/you/repo',
    tech: ['React', 'TypeScript'],
  },
]
