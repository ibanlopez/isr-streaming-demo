import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import type { Metadata } from "next"

export const revalidate = 3600 // 1 hour

interface MobileServicesPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Apps Móviles - Sitio Web Moderno" : "Mobile Apps - Modern Website",
    description: lang === "es" ? "Servicios de desarrollo de aplicaciones móviles" : "Mobile app development services",
  }
}

export default async function MobileServicesPage({ params }: MobileServicesPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const content = {
    en: {
      title: "Mobile Apps",
      description:
        "We develop native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
    },
    es: {
      title: "Apps Móviles",
      description:
        "Desarrollamos aplicaciones móviles nativas y multiplataforma para iOS y Android usando React Native y Flutter.",
    },
  }

  const pageContent = content[lang as keyof typeof content]

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{pageContent.title}</h1>
        <p className="text-lg text-gray-600">{pageContent.description}</p>
      </div>
    </div>
  )
}
