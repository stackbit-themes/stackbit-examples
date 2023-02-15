#!/usr/bin/env node

/**
 * This script duplicates the page with a slug of __template__ for each page in
 * the SITEMAP. It's a simple way to create a bunch of pages with the same
 * content.
 *
 * Note that the sections used in the new pages are the same as the template
 * page. Components are not duplicated, but reused.
 */

const contentful = require('contentful-management');

const LOCALE = 'en-US';

const SITEMAP = {
    'getting-started': 'Getting Started',
    concepts: 'Concepts',
    'concepts/the-stack': 'Understanding the Stack',
    'concepts/how-it-works': 'How it Works',
    guides: 'Developer Guides',
    'guides/add-component': 'Adding Section Components',
    'guides/exporting': 'Exporting from Contentful'
};

const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

async function run() {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');

    const { items: pages } = await env.getEntries({ content_type: 'page', include: 10 });

    const templatePage = pages.find((entry) => entry.fields.slug[LOCALE] === '__template__');

    for (const [slug, title] of Object.entries(SITEMAP)) {
        let newPageFields = { ...templatePage.fields, title: { [LOCALE]: title }, slug: { [LOCALE]: slug } };
        const newPage = await env.createEntry('page', { fields: newPageFields });
        await newPage.publish();
    }
}

run();
