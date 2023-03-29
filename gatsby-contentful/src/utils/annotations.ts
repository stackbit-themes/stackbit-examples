const ANNOTATIONS_ENABLED = !process.env.DISABLE_ANNOTATIONS;

export function fieldPath(fieldPath: string): { 'data-sb-field-path': string } | undefined {
    if (!ANNOTATIONS_ENABLED) return;
    return { 'data-sb-field-path': fieldPath };
}

export function objectId(objectId: string): { 'data-sb-object-id': string } | undefined {
    if (!ANNOTATIONS_ENABLED) return;
    return { 'data-sb-object-id': objectId };
}
