/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/wikipedia/:path*',
        destination: 'https://en.wikipedia.org/w/rest.php/:path*',
      },{
        source: '/google/complete/search/:path*',
        destination: 'http://suggestqueries.google.com/complete/search/:path*',
      },
    ]
  },
}

module.exports = nextConfig
