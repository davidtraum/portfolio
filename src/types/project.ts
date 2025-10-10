export interface ProjectLink {
  label: string
  url: string
  icon?: 'github' | 'external'
}

export interface Project {
  id: string
  title: string
  description: string
  screenshot: string
  tags: string[]
  links: ProjectLink[]
  period?: string
  highlight?: boolean
}
