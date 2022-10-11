/** @type {import('next').NextConfig} */
// const { withContentlayer } = require('next-contentlayer');
// const { withStackbit } = require('experimental-next-stackbit');

const config = {
  webpack: (config, { dev }) => {
    // Makes webpack not trigger recompiling when files in the content folder are updated.
    config.watchOptions.ignored.push('**/content/**');
    return config;
  },
  reactStrictMode: true,
};

module.exports = config;
// module.exports = withStackbit(withContentlayer(config));
