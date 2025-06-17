import type { CMSComponent } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CTABlockProps {
  component: CMSComponent
}

export default function CTABlock({ component }: CTABlockProps) {
  const { content } = component

  return (
    <section className={`py-16 px-4 ${content.backgroundColor || "bg-gray-100"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">{content.title}</h2>
        <p className="text-xl mb-8 text-white/90">{content.description}</p>
        <Button asChild size="lg" variant="secondary">
          <Link href={content.buttonLink}>{content.buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}
