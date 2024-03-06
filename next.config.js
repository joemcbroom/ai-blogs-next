/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects () {
    return [
      {
        source: '/admin',
        destination: '/admin/spaces/new',
        permanent: true
      },
    ]
  },
  images: {
    remotePatterns: [
      // `https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/${path}`
      {
        hostname: 'dyhumgxwuzsrinvjiefx.supabase.co',
        protocol: 'https',
        pathname: '/storage/v1/render/image/public/blogverse-public/**',
      },
      //`https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/object/public/blogverse-public/${path}`;
      {
        hostname: 'dyhumgxwuzsrinvjiefx.supabase.co',
        protocol: 'https',
        pathname: '/storage/v1/object/public/blogverse-public/**',
      }
    ]
  }
}

module.exports = nextConfig
