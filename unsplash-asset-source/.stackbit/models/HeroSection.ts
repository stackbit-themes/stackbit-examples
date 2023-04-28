import { ObjectModel } from '@stackbit/types';

export const HeroSection: ObjectModel = {
    name: 'HeroSection',
    type: 'object',
    label: 'Hero',
    labelField: 'heading',
    groups: ['SectionComponents'],
    fields: [
        {
            type: 'string',
            name: 'heading',
            default: 'Hero Heading'
        },
        {
            type: 'markdown',
            name: 'subheading',
            default: 'Hero Subheading'
        },
        {
            type: 'image',
            name: 'image',
            default: 'Image',
            source: 'unsplash-asset-source'
        },
        {
            type: 'list',
            name: 'buttons',
            items: { type: 'model', models: ['Button'] }
        }
    ]
};
