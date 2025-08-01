/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/MYblog",
  trailingSlash: true,
  distDir: "out",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  staticPageGenerationTimeout: 300,
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: false
}

module.exports = nextConfig;
