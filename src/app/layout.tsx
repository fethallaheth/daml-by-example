import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "DAML By Example",
    template: "%s - DAML By Example",
  },
  description: "Learn DAML smart contracts through practical examples. A hands-on guide to building on the Canton Network.",
  openGraph: {
    title: "DAML By Example",
    description: "Learn DAML smart contracts through practical examples.",
    type: "website",
    siteName: "DAML By Example",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAML By Example",
    description: "Learn DAML smart contracts through practical examples.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
