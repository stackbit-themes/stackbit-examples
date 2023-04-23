import React, { PropsWithChildren } from 'react';
import { ContentObject } from '../types/app';

export const isDev = process.env.NODE_ENV === 'development';
export const ANNOTATIONS_ENABLED = isDev && !process.env.DISABLE_ANNOTATIONS;

export function fieldPath(fieldPath: string): { 'data-sb-field-path': string } | undefined {
    if (!ANNOTATIONS_ENABLED) return;
    return { 'data-sb-field-path': fieldPath };
}

export function objectId(objectId: string): { 'data-sb-object-id': string } | undefined {
    if (!ANNOTATIONS_ENABLED) return;
    return { 'data-sb-object-id': objectId };
}

/*
 * <Annotated> wrapper component is used both by <DynamicComponent> and explicitly by other components,
 * to wrap a given child with a tag having a Stackbit annotation extracted from the component props.
 * Note that all content object types include the HasAnnotation type.
 *
 * Annotating primitive fields this is more intrusive in code, and requires manually entering a field path,
 * but unlocks not just direct selection of fields but also field-level styling controls.
 */

type AnnotatedProps = React.PropsWithChildren & {
    content: ContentObject;
};

export const Annotated: React.FC<AnnotatedProps> = (props) => {
    const { children, content } = props;
    const baseResult = <>{children}</>;
    if (!ANNOTATIONS_ENABLED) {
        return baseResult;
    } else if (!content) {
        console.warn('Annotated: no content property. Props:', props);
        return baseResult;
    } else if (!children || (Array.isArray(children) && children.length !== 1)) {
        console.log('Annotated: provide a single child. Given:', children);
        return baseResult;
    }

    return <data data-sb-object-id={content.contentful_id}>{props.children}</data>;
};
