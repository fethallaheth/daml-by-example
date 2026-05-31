"use client"

import { useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "./Sidebar"
import { TableOfContents } from "./TableOfContents"
import { ThemeToggle } from "./ThemeToggle"
import { SearchDialog } from "./SearchDialog"
import { Breadcrumb } from "./Breadcrumb"
import type { SidebarSection, TocItem } from "@/types/content"

interface DocsLayoutProps {
  children: React.ReactNode
  sections: SidebarSection[]
  currentPath: string
  tocItems: TocItem[]
  breadcrumbItems: { label: string; href?: string }[]
}

export function DocsLayout({
  children,
  sections,
  currentPath,
  tocItems,
  breadcrumbItems,
}: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const nextPage = (() => {
    const allItems: { path: string; title: string }[] = []
    for (const section of sections) {
      for (const item of section.items) {
        allItems.push({ path: `/${section.key}/${item.slug}`, title: item.title })
      }
    }
    const idx = allItems.findIndex((p) => p.path === currentPath)
    if (idx !== -1 && idx < allItems.length - 1) {
      return allItems[idx + 1]
    }
    return null
  })()

  return (
    <div className="flex flex-col bg-white dark:bg-neutral-950" style={{ minHeight: '100dvh' }}>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 dark:border-neutral-800 dark:bg-neutral-950 max-lg:max-w-[85vw] lg:z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:invisible'
        }`}
      >
        <div className="flex h-14 sm:h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
          <Link href="/" className="text-base font-medium text-neutral-900 transition-colors hover:text-accent dark:text-neutral-100 dark:hover:text-accent">
            Topics
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1.5 text-neutral-400 transition-colors hover:text-accent active:scale-95"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar sections={sections} currentPath={currentPath} />
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col transition-[padding] duration-300 ${
          sidebarOpen ? 'lg:pl-72' : 'lg:pl-0'
        }`}
      >
        <header className="sticky top-0 z-20 flex h-14 sm:h-16 shrink-0 items-center border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-800 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/80">
          <div className="flex w-full items-center">
            <div className="flex w-auto shrink-0 items-center justify-center pl-2 pr-1 sm:w-16 sm:px-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-md p-1.5 text-neutral-400 transition-colors hover:text-accent active:scale-95"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
            </div>
            <Link href="/" className="flex-1 text-center text-sm font-medium text-neutral-900 transition-colors hover:text-accent dark:text-neutral-100 dark:hover:text-accent">
              DAML By Example
            </Link>
            <div className="flex w-auto shrink-0 items-center justify-center gap-1 px-3 sm:px-4 sm:gap-2">
              <SearchDialog />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main id="main-content" className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-8 sm:min-h-[calc(100dvh-4rem)] sm:py-8" style={{ minHeight: 'calc(100dvh - 3.5rem)' }}>
          <div className="flex w-full justify-center gap-8 xl:gap-12">
            <div className="min-w-0 max-w-5xl flex-1">
              <Breadcrumb items={breadcrumbItems} />
              <article>
                {children}
              </article>
              {nextPage && (
                <Link
                  href={nextPage.path}
                  className="mt-8 flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-all hover:border-accent hover:bg-accent-surface hover:-translate-y-0.5 dark:border-neutral-800 dark:hover:border-accent dark:hover:bg-accent-surface"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Next</span>
                    <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">{nextPage.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-accent" />
                </Link>
              )}
            </div>
            <aside className="hidden xl:block w-56 2xl:w-60 shrink-0 self-start sticky top-24">
              <TableOfContents items={tocItems} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
