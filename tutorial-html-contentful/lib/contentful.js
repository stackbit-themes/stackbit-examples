import Contentful from 'contentful';
import dotenv from 'dotenv';

dotenv.config();

const IS_DEV = process.env.NODE_ENV === 'development';

const client = Contentful.createClient({
    accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
    host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});

/**
 * Get all pages from Contentful and transform them into objects that can be
 * used in the site.
 */
export async function getPages() {
    const entries = await client.getEntries({ content_type: 'page', include: 10 });
    const pages = await Promise.all(
        entries.items.map(async (item) => {
            const page = await transformEntry(item);
            return page;
        })
    );
    return pages;
}

/**
 * Transform a Contentful entry into a object that can be used in the site.
 */
function transformEntry(entry) {
    // Meta values
    const id = entry.sys?.id;
    const type = entry.sys?.contentType?.sys?.id || entry.sys?.type;
    // Transform asset fields and return the result.
    if (entry.sys?.type === 'Asset') {
        return { id, type, src: `https:${entry.fields.file.url}`, alt: entry.fields.title };
    }
    // Parse fields
    const fields = Object.fromEntries(Object.entries(entry.fields).map(([key, value]) => [key, parseField(value)]));
    // Return transformed entry
    return { id, type, ...fields };
}

/**
 * Parse and transform a field value from a Contentful entry.
 */
function parseField(value) {
    if (typeof value === 'object' && value.sys) return transformEntry(value);
    if (Array.isArray(value)) return value.map(transformEntry);
    return value;
}
