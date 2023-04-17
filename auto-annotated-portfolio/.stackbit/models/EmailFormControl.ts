import { Model } from '@stackbit/types';

export const EmailFormControlModel: Model = {
    type: 'object',
    name: 'EmailFormControl',
    label: 'Email',
    labelField: 'label',
    fieldGroups: [
        {
            name: 'styles',
            label: 'Styles',
            icon: 'palette'
        },
        {
            name: 'settings',
            label: 'Settings',
            icon: 'gear'
        }
    ],
    fields: [
        {
            type: 'string',
            name: 'name',
            label: 'Name',
            default: 'email-address',
            description: "Must be unique - this is the property name that will be sent to the server with this field's value."
        },
        {
            type: 'string',
            name: 'label',
            label: 'Label',
            default: 'Name'
        },
        {
            type: 'boolean',
            name: 'hideLabel',
            label: 'Hide label',
            default: false
        },
        {
            type: 'string',
            name: 'placeholder',
            label: 'Placeholder text',
            default: 'Your name'
        },

        {
            type: 'enum',
            name: 'width',
            group: 'styles',
            label: 'Width',
            options: [
                {
                    label: 'Full',
                    value: 'full'
                },
                {
                    label: 'One half',
                    value: '1/2'
                }
            ],
            default: 'full',
            required: true
        },
        {
            type: 'boolean',
            name: 'isRequired',
            group: 'settings',
            label: 'Is the field required?',
            default: false
        }
    ]
};
