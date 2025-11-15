/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
            { protocol: 'https', hostname: '**.bbci.co.uk' },
      { protocol: 'https', hostname: '**.bbc.co.uk' },
      { protocol: 'https', hostname: '**.bbc.com' },
      
            { protocol: 'https', hostname: '**.wsj.com' },
      { protocol: 'https', hostname: '**.wsj.net' },
      { protocol: 'https', hostname: 's.wsj.net' },
      { protocol: 'https', hostname: 'images.wsj.net' },
      
            { protocol: 'https', hostname: '**.abcnews.com' },
      { protocol: 'https', hostname: '**.go.com' },
      { protocol: 'https', hostname: 'abcnews.go.com' },
      { protocol: 'https', hostname: 's.abcnews.com' },
      
            { protocol: 'https', hostname: '**.apnews.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      
            { protocol: 'https', hostname: '**.politico.com' },
      { protocol: 'https', hostname: 'static.politico.com' },
      
            { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.akamaized.net' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      
            { protocol: 'https', hostname: '**.com' },
      { protocol: 'https', hostname: '**.org' },
      { protocol: 'https', hostname: '**.net' },
      { protocol: 'https', hostname: '**.co.uk' },
      { protocol: 'https', hostname: '**.io' },
    ],
  },
}

export default nextConfig
