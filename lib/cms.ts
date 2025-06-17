import type {
  CMSPage,
  CMSComponent,
  CMSNavigation,
  CMSGlobalSettings,
  CMSBlogPost,
  CMSBlogComment,
} from "./types";

// Realistic delays with console logging for debugging
const delay = (ms: number) => {
  console.log(`⏱️  Starting ${ms}ms delay...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ ${ms}ms delay completed`);
      resolve(undefined);
    }, ms);
  });
};

// Simulated CMS data
const cmsData = {
  pages: {
    en: {
      home: {
        id: "home-en",
        slug: "",
        title: "Welcome to Our Website",
        description: "A modern website built with Next.js and CMS",
        language: "en",
        seo: {
          title: "Home - Modern Website",
          description: "Welcome to our modern website built with Next.js",
          keywords: ["nextjs", "cms", "modern", "website"],
        },
        components: [
          {
            id: "hero-1",
            type: "hero" as const,
            content: {
              title: "Build Amazing Experiences",
              subtitle: "With Next.js 15 and modern CMS architecture",
              backgroundImage: "/placeholder.svg?height=600&width=1200",
              ctaText: "Get Started",
              ctaLink: "/en/about",
            },
            settings: { revalidate: 3600, streaming: false },
          },
          {
            id: "text-1",
            type: "text" as const,
            content: {
              title: "Our Mission",
              content:
                "We create exceptional digital experiences using cutting-edge technology and innovative design principles.",
            },
            settings: { revalidate: 1800, streaming: false },
          },
          {
            id: "testimonials-1",
            type: "testimonials" as const,
            content: {
              title: "What Our Clients Say",
              testimonials: [
                {
                  id: "1",
                  name: "John Doe",
                  company: "Tech Corp",
                  content: "Amazing work and exceptional service!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  id: "2",
                  name: "Jane Smith",
                  company: "Design Studio",
                  content: "They delivered beyond our expectations.",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
              ],
            },
            settings: { revalidate: 300, streaming: true },
          },
        ],
        updatedAt: new Date().toISOString(),
      },
      about: {
        id: "about-en",
        slug: "about",
        title: "About Us",
        description: "Learn more about our company and mission",
        language: "en",
        seo: {
          title: "About Us - Modern Website",
          description: "Learn about our company, mission, and values",
          keywords: ["about", "company", "mission", "team"],
        },
        components: [
          {
            id: "text-about-1",
            type: "text" as const,
            content: {
              title: "Our Story",
              content:
                "Founded in 2020, we have been at the forefront of digital innovation, helping businesses transform their online presence.",
            },
            settings: { revalidate: 3600, streaming: false },
          },
          {
            id: "image-gallery-1",
            type: "image-gallery" as const,
            content: {
              title: "Our Team",
              images: [
                {
                  id: "1",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Team Member 1",
                  caption: "John - CEO",
                },
                {
                  id: "2",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Team Member 2",
                  caption: "Sarah - CTO",
                },
              ],
            },
            settings: { revalidate: 1800, streaming: true },
          },
          {
            id: "cta-about-1",
            type: "cta" as const,
            content: {
              title: "Ready to Work Together?",
              description:
                "Let's discuss your next project and how we can help you achieve your goals.",
              buttonText: "Contact Us",
              buttonLink: "/en/contact",
              backgroundColor: "bg-blue-600",
            },
            settings: { revalidate: 3600, streaming: false },
          },
        ],
        updatedAt: new Date().toISOString(),
      },
      "streaming-test": {
        id: "streaming-test-en",
        slug: "streaming-test",
        title: "ISR + Streaming Test Page",
        description:
          "This page demonstrates how ISR and Streaming work together perfectly",
        language: "en",
        seo: {
          title: "ISR + Streaming Test - Modern Website",
          description:
            "Live demonstration of ISR and Streaming working together",
          keywords: ["isr", "streaming", "nextjs", "test", "demo"],
        },
        components: [
          {
            id: "test-static-1",
            type: "text" as const,
            content: {
              title: "Static ISR Component",
              content:
                "This content is served from ISR cache and loads instantly. It only regenerates every 5 minutes in the background. Perfect for content that doesn't change frequently but needs to be fast.",
            },
            settings: { revalidate: 300, streaming: false },
          },
          {
            id: "test-static-2",
            type: "cta" as const,
            content: {
              title: "Another ISR Component",
              description:
                "This CTA block is also cached with ISR. Notice how both static components appear immediately.",
              buttonText: "ISR is Fast!",
              buttonLink: "/en/about",
              backgroundColor: "bg-green-600",
            },
            settings: { revalidate: 300, streaming: false },
          },
          {
            id: "test-streaming-1",
            type: "testimonials" as const,
            content: {
              title: "Streaming Component (3s delay)",
              testimonials: [
                {
                  id: "1",
                  name: "ISR User",
                  company: "Fast Loading Co",
                  content:
                    "ISR gives us instant page loads for our static content!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  id: "2",
                  name: "Streaming User",
                  company: "Dynamic Data Inc",
                  content:
                    "Streaming keeps our dynamic content fresh without blocking the page!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
              ],
            },
            settings: { revalidate: 60, streaming: true },
          },
          {
            id: "test-streaming-gallery",
            type: "image-gallery" as const,
            content: {
              title: "Dynamic Image Gallery (3s delay)",
              images: [
                {
                  id: "1",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Streaming Image 1",
                  caption: "This image loaded via streaming",
                },
                {
                  id: "2",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Streaming Image 2",
                  caption: "This image also streamed in",
                },
              ],
            },
            settings: { revalidate: 0, streaming: true },
          },
        ],
        updatedAt: new Date().toISOString(),
      },
    },
    es: {
      home: {
        id: "home-es",
        slug: "",
        title: "Bienvenido a Nuestro Sitio Web",
        description: "Un sitio web moderno construido con Next.js y CMS",
        language: "es",
        seo: {
          title: "Inicio - Sitio Web Moderno",
          description:
            "Bienvenido a nuestro sitio web moderno construido con Next.js",
          keywords: ["nextjs", "cms", "moderno", "sitio web"],
        },
        components: [
          {
            id: "hero-1-es",
            type: "hero" as const,
            content: {
              title: "Construye Experiencias Increíbles",
              subtitle: "Con Next.js 15 y arquitectura CMS moderna",
              backgroundImage: "/placeholder.svg?height=600&width=1200",
              ctaText: "Comenzar",
              ctaLink: "/es/about",
            },
            settings: { revalidate: 3600, streaming: false },
          },
          {
            id: "text-1-es",
            type: "text" as const,
            content: {
              title: "Nuestra Misión",
              content:
                "Creamos experiencias digitales excepcionales utilizando tecnología de vanguardia y principios de diseño innovadores.",
            },
            settings: { revalidate: 1800, streaming: false },
          },
          {
            id: "testimonials-1-es",
            type: "testimonials" as const,
            content: {
              title: "Lo Que Dicen Nuestros Clientes",
              testimonials: [
                {
                  id: "1",
                  name: "Juan Pérez",
                  company: "Tech Corp",
                  content: "¡Trabajo increíble y servicio excepcional!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  id: "2",
                  name: "María García",
                  company: "Design Studio",
                  content: "Superaron nuestras expectativas.",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
              ],
            },
            settings: { revalidate: 300, streaming: true },
          },
        ],
        updatedAt: new Date().toISOString(),
      },
      about: {
        id: "about-es",
        slug: "about",
        title: "Acerca de Nosotros",
        description: "Conoce más sobre nuestra empresa y misión",
        language: "es",
        seo: {
          title: "Acerca de Nosotros - Sitio Web Moderno",
          description: "Conoce nuestra empresa, misión y valores",
          keywords: ["acerca", "empresa", "misión", "equipo"],
        },
        components: [
          {
            id: "text-about-1-es",
            type: "text" as const,
            content: {
              title: "Nuestra Historia",
              content:
                "Fundada en 2020, hemos estado a la vanguardia de la innovación digital, ayudando a las empresas a transformar su presencia en línea.",
            },
            settings: { revalidate: 3600, streaming: false },
          },
          {
            id: "image-gallery-1-es",
            type: "image-gallery" as const,
            content: {
              title: "Nuestro Equipo",
              images: [
                {
                  id: "1",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Miembro del Equipo 1",
                  caption: "Juan - CEO",
                },
                {
                  id: "2",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Miembro del Equipo 2",
                  caption: "Sarah - CTO",
                },
              ],
            },
            settings: { revalidate: 1800, streaming: true },
          },
          {
            id: "cta-about-1-es",
            type: "cta" as const,
            content: {
              title: "¿Listo para Trabajar Juntos?",
              description:
                "Hablemos sobre tu próximo proyecto y cómo podemos ayudarte a alcanzar tus objetivos.",
              buttonText: "Contáctanos",
              buttonLink: "/es/contact",
              backgroundColor: "bg-blue-600",
            },
            settings: { revalidate: 3600, streaming: false },
          },
        ],
        updatedAt: new Date().toISOString(),
      },
      "streaming-test": {
        id: "streaming-test-es",
        slug: "streaming-test",
        title: "Página de Prueba ISR + Streaming",
        description:
          "Esta página demuestra cómo ISR y Streaming funcionan perfectamente juntos",
        language: "es",
        seo: {
          title: "Prueba ISR + Streaming - Sitio Web Moderno",
          description:
            "Demostración en vivo de ISR y Streaming trabajando juntos",
          keywords: ["isr", "streaming", "nextjs", "prueba", "demo"],
        },
        components: [
          {
            id: "test-static-1-es",
            type: "text" as const,
            content: {
              title: "Componente ISR Estático",
              content:
                "Este contenido se sirve desde la caché ISR y carga instantáneamente. Solo se regenera cada 5 minutos en segundo plano. Perfecto para contenido que no cambia frecuentemente pero necesita ser rápido.",
            },
            settings: { revalidate: 300, streaming: false },
          },
          {
            id: "test-static-2-es",
            type: "cta" as const,
            content: {
              title: "Otro Componente ISR",
              description:
                "Este bloque CTA también está en caché con ISR. Nota cómo ambos componentes estáticos aparecen inmediatamente.",
              buttonText: "¡ISR es Rápido!",
              buttonLink: "/es/about",
              backgroundColor: "bg-green-600",
            },
            settings: { revalidate: 300, streaming: false },
          },
          {
            id: "test-streaming-1-es",
            type: "testimonials" as const,
            content: {
              title: "Componente Streaming (retraso 3s)",
              testimonials: [
                {
                  id: "1",
                  name: "Usuario ISR",
                  company: "Carga Rápida SA",
                  content:
                    "¡ISR nos da cargas de página instantáneas para nuestro contenido estático!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  id: "2",
                  name: "Usuario Streaming",
                  company: "Datos Dinámicos Inc",
                  content:
                    "¡Streaming mantiene nuestro contenido dinámico fresco sin bloquear la página!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
              ],
            },
            settings: { revalidate: 60, streaming: true },
          },
          {
            id: "test-streaming-gallery",
            type: "image-gallery" as const,
            content: {
              title: "Dynamic Image Gallery (3s delay)",
              images: [
                {
                  id: "1",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Streaming Image 1",
                  caption: "This image loaded via streaming",
                },
                {
                  id: "2",
                  src: "/placeholder.svg?height=300&width=400",
                  alt: "Streaming Image 2",
                  caption: "This image also streamed in",
                },
              ],
            },
            settings: { revalidate: 0, streaming: true },
          },
        ],
        updatedAt: new Date().toISOString(),
      },
    },
  },
  navigation: {
    en: {
      id: "nav-en",
      language: "en",
      items: [
        { id: "1", label: "Home", href: "/en" },
        { id: "2", label: "About", href: "/en/about" },
        { id: "2.5", label: "Blog", href: "/en/blog" },
        { id: "2.6", label: "Streaming Test", href: "/en/streaming-test" },
        {
          id: "3",
          label: "Services",
          href: "/en/services",
          children: [
            { id: "3-1", label: "Web Development", href: "/en/services/web" },
            { id: "3-2", label: "Mobile Apps", href: "/en/services/mobile" },
          ],
        },
        { id: "4", label: "Contact", href: "/en/contact" },
      ],
      updatedAt: new Date().toISOString(),
    },
    es: {
      id: "nav-es",
      language: "es",
      items: [
        { id: "1", label: "Inicio", href: "/es" },
        { id: "2", label: "Acerca", href: "/es/about" },
        { id: "2.5", label: "Blog", href: "/es/blog" },
        { id: "2.6", label: "Test Streaming", href: "/es/streaming-test" },
        {
          id: "3",
          label: "Servicios",
          href: "/es/services",
          children: [
            { id: "3-1", label: "Desarrollo Web", href: "/es/services/web" },
            { id: "3-2", label: "Apps Móviles", href: "/es/services/mobile" },
          ],
        },
        { id: "4", label: "Contacto", href: "/es/contact" },
      ],
      updatedAt: new Date().toISOString(),
    },
  },
  globalSettings: {
    en: {
      id: "global-en",
      language: "en",
      header: {
        logo: "/placeholder.svg?height=40&width=120",
        navigation: "nav-en",
      },
      footer: {
        copyright: "© 2024 Modern Website. All rights reserved.",
        links: [
          { id: "f1", label: "Privacy Policy", href: "/en/privacy" },
          { id: "f2", label: "Terms of Service", href: "/en/terms" },
        ],
        socialMedia: [
          { platform: "Twitter", url: "https://twitter.com/company" },
          { platform: "LinkedIn", url: "https://linkedin.com/company/company" },
        ],
      },
      updatedAt: new Date().toISOString(),
    },
    es: {
      id: "global-es",
      language: "es",
      header: {
        logo: "/placeholder.svg?height=40&width=120",
        navigation: "nav-es",
      },
      footer: {
        copyright: "© 2024 Sitio Web Moderno. Todos los derechos reservados.",
        links: [
          { id: "f1", label: "Política de Privacidad", href: "/es/privacy" },
          { id: "f2", label: "Términos de Servicio", href: "/es/terms" },
        ],
        socialMedia: [
          { platform: "Twitter", url: "https://twitter.com/company" },
          { platform: "LinkedIn", url: "https://linkedin.com/company/company" },
        ],
      },
      updatedAt: new Date().toISOString(),
    },
  },
  blogPosts: {
    en: [
      {
        id: "post-1-en",
        slug: "nextjs-15-features",
        title: "Exploring Next.js 15 New Features",
        excerpt:
          "Discover the latest features and improvements in Next.js 15, including enhanced performance and developer experience.",
        content:
          "Next.js 15 brings significant improvements to the React framework ecosystem. With enhanced performance optimizations, improved developer experience, and new features like better caching strategies, it's a game-changer for modern web development. The new App Router continues to evolve, providing better patterns for data fetching and rendering strategies.",
        author: {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=60&width=60",
        },
        publishedAt: "2024-12-15T10:00:00Z",
        updatedAt: "2024-12-15T10:00:00Z",
        language: "en",
        tags: ["nextjs", "react", "web-development"],
        featuredImage: "/placeholder.svg?height=400&width=800",
        seo: {
          title: "Exploring Next.js 15 New Features - Modern Website",
          description:
            "Discover the latest features and improvements in Next.js 15",
          keywords: ["nextjs", "react", "web development", "javascript"],
        },
      },
      {
        id: "post-2-en",
        slug: "isr-streaming-guide",
        title: "ISR and Streaming: The Perfect Combination",
        excerpt:
          "Learn how to combine Incremental Static Regeneration with streaming for optimal performance.",
        content:
          "Incremental Static Regeneration (ISR) and streaming with Suspense can work together beautifully. While ISR handles the static content that doesn't change frequently, streaming allows dynamic content to load progressively. This combination provides the best of both worlds: fast initial page loads and fresh dynamic content.",
        author: {
          name: "Mike Chen",
          avatar: "/placeholder.svg?height=60&width=60",
        },
        publishedAt: "2024-12-14T14:30:00Z",
        updatedAt: "2024-12-14T14:30:00Z",
        language: "en",
        tags: ["isr", "streaming", "performance"],
        featuredImage: "/placeholder.svg?height=400&width=800",
        seo: {
          title: "ISR and Streaming: The Perfect Combination - Modern Website",
          description:
            "Learn how to combine ISR with streaming for optimal performance",
          keywords: ["isr", "streaming", "nextjs", "performance"],
        },
      },
      {
        id: "post-3-en",
        slug: "cms-architecture-patterns",
        title: "Modern CMS Architecture Patterns",
        excerpt:
          "Exploring headless CMS patterns and how they integrate with modern frameworks.",
        content:
          "Headless CMS architecture has revolutionized how we build and manage content-driven websites. By separating content management from presentation, we can create more flexible, scalable, and maintainable applications. This approach works particularly well with modern frameworks like Next.js.",
        author: {
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=60&width=60",
        },
        publishedAt: "2024-12-13T09:15:00Z",
        updatedAt: "2024-12-13T09:15:00Z",
        language: "en",
        tags: ["cms", "architecture", "headless"],
        featuredImage: "/placeholder.svg?height=400&width=800",
        seo: {
          title: "Modern CMS Architecture Patterns - Modern Website",
          description: "Exploring headless CMS patterns and modern frameworks",
          keywords: ["cms", "headless", "architecture", "nextjs"],
        },
      },
    ],
    es: [
      {
        id: "post-1-es",
        slug: "caracteristicas-nextjs-15",
        title: "Explorando las Nuevas Características de Next.js 15",
        excerpt:
          "Descubre las últimas características y mejoras en Next.js 15, incluyendo rendimiento mejorado y experiencia de desarrollador.",
        content:
          "Next.js 15 trae mejoras significativas al ecosistema del framework React. Con optimizaciones de rendimiento mejoradas, mejor experiencia de desarrollador y nuevas características como mejores estrategias de caché, es un cambio revolucionario para el desarrollo web moderno.",
        author: {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=60&width=60",
        },
        publishedAt: "2024-12-15T10:00:00Z",
        updatedAt: "2024-12-15T10:00:00Z",
        language: "es",
        tags: ["nextjs", "react", "desarrollo-web"],
        featuredImage: "/placeholder.svg?height=400&width=800",
        seo: {
          title:
            "Explorando las Nuevas Características de Next.js 15 - Sitio Web Moderno",
          description:
            "Descubre las últimas características y mejoras en Next.js 15",
          keywords: ["nextjs", "react", "desarrollo web", "javascript"],
        },
      },
    ],
  },
  blogComments: [
    {
      id: "comment-1",
      postId: "post-1-en",
      author: "John Doe",
      email: "john@example.com",
      content:
        "Great article! Next.js 15 really does seem like a game-changer. The performance improvements are noticeable.",
      createdAt: "2024-12-15T12:30:00Z",
      approved: true,
    },
    {
      id: "comment-2",
      postId: "post-1-en",
      author: "Jane Smith",
      email: "jane@example.com",
      content:
        "Thanks for the detailed explanation. I'm excited to try out the new caching features.",
      createdAt: "2024-12-15T14:15:00Z",
      approved: true,
    },
    {
      id: "comment-3",
      postId: "post-2-en",
      author: "Alex Wilson",
      email: "alex@example.com",
      content:
        "The combination of ISR and streaming is indeed powerful. We've seen great results in our production apps.",
      createdAt: "2024-12-14T16:45:00Z",
      approved: true,
    },
    {
      id: "comment-4",
      postId: "post-2-en",
      author: "Maria Garcia",
      email: "maria@example.com",
      content:
        "This helped me understand the concepts much better. Looking forward to implementing this pattern.",
      createdAt: "2024-12-14T18:20:00Z",
      approved: true,
    },
  ],
};

// Core CMS API Functions
export async function getPage(
  slug: string,
  language: string
): Promise<CMSPage | null> {
  console.log(`📄 getPage called: slug="${slug}", language="${language}"`);
  await delay(100);

  const pageKey = slug === "" ? "home" : slug;
  const page =
    cmsData.pages[language as keyof typeof cmsData.pages]?.[
      pageKey as keyof typeof cmsData.pages.en
    ];

  console.log(`📄 getPage result: ${page ? "found" : "not found"}`);
  return page || null;
}

export async function getNavigation(
  language: string
): Promise<CMSNavigation | null> {
  console.log(`🧭 getNavigation called: language="${language}"`);
  await delay(50);

  return (
    cmsData.navigation[language as keyof typeof cmsData.navigation] || null
  );
}

export async function getGlobalSettings(
  language: string
): Promise<CMSGlobalSettings | null> {
  console.log(`⚙️ getGlobalSettings called: language="${language}"`);
  await delay(50);

  return (
    cmsData.globalSettings[language as keyof typeof cmsData.globalSettings] ||
    null
  );
}

export async function getComponent(
  componentId: string,
  language: string
): Promise<CMSComponent | null> {
  console.log(
    `🧩 getComponent called: componentId="${componentId}", language="${language}"`
  );
  await delay(3000); // 3 second delay for streaming components

  const pages = cmsData.pages[language as keyof typeof cmsData.pages];
  if (!pages) {
    console.log(`🧩 getComponent: no pages found for language "${language}"`);
    return null;
  }

  for (const page of Object.values(pages)) {
    const component = page.components.find((c) => c.id === componentId);
    if (component) {
      console.log(`🧩 getComponent: found component "${componentId}"`);
      return component;
    }
  }

  console.log(`🧩 getComponent: component "${componentId}" not found`);
  return null;
}

// Blog-specific CMS functions
export async function getBlogPosts(
  language: string,
  limit?: number
): Promise<CMSBlogPost[]> {
  console.log(`📝 getBlogPosts called: language="${language}", limit=${limit}`);
  await delay(2000); // 2 second delay for blog listing

  const posts =
    cmsData.blogPosts[language as keyof typeof cmsData.blogPosts] || [];
  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  console.log(`📝 getBlogPosts: returning ${sortedPosts.length} posts`);
  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}

export async function getBlogPost(
  slug: string,
  language: string
): Promise<CMSBlogPost | null> {
  console.log(`📝 getBlogPost called: slug="${slug}", language="${language}"`);
  await delay(100);

  const posts =
    cmsData.blogPosts[language as keyof typeof cmsData.blogPosts] || [];
  return posts.find((post) => post.slug === slug) || null;
}

export async function getBlogComments(
  postId: string
): Promise<CMSBlogComment[]> {
  console.log(`💬 getBlogComments called: postId="${postId}"`);
  await delay(2500); // 2.5 second delay for comments

  try {
    const comments = cmsData.blogComments
      .filter((comment) => comment.postId === postId && comment.approved)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    console.log(`💬 getBlogComments: returning ${comments.length} comments`);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function getRelatedBlogPosts(
  currentPostId: string,
  language: string,
  limit = 3
): Promise<CMSBlogPost[]> {
  console.log(
    `🔗 getRelatedBlogPosts called: currentPostId="${currentPostId}", language="${language}"`
  );
  await delay(2000); // 2 second delay for related posts

  try {
    const posts =
      cmsData.blogPosts[language as keyof typeof cmsData.blogPosts] || [];
    const otherPosts = posts.filter((post) => post.id !== currentPostId);
    const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateStaticBlogParams(): Promise<
  { lang: string; slug: string }[]
> {
  const params: { lang: string; slug: string }[] = [];

  for (const [language, posts] of Object.entries(cmsData.blogPosts)) {
    for (const post of posts) {
      params.push({ lang: language, slug: post.slug });
    }
  }

  return params;
}

// Utility functions
export function getSupportedLanguages(): string[] {
  return ["en", "es"];
}

export function isValidLanguage(lang: string): boolean {
  return getSupportedLanguages().includes(lang);
}
