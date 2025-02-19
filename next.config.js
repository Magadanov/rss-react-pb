/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/1',
  //       permanent: true,
  //     },
  //   ];
  // },
  distDir: './dist/nextjs-ssr-app-router-api',
  basePath: '/rss-react-pb/nextjs-ssr-app-router-api',
};

export default nextConfig;
