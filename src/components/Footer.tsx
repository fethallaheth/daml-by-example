import Link from "next/link"

export function Footer() {
  return (
    <footer data-pagefind-ignore className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-sm text-neutral-500 sm:flex-row sm:justify-between dark:text-neutral-400">
        <span>
          Open-source &middot; Contributions welcome
        </span>
        <span className="flex items-center gap-4">
          <a
            href="https://github.com/fethallaheth/daml-by-example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository (opens in new tab)"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/fethallahbenmokhtar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="mailto:fethallahbenmokhtar@gmail.com"
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
        </span>
      </div>
    </footer>
  )
}
