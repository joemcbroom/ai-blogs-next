/** @type {import('next').NextConfig} */
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

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
}

module.exports = nextConfig
