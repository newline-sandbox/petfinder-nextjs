const { withPlaiceholder } = require("@plaiceholder/next");

const { NEXT_EXPORT } = process.env;

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    images: { allowFutureImage: true, unoptimized: !!NEXT_EXPORT },
  },
  images: {
    domains: [
      "images.unsplash.com",
      "via.placeholder.com",
      "photos.petfinder.com",
      "dl5zpyw5k3jeb.cloudfront.net",
    ],
  },
};

module.exports = withPlaiceholder(config);
