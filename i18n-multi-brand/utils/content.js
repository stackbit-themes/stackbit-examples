import { createClient } from 'contentful';
import { PAGE_TYPE, IS_DEV, getCurrentBrandSlug, BRAND_TYPE, MULTI_BRAND_CONFIG_TYPE } from './common';
import localization from './localization';

const client = createClient({
  accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
  host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});

let cachedCurrentBrandId = null;

export async function getCurrentBrand(locale) {
  const slug = getCurrentBrandSlug();
  const { items } = await getEntries(BRAND_TYPE, { 'fields.slug': slug, locale });
  if (items.length === 1) {
    return mapEntry(items[0]);
  } else {
    throw new Error(`[getCurrentBrand] Couldn't find brand document with slug: ${slug}, found ${items.length} items`);
  }
}

export async function getMultiBrandConfig(locale) {
  const { items } = await getEntries(MULTI_BRAND_CONFIG_TYPE, { locale });
  if (items.length === 1) {
    return mapEntry(items[0]);
  } else {
    throw new Error(`[getMultiBrandConfig] Couldn't find multi-brand config, found ${items.length} items`);
  }
}

async function resolveCurrentBrandId() {
  if (!cachedCurrentBrandId) {
    const brand = await getCurrentBrand();
    cachedCurrentBrandId = brand.id;
    console.log(`[cacheCurrentBrandId] Brand is: "${brand.name}" (id: ${brand.id})`);
  }
  return cachedCurrentBrandId;
}

async function getEntries(contentType, queryParams) {
  const entries = await client.getEntries({ content_type: contentType, ...queryParams, include: 10 });
  return entries;
}

async function makeBrandQuery() {
  const brandId = await resolveCurrentBrandId();
  return { 'fields.brand.sys.id': brandId };
}

export async function getPagePaths() {
  const brandQuery = await makeBrandQuery();
  const { items } = await getEntries(PAGE_TYPE, brandQuery);

  const paths = items.map((page) => {
    const slug = page.fields.slug.split('/').filter(Boolean);
    const locale = page.fields.locale;
    return { params: { slug }, locale };
  });

  for (const locale of localization.locales) {
    const hpFound = paths.find((path) => path.params.slug === '' && path.locale === locale);
    if (!hpFound) {
      console.log(`No homepage found for locale ${locale}`);
      paths.push({ params: { slug: [] }, locale });
    }
  }
  return paths;
}

export async function getPages() {
  const brandQuery = await makeBrandQuery();
  let response = await getEntries(PAGE_TYPE, brandQuery);
  return response.items.map(mapEntry);
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
