import { getDocFiles, getSectionLabel, getSections } from "./content"
import type { SidebarSection, SectionKey } from "@/types/content"

const pageOrder: Record<string, string[]> = {
  basics: ["hello-world", "types-and-data", "functions-and-let", "optional-and-lists"],
  contracts: ["first-contract", "signatories-and-observers", "choices", "ensure-and-assert", "contract-keys"],
  testing: ["first-script", "submit-must-fail", "querying-state"],
  patterns: ["iou", "propose-and-accept", "escrow"],
  advanced: ["interfaces", "exceptions"],
  finance: ["token", "bond", "fungible-asset", "daml-finance"],
}

export function getSidebar(): SidebarSection[] {
  const docs = getDocFiles()
  const sectionOrder: SectionKey[] = ["basics", "contracts", "testing", "patterns", "advanced", "finance"]
  const sidebar: SidebarSection[] = []

  for (const section of sectionOrder) {
    if (!getSections().includes(section)) continue

    const order = pageOrder[section] ?? []
    const items = docs
      .filter((doc) => doc.section === section)
      .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))

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
