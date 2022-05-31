#!/usr/bin/env node

require('dotenv').config();

const open = require('open');
const { exec } = require('child_process');

const managementToken = process.env.CONTENTFUL_ACCESS_TOKEN || process.argv[2];
const previewKey = process.env.CONTENTFUL_PREVIEW_TOKEN || process.argv[3];
const spaceId = process.env.CONTENTFUL_SPACE_ID || process.argv[4];

if (!managementToken || !previewKey || !spaceId) {
    console.error('Invalid arguments.\n\nUsage:\n./dev.js <managementToken> <previewToken> <spaceId>\n');
    process.exit(1);
}

const command = `node_modules/.bin/stackbit dev --cms=contentful --contentful-access-token=${managementToken} --contentful-preview-token=${previewKey} --contentful-space-id=${spaceId}`;

const devProcess = exec(command, (err) => {
    console.error(`Failed to execute ${command}`, err);
});

devProcess.stdout.on('data', (data) => {
    const urlMatching = data.match(/(https:\/\/app\.stackbit\.com\/local\/.*?)\s/);

    if (urlMatching) {
        console.log(`Opening local editor in browser (${urlMatching[1]})`);
        open(urlMatching[1]);
    } else {
        console.log(data.trim());
    }
});
