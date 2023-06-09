/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects () {
    return [
      {
        source: '/admin',
        destination: '/admin/spaces/new',
        permanent: true
      },
      {
        source: '/admin/spaces',
        destination: '/admin/spaces/new',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
