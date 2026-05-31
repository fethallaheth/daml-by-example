"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { SidebarSection } from "@/types/content"

interface SidebarProps {
  sections: SidebarSection[]
  currentPath: string
}

export function Sidebar({ sections, currentPath }: SidebarProps) {
  return (
    <nav aria-label="Documentation" className="px-4 py-6">
      {sections.map((section) => (
        <SidebarSection key={section.key} section={section} currentPath={currentPath} />
      ))}
    </nav>
  )
}

function SidebarSection({ section, currentPath }: { section: SidebarSection; currentPath: string }) {
  const [expanded, setExpanded] = useState(
    section.items.some((item) => currentPath.includes(`/${section.key}/${item.slug}`))
  )

  return (
    <div className="mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
      >
        {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {section.title}
      </button>
      {expanded && (
        <ul className="mt-1 space-y-0.5">
          {section.items.map((item) => {
            const href = `/${section.key}/${item.slug}`
            const isActive = currentPath === href
            return (
              <li key={item.slug}>
                  <Link
                  href={href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-accent-surface font-semibold text-accent dark:bg-accent-surface dark:text-accent"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
