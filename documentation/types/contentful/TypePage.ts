import * as Contentful from "contentful";
import { TypeCalloutFields } from "./TypeCallout";
import { TypeCardGridFields } from "./TypeCardGrid";
import { TypeCodeBlockFields } from "./TypeCodeBlock";
import { TypeHeadingFields } from "./TypeHeading";
import { TypeHeroFields } from "./TypeHero";
import { TypeImageFields } from "./TypeImage";
import { TypeListFields } from "./TypeList";
import { TypeParagraphFields } from "./TypeParagraph";

export interface TypePageFields {
    title: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    description: Contentful.EntryFields.Text;
    hideTableOfContents?: Contentful.EntryFields.Boolean;
    sections?: Contentful.Entry<TypeCalloutFields | TypeCardGridFields | TypeCodeBlockFields | TypeHeadingFields | TypeHeroFields | TypeImageFields | TypeListFields | TypeParagraphFields>[];
}

export type TypePage = Contentful.Entry<TypePageFields>;
