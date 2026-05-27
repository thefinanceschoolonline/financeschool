
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thefinanceschool.online',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'thefinanceschool.online',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'financeschool.sirv.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
