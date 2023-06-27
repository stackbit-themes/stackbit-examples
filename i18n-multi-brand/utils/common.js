export const STACKBIT_PRESET_TYPE = 'stackbitPreset';
export const BRAND_FIELD = 'brand';
export const PAGE_TYPE = 'page';
export const BRAND_TYPE = 'brand';
export const MULTI_BRAND_CONFIG_TYPE = 'multiBrandConfig';
export const MULTI_BRAND_TYPES = [STACKBIT_PRESET_TYPE, MULTI_BRAND_CONFIG_TYPE];

export const IS_DEV = process.env.NODE_ENV === 'development';

export function normalizeSlug(slug) {
  return slug.startsWith('/') ? slug : '/' + slug;
}

export function getCurrentBrandSlug() {
  if (!process.env.CURRENT_BRAND_SLUG) throw new Error('CURRENT_BRAND_SLUG environment variable is not defined.');
  return process.env.CURRENT_BRAND_SLUG;
}
