const { withPlaiceholder } = require("@plaiceholder/next");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: { externalDir: true, images: { allowFutureImage: true } },
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
