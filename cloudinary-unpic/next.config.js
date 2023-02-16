/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpack: (config) => {
        // When editing with Stackbit, don't recompile on content file changes
        config.watchOptions.ignored.push('**/content/**');
        return config;
    }
};

module.exports = () => {
    return nextConfig;
};