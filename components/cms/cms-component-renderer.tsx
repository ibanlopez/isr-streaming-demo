import type { CMSComponent } from "@/lib/types"
import HeroBlock from "./hero-block"
import TextBlock from "./text-block"
import ImageGalleryBlock from "./image-gallery-block"
import CTABlock from "./cta-block"
import TestimonialsBlock from "./testimonials-block"

interface CMSComponentRendererProps {
  component: CMSComponent
}

export default function CMSComponentRenderer({ component }: CMSComponentRendererProps) {
  switch (component.type) {
    case "hero":
      return <HeroBlock component={component} />
    case "text":
      return <TextBlock component={component} />
    case "image-gallery":
      return <ImageGalleryBlock component={component} />
    case "cta":
      return <CTABlock component={component} />
    case "testimonials":
      return <TestimonialsBlock component={component} />
    default:
      return (
        <div className="py-8 px-4 text-center text-gray-500">
          <p>Unknown component type: {component.type}</p>
        </div>
      )
  }
}
