import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import type { Metadata } from "next"

export const revalidate = 86400 // 24 hours - privacy policy doesn't change often

interface PrivacyPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Política de Privacidad - Sitio Web Moderno" : "Privacy Policy - Modern Website",
    description: lang === "es" ? "Nuestra política de privacidad" : "Our privacy policy",
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 2024",
      content:
        "This is a placeholder for the privacy policy. In a real application, this would contain the full privacy policy text.",
    },
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: Diciembre 2024",
      content:
        "Este es un marcador de posición para la política de privacidad. En una aplicación real, esto contendría el texto completo de la política de privacidad.",
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
