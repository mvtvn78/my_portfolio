import { createContentLoader } from 'vitepress'

export interface ProjectFrontmatter {
  url: string
  category: string
  language?: string
  image: string
  videoURL: string | null
  linkGithub: string
  finishedDay: string
  tech: string[]
  vi: { title: string; about: string; features: string[]; role: string[] }
  en: { title: string; about: string; features: string[]; role: string[] }
}

declare const data: ProjectFrontmatter[]
export { data }

export default createContentLoader('projects/**/*.md', {
  transform(raw) {
    return raw.map((page) => page.frontmatter as ProjectFrontmatter)
  },
})
