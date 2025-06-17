import type { CMSComponent } from "@/lib/types"
import Image from "next/image"

interface ImageGalleryBlockProps {
  component: CMSComponent
}

export default function ImageGalleryBlock({ component }: ImageGalleryBlockProps) {
  const { content } = component

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.images.map((image: any) => (
            <div key={image.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {image.caption && <p className="mt-2 text-center text-gray-600">{image.caption}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
