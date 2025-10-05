/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'standalone',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:8080',
  },
}

module.exports = nextConfig
