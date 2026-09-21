/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'green-donkey-647181.hostingersite.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/moringa-capsules.htm',
        destination: '/product/moringa-capsules',
        permanent: true,
      },
      {
        source: '/triphala-powder.htm',
        destination: '/product/triphala-powder',
        permanent: true,
      },
      {
        source: '/neem-juice.htm',
        destination: '/product/neem-juice',
        permanent: true,
      },
      {
        source: '/moringa-powder.htm',
        destination: '/product/moringa-powder',
        permanent: true,
      },
      {
        source: '/skin-kanti-capsules.htm',
        destination: '/product/skin-kanti-capsules',
        permanent: true,
      },
      {
        // Catch-all for any other .htm files
        source: '/:path*.htm',
        destination: '/products',
        permanent: true,
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
export default nextConfig;
