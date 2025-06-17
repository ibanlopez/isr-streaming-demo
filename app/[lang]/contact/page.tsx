import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import type { Metadata } from "next"

export const revalidate = 3600 // 1 hour

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Contacto - Sitio Web Moderno" : "Contact - Modern Website",
    description: lang === "es" ? "Ponte en contacto con nosotros" : "Get in touch with us",
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with our team",
      description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    },
    es: {
      title: "Contáctanos",
      subtitle: "Ponte en contacto con nuestro equipo",
      description: "Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.",
    },
  }

  const pageContent = content[lang as keyof typeof content]

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{pageContent.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{pageContent.subtitle}</p>
        <p className="text-lg">{pageContent.description}</p>
        <div className="mt-12 p-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">
            {lang === "es" ? "Página de contacto - Próximamente" : "Contact page - Coming soon"}
          </p>
        </div>
      </div>
    </div>
  )
}
