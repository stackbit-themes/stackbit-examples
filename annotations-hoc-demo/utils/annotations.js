export const OBJECT_ID_ATTR = 'data-sb-object-id';
export const FIELD_PATH_ATTR = 'data-sb-field-path';

const FIELD_PATH_PROP_NAMES = [FIELD_PATH_ATTR, 'fieldPath'];

/**
 * Builds annotation properties from a component's props
 *
 * @param {object} props Properties sent to a component
 * @returns Object containing valid annotation properties
 */
export function annotations(props) {
    let annotationProps = {};

    if (props[OBJECT_ID_ATTR]) {
        annotationProps[OBJECT_ID_ATTR] = props[OBJECT_ID_ATTR].toString();
    }
    FIELD_PATH_PROP_NAMES.forEach((propName) => {
        if (props[propName]) {
            annotationProps[FIELD_PATH_ATTR] = props[propName].toString();
        }
    });

    return annotationProps;
}

/**
 * Builds an annotation object for a specific element
 *
 * @param {string} fieldName Property name to be annotated
 * @param {object} context Optional context object used to prefix the annotation
 * @returns Object containing valid annotation properties
 */
export function toFieldPath(fieldName, context = {}) {
    const fpPrefix = annotations(context)[FIELD_PATH_ATTR];
    return annotations({
        fieldPath: `${fpPrefix || ''}.${fieldName}`.replace(/^\./, '')
    });
}
