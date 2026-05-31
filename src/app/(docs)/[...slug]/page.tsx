import { notFound, redirect } from "next/navigation"
import { getDocBySlug, getAllDocPaths, getSectionLabel } from "@/lib/content"
import { getSidebar } from "@/lib/sidebar"
import { extractToc } from "@/lib/toc"
import { MDXContent } from "@/components/MDXContent"
import { DocsLayout } from "@/components/DocsLayout"

export function generateStaticParams() {
  const paths = getAllDocPaths()
  return paths.map((p) => ({
    slug: [p.section, p.slug],
  }))
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  if (slug.length === 1) {
    const section = slug[0]
    const paths = getAllDocPaths().filter((p) => p.section === section)
    if (paths.length > 0) {
      redirect(`/${section}/${paths[0].slug}`)
    }
    notFound()
  }

  if (slug.length < 2) notFound()

  const [section, docSlug] = slug

  const doc = getDocBySlug(section, docSlug)
  if (!doc) notFound()

  const tocItems = extractToc(doc.content)
  const sections = getSidebar()
  const currentPath = `/${section}/${docSlug}`

  const breadcrumbItems = [
    { label: getSectionLabel(section), href: `/${section}` },
    { label: doc.meta.title },
  ]

  return (
    <DocsLayout
      sections={sections}
      currentPath={currentPath}
      tocItems={tocItems}
      breadcrumbItems={breadcrumbItems}
    >
      <MDXContent source={doc.content} />
    </DocsLayout>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  if (!slug || slug.length < 2) return {}

  const [section, docSlug] = slug
  const doc = getDocBySlug(section, docSlug)
  if (!doc) return {}

  return {
    title: doc.meta.title,
    description: doc.meta.description,
    openGraph: {
      title: doc.meta.title,
      description: doc.meta.description,
    },
  }
}
