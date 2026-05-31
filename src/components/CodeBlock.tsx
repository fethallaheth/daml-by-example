"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { useTheme } from "./Providers"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState("")
  const codeRef = useRef<HTMLPreElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki")
        const html = await codeToHtml(code, {
          lang: language || "daml",
          theme: resolvedTheme === "dark" ? "github-dark" : "github-light",
        })
        setHighlighted(html)
      } catch {
        setHighlighted("")
      }
    }
    highlight()
  }, [code, language, resolvedTheme])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      try {
        const ta = document.createElement("textarea")
        ta.value = code
        ta.style.position = "fixed"
        ta.style.opacity = "0"
        document.body.appendChild(ta)
        ta.select()
        document.execCommand("copy")
        document.body.removeChild(ta)
      } catch {
        // Clipboard unavailable — ignore silently
      }
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6 sm:my-8 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      {filename && (
        <div className="flex items-center border-b border-neutral-200 bg-accent-surface px-3 sm:px-4 py-2 text-xs font-medium text-accent dark:border-neutral-800 dark:bg-accent-surface dark:text-accent">
          {filename}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-2 sm:right-3 top-2 sm:top-3 z-10 rounded-md border border-neutral-200 bg-white p-1.5 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-600 focus-visible:opacity-100 group-hover:opacity-100 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        {highlighted ? (
          <div
            ref={codeRef}
            className="overflow-x-auto p-4 sm:p-5 text-xs sm:text-sm [&_pre]:bg-transparent [&_pre]:p-0 [&_pre_code]:!text-xs [&_pre_code]:sm:!text-sm"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre
            ref={codeRef}
            className="overflow-x-auto p-4 sm:p-5 text-xs sm:text-sm"
          >
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
