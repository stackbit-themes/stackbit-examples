import { DataModel } from '@stackbit/types';

export const SiteConfig: DataModel = {
    name: 'SiteConfig',
    type: 'data',
    label: 'Site Config',
    singleInstance: true,
    fields: [
        { type: 'string', name: 'title', label: 'Site Title' },
        {
            type: 'model',
            name: 'footer',
            label: 'Footer Config',
            models: ['FooterConfig']
        }
    ]
};
