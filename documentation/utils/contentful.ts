import { createClient } from 'contentful';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import { CodeBlock, Contentful, SectionType } from '@/types';
import { CONFIG_CONTENT_TYPE, IS_DEV, PAGE_CONTENT_TYPE } from '@/utils/constants';
import { TypeCodeBlockFields } from '@/types/contentful';

const client = createClient({
    accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN! : process.env.CONTENTFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
    host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});

/**
 * Return the first entry from Contentful of type siteConfig.
 */
export async function getSiteConfig(): Promise<Contentful.TypeSiteConfig> {
    const entries = await client.getEntries<Contentful.TypeSiteConfigFields>({ content_type: CONFIG_CONTENT_TYPE, include: 10 });
    return entries.items[0];
}

/**
 * Return an array of raw pages from Contentful.
 */
export async function getPages(): Promise<Contentful.TypePage[]> {
    const entries = await client.getEntries<Contentful.TypePageFields>({ content_type: PAGE_CONTENT_TYPE, include: 10 });
    return entries.items;
}

/**
 * Finds the entry in Contentful from a slug string provided by getStaticPaths()
 *
 * @param slug String used to match the path in contentful
 * @returns An entry, if it could be found
 */
export async function getPageBySlug(slug: string): Promise<Contentful.TypePage | undefined> {
    const pages = await getPages();
    return pages.find((page) => page.fields.slug === slug);
}

// ---------------------------------------- | Field Resolvers

const markdownFieldMap: { [K in SectionType]?: string[] } = {
    callout: ['body'],
    hero: ['body'],
    paragraph: ['body']
};

/**
 * Resolves field values for a Contentful object, including nested references.
 *
 * @param entry Entry object from Contentful
 * @returns An object of resolved values for the entry
 */
export async function resolveFields(entry: any): Promise<any> {
    // Meta attributes
    const _id = entry.sys?.id;
    const _type = entry.sys?.contentType?.sys.id || entry.sys?.type;
    // Escape if missing fields.
    if (!entry.fields) {
        throw new Error(`Could not resolve fields for entry: ${_id}`);
    }
    // Process fields
    let fields: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(entry.fields)) {
        const processedValue = await parseField(value, _type, key);
        fields[key] = processedValue;
    }
    // Process CodeBlock section -> We want do this work on the server so we
    // don't have to ship the highlight.js content to the client.
    if ((_type as SectionType) === 'codeBlock' && 'body' in entry.fields && 'language' in entry.fields) {
        const { html, language } = await highlightCodeBlock(entry.fields.body, entry.fields.language);
        if (html && language) fields.code = { html, language };
    }
    // Add urlPath to pages
    if (_type === 'page') fields.urlPath = fields.slug.startsWith('/') ? fields.slug : `/${fields.slug}`;

    return { ...fields, _id, _type };
}

/**
 * Resolves a value for a field in an entry.
 *
 * @param value Value stored for a particular field in a Contentful object
 * @param contentType ID of the content type in Contentful
 * @param fieldName ID of the filed in Contentful
 * @returns Resolved values for the field
 */
async function parseField(value: any, contentType: SectionType, fieldName: string) {
    // Individual reference value
    if (typeof value === 'object' && value.sys) {
        return await resolveFields(value);
    }
    // Array of references
    if (Array.isArray(value)) {
        let result = [];
        for (const item of value) result.push(await resolveFields(item));
        return result;
    }
    // Process markdown
    if ((markdownFieldMap[contentType] || []).includes(fieldName)) {
        return await parseMarkdown(value);
    }
    // Everything else passes through.
    return value;
}

// ---------------------------------------- | Transformers

/**
 * Converts markdown to HTML.
 *
 * @param rawMarkdown Raw markdown string
 * @returns HTML string
 */
async function parseMarkdown(rawMarkdown: string): Promise<string> {
    const md = new MarkdownIt();
    return md.renderInline(rawMarkdown);
}

const codeLanguageMap: { [K in TypeCodeBlockFields['language']]: CodeBlock['code']['language'] } = {
    TypeScript: 'ts',
    JavaScript: 'js',
    'Plain Text': 'txt'
};

/**
 * Processes code to output syntax-highlighted HTML that can be styled with
 * highlight.js CSS.
 *
 * @param code String of code to process
 * @param expandedLanguage A supported language as one of the possible string
 * values from Contentful
 * @returns Processed code object to send to component
 */
async function highlightCodeBlock(
    code: string,
    expandedLanguage: TypeCodeBlockFields['language']
): Promise<{ html: string; language: CodeBlock['code']['language'] }> {
    const language = codeLanguageMap[expandedLanguage];
    if (!language) console.error(`Language ${expandedLanguage} not supported.`);
    if (!code) console.error('No code to process');
    return { html: hljs.highlight(code, { language }).value, language };
}
