import { Suspense } from "react"
import { getPage, getComponent } from "@/lib/cms"
import CMSComponentRenderer from "@/components/cms/cms-component-renderer"
import { TestimonialsLoadingSkeleton } from "@/components/blog/loading-skeletons"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// ISR configuration - shorter revalidation for dynamic content
export const revalidate = 300 // 5 minutes

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const page = await getPage("", lang)

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

// Component for streaming dynamic content with debugging
async function DynamicComponent({ componentId, language }: { componentId: string; language: string }) {
  console.log(`🔄 Loading streaming component: ${componentId}`)

  // This should have a 2 second delay
  const component = await getComponent(componentId, language)

  console.log(`✅ Loaded streaming component: ${componentId}`)

  if (!component) {
    return (
      <div className="py-8 px-4 text-center text-red-500">
        <p>Component not found: {componentId}</p>
      </div>
    )
  }

  return <CMSComponentRenderer component={component} />
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  const page = await getPage("", lang)

  if (!page) {
    notFound()
  }

  console.log(`📄 Homepage loaded for ${lang}`)
  console.log(`📊 Total components: ${page.components.length}`)

  // Separate static and streaming components
  const staticComponents = page.components.filter((c) => !c.settings.streaming)
  const streamingComponents = page.components.filter((c) => c.settings.streaming)

  console.log(`⚡ Static components: ${staticComponents.length}`)
  console.log(`🌊 Streaming components: ${streamingComponents.length}`)
  console.log(
    `🌊 Streaming component IDs:`,
    streamingComponents.map((c) => c.id),
  )

  return (
    <div>
      {/* Static components render immediately with ISR */}
      {staticComponents.map((component) => {
        console.log(`⚡ Rendering static component: ${component.id}`)
        return <CMSComponentRenderer key={component.id} component={component} />
      })}

      {/* Streaming components with proper skeleton dimensions */}
      {streamingComponents.map((component) => {
        console.log(`🌊 Setting up streaming component: ${component.id}`)

        return (
          <Suspense
            key={component.id}
            fallback={
              <div>
                <div className="bg-yellow-100 p-2 text-center text-sm">🔄 Loading {component.type} component...</div>
                <TestimonialsLoadingSkeleton />
              </div>
            }
          >
            <DynamicComponent componentId={component.id} language={lang} />
          </Suspense>
        )
      })}
    </div>
  )
}
