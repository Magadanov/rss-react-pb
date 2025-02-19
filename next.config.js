/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/1',
        permanent: true,
      },
    ];
  },
  distDir: './dist/app-state-management',
  basePath: '/rss-react-pb/app-state-management',
};

export default nextConfig;
