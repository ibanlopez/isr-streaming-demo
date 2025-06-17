import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import type { Metadata } from "next"

export const revalidate = 86400 // 24 hours - terms don't change often

interface TermsPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Términos de Servicio - Sitio Web Moderno" : "Terms of Service - Modern Website",
    description: lang === "es" ? "Nuestros términos de servicio" : "Our terms of service",
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: December 2024",
      content:
        "This is a placeholder for the terms of service. In a real application, this would contain the full terms of service text.",
    },
    es: {
      title: "Términos de Servicio",
      lastUpdated: "Última actualización: Diciembre 2024",
      content:
        "Este es un marcador de posición para los términos de servicio. En una aplicación real, esto contendría el texto completo de los términos de servicio.",
    },
  }

  const pageContent = content[lang as keyof typeof content]

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{pageContent.title}</h1>
        <p className="text-gray-600 mb-8">{pageContent.lastUpdated}</p>
        <div className="prose prose-lg max-w-none">
          <p>{pageContent.content}</p>
        </div>
      </div>
    </div>
  )
}
