/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "i.ibb.co",
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "i.dummyjson.com",
      "img.freepik.com",
    ],
  },
};
// module.exports = {
//   images: {
//       domains: ['images.unsplash.com'],
//   },
// }
module.exports = nextConfig;
