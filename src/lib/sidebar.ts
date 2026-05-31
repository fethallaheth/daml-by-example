import { getDocFiles, getSectionLabel, getSections } from "./content"
import type { SidebarSection, SectionKey } from "@/types/content"

export function getSidebar(): SidebarSection[] {
  const docs = getDocFiles()
  const sectionOrder: SectionKey[] = ["basics", "contracts", "testing", "patterns", "advanced", "finance"]
  const sidebar: SidebarSection[] = []

  for (const section of sectionOrder) {
    if (!getSections().includes(section)) continue

    const items = docs
      .filter((doc) => doc.section === section)

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
