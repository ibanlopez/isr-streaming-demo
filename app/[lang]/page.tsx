import { Suspense } from "react";
import { getPage } from "@/lib/cms";
import CMSComponentRenderer from "@/components/cms/cms-component-renderer";
import DynamicTestimonials from "../../components/streaming/dynamic-testimonials";
import { TestimonialsLoadingSkeleton } from "@/components/blog/loading-skeletons";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ISR for static content only
export const revalidate = 300; // 5 minutes

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const page = await getPage("", lang);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords.join(", "),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  console.log(`📄 [ISR] Homepage shell loading for ${lang}`);

  // This gets cached by ISR
  const page = await getPage("", lang);

  if (!page) {
    notFound();
  }

  // Separate static and streaming components
  const staticComponents = page.components.filter((c) => !c.settings.streaming);
  const streamingComponents = page.components.filter(
    (c) => c.settings.streaming
  );

  console.log(
    `⚡ [ISR] Homepage static components: ${staticComponents.length}`
  );
  console.log(
    `🌊 [DYNAMIC] Homepage streaming components: ${streamingComponents.length}`
  );

  return (
    <div>
      {/* Static components render immediately with ISR */}
      {staticComponents.map((component) => {
        console.log(`⚡ [ISR] Rendering static component: ${component.id}`);
        return (
          <div key={component.id} className="relative">
            <CMSComponentRenderer component={component} />
          </div>
        );
      })}

      {/* Streaming components - truly dynamic, never cached */}
      {streamingComponents.map((component) => {
        console.log(
          `🌊 [DYNAMIC] Setting up streaming component: ${component.id}`
        );

        return (
          <Suspense
            key={component.id}
            fallback={
              <div>
                <div className="bg-blue-100 p-2 text-center text-sm">
                  🔄 Streaming {component.type} component...
                </div>
                <TestimonialsLoadingSkeleton />
              </div>
            }
          >
            <DynamicTestimonials componentId={component.id} language={lang} />
          </Suspense>
        );
      })}
    </div>
  );
}
