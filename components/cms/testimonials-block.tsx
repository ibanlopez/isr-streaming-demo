import type { CMSComponent } from "@/lib/types"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialsBlockProps {
  component: CMSComponent
}

export default function TestimonialsBlock({ component }: TestimonialsBlockProps) {
  const { content } = component

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.testimonials.map((testimonial: any) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <p className="text-lg mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
