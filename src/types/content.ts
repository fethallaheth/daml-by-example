export type SectionKey = string

export interface DocFile {
  slug: string
  title: string
  description?: string
  section: SectionKey
}

export interface SidebarSection {
  key: SectionKey
  title: string
  items: DocFile[]
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface DocMeta {
  title: string
  description?: string
}
