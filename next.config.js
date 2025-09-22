/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
}

module.exports = nextConfig
