/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations for streaming
  experimental: {
    // Enable streaming in production
    ppr: false, // Set to true if using Partial Prerendering
  },
  
  // Image optimization
  images: {
    domains: ['placeholder.svg'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  
  // Compression
  compress: true,
  
  // Production logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
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
}

export default nextConfig
