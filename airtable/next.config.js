module.exports = {
    images: {
        // To support image optimization, write custom image loader for Airtable images
        // https://nextjs.org/docs/basic-features/image-optimization
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.airtableusercontent.com'
            }
        ]
    }
};
