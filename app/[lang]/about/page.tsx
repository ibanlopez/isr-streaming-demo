import { Suspense } from "react"
import { getPage, getComponent } from "@/lib/cms"
import CMSComponentRenderer from "@/components/cms/cms-component-renderer"
import { ImageGalleryLoadingSkeleton } from "@/components/blog/loading-skeletons"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// ISR configuration - longer revalidation for static about content
export const revalidate = 1800 // 30 minutes

interface AboutPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const page = await getPage("about", lang)

  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords.join(", "),
  }
}

// Component for streaming dynamic content
async function DynamicAboutComponent({ componentId, language }: { componentId: string; language: string }) {
  // This will have a 2 second delay
  const component = await getComponent(componentId, language)

  if (!component) {
    return (
      <div className="py-8 px-4 text-center text-gray-500">
        <p>Component not found: {componentId}</p>
      </div>
    )
  }

  return <CMSComponentRenderer component={component} />
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const page = await getPage("about", lang)

  if (!page) {
    notFound()
  }

  // Separate static and streaming components
  const staticComponents = page.components.filter((c) => !c.settings.streaming)
  const streamingComponents = page.components.filter((c) => c.settings.streaming)

  return (
    <div>
      {/* Static components render immediately with ISR */}
      {staticComponents.map((component) => (
        <CMSComponentRenderer key={component.id} component={component} />
      ))}

      {/* Streaming components with proper skeletons */}
      {streamingComponents.map((component) => (
        <Suspense key={component.id} fallback={<ImageGalleryLoadingSkeleton />}>
          <DynamicAboutComponent componentId={component.id} language={lang} />
        </Suspense>
      ))}
    </div>
  )
}
