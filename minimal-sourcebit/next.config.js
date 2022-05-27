const withSourcebit = require("sourcebit").sourcebitNext();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withSourcebit(nextConfig);
