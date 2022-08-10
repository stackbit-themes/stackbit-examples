import * as contentful from 'contentful'; // This avoids bundling issues of the Contentful package in production

const isDev = process.env.NODE_ENV === 'development';

export const client = contentful.createClient({
    accessToken: isDev ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
    host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com'
});
