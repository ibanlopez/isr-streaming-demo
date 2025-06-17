import { getBlogPost, getBlogComments } from "@/lib/cms"

interface DynamicCommentsProps {
  slug: string
  language: string
}

export default async function DynamicComments({ slug, language }: DynamicCommentsProps) {
  try {
    // Get the post first to get the ID
    const post = await getBlogPost(slug, language)
    if (!post) return null

    // Add timeout for production reliability
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Comments timeout")), 10000))

    const commentsPromise = getBlogComments(post.id)

    // Race between data fetch and timeout
    const comments = (await Promise.race([commentsPromise, timeoutPromise])) as any[]

    const labels = {
      en: {
        title: "Comments",
        noComments: "No comments yet. Be the first to comment!",
        error: "Unable to load comments. Please try again later.",
      },
      es: {
        title: "Comentarios",
        noComments: "Aún no hay comentarios. ¡Sé el primero en comentar!",
        error: "No se pudieron cargar los comentarios. Inténtalo más tarde.",
      },
    }

    const content = labels[language as keyof typeof labels]

    return (
      <section className="max-w-4xl mx-auto mt-12">
        <h3 className="text-2xl font-bold mb-6">
          {content.title} ({comments.length})
        </h3>
        {comments.length === 0 ? (
          <p className="text-gray-600 italic">{content.noComments}</p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <strong className="text-gray-900">{comment.author}</strong>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString(language === "es" ? "es-ES" : "en-US")}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    )
  } catch (error) {
    // Graceful error handling for production
    const labels = {
      en: { error: "Unable to load comments. Please try again later." },
      es: { error: "No se pudieron cargar los comentarios. Inténtalo más tarde." },
    }

    const content = labels[language as keyof typeof labels]

    return (
      <section className="max-w-4xl mx-auto mt-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">{content.error}</p>
        </div>
      </section>
    )
  }
}
