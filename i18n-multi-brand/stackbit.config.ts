import { defineStackbitConfig, ModelExtension } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';

import { BRAND_TYPE, PAGE_TYPE } from 'utils/common';
import { setLocaleOnDocumentCreate, setLocalizedModel } from './config/localization-helpers';
import {
  brandModelExtensions,
  hideBrandField,
  relevantToBrand,
  resolveCurrentBrand,
  setBrandOnContentCreate,
} from './config/brand-helpers';
import { buildSiteMap } from 'config/sitemap';

const modelExtensions: ModelExtension[] = [
  ...brandModelExtensions,
  {
    name: PAGE_TYPE,
    type: 'page',
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
];

const contentSource = new ContentfulContentSource({
  spaceId: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

let currentBrandResolved = false;

const config = defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '16',
  contentSources: [contentSource],
  mapModels: ({ models }) => {
    models = models.map(setLocalizedModel).map(hideBrandField);
    return models;
  },
  mapDocuments: ({ documents }) => {
    if (!currentBrandResolved) {
      resolveCurrentBrand(documents);
      currentBrandResolved = true;
    }

    const result = documents.filter(relevantToBrand);
    console.debug(`[mapDocuments] Returning ${result.length} of ${documents.length} documents`);
    return result;
  },
  modelExtensions: modelExtensions,
  onDocumentCreate: setLocaleOnDocumentCreate,
  onContentCreate: setBrandOnContentCreate,
  presetReferenceBehavior: 'duplicateContents',
  nonDuplicatableModels: [BRAND_TYPE],
  siteMap: buildSiteMap,
  sidebarButtons: [
    {
      type: 'model',
      modelName: BRAND_TYPE,
      label: 'Brand configuration',
      icon: 'style',
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
