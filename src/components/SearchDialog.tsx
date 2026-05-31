"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface PagefindResult {
  id: string
  data: () => Promise<{
    url: string
    title: string
    excerpt: string
  }>
}

interface PagefindInstance {
  search: (query: string) => Promise<{
    results: PagefindResult[]
  }>
}

declare global {
  interface Window {
    pagefind: PagefindInstance
  }
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ url: string; title: string; excerpt: string }[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults([])
    }
  }, [open])

  const handleSearch = useCallback(async (value: string) => {
    setQuery(value)
    if (!value.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const pagefind = window.pagefind
      if (!pagefind) {
        setResults([])
        return
      }
      const searchResult = await pagefind.search(value)
      const items = await Promise.all(
        searchResult.results.slice(0, 10).map(async (r) => {
          const data = await r.data()
          return data
        })
      )
      setResults(items)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-all hover:border-accent/30 hover:bg-accent-surface hover:text-accent active:scale-95 sm:h-9 sm:w-9 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:border-accent/30 dark:hover:bg-accent-surface dark:hover:text-accent"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]" role="dialog" aria-modal="true" aria-label="Search">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            ref={dialogRef}
            className="relative z-50 mx-3 w-full max-w-lg rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center border-b border-neutral-200 px-4 dark:border-neutral-800">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search documentation..."
                aria-label="Search documentation"
                className="h-12 w-full border-0 bg-transparent px-3 text-sm outline-none placeholder:text-neutral-400"
              />
              <kbd className="hidden shrink-0 rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-400 sm:inline-block dark:border-neutral-700">
                ESC
              </kbd>
              <button
                onClick={() => setOpen(false)}
                className="ml-2 rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-600 sm:hidden"
                aria-label="Close search"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {loading && (
                <p className="px-3 py-6 text-center text-sm text-neutral-400">Searching...</p>
              )}

              {!loading && query && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-neutral-400">No results found.</p>
              )}

              {results.length > 0 && (
                <ul>
                  {results.map((result) => (
                    <li key={result.url}>
                      <a
                        href={result.url}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent-surface dark:hover:bg-accent-surface"
                      >
                        <span className="font-medium text-accent">
                          {result.title}
                        </span>
                        {result.excerpt && (
                          <span
                            className="mt-0.5 line-clamp-1 text-neutral-500"
                            dangerouslySetInnerHTML={{ __html: result.excerpt }}
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {!query && !loading && (
                <p className="px-3 py-6 text-center text-sm text-neutral-400">
                  Start typing to search...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
