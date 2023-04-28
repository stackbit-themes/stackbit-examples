import { ObjectModel } from '@stackbit/types';

export const FooterConfig: ObjectModel = {
    name: 'FooterConfig',
    type: 'object',
    label: 'Footer Config',
    labelField: 'body',
    fields: [{ type: 'markdown', name: 'body', label: 'Footer Text' }]
};
