import { getBlogPost } from "@/lib/cms"
import Image from "next/image"

interface StaticBlogContentProps {
  slug: string
  language: string
}

export default async function StaticBlogContent({ slug, language }: StaticBlogContentProps) {
  const post = await getBlogPost(slug, language)

  if (!post) {
    return null
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
        <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
          <span>•</span>
          <span>
            {language === "es" ? "Publicado el" : "Published on"}{" "}
            {new Date(post.publishedAt).toLocaleDateString(language === "es" ? "es-ES" : "en-US")}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
        <div className="whitespace-pre-line">{post.content}</div>
      </div>
    </article>
  )
}
