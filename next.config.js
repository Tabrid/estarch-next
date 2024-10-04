// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'estarch.com.bd',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'fabrilife.com',
      },
      {
        protocol: 'https',
        hostname: 'api.v1.estarch.online',
      },
      {
        protocol: 'https',
        hostname: 'api.showroom.estarch.com.bd',
      },
    ],
  },
};
