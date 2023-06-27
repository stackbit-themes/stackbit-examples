import { SiteMapEntry, SiteMapOptions } from '@stackbit/types';
import { normalizeSlug, PAGE_TYPE } from 'utils/common';
import localization from 'utils/localization';
import { getStringField } from './config-helpers';

export function buildSiteMap(options: SiteMapOptions) {
  const pages = options.documents.filter((doc) => doc.modelName === PAGE_TYPE);
  const entries: SiteMapEntry[] = pages.flatMap((document) => {
    let slug = getStringField(document, 'slug');
    if (!slug) return null;

    slug = normalizeSlug(slug);
    const nonDefaultLocale = document.locale && document.locale !== localization.defaultLocale;
    const slugPrefix = nonDefaultLocale ? '/' + document.locale : '';
    return {
      urlPath: slugPrefix + slug,
      document,
      locale: document.locale,
    };
  });
  return entries;
}
