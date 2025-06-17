// Another truly dynamic component
export const dynamic = "force-dynamic";
export const revalidate = false;

import { getComponent } from "@/lib/cms";
import CMSComponentRenderer from "@/components/cms/cms-component-renderer";

interface DynamicImageGalleryProps {
  componentId: string;
  language: string;
}

export default async function DynamicImageGallery({
  componentId,
  language,
}: DynamicImageGalleryProps) {
  console.log(`🖼️ [DYNAMIC] Loading image gallery: ${componentId}`);

  // Always fresh, never cached
  const component = await getComponent(componentId, language);

  console.log(`✅ [DYNAMIC] Image gallery loaded: ${componentId}`);

  if (!component) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded">
        <p>❌ Dynamic gallery not found: {componentId}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -top-2 -left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded z-10">
        🖼️ Gallery Streamed
      </div>
      <CMSComponentRenderer component={component} />
    </div>
  );
}
