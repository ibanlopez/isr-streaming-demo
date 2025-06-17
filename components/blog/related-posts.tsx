import { getBlogPost, getRelatedBlogPosts } from "@/lib/cms"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedPostsProps {
  slug: string
  language: string
}

export default async function RelatedPosts({ slug, language }: RelatedPostsProps) {
  // Get the current post to exclude it from related posts
  const currentPost = await getBlogPost(slug, language)
  if (!currentPost) return null

  const related = await getRelatedBlogPosts(currentPost.id, language, 3)

  if (related.length === 0) return null

  const labels = {
    en: {
      title: "Related Posts",
      readMore: "Read More",
    },
    es: {
      title: "Artículos Relacionados",
      readMore: "Leer Más",
    },
  }

  const content = labels[language as keyof typeof labels]

  return (
    <aside className="max-w-4xl mx-auto mt-12">
      <h3 className="text-2xl font-bold mb-6">{content.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Card key={post.id}>
            <div className="relative aspect-[16/9]">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">
                <Link href={`/${language}/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
              <Link
                href={`/${language}/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {content.readMore} →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </aside>
  )
}
