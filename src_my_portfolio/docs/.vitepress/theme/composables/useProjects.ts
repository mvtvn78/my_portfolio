import { data } from '../../../projects.data.js'
import type { ProjectFrontmatter } from '../../../projects.data.js'

const projectsByCategory: Record<string, ProjectFrontmatter[]> = {}

for (const project of data) {
  if (!projectsByCategory[project.category]) {
    projectsByCategory[project.category] = []
  }
  projectsByCategory[project.category].push(project)
}

export function loadProjectsByCategory(category: string): ProjectFrontmatter[] {
  let projects: ProjectFrontmatter[] = []

  if (category === 'all') {
    Object.values(projectsByCategory).forEach((categoryProjects) => {
      projects = [...projects, ...categoryProjects]
    })
  } else {
    projects = projectsByCategory[category] || []
  }

  return projects.sort((a, b) => {
    if (!a.finishedDay || !b.finishedDay) return 0
    return new Date(b.finishedDay).getTime() - new Date(a.finishedDay).getTime()
  })
}

export function getCategories() {
  return [
    { id: 'all', name: 'All', enName: 'All' },
    { id: 'ai', name: 'AI', enName: 'AI' },
    { id: 'games', name: 'Games', enName: 'Games' },
    { id: 'iot', name: 'IoT', enName: 'IoT' },
    { id: 'websites', name: 'Websites', enName: 'Websites' },
    { id: 'desktop', name: 'Desktop App', enName: 'Desktop App' },
    { id: 'mobile', name: 'Mobile App', enName: 'Mobile App' },
    { id: 'others', name: 'Others', enName: 'Others' },
  ]
}

export function getCategoryName(id: string): string {
  const categories = getCategories()
  const category = categories.find((cat) => cat.id === id)
  return category ? category.name : id
}

export function getProjectByUrl(url: string): ProjectFrontmatter | null {
  if (!url) return null

  for (const categoryProjects of Object.values(projectsByCategory)) {
    const project = categoryProjects.find((item) => item.url === url)
    if (project) return project
  }

  return null
}

export type { ProjectFrontmatter }
