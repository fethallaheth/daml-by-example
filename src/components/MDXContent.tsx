import { MDXRemote } from "next-mdx-remote/rsc"
import { CodeBlock } from "./CodeBlock"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

const components = {
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => {
    const child = children as React.ReactElement
    if (child?.type === "code") {
      const code = child.props.children as string
      const language = child.props.className?.replace("language-", "") || ""
      const filename = child.props["data-filename"] as string | undefined
      return <CodeBlock code={code} language={language} filename={filename} />
    }
    return <pre {...props}>{children}</pre>
  },
  code: ({ children, className, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    if (className) {
      return <CodeBlock code={String(children)} language={className.replace("language-", "")} />
    }
    return (
      <code
        className="rounded-md bg-accent-surface px-1.5 py-0.5 text-sm font-mono text-accent dark:bg-accent-surface dark:text-accent"
        {...props}
      >
        {children}
      </code>
    )
  },
  a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#")
    return (
      <a
        href={href}
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="text-accent underline underline-offset-2 decoration-accent/30 hover:decoration-accent transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },
  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-neutral-200 bg-neutral-50 px-4 py-2 text-left font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td
      className="border border-neutral-200 px-4 py-2 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
      {...props}
    >
      {children}
    </td>
  ),
  blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-4 border-neutral-300 bg-neutral-50 px-4 py-2 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
      {...props}
    >
      {children}
    </blockquote>
  ),
}

interface MDXContentProps {
  source: string
}

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-custom">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
          },
        }}
      />
    </div>
  )
}
