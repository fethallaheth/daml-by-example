"use client"

import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "./Providers"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-accent-surface hover:text-accent sm:h-9 sm:w-9 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
        <span className="sr-only">Toggle theme</span>
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-accent-surface hover:text-accent sm:h-9 sm:w-9 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-accent-surface dark:hover:text-accent"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
