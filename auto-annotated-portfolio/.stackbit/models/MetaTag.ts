import { Model } from '@stackbit/types';

export const MetaTagModel: Model = {
    type: 'object',
    name: 'MetaTag',
    label: 'MetaTag',
    labelField: 'property',
    fields: [
        {
            type: 'enum',
            name: 'property',
            label: 'Property',
            default: 'og:title',
            options: [
                {
                    label: 'og:title',
                    value: 'og:title'
                },
                {
                    label: 'og:type',
                    value: 'og:type'
                },
                {
                    label: 'og:image',
                    value: 'og:image'
                },
                {
                    label: 'og:image:alt',
                    value: 'og:image:alt'
                },
                {
                    label: 'og:url',
                    value: 'og:url'
                },
                {
                    label: 'og:description',
                    value: 'og:description'
                },
                {
                    label: 'og:locale',
                    value: 'og:locale'
                },
                {
                    label: 'og:site_name',
                    value: 'og:site_name'
                },
                {
                    label: 'og:video',
                    value: 'og:video'
                },
                {
                    label: 'twitter:card',
                    value: 'twitter:card'
                },
                {
                    label: 'twitter:site',
                    value: 'twitter:site'
                },
                {
                    label: 'twitter:creator',
                    value: 'twitter:creator'
                },
                {
                    label: 'twitter:description',
                    value: 'twitter:description'
                },
                {
                    label: 'twitter:title',
                    value: 'twitter:title'
                },
                {
                    label: 'twitter:image',
                    value: 'twitter:image'
                },
                {
                    label: 'twitter:image:alt',
                    value: 'twitter:image:alt'
                },
                {
                    label: 'twitter:player',
                    value: 'twitter:player'
                }
            ]
        },
        {
            type: 'string',
            name: 'content',
            label: 'Content',
            default: ''
        }
    ]
};
