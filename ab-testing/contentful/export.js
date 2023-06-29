const contentfulExport = require('contentful-export');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env.local' });

const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.argv[2];
const spaceId = process.env.CONTENTFUL_SPACE_ID || process.argv[3];

const options = { spaceId, managementToken, contentFile: path.join(__dirname, 'export.json') };

contentfulExport(options).catch((err) => {
    console.log('Error exporting content', err);
});
