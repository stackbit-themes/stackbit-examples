const localization = require('./utils/localization');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: localization.locales,
    defaultLocale: localization.defaultLocale,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};

module.exports = nextConfig;
