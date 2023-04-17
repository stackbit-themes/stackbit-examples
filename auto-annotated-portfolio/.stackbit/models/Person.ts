import { Model } from '@stackbit/types';

export const PersonModel: Model = {
    type: 'data',
    name: 'Person',
    label: 'Person',
    labelField: 'firstName',
    filePath: 'content/data/team/{slug}.json',
    fields: [
        {
            type: 'string',
            name: 'firstName',
            label: 'First name',
            default: 'Name',
            required: true
        },
        {
            type: 'string',
            name: 'lastName',
            label: 'Last name',
            default: 'Surname'
        },
        {
            type: 'string',
            name: 'role',
            label: 'Role',
            default: 'Role'
        },
        {
            type: 'markdown',
            name: 'bio',
            label: 'Bio',
            default:
                'With over 10 years in both public and private sectors, Johnna has experience in management consultation, team building, professional development, strategic implementation, and company collaboration.'
        },
        {
            type: 'model',
            name: 'image',
            label: 'Image',
            models: ['ImageBlock'],
            default: {
                type: 'ImageBlock',
                url: 'https://assets.stackbit.com/components/images/default/default-person.png',
                altText: 'Person photo'
            }
        }
    ]
};
