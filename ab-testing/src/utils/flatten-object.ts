type FlattenedProperty = {
    path: string;
    value: string;
};

/**
 * Flattens an object into an array of properties with `path` and `value`
 * properties.
 *
 * @param obj Object to parse
 * @returns Array of flattened properties with `path` and `value` properties
 */
export function flattenObject(obj: { [key: string]: any }): FlattenedProperty[] {
    const parseProperty = (obj: any, path: string): FlattenedProperty | FlattenedProperty[] => {
        if (Array.isArray(obj)) {
            return obj.map((item, index) => parseProperty(item, `${path}.${index}`)).flat();
        }
        if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj)
                .map((key) => parseProperty(obj[key], `${path}.${key}`))
                .flat();
        }

        return { path, value: obj } as FlattenedProperty;
    };

    return Object.keys(obj)
        .map((key) => parseProperty(obj[key], key))
        .flat() as FlattenedProperty[];
}
