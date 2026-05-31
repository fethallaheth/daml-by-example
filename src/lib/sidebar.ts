import { getDocFiles, getSectionLabel, getSections } from "./content"
import type { SidebarSection, SectionKey } from "@/types/content"

export function getSidebar(): SidebarSection[] {
  const docs = getDocFiles()
  const sidebar: SidebarSection[] = []

  for (const section of getSections()) {
    const items = docs
      .filter((doc) => doc.section === section)
      .sort((a, b) => a.title.localeCompare(b.title))

    if (items.length > 0) {
      sidebar.push({
        key: section,
        title: getSectionLabel(section),
        items,
      })
    }
  }

  return sidebar
}
