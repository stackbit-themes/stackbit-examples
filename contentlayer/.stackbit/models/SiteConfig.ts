import type * as Stackbit from '@stackbit/sdk';

export const SiteConfig: Stackbit.YamlDataModel = {
  type: 'data',
  label: 'Site Config',
  singleInstance: true,
  fields: [
    { type: 'string', name: 'title', label: 'Site Title' },
    {
      type: 'model',
      name: 'footer',
      label: 'Footer Config',
      models: ['FooterConfig'],
    },
  ],
};
