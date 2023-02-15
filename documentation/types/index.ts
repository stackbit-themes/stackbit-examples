import * as ContentfulTypes from 'contentful';
import * as Contentful from './contentful';

export { Contentful };

// ---------------------------------------- | Meta Fields

type MetaFields = {
    _id: string;
};

// ---------------------------------------- | Stackbit Annotations

export type StackbitAnnotations = {
    'data-sb-field-path'?: string;
    'data-sb-object-id'?: string;
};

// ---------------------------------------- | Global Objects

export type SiteConfig = Omit<Contentful.TypeSiteConfigFields, 'mainNavigation'> & MetaFields & { mainNavigation: NavLink[] };

export type NavLink = Omit<Contentful.TypeNavLinkFields, 'page' | 'children'> & MetaFields & { page: Page; children?: NavLink[] };

// ---------------------------------------- | Atoms

export type Badge = Contentful.TypeBadgeFields & MetaFields & { _type: 'badge' };
export type Button = Contentful.TypeButtonFields & MetaFields & { _type: 'button' };
export type Card = Contentful.TypeCardFields & MetaFields & { _type: 'card' };

// ---------------------------------------- | Sections

export type SectionType = 'callout' | 'cardGrid' | 'codeBlock' | 'heading' | 'hero' | 'image' | 'list' | 'paragraph';
export type ComposableSection = Callout | CardGrid | CodeBlock | Heading | Hero | Image | List | Paragraph;

export type Section<Fields, TypeValue extends SectionType> = Fields & MetaFields & { _type: TypeValue };

export type Callout = Section<Contentful.TypeCalloutFields, 'callout'>;
export type CardGrid = Omit<Section<Contentful.TypeCardGridFields, 'cardGrid'>, 'cards'> & { cards: Card[] };
export type CodeBlock = Section<Contentful.TypeCodeBlockFields, 'codeBlock'> & { code: { html: string; language: 'js' | 'ts' | 'txt' } };
export type Heading = Omit<Section<Contentful.TypeHeadingFields, 'heading'>, 'badge'> & { badge?: Badge };
export type Hero = Omit<Section<Contentful.TypeHeroFields, 'hero'>, 'badge' | 'button' | 'image'> & {
    badge?: Badge;
    button: Button;
    image: ContentfulTypes.Asset['fields'];
};
export type Image = Omit<Section<Contentful.TypeImageFields, 'image'>, 'image'> & { image: ContentfulTypes.Asset['fields'] };
export type List = Omit<Section<Contentful.TypeListFields, 'list'>, 'items'> & { items: Array<Paragraph> };
export type Paragraph = Section<Contentful.TypeParagraphFields, 'paragraph'>;

// ---------------------------------------- | Pages

export type Page = Omit<Contentful.TypePageFields, 'sections'> & MetaFields & { _type: 'page'; urlPath: string; sections?: ComposableSection[] };

export type PageHeading = {
    title: string;
    href: string;
    level: Heading['level'];
};
