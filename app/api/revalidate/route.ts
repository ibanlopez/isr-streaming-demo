import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, tag, secret, language, type, slug } = body

    // Validate webhook secret (in production, use environment variable)
    if (secret !== "your-webhook-secret") {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    // Handle blog-specific revalidation
    if (type === "blog") {
      if (slug && language) {
        // Revalidate specific blog post
        revalidatePath(`/${language}/blog/${slug}`)
        console.log(`Revalidated blog post: /${language}/blog/${slug}`)
      } else if (language) {
        // Revalidate blog listing for specific language
        revalidatePath(`/${language}/blog`)
        console.log(`Revalidated blog listing: /${language}/blog`)
      } else {
        // Revalidate all blog pages
        revalidatePath(`/en/blog`)
        revalidatePath(`/es/blog`)
        console.log(`Revalidated all blog listings`)
      }
    }

    // Revalidate by path
    if (path) {
      if (language) {
        // Revalidate specific language path
        const fullPath = `/${language}${path === "/" ? "" : path}`
        revalidatePath(fullPath)
        console.log(`Revalidated path: ${fullPath}`)
      } else {
        // Revalidate all language versions
        const enPath = `/en${path === "/" ? "" : path}`
        const esPath = `/es${path === "/" ? "" : path}`
        revalidatePath(enPath)
        revalidatePath(esPath)
        console.log(`Revalidated paths: ${enPath}, ${esPath}`)
      }
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      path: path || null,
      tag: tag || null,
      language: language || "all",
      type: type || null,
      slug: slug || null,
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      {
        error: "Error revalidating",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Add GET method for testing
export async function GET() {
  return NextResponse.json({
    message: "Revalidation API endpoint",
    usage: "POST with { path?, tag?, secret, language? }",
    example: {
      path: "/about",
      secret: "your-webhook-secret",
      language: "en",
    },
  })
}
