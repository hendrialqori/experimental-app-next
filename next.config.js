/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['robohash.org', "avatars.githubusercontent.com"]
  }
}

module.exports = nextConfig
