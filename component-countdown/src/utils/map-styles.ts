const TAILWIND_MAP = {
    justifyContent: {
        'flex-start': 'justify-start',
        'flex-end': 'justify-end',
        center: 'justify-center'
    },
    borderRadius: {
        none: 'rounded-none',
        'xx-small': 'rounded-sm',
        'x-small': 'rounded',
        small: 'rounded-md',
        medium: 'rounded-lg',
        large: 'rounded-xl',
        'x-large': 'rounded-2xl',
        'xx-large': 'rounded-3xl',
        full: 'rounded-full'
    },
    borderStyle: {
        none: 'border-none',
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        double: 'border-double'
    },
    boxShadow: {
        'none': 'shadow-none',
        'x-small': 'shadow-sm',
        small: 'shadow',
        medium: 'shadow-md',
        large: 'shadow-lg',
        'x-large': 'shadow-xl',
        'xx-large': 'shadow-2xl',
        'inner': 'shadow-inner'
    }
};

export default function mapStyles(styles: Record<string, any>) {
    return Object.entries(styles)
        .map(([prop, value]) => {
            if (prop in TAILWIND_MAP) {
                if (typeof TAILWIND_MAP[prop] === 'function') {
                    return TAILWIND_MAP[prop](value);
                } else if (value in TAILWIND_MAP[prop]) {
                    return TAILWIND_MAP[prop][value];
                }
            } else {
                // if prop or value don't exist in the map, use the value as is,
                // useful for direct color values.
                return value;
            }
        })
        .join(' ');
}
