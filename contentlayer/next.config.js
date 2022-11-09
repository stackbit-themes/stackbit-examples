const { withContentlayer } = require('next-contentlayer');
const { withStackbit } = require('experimental-next-stackbit');

module.exports = withStackbit(withContentlayer({
  reactStrictMode: true,
}));
