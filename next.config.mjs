/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  images: {
    domains: ['picsum.photos']
  },
  output: isProd ? 'export' : '',
  basePath: isProd ? '/public' : ''
};

export default nextConfig;
