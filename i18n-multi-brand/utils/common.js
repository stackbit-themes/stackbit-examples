export const STACKBIT_PRESET_TYPE = 'stackbitPreset';
export const BRAND_FIELD = 'brand';
export const PAGE_TYPE = 'page';
export const BRAND_TYPE = 'brand';
export const BRAND_FIXED_IDENTIFIER_FIELD = 'fixedIdentifier';
export const SITE_CONFIG_TYPE = 'siteConfig'; // TODO remove

export const IS_DEV = process.env.NODE_ENV === 'development';

export const MULTI_BRAND_TYPES = [''];

export function normalizeSlug(slug) {
  return slug.startsWith('/') ? slug : '/' + slug;
}

export function getCurrentBrandIdentifier() {
  if (!process.env.CURRENT_BRAND) throw new Error('CURRENT_BRAND environment variable is not defined.');
  return process.env.CURRENT_BRAND;
}
