"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "./Providers"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-accent-surface hover:text-accent dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-accent-surface dark:hover:text-accent"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className="h-4 w-4 hidden dark:inline" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  )
}
