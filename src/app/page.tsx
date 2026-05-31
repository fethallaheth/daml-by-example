import Link from "next/link"
import { ArrowRight, BookOpen, Code, Network, FileJson, Database, Blocks, FileText } from "lucide-react"
import { getSidebar } from "@/lib/sidebar"
import { SearchDialog } from "@/components/SearchDialog"
import { ThemeToggle } from "@/components/ThemeToggle"

const sectionIcons: Record<string, React.ReactNode> = {
  basics: <BookOpen className="h-5 w-5 text-accent" />,
  templates: <Code className="h-5 w-5 text-accent" />,
  choices: <FileJson className="h-5 w-5 text-accent" />,
  interfaces: <Blocks className="h-5 w-5 text-accent" />,
  canton: <Network className="h-5 w-5 text-accent" />,
  finance: <Database className="h-5 w-5 text-accent" />,
}

function getIcon(sectionKey: string): React.ReactNode {
  return sectionIcons[sectionKey] || <FileText className="h-5 w-5 text-accent" />
}

const sectionDescriptions: Record<string, string> = {
  basics: "Core concepts and your first contract",
  templates: "Structure and patterns for DAML templates",
  choices: "How choices drive contract evolution",
  interfaces: "Polymorphism and contract abstraction",
  canton: "Running DAML on the Canton Network",
  finance: "Financial instruments in DAML",
}

function getDescription(sectionKey: string, items: { description?: string }[]): string {
  return sectionDescriptions[sectionKey] || items[0]?.description || ""
}

export default function Home() {
  const sidebar = getSidebar()

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-800 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/80">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            DAML By Example
          </span>
          <div className="flex items-center gap-2">
            <SearchDialog />
            <ThemeToggle />
            <Link
              href={`/${sidebar[0]?.key}/${sidebar[0]?.items[0]?.slug || ""}`}
              className="ml-2 inline-flex h-8 sm:h-9 items-center rounded-md bg-accent px-3 sm:px-4 text-sm font-medium text-white transition-colors hover:bg-accent/85 dark:bg-accent dark:text-white dark:hover:bg-accent/85"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mb-14 sm:mb-20 text-center">
          <h1 className="mb-4 sm:mb-5 text-4xl font-bold tracking-tighter text-neutral-900 sm:text-5xl lg:text-6xl dark:text-neutral-100">
            DAML By Example
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg font-medium text-neutral-500 dark:text-neutral-400">
            Learn DAML smart contracts through practical, hands-on examples.
            A developer-focused guide to building on the Canton Network.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sidebar.map((section, i) => (
            <div
              key={section.key}
              className={`group rounded-lg border border-neutral-200 bg-white p-5 sm:p-6 transition-all hover:border-neutral-300 hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="mb-3 flex items-center gap-2">
                {getIcon(section.key)}
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {section.title}
                </h2>
              </div>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
                {getDescription(section.key, section.items)}
              </p>
              <ul className="space-y-1.5">
                {section.items.slice(0, 3).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${section.key}/${item.slug}`}
                      className="group/link flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-accent dark:text-neutral-400 dark:hover:text-accent"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent/60 transition-colors group-hover/link:text-accent" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
