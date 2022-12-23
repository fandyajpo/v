/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },

  images: {
    domains: ["cdn.discordapp.com", "media.giphy.com"],
  },
};

module.exports = nextConfig;
