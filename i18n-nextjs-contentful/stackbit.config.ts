import {
  defineStackbitConfig,
  DocumentStringLikeFieldNonLocalized,
  ModelExtension,
  SiteMapEntry,
} from '@stackbit/types';
import {
  LocalizableContentfulContentSource,
  markLocalizedModel /*, mapLocalizedDocuments*/,
} from 'localization-config';
import localization from 'utils/localization';
import { normalizeSlug, PAGE_TYPES, SITE_CONFIG_TYPE } from 'utils/common';
//import { ContentfulContentSource } from '@stackbit/cms-contentful';

const contentSource = new LocalizableContentfulContentSource({
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
  nodeVersion: '16',
  contentSources: [contentSource],
  modelExtensions: modelExtensions,
  mapModels: ({ models }) => {
    models = models.map(markLocalizedModel);
    return models;
  },
  /*mapDocuments: ({ documents }) => {
    documents = mapLocalizedDocuments(documents);
    return documents;
  },*/
  siteMap: ({ documents }) => {
    const pages = documents.filter((doc) => PAGE_TYPES.includes(doc.modelName));

    const entries: SiteMapEntry[] = pages.flatMap((document) => {
      let slug = (document.fields.slug as DocumentStringLikeFieldNonLocalized)?.value;
      if (!slug) return null;

      slug = normalizeSlug(slug);
      const slugPrefix = document.locale !== localization.defaultLocale ? '/' + document.locale : '';
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
