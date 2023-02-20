/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'rq7ht4djv.hd-bkt.clouddn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
