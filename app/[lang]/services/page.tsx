import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const revalidate = 3600 // 1 hour

interface ServicesPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Servicios - Sitio Web Moderno" : "Services - Modern Website",
    description: lang === "es" ? "Nuestros servicios de desarrollo" : "Our development services",
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const content = {
    en: {
      title: "Our Services",
      subtitle: "We offer comprehensive digital solutions",
      services: [
        {
          title: "Web Development",
          description: "Modern, responsive websites built with the latest technologies",
          link: `/en/services/web`,
        },
        {
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications",
          link: `/en/services/mobile`,
        },
      ],
    },
    es: {
      title: "Nuestros Servicios",
      subtitle: "Ofrecemos soluciones digitales integrales",
      services: [
        {
          title: "Desarrollo Web",
          description: "Sitios web modernos y responsivos construidos con las últimas tecnologías",
          link: `/es/services/web`,
        },
        {
          title: "Apps Móviles",
          description: "Aplicaciones móviles nativas y multiplataforma",
          link: `/es/services/mobile`,
        },
      ],
    },
  }

  const pageContent = content[lang as keyof typeof content]

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{pageContent.title}</h1>
          <p className="text-xl text-gray-600">{pageContent.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pageContent.services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild>
                  <Link href={service.link}>{lang === "es" ? "Saber más" : "Learn More"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
