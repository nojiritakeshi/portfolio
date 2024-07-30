/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  images: {
    domains: ['picsum.photos']
  },
  output: 'export',
  basePath: isProd ? '/portfolio' : ''
};

export default nextConfig;
