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
    ]
  },
  images: {
    // remotePatterns: [
    //   //https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/post/jfk-2.jpg?width=700&height=300
    //   {
    //     protocol: 'https',
    //     hostname: 'dyhumgxwuzsrinvjiefx.supabase.co',
    //     pathname: '/storage/v1/render/image/public/blogverse-public/**',
    //   }
    // ],

    loader: 'custom',
    loaderFile: './supabase-image-loader.js',

  }
}

module.exports = nextConfig
