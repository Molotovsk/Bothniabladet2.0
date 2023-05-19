/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",
    domains: ['res.cloudinary.com'],
  },
  serverRuntimeConfig: {
    connectionString: "mongodb+srv://adamj:qKEyyVe6kdEQoaQd@dundercluster.m1isx5z.mongodb.net/test?retryWrites=true&w=majority",
    secret: 'ost123'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api' // production api
  },
  
}

module.exports = nextConfig