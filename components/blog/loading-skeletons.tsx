export function CommentsLoadingSkeleton() {
  return (
    <section className="max-w-4xl mx-auto mt-12">
      {/* Exact height match for title */}
      <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border-l-4 border-gray-200 pl-4 py-2">
            {/* Author and date line - exact spacing */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            {/* Comment content - exact line height */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function RelatedPostsLoadingSkeleton() {
  return (
    <aside className="max-w-4xl mx-auto mt-12">
      {/* Exact title height */}
      <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            {/* Exact aspect ratio match */}
            <div className="aspect-[16/9] bg-gray-200 animate-pulse"></div>

            {/* Card content with exact padding */}
            <div className="p-4 space-y-3">
              {/* Title - exact height */}
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>

              {/* Excerpt - exact line spacing */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>

              {/* Read more link */}
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export function BlogListingLoadingSkeleton() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header section - exact dimensions */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded w-32 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Blog posts grid - exact card structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              {/* Featured image - exact aspect ratio */}
              <div className="aspect-[16/9] bg-gray-200 animate-pulse"></div>

              {/* Card header - exact padding */}
              <div className="p-6 pb-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>

              {/* Card content - exact padding */}
              <div className="px-6 pb-6">
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>

                {/* Author and read more - exact layout */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsLoadingSkeleton() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title - exact height and centering */}
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse"></div>

        {/* Testimonials grid - exact structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6">
              {/* Quote - exact spacing */}
              <div className="space-y-3 mb-4">
                <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>

              {/* Author info - exact layout */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ImageGalleryLoadingSkeleton() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title - exact match */}
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>

        {/* Grid - exact structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
