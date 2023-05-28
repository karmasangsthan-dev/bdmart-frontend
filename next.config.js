/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "i.ibb.co",
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "i.dummyjson.com",
      "example.com",
      "img.freepik.com",
    ],
  },
};

module.exports = nextConfig;
