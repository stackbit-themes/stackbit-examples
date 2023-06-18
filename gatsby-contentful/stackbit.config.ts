import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    nodeVersion: '18',
    ssgName: 'gatsby',
    ssgVersion: '5',
    contentSources: [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
        })
    ],
    modelExtensions: [{ name: 'page', type: 'page', urlPath: '/{slug}' }],
    // Needed only for importing this repository via https://app.stackbit.com/import?mode=duplicate
    import: {
        type: 'contentful',
        contentFile: 'contentful/export.json',
        uploadAssets: true,
        assetsDirectory: 'contentful',
        spaceIdEnvVar: 'CONTENTFUL_SPACE_ID',
        deliveryTokenEnvVar: 'CONTENTFUL_DELIVERY_TOKEN',
        previewTokenEnvVar: 'CONTENTFUL_PREVIEW_TOKEN',
        accessTokenEnvVar: 'CONTENTFUL_MANAGEMENT_TOKEN'
    }
});
