import type React from "react"
import { Suspense } from "react"
import { isValidLanguage } from "@/lib/cms"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// ISR for layout components - longer revalidation since navigation doesn't change often
export const revalidate = 3600 // 1 hour

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Sitio Web Moderno" : "Modern Website",
    description:
      lang === "es"
        ? "Un sitio web moderno construido con Next.js y CMS"
        : "A modern website built with Next.js and CMS",
  }
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  return (
    <html lang={lang}>
      <head>
        {/* Preload critical fonts to prevent CLS */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Header with fixed height to prevent CLS */}
        <Suspense
          fallback={
            <div className="h-16 bg-white border-b animate-pulse">
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          }
        >
          <Header language={lang} />
        </Suspense>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer with consistent height to prevent CLS */}
        <Suspense
          fallback={
            <div className="bg-gray-900 min-h-[12rem] animate-pulse">
              <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                    <div className="w-32 h-3 bg-gray-700 rounded"></div>
                    <div className="w-28 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <Footer language={lang} />
        </Suspense>
      </body>
    </html>
  )
}
