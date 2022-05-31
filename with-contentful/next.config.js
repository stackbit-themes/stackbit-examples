const withSourcebit = require('sourcebit').sourcebitNext();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // enable react strict mode
    reactStrictMode: true,
    // minify outputs
    swcMinify: true,
    // Prefer loading of ES Modules over CommonJS
    experimental: { esmExternals: true }
};

module.exports = withSourcebit(nextConfig);
