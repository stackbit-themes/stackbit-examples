import type * as Stackbit from '@stackbit/sdk';

export const Page: Stackbit.YamlPageModel = {
  type: 'page',
  hideContent: true,
  urlPath: '/{slug}',
  fields: [
    {
      type: 'string',
      name: 'title',
      default: 'This is a new page',
      required: true,
    },
    {
      type: 'list',
      name: 'sections',
      items: { type: 'model', groups: ['SectionComponents'], models: [] },
    },
  ],
};
