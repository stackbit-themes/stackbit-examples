import { defineStackbitConfig } from '@stackbit/types';

export const config = defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  cmsName: 'git',
  nodeVersion: '16',
  models: {
    page: {
      type: 'page',
      urlPath: '/{slug}',
      filePath: '{slug}.json',
      hideContent: true,
      fields: [
        { name: 'title', type: 'string', required: true },
        {
          name: 'sections',
          type: 'list',
          items: { type: 'model', groups: ['Section'], models: [] },
        },
      ],
    },
    paragraph: {
      type: 'object',
      groups: ['Section'],
      labelField: 'content',
      fields: [{ name: 'content', type: 'markdown', required: true }],
    },
    heading: {
      type: 'object',
      groups: ['Section'],
      labelField: 'content',
      fields: [
        { name: 'content', type: 'string', required: true },
        { name: 'level', type: 'enum', required: true, options: [1, 2, 3, 4, 5, 6] },
      ],
    },
  },
  pagesDir: 'src/content/pages',
  assets: {
    referenceType: 'static',
    staticDir: 'public',
    uploadDir: 'images',
    publicPath: '/',
  },
  pageLayoutKey: 'type',
  objectTypeKey: 'type',
});

export default config;
