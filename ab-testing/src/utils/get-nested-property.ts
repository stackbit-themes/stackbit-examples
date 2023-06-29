/**
 * Extract a deeply nested property from an object using dot notation.
 *
 * @param obj Object to parse
 * @param path Path to property using dot notation
 * @returns Value of the property
 */
export function getNestedProperty(obj: { [key: string]: any }, path: string): any {
    return path.split('.').reduce((acc, key) => {
        if (acc && acc[key]) return acc[key];
    }, obj);
}
