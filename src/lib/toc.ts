import type { TocItem } from "@/types/content"

export function extractToc(mdxContent: string): TocItem[] {
  const items: TocItem[] = []
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    items.push({ id, text, level })
  }

  return items
}
