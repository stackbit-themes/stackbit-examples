export const PAGE_TYPE = 'page';
export const PAGE_TYPES = [PAGE_TYPE];
export const SITE_CONFIG_TYPE = 'siteConfig';

export const IS_DEV = process.env.NODE_ENV === 'development';

export function normalizeSlug(slug) {
  return slug.startsWith('/') ? slug : '/' + slug;
}
