import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import type { Metadata } from "next"

export const revalidate = 3600 // 1 hour

interface WebServicesPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Desarrollo Web - Sitio Web Moderno" : "Web Development - Modern Website",
    description: lang === "es" ? "Servicios de desarrollo web" : "Web development services",
  }
}

export default async function WebServicesPage({ params }: WebServicesPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const content = {
    en: {
      title: "Web Development",
      description:
        "We create modern, responsive websites using cutting-edge technologies like Next.js, React, and TypeScript.",
    },
    es: {
      title: "Desarrollo Web",
      description:
        "Creamos sitios web modernos y responsivos usando tecnologías de vanguardia como Next.js, React y TypeScript.",
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
