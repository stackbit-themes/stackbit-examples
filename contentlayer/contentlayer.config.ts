import { makeSource } from 'contentlayer/source-files';
import { stackbitConfigToDocumentTypes } from '@contentlayer/experimental-source-files-stackbit';
import stackbitConfig from './stackbit.config.js';

const documentTypes = stackbitConfigToDocumentTypes(stackbitConfig, {
  documentTypes: {
    SiteConfig: {
      computedFields: {
        stackbitObjectId: {
          type: 'string',
          resolve: (doc) => `content/${doc._raw.sourceFilePath}`,
        },
      },
    },
    Page: {
      computedFields: {
        url: {
          type: 'string',
          resolve: (doc) => doc._raw.flattenedPath.replace(/^pages\/?/, '/'),
        },
        stackbitObjectId: {
          type: 'string',
          resolve: (doc) => `content/${doc._raw.sourceFilePath}`,
        },
      },
    },
  },
});

// TODO derive `contentDirPath` from Stackbit config
export default makeSource({ contentDirPath: 'content', documentTypes });
