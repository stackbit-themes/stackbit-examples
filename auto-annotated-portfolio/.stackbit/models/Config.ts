import { Model } from '@stackbit/types';

export const ConfigModel: Model = {
    type: 'data',
    name: 'Config',
    label: 'Site configuration',
    labelField: 'fixedLabel',
    singleInstance: true,
    file: 'content/data/config.json',
    fieldGroups: [
        {
            name: 'seo',
            label: 'SEO',
            icon: 'page'
        }
    ],
    fields: [
        {
            type: 'string',
            name: 'fixedLabel',
            const: 'Site configuration',
            hidden: true
        },
        {
            type: 'image',
            name: 'favicon',
            label: 'Favicon',
            default: 'https://assets.stackbit.com/components/images/default/favicon.svg'
        },
        {
            type: 'model',
            name: 'header',
            label: 'Header configuration',
            models: ['Header']
        },
        {
            type: 'model',
            name: 'footer',
            label: 'Footer configuration',
            models: ['Footer']
        },
        {
            type: 'string',
            name: 'titleSuffix',
            label: 'Suffix for page titles',
            description:
                'Suffix to append to the title tag of all pages, except in pages where the this behavior is disabled (e.g. typically the home page should have the site name as a prefix)',
            default: null,
            group: 'seo'
        },
        {
            type: 'image',
            name: 'defaultSocialImage',
            label: 'Default image for social sharing',
            description: 'Default image to use for the og:image meta tag in all pages, except in pages that define another image.',
            default: null,
            group: 'seo'
        },
        {
            type: 'list',
            name: 'defaultMetaTags',
            label: 'Default additional meta tags',
            description:
                'Additional meta tags to set as default in all pages. Tags defined here are low-priority: they may be overriden by page-level settings.',
            group: 'seo',
            items: {
                type: 'model',
                models: ['MetaTag']
            }
        }
    ]
};
