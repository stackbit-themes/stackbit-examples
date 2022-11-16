import type * as Stackbit from '@stackbit/sdk';

export const FooterConfig: Stackbit.YamlObjectModel = {
  type: 'object',
  label: 'Footer Config',
  labelField: 'body',
  fields: [{ type: 'markdown', name: 'body', label: 'Footer Text' }],
};
