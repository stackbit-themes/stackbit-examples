import { ObjectModel } from '@stackbit/types';

export const button: ObjectModel = {
    name: 'button',
    type: 'object',
    fields: [
        { name: 'label', type: 'string' },
        { name: 'url', type: 'string' },
        { name: 'theme', type: 'enum', options: ['default', 'outline'] }
    ]
};
