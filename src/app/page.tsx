import Link from "next/link"
import { BookOpen, Code, Network, FileJson, Database, Blocks, FileText } from "lucide-react"
import { getSidebar } from "@/lib/sidebar"
import { SearchDialog } from "@/components/SearchDialog"
import { ThemeToggle } from "@/components/ThemeToggle"

const sectionIcons: Record<string, React.ReactNode> = {
  basics: <BookOpen className="h-5 w-5 text-accent" />,
  contracts: <Code className="h-5 w-5 text-accent" />,
  testing: <Network className="h-5 w-5 text-accent" />,
  patterns: <Blocks className="h-5 w-5 text-accent" />,
  advanced: <FileJson className="h-5 w-5 text-accent" />,
  finance: <Database className="h-5 w-5 text-accent" />,
}

function getIcon(sectionKey: string): React.ReactNode {
  return sectionIcons[sectionKey] || <FileText className="h-5 w-5 text-accent" />
}

const sectionDescriptions: Record<string, string> = {
  basics: "Core language concepts: types, functions, lists, and optional values.",
  contracts: "Templates, signatories, choices, and contract keys on the ledger.",
  testing: "Daml Script: writing tests, asserting failures, and querying ledger state.",
  patterns: "IOU, propose-accept, and escrow: real-world contract patterns.",
  advanced: "Interfaces for polymorphism and structured exception handling.",
  finance: "Tokens, bonds, fungible assets, and the DAML Finance library.",
}

function getDescription(sectionKey: string): string {
  return sectionDescriptions[sectionKey] || ""
}

export default function Home() {
  const sidebar = getSidebar()

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <header data-pagefind-ignore className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-800 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/80">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            DAML By Example
          </span>
          <div className="flex items-center gap-2">
            <SearchDialog />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main data-pagefind-body id="main-content" className="mx-auto max-w-7xl px-3 py-16 sm:px-6 sm:py-20 lg:py-24">
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
          {sidebar.map((section) => (
            <Link
              key={section.key}
              href={`/${section.key}/${section.items[0]?.slug || ""}`}
              className={`group rounded-lg border border-neutral-200 bg-white p-5 sm:p-6 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700`}
            >
              <div className="mb-3 flex items-center gap-2">
                {getIcon(section.key)}
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {section.title}
                </h2>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {getDescription(section.key)}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
