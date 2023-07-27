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
  nodeVersion: '16',
  contentSources: [contentSource],
  modelExtensions: modelExtensions,
  onDocumentCreate: LocalizedDocumentCreateHook,
  mapModels: ({ models }) => {
    models = models.map(markLocalizedModel);
    return models;
  },
  siteMap: ({ documents }) => {
    const pages = documents.filter((doc) => PAGE_TYPES.includes(doc.modelName));
    const entries: SiteMapEntry[] = pages.flatMap((document) => {
      let slug = getSlug(document);
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
  treeViews: ({ getDocuments }) => {
          const documents = getDocuments();
          return documents.reduce((tree, document) => {
              if (document.modelName === 'page') {
                  let leaf = tree.find((leaf) => leaf.stableId === document.modelName);
                  if (leaf) {
                      const childDocument = document;
                      const getChildrenRefsRecursively = (document) => {
                          const children = [];
                          for (const [key, field] of Object.entries(document.fields || document.items || {})) {
                              if (field.type === 'reference' || field.type === 'asset') {
                                  const doc = documents.find(({ id }) => id === field.refId);
                                  if (doc) {
                                      children.push({
                                          label: doc.fields?.title?.value || undefined,
                                          document: doc,
                                          children: getChildrenRefsRecursively(doc)
                                      });
                                  }
                              }
                              if (field.type === 'list') {
                                  children.push({
                                      label: key,
                                      stableId: `${key}-${document.id}}`,
                                      children: getChildrenRefsRecursively(field)
                                  });
                              }
                          }
                          return children;
                      };
  
                      leaf.children.push({
                          label: document.fields?.title?.value || document.modelName,
                          document: childDocument,
                          children: getChildrenRefsRecursively(document)
                      });
                  } else {
                      leaf = {
                          label: document.fields?.title?.value || document.modelName,
                          stableId: document.modelName,
                          children: [
                              {
                                  document
                              }
                          ]
                      };
                      tree.push(leaf);
                  }
              }
              return tree;
          }, []);
    }
});

export default config;
