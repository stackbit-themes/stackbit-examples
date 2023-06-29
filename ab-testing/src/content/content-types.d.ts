import { Entry } from 'contentful';

export type ContentfulContentType = 'page' | 'test' | 'hero' | 'button' | 'banner';

type TransformedEntry<T extends ContentfulContentType> = {
    id: Entry['sys']['id'];
    type: T;
};

/* ----- Pages ----- */

export interface Page extends TransformedEntry<'page'> {
    urlPath: string;
    slug?: string[];
    title: string;
    hero: Hero;
}

/* ----- Tests ----- */

export interface Test extends TransformedEntry<'test'> {
    name: string;
    field: string;
    values: string[];
    component?: {
        id: PageComponent['id'];
        type: PageComponent['type'];
    };
}

/* ----- Components ----- */

export type PageComponent = Hero | Banner | Button;

export interface Hero extends TransformedEntry<'hero'> {
    heading: string;
    content: string;
    buttons: Button[];
    banner: Banner;
    tests?: Test[];
}

export interface Button extends TransformedEntry<'button'> {
    label: string;
    url: string;
    theme: 'default' | 'link';
    showArrow?: boolean;
    tests?: Test[];
}

export interface Banner extends TransformedEntry<'hero'> {
    content: string;
    button: Button;
    tests?: Test[];
}
