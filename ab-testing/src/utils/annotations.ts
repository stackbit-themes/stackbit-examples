const EDITOR_MODE = true;

/* ----- Annotation Helpers ----- */

export type ObjectIdAnnotation = { 'data-sb-object-id': string };
export type FieldPathAnnotation = { 'data-sb-field-path': string };

/**
 * Provides annotation object ID (`data-sb-object-id`) for the document based on
 * context
 *
 * @param id Unique value representing the object in the content source
 * @returns Props to be spread on the element based on context
 */
export function objectIdAnnotation(id?: string): ObjectIdAnnotation | undefined {
    if (!EDITOR_MODE || !id || !id.length) return;
    return { 'data-sb-object-id': id };
}

/**
 * Provides annotation field path object (`data-sb-field-path`) for the document
 * based on context
 *
 * @param fieldPath Path to use for the field
 * @returns Props to be spread on the element based on context
 */
export function fieldPathAnnotation(fieldPath?: string): FieldPathAnnotation | undefined {
    if (!EDITOR_MODE || !fieldPath || !fieldPath.length) return;
    return { 'data-sb-field-path': fieldPath };
}
