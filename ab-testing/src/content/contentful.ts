import { Banner, Button, ContentfulContentType, Hero, Page, PageComponent, Test, TransformedEntry } from '@/content/content-types';
import { ACCESS_TOKEN, API_HOST, CONTENTFUL_CONTENT_CACHE_FILE, PRETTIER_CONFIG, SPACE_ID } from '@/utils/constants';
import { createClient, Entry } from 'contentful';
import fs from 'fs';
import { marked } from 'marked';
import prettier from 'prettier';

/* ---------- Helpers ---------- */

/**
 * Get all entries of a given content type, with optional query parameters.
 */
async function getEntriesByContentType(content_type: string, queryParams?: Parameters<typeof client.getEntries>[0]) {
    const client = createClient({ accessToken: ACCESS_TOKEN, space: SPACE_ID, host: API_HOST });
    const entries = await client.getEntries({ ...queryParams, content_type, include: 10 });
    return entries;
}

/**
 * Setup the basic properties of a transformed object.
 */
function initTransformedObject(entry: Entry<any>, type: ContentfulContentType): TransformedEntry<ContentfulContentType> {
    return { id: entry.sys.id, type };
}

/**
 * Converts markdown string to HTML string.
 */
export async function processMarkdown(input: string): Promise<string> {
    marked.use({ mangle: false, headerIds: false });
    return marked.parse(input).toString();
}

/* ---------- Main Cache Controller ---------- */

type ContentfulCache = {
    pages?: Page[];
    tests?: Test[];
};

export async function cacheContentfulContent() {
    let cache: ContentfulCache = {};
    // Retrieve raw pages from Contentful and transform them into a format that
    // can be cached and used by the front end.
    const rawPages = await getEntriesByContentType('page');
    cache.pages = await Promise.all(rawPages.items.map(transformPage));
    // Retrieve and transform test content so it can be accessed directly by the
    // editor hub.
    const rawTests = await getEntriesByContentType('test');
    cache.tests = await Promise.all(rawTests.items.map(transformTest));
    // Add component IDs to the tests cache
    await addComponentIdsToTests(cache.tests);
    // ---
    // Write the pages to the cache file
    const cacheContent = prettier.format(JSON.stringify(cache), { ...PRETTIER_CONFIG, parser: 'json' });
    fs.writeFileSync(CONTENTFUL_CONTENT_CACHE_FILE, cacheContent);
    // Output the result
    console.log(`Cached ${cache.pages.length} pages and ${cache.tests.length} tests from Contentful`);
}

/* ---------- Page Transformer ---------- */

async function transformPage(rawPage: Entry<any>): Promise<Page> {
    const page = initTransformedObject(rawPage, 'page') as Page;
    page.urlPath = (('/' + rawPage.fields.slug) as string).replace(/^[\/]+/, '/');
    const slug = page.urlPath.split('/').filter(Boolean);
    if (slug.length > 0) page.slug = slug;
    page.title = rawPage.fields.title as string;
    if (rawPage.fields.hero) page.hero = await transformHero(rawPage.fields.hero as any);
    return page;
}

/* ---------- Test Transformer ---------- */

async function transformTests(rawTests?: Entry<any>[]): Promise<Test[]> {
    if (!rawTests || !rawTests.length) return [];
    return await Promise.all(rawTests.map(async (test) => await transformTest(test)));
}

async function transformTest(rawTest: Entry<any>): Promise<Test> {
    return {
        ...initTransformedObject(rawTest, 'test'),
        name: rawTest.fields.title as string,
        values: rawTest.fields.values as string[],
        field: rawTest.fields.field as string
    } as Test;
}

async function addComponentIdsToTests(testsCache: Test[]) {
    const client = createClient({ accessToken: ACCESS_TOKEN, space: SPACE_ID, host: API_HOST });
    for (const test of testsCache) {
        const response = await client.getEntries({ links_to_entry: test.id });
        const component = response.items[0];
        if (component) {
            test.component = {
                id: component.sys.id,
                type: component.sys.contentType.sys.id as PageComponent['type']
            };
        }
    }
    return testsCache;
}

/* ---------- Components Transformer ---------- */

async function transformHero(rawHero: Entry<any>): Promise<Hero> {
    rawHero.fields.tests;
    return {
        ...initTransformedObject(rawHero, 'hero'),
        heading: rawHero.fields.heading as string,
        content: await processMarkdown(rawHero.fields.content as string),
        banner: await transformBanner(rawHero.fields.banner as Entry<any>),
        buttons: await Promise.all((rawHero.fields.buttons as Entry<any>[]).map(async (button) => await transformButton(button))),
        tests: await transformTests(rawHero.fields.tests as Entry<any>[])
    } as Hero;
}

async function transformButton(rawButton: Entry<any>): Promise<Button> {
    return {
        ...initTransformedObject(rawButton, 'button'),
        label: rawButton.fields.label as string,
        url: rawButton.fields.url as string,
        theme: rawButton.fields.theme as Button['theme'],
        showArrow: (rawButton.fields.showArrow || false) as Button['showArrow'],
        tests: await transformTests(rawButton.fields.tests as Entry<any>[])
    } as Button;
}

async function transformBanner(rawBanner: Entry<any>): Promise<Banner> {
    return {
        ...initTransformedObject(rawBanner, 'banner'),
        content: await processMarkdown(rawBanner.fields.content as string),
        button: await transformButton(rawBanner.fields.button as Entry<any>),
        tests: await transformTests(rawBanner.fields.tests as Entry<any>[])
    } as Banner;
}
