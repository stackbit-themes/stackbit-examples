import { Model } from '@stackbit/types';

export const ThemeStyleHeadingModel: Model = {
    type: 'object',
    name: 'ThemeStyleHeading',
    label: 'Heading',
    labelField: 'size',
    fields: [
        {
            type: 'enum',
            name: 'size',
            label: 'Font size',
            options: [
                {
                    label: 'XS',
                    value: 'xs'
                },
                {
                    label: 'SM',
                    value: 'sm'
                },
                {
                    label: 'Base',
                    value: 'base'
                },
                {
                    label: 'LG',
                    value: 'lg'
                },
                {
                    label: 'XL',
                    value: 'xl'
                },
                {
                    label: '2XL',
                    value: '2xl'
                },
                {
                    label: '3XL',
                    value: '3xl'
                },
                {
                    label: '4XL',
                    value: '4xl'
                },
                {
                    label: '5XL',
                    value: '5xl'
                },
                {
                    label: '6XL',
                    value: '6xl'
                },
                {
                    label: '7XL',
                    value: '7xl'
                },
                {
                    label: '8XL',
                    value: '8xl'
                },
                {
                    label: '9XL',
                    value: '9xl'
                }
            ],
            default: '4xl',
            required: true
        },
        {
            type: 'enum',
            name: 'weight',
            label: 'Font weight',
            controlType: 'button-group',
            options: [
                {
                    label: 'Normal',
                    value: 'normal'
                },
                {
                    label: 'Medium',
                    value: 'medium'
                }
            ],
            default: 'medium',
            required: true
        },
        {
            type: 'enum',
            name: 'decoration',
            label: 'Decoration',
            controlType: 'button-group',
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Underline',
                    value: 'underline'
                },
                {
                    label: 'Line through',
                    value: 'line-through'
                }
            ],
            default: 'none',
            required: true
        },
        {
            type: 'enum',
            name: 'case',
            label: 'Case',
            controlType: 'button-group',
            options: [
                {
                    label: 'Default',
                    value: 'none'
                },
                {
                    label: 'ag',
                    value: 'lowercase'
                },
                {
                    label: 'Ag',
                    value: 'capitalize'
                },
                {
                    label: 'AG',
                    value: 'uppercase'
                }
            ],
            default: 'none',
            required: true
        },
        {
            type: 'enum',
            name: 'letterSpacing',
            label: 'Letter spacing',
            controlType: 'button-group',
            options: [
                {
                    label: 'Tighter',
                    value: 'tighter'
                },
                {
                    label: 'Tight',
                    value: 'tight'
                },
                {
                    label: 'Normal',
                    value: 'normal'
                },
                {
                    label: 'Wide',
                    value: 'wide'
                },
                {
                    label: 'Wider',
                    value: 'wider'
                }
            ],
            default: 'normal',
            required: true
        }
    ]
};
