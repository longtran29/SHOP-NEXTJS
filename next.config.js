/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,     // render once time
}

module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['res.cloudinary.com'],
  },
}