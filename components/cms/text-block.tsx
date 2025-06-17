import type { CMSComponent } from "@/lib/types"

interface TextBlockProps {
  component: CMSComponent
}

export default function TextBlock({ component }: TextBlockProps) {
  const { content } = component

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{content.title}</h2>
        <div className="prose prose-lg max-w-none">
          <p>{content.content}</p>
        </div>
      </div>
    </section>
  )
}
