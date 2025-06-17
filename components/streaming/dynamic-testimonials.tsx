// This component NEVER gets cached - always runs fresh
export const dynamic = "force-dynamic";
export const revalidate = false;

import { getComponent } from "@/lib/cms";
import CMSComponentRenderer from "@/components/cms/cms-component-renderer";

interface DynamicTestimonialsProps {
  componentId: string;
  language: string;
}

export default async function DynamicTestimonials({
  componentId,
  language,
}: DynamicTestimonialsProps) {
  console.log(`🌊 [DYNAMIC] Loading streaming component: ${componentId}`);

  // This will ALWAYS run server-side, never cached
  const component = await getComponent(componentId, language);

  console.log(`✅ [DYNAMIC] Streaming component loaded: ${componentId}`);

  if (!component) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded">
        <p>❌ Dynamic component not found: {componentId}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
        🌊 Streamed Fresh
      </div>
      <CMSComponentRenderer component={component} />
    </div>
  );
}
