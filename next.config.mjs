/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.com' },
      { protocol: 'https', hostname: '**.org' },
      { protocol: 'https', hostname: '**.net' },
      { protocol: 'https', hostname: '**.co.uk' },
      { protocol: 'https', hostname: '**.io' },
      { protocol: 'https', hostname: '**.bbci.co.uk' },
      { protocol: 'https', hostname: 'media-cldnry.s-nbcnews.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.akamaized.net' },
    ],
  },
}

export default nextConfig
