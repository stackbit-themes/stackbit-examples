import { createClient } from 'contentful';
import { PAGE_TYPE, SITE_CONFIG_TYPE, IS_DEV } from './common';

const client = createClient({
  accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
  host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});

async function getEntries(content_type, queryParams) {
  const entries = await client.getEntries({ content_type, ...queryParams, include: 10 });
  return entries;
}

export async function getPagePaths() {
  const { items } = await getEntries(PAGE_TYPE);
  return items.map((page) => {
    let slug = page.fields.slug.split('/').filter(Boolean);
    return { params: { slug }, locale: page.fields.locale };
  });
}

export async function getPages() {
  let response = await getEntries(PAGE_TYPE);
  return response.items.map(mapEntry);
}

export async function getSiteConfig(locale) {
  let response = await getEntries(SITE_CONFIG_TYPE, { locale });
  const itemCount = response.items?.length;
  if (itemCount === 1) {
    return mapEntry(response.items[0]);
  } else {
    console.error('Expected 1 site config object, got:', itemCount);
    return null;
  }
}

function mapEntry(entry) {
  const id = entry.sys?.id;
  const type = entry.sys?.contentType?.sys?.id || entry.sys?.type;

  if (entry.sys?.type === 'Asset') {
    return {
      id,
      type,
      src: `https:${entry.fields.file.url}`,
      alt: entry.fields.title,
    };
  }

  return {
    id,
    type,
    ...Object.fromEntries(Object.entries(entry.fields).map(([key, value]) => [key, parseField(value)])),
  };
}

function parseField(value) {
  if (typeof value === 'object' && value.sys) return mapEntry(value);
  if (Array.isArray(value)) return value.map(mapEntry);
  return value;
}
