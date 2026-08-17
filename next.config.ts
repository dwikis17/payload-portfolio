import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['jose', 'pg-cloudflare'],

  async redirects() {
    return [
      {
        destination: '/projects/langgraph-agent',
        permanent: true,
        source: '/projects/f0a34c82-e391-49fb-b556-64128f861a97',
      },
      {
        destination: '/projects/eyespeak-assistive-tech',
        permanent: true,
        source: '/projects/3d6a5f0d-f117-4a50-9600-3a3565a55528',
      },
      {
        destination: '/projects/revalue-academy-ios',
        permanent: true,
        source: '/projects/87cc03ac-c1c7-4ffc-8e0c-a3cd70da86fe',
      },
      {
        destination: '/projects/momorun',
        permanent: true,
        source: '/projects/ca6ade94-ba87-41c6-bf0b-60e5d92621b7',
      },
      {
        destination: '/projects/findect',
        permanent: true,
        source: '/projects/7b028153-40d0-44bc-ac88-82a0b9a034a8',
      },
    ]
  },

  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
