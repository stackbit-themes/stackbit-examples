const COMPONENT_PATH_ATTR_NAME = 'data-component-path';

export type PropsWithComponentPath = { [COMPONENT_PATH_ATTR_NAME]: string };

export function componentPath(path: string, props?: PropsWithComponentPath): PropsWithComponentPath {
    const newPath = props && props[COMPONENT_PATH_ATTR_NAME] ? `${props[COMPONENT_PATH_ATTR_NAME]}/${path}` : path;
    return { [COMPONENT_PATH_ATTR_NAME]: newPath };
}
