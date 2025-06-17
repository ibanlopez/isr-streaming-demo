export interface CMSPage {
  id: string
  slug: string
  title: string
  description: string
  language: string
  components: CMSComponent[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  updatedAt: string
}

export interface CMSComponent {
  id: string
  type: "hero" | "text" | "image-gallery" | "cta" | "testimonials"
  content: any
  settings: {
    revalidate?: number
    streaming?: boolean
  }
}

export interface CMSNavigation {
  id: string
  language: string
  items: NavigationItem[]
  updatedAt: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  children?: NavigationItem[]
}

export interface CMSGlobalSettings {
  id: string
  language: string
  header: {
    logo: string
    navigation: string // Navigation ID reference
  }
  footer: {
    copyright: string
    links: NavigationItem[]
    socialMedia: {
      platform: string
      url: string
    }[]
  }
  updatedAt: string
}

// New blog-specific types
export interface CMSBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  updatedAt: string
  language: string
  tags: string[]
  featuredImage: string
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface CMSBlogComment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: string
  approved: boolean
}
