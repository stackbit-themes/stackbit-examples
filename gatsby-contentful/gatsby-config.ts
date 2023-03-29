import type { GatsbyConfig } from 'gatsby';
require('dotenv').config();

const IS_DEV = process.env.NODE_ENV === 'development';

const config: GatsbyConfig = {
    siteMetadata: {
        title: `tutorial-gatsby-contentful`,
        siteUrl: `https://www.example.com`
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        {
            resolve: 'gatsby-source-contentful',
            options: {
                accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                host: IS_DEV ? `preview.contentful.com` : `cdn.contentful.com`
            }
        },
        'gatsby-plugin-postcss',
        'gatsby-plugin-image'
    ]
};

export default config;
