/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 640, 660, 768, 1024, 1600],
    domains: ["res.cloudinary.com"]
    // loader: 'cloudinary',
    // path: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}`
  },
}

module.exports = nextConfig
