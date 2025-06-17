/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations for streaming
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Enable streaming in production
    ppr: false, // Set to true if using Partial Prerendering
  },

  // Image optimization
  images: {
    domains: ["placeholder.svg"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    unoptimized: true,
  },

  // Compression
  compress: true,

  // Production logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: "/placeholder.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
