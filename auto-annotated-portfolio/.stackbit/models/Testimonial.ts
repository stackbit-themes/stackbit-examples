import { Model } from '@stackbit/types';

export const TestimonialModel: Model = {
    type: 'object',
    name: 'Testimonial',
    label: 'Testimonial',
    labelField: 'name',
    fieldGroups: [
        {
            name: 'settings',
            label: 'Settings',
            icon: 'gear'
        }
    ],
    fields: [
        {
            type: 'markdown',
            name: 'quote',
            label: 'Quote',
            default: '“It’s great to see someone taking action while still maintaining a sustainable fish supply to home cooks.”',
            required: true
        },
        {
            type: 'string',
            name: 'name',
            label: 'Author name',
            default: 'Johnna Doe'
        },
        {
            type: 'string',
            name: 'title',
            label: 'Author title',
            default: 'Product Marketing Manager at Acme'
        },
        {
            type: 'model',
            name: 'image',
            label: 'Author image',
            models: ['ImageBlock'],
            default: {
                url: 'https://assets.stackbit.com/components/images/default/default-person.png',
                altText: 'Person photo'
            }
        },
        {
            type: 'string',
            name: 'elementId',
            group: 'settings',
            label: 'Element ID',
            description: 'The unique ID for an HTML element, must not contain whitespace',
            default: ''
        },
        {
            type: 'style',
            name: 'styles',
            styles: {
                name: {
                    fontWeight: ['400', '500'],
                    fontStyle: ['italic'],
                    textDecoration: ['underline']
                },
                title: {
                    fontWeight: ['400', '500'],
                    fontStyle: ['italic'],
                    textDecoration: ['underline']
                }
            },
            default: {
                name: {
                    fontWeight: 400
                },
                title: {
                    fontWeight: 400
                }
            }
        }
    ]
};
