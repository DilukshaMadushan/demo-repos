module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  }
};
