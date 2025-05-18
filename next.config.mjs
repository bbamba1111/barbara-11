/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'v0.blob.com', 
      'the-work-life-balance-audit-1111.vercel.app',
      'make-time-for-more.vercel.app',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
  },
}

export default nextConfig;