import { Suspense } from "react"
import { getBlogPost, generateStaticBlogParams } from "@/lib/cms"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Components
import StaticBlogContent from "@/components/blog/static-blog-content"
import DynamicComments from "@/components/blog/dynamic-comments"
import RelatedPosts from "@/components/blog/related-posts"
import { CommentsLoadingSkeleton, RelatedPostsLoadingSkeleton } from "@/components/blog/loading-skeletons"

// ISR configuration - revalidate every hour for blog posts
export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return await generateStaticBlogParams()
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const post = await getBlogPost(slug, lang)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(", "),
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const post = await getBlogPost(slug, lang)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-16 px-4">
      {/* Static content with ISR - renders immediately */}
      <StaticBlogContent slug={slug} language={lang} />

      {/* Dynamic content with streaming - loads progressively */}
      <Suspense fallback={<CommentsLoadingSkeleton />}>
        <DynamicComments slug={slug} language={lang} />
      </Suspense>

      <Suspense fallback={<RelatedPostsLoadingSkeleton />}>
        <RelatedPosts slug={slug} language={lang} />
      </Suspense>
    </div>
  )
}
