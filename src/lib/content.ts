import fs from "fs"
import path from "path"
import type { SectionKey, DocFile, DocMeta } from "@/types/content"

const CONTENT_DIR = path.join(process.cwd(), "content")

export function getSections(): SectionKey[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter((entry) => {
    const entryPath = path.join(CONTENT_DIR, entry)
    return fs.statSync(entryPath).isDirectory()
  })
}

function sectionLabel(section: SectionKey): string {
  return section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")
}

const SECTION_LABELS: Record<string, string> = {
  basics: "Basics",
  contracts: "Contracts",
  testing: "Testing",
  patterns: "Patterns",
  advanced: "Advanced",
  finance: "Finance",
}

function parseFrontmatter(fileContent: string): { meta: Record<string, string>; content: string } {
  const meta: Record<string, string> = {}
  if (!fileContent.startsWith("---")) return { meta, content: fileContent }

  const endIndex = fileContent.indexOf("---", 3)
  if (endIndex === -1) return { meta, content: fileContent }

  const frontmatter = fileContent.slice(3, endIndex).trim()
  const content = fileContent.slice(endIndex + 3).trim()

  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":")
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, "")
      meta[key] = value
    }
  }

  return { meta, content }
}

export function getDocFiles(): DocFile[] {
  const files: DocFile[] = []

  for (const section of getSections()) {
    const sectionDir = path.join(CONTENT_DIR, section)
    if (!fs.existsSync(sectionDir)) continue

    const entries = fs.readdirSync(sectionDir)
    for (const entry of entries) {
      if (!entry.endsWith(".mdx")) continue
      const filePath = path.join(sectionDir, entry)
      const raw = fs.readFileSync(filePath, "utf-8")
      const { meta } = parseFrontmatter(raw)
      const slug = entry.replace(/\.mdx$/, "")

      files.push({
        slug,
        section,
        title: meta.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: meta.description,
      })
    }
  }

  return files
}

export function getDocBySlug(section: SectionKey, slug: string): { meta: DocMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { meta, content } = parseFrontmatter(raw)

  return {
    meta: {
      title: meta.title || slug.replace(/-/g, " "),
      description: meta.description,
    },
    content,
  }
}

export function getSectionLabel(section: SectionKey): string {
  return SECTION_LABELS[section] || sectionLabel(section)
}

export function getAllDocPaths(): { section: SectionKey; slug: string }[] {
  const paths: { section: SectionKey; slug: string }[] = []

  for (const section of getSections()) {
    const sectionDir = path.join(CONTENT_DIR, section)
    if (!fs.existsSync(sectionDir)) continue

    const entries = fs.readdirSync(sectionDir)
    for (const entry of entries) {
      if (!entry.endsWith(".mdx")) continue
      paths.push({
        section,
        slug: entry.replace(/\.mdx$/, ""),
      })
    }
  }

  return paths
}
