#!/usr/bin/env node

import path from 'path';
import contentfulImport from 'contentful-import';
import dotenv from 'dotenv';

dotenv.config();

const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.argv[2];
const spaceId = process.env.CONTENTFUL_SPACE_ID || process.argv[3];

if (!managementToken || !spaceId) {
    console.error('Contentful management token or space ID were not provided.\n\nUsage:\n./export.js <managementToken> <spaceId>\n');
    process.exit(1);
}

const options = {
    contentFile: path.join(process.cwd(), '.contentful', 'export.json'),
    spaceId: spaceId,
    managementToken: managementToken,
    uploadAssets: true,
    assetsDirectory: path.join(process.cwd(), '.contentful')
};

contentfulImport(options)
    .then(() => {
        console.log('Data imported successfully');
    })
    .catch((error) => {
        console.error('Error importing content:', error);
    });
