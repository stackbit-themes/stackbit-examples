import * as Contentful from "contentful";

export interface TypeButtonFields {
    title: Contentful.EntryFields.Symbol;
    href: Contentful.EntryFields.Symbol;
    showArrow?: Contentful.EntryFields.Boolean;
}

export type TypeButton = Contentful.Entry<TypeButtonFields>;
