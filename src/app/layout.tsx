import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"
import { Footer } from "@/components/Footer"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://damlbyexample.xyz"),
  title: {
    default: "DAML By Example",
    template: "%s - DAML By Example",
  },
  description: "Basics, contracts, testing, patterns, advanced, finance. All in one place. Open source.",
  openGraph: {
    title: "DAML By Example",
    description: "Basics, contracts, testing, patterns, advanced, finance. All in one place. Open source.",
    type: "website",
    siteName: "DAML By Example",
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DAML By Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAML By Example",
    description: "Basics, contracts, testing, patterns, advanced, finance. All in one place. Open source.",
    images: ["/opengraph-image"],
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
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}})()`
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
          Skip to content
        </a>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
