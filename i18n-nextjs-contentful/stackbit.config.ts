import { defineStackbitConfig, ModelExtension, SiteMapEntry } from '@stackbit/types';
import { getSlug, LocalizedDocumentCreateHook, markLocalizedModel } from './config-helpers';
import localization from 'utils/localization';
import { normalizeSlug, PAGE_TYPES, SITE_CONFIG_TYPE } from 'utils/common';
import { ContentfulContentSource } from '@stackbit/cms-contentful';

const contentSource = new ContentfulContentSource({
  spaceId: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

const pageModelExtensions: ModelExtension[] = PAGE_TYPES.map((name) => {
  return { name, type: 'page' };
});

const modelExtensions: ModelExtension[] = pageModelExtensions.concat([
  {
    name: 'siteConfig',
    singleInstance: true, // User can't create more instances
    readOnly: true, // Can't delete
  },
  {
    name: 'hero',
    fields: [
      {
        name: 'theme',
        controlType: 'button-group',
        options: [
          { label: 'Image Left', value: 'imgLeft' },
          { label: 'Image Right', value: 'imgRight' },
        ],
      },
    ],
  },
]);

const config = defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '18',
  contentSources: [contentSource],
  modelExtensions: modelExtensions,
  onDocumentCreate: LocalizedDocumentCreateHook,
  mapModels: ({ models }) => {
    models = models.map(markLocalizedModel);
    return models;
  },
  siteMap: ({ documents }) => {
    const pages = documents.filter((doc) => PAGE_TYPES.includes(doc.modelName));
    const entries: SiteMapEntry[] = pages.filter((document) => {
      let slug = getSlug(document);
      return !!slug;
    }).map((document) => {
      let slug = getSlug(document);
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
  },
  sidebarButtons: [
    {
      type: 'model',
      modelName: SITE_CONFIG_TYPE,
      label: 'Site configuration',
      icon: 'gear',
      srcProjectId: contentSource.getProjectId(),
      srcType: contentSource.getContentSourceType(),
    },
  ],
  // Needed for importing this repository via https://app.stackbit.com/import?mode=duplicate
  import: {
    type: 'contentful',
    contentFile: 'contentful/export.json',
    uploadAssets: true,
    assetsDirectory: 'contentful',
    spaceIdEnvVar: 'CONTENTFUL_SPACE_ID',
    deliveryTokenEnvVar: 'CONTENTFUL_DELIVERY_TOKEN',
    previewTokenEnvVar: 'CONTENTFUL_PREVIEW_TOKEN',
    accessTokenEnvVar: 'CONTENTFUL_MANAGEMENT_TOKEN',
  },
});

export default config;
