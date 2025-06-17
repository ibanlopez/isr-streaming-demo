import { Suspense } from "react";
import { getPage, getComponent } from "@/lib/cms";
import CMSComponentRenderer from "@/components/cms/cms-component-renderer";
import { notFound } from "next/navigation";

// ISR configuration - this proves ISR works alongside streaming
export const revalidate = 300; // 5 minutes

interface StreamingTestPageProps {
  params: Promise<{ lang: string }>;
}

// Streaming component that loads slowly
async function StreamingTestComponent({
  componentId,
  language,
}: {
  componentId: string;
  language: string;
}) {
  console.log(`🌊 Loading streaming test component: ${componentId}`);

  const component = await getComponent(componentId, language);

  if (!component) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded">
        <p>Component not found: {componentId}</p>
      </div>
    );
  }

  console.log(`✅ Streaming test component loaded: ${componentId}`);
  return <CMSComponentRenderer component={component} />;
}

// Loading skeleton for streaming content
function StreamingTestSkeleton() {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="text-sm text-blue-600 mt-2">
        🔄 Loading streaming component...
      </div>
    </div>
  );
}

export default async function StreamingTestPage({
  params,
}: StreamingTestPageProps) {
  const { lang } = await params;

  console.log(`📄 Streaming test page loaded for ${lang}`);

  // Get the test page data (this will be ISR cached)
  const page = await getPage("streaming-test", lang);

  if (!page) {
    notFound();
  }

  // Separate static and streaming components
  const staticComponents = page.components.filter((c) => !c.settings.streaming);
  const streamingComponents = page.components.filter(
    (c) => c.settings.streaming
  );

  console.log(`⚡ Static ISR components: ${staticComponents.length}`);
  console.log(`🌊 Streaming components: ${streamingComponents.length}`);

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page header - from ISR cached page data */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
          <p className="text-lg text-gray-600">{page.description}</p>
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
            <p className="text-sm text-green-800">
              ✅ <strong>ISR Content:</strong> This page title and description
              loaded instantly from ISR cache (revalidates every 5 minutes)
            </p>
          </div>
        </div>

        {/* Static components - render immediately from ISR */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Static ISR Components</h2>
          {staticComponents.map((component) => (
            <div key={component.id} className="relative">
              <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
                ISR Cached
              </div>
              <CMSComponentRenderer component={component} />
            </div>
          ))}
        </div>

        {/* Streaming components - load progressively */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Streaming Components</h2>
          {streamingComponents.map((component) => (
            <div key={component.id} className="relative">
              <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
                Streaming
              </div>
              <Suspense fallback={<StreamingTestSkeleton />}>
                <StreamingTestComponent
                  componentId={component.id}
                  language={lang}
                />
              </Suspense>
            </div>
          ))}
        </div>

        {/* Explanation section */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🧪 What You're Seeing</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Green badges (ISR):</strong> Content loaded instantly from
              cache, revalidates every 5 minutes
            </li>
            <li>
              <strong>Blue badges (Streaming):</strong> Content loads
              progressively with 3-second delay
            </li>
            <li>
              <strong>Page refresh:</strong> ISR content stays fast, streaming
              content always fresh
            </li>
            <li>
              <strong>After 5 minutes:</strong> ISR content regenerates in
              background
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
