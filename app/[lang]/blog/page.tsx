import { Suspense } from "react"
import { getBlogPosts } from "@/lib/cms"
import { notFound } from "next/navigation"
import { isValidLanguage } from "@/lib/cms"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogListingLoadingSkeleton } from "@/components/blog/loading-skeletons"
import type { Metadata } from "next"

// DISABLE ISR for this page to force streaming every time
export const revalidate = 0 // Force dynamic rendering

interface BlogPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === "es" ? "Blog - Sitio Web Moderno" : "Blog - Modern Website",
    description:
      lang === "es" ? "Artículos sobre desarrollo web y tecnología" : "Articles about web development and technology",
  }
}

// Separate component for blog content to enable streaming
async function BlogContent({ language }: { language: string }) {
  console.log(`🔄 Loading blog posts for ${language}`)

  // This will have a 1.5 second delay
  const posts = await getBlogPosts(language)

  console.log(`✅ Loaded ${posts.length} blog posts for ${language}`)

  const content = {
    en: {
      title: "Blog",
      subtitle: "Latest articles about web development and technology",
      readMore: "Read More",
      publishedOn: "Published on",
    },
    es: {
      title: "Blog",
      subtitle: "Últimos artículos sobre desarrollo web y tecnología",
      readMore: "Leer Más",
      publishedOn: "Publicado el",
    },
  }

  const pageContent = content[language as keyof typeof content]

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{pageContent.title}</h1>
          <p className="text-xl text-gray-600">{pageContent.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link href={`/${language}/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {pageContent.publishedOn}{" "}
                  {new Date(post.publishedAt).toLocaleDateString(language === "es" ? "es-ES" : "en-US")}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-600">{post.author.name}</span>
                  </div>
                  <Link
                    href={`/${language}/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {pageContent.readMore} →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  console.log(`📄 Blog page accessed for ${lang}`)

  return (
    <Suspense
      fallback={
        <div>
          <div className="bg-blue-100 p-2 text-center text-sm">🔄 Loading blog posts...</div>
          <BlogListingLoadingSkeleton />
        </div>
      }
    >
      <BlogContent language={lang} />
    </Suspense>
  )
}
