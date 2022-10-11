// NOTE the APIs in this file are an early draft and should evolve based on feedback
import { makeSource } from 'contentlayer/source-files';
import { stackbitConfigToDocumentTypes } from '@contentlayer/experimental-source-files-stackbit';
import stackbitConfig from './stackbit.config.js';

// import type * as Stackbit from '@stackbit/sdk';

const documentTypes = stackbitConfigToDocumentTypes(stackbitConfig as any, {
  documentTypes: {
    SiteConfig: {
      filePathPattern: 'data/config.yaml',
    },
    // Page: {
    //   filePathPattern: 'pages/**/*.md',
    //   computedFields: {},
    // },
  },
});

// TODO derive `contentDirPath` from Stackbit config
export default makeSource({ contentDirPath: 'content', documentTypes });
