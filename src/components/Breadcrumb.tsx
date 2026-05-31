import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="truncate transition-colors hover:text-accent dark:hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span className="text-accent" aria-current={isLast ? "page" : undefined}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
