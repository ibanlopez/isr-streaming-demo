import { Suspense } from "react";
import { getPage } from "@/lib/cms";
import CMSComponentRenderer from "@/components/cms/cms-component-renderer";
import DynamicTestimonials from "../../../components/streaming/dynamic-testimonials";
import DynamicImageGallery from "../../../components/streaming/dynamic-image-gallery";
import { notFound } from "next/navigation";

// ISR for the page shell and static content ONLY
export const revalidate = 300; // 5 minutes for static content

interface StreamingTestPageProps {
  params: Promise<{ lang: string }>;
}

// Loading skeletons that match component dimensions
function TestimonialsLoadingSkeleton() {
  return (
    <div className="relative">
      <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
        🔄 Loading...
      </div>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="space-y-3 mb-4">
                  <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ImageGalleryLoadingSkeleton() {
  return (
    <div className="relative">
      <div className="absolute -top-2 -left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded z-10">
        🔄 Loading...
      </div>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function StreamingTestPage({
  params,
}: StreamingTestPageProps) {
  const { lang } = await params;

  console.log(`📄 [ISR] Streaming test page shell loading for ${lang}`);

  // This gets cached by ISR (page shell and static content)
  const page = await getPage("streaming-test", lang);

  if (!page) {
    notFound();
  }

  // Separate static and streaming components
  const staticComponents = page.components.filter((c) => !c.settings.streaming);
  const streamingComponents = page.components.filter(
    (c) => c.settings.streaming
  );

  console.log(
    `⚡ [ISR] Static components (cached): ${staticComponents.length}`
  );
  console.log(
    `🌊 [DYNAMIC] Streaming components (never cached): ${streamingComponents.length}`
  );

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page header - ISR cached */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
          <p className="text-lg text-gray-600">{page.description}</p>
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
            <p className="text-sm text-green-800">
              ✅ <strong>ISR Content:</strong> This page shell loaded from ISR
              cache (revalidates every 5 minutes)
            </p>
          </div>
        </div>

        {/* Static components - ISR cached */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Static ISR Components</h2>
          {staticComponents.map((component) => (
            <div key={component.id} className="relative">
              <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
                ⚡ ISR Cached
              </div>
              <CMSComponentRenderer component={component} />
            </div>
          ))}
        </div>

        {/* Streaming components - NEVER cached, always dynamic */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            Dynamic Streaming Components
          </h2>

          {/* Testimonials - streams with 3s delay */}
          <Suspense fallback={<TestimonialsLoadingSkeleton />}>
            <DynamicTestimonials
              componentId="test-streaming-1"
              language={lang}
            />
          </Suspense>

          {/* Image Gallery - streams with 3s delay */}
          <Suspense fallback={<ImageGalleryLoadingSkeleton />}>
            <DynamicImageGallery
              componentId="test-streaming-gallery"
              language={lang}
            />
          </Suspense>
        </div>

        {/* Explanation section - ISR cached */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🧪 What You Should See</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>⚡ Green badges (ISR):</strong> Content loaded instantly
              from cache, revalidates every 5 minutes
            </li>
            <li>
              <strong>🌊 Blue badges (Streaming):</strong> Content loads
              progressively with 3-second delay, NEVER cached
            </li>
            <li>
              <strong>🖼️ Purple badges (Gallery):</strong> Image gallery streams
              separately, also never cached
            </li>
            <li>
              <strong>Page refresh:</strong> ISR content stays fast, streaming
              content always takes 3+ seconds
            </li>
            <li>
              <strong>Network tab:</strong> You should see separate RSC requests
              for streaming components
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
