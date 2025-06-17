import type { CMSComponent } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroBlockProps {
  component: CMSComponent
}

export default function HeroBlock({ component }: HeroBlockProps) {
  const { content } = component

  return (
    <section className="relative h-[600px] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
        <p className="text-xl mb-8">{content.subtitle}</p>
        <Button asChild size="lg">
          <Link href={content.ctaLink}>{content.ctaText}</Link>
        </Button>
      </div>
    </section>
  )
}
