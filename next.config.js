/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  distDir: 'out',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://zealous-island-06bb96510.2.azurestaticapps.net',
  },
  // Disable API routes for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

module.exports = nextConfig
