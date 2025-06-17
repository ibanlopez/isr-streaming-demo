import { Suspense } from "react"

// Force dynamic rendering
export const revalidate = 0

interface StreamingTestPageProps {
  params: Promise<{ lang: string }>
}

async function SlowComponent({ delay, name }: { delay: number; name: string }) {
  console.log(`🔄 ${name} starting...`)
  await new Promise((resolve) => setTimeout(resolve, delay))
  console.log(`✅ ${name} finished!`)

  return (
    <div className="p-4 bg-green-100 border border-green-300 rounded">
      <h3 className="font-bold">{name}</h3>
      <p>This component took {delay}ms to load</p>
    </div>
  )
}

function LoadingSkeleton({ name }: { name: string }) {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="text-sm text-gray-500 mt-2">Loading {name}...</div>
    </div>
  )
}

export default async function StreamingTestPage({ params }: StreamingTestPageProps) {
  const { lang } = await params

  console.log(`📄 Streaming test page loaded for ${lang}`)

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Streaming Test Page</h1>
        <p>This page tests if streaming with Suspense is working correctly.</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Instant Content (No Suspense)</h2>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">
              <p>This content loads immediately</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Streaming Content (With Suspense)</h2>

            <Suspense fallback={<LoadingSkeleton name="Component 1" />}>
              <SlowComponent delay={1000} name="Component 1 (1 second)" />
            </Suspense>

            <div className="mt-4">
              <Suspense fallback={<LoadingSkeleton name="Component 2" />}>
                <SlowComponent delay={2000} name="Component 2 (2 seconds)" />
              </Suspense>
            </div>

            <div className="mt-4">
              <Suspense fallback={<LoadingSkeleton name="Component 3" />}>
                <SlowComponent delay={3000} name="Component 3 (3 seconds)" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
