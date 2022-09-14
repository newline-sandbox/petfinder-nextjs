const { withPlaiceholder } = require("@plaiceholder/next");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: { externalDir: true, images: { allowFutureImage: true } },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withPlaiceholder(config);
