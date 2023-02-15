import * as Contentful from "contentful";

export interface TypeCardFields {
    title: Contentful.EntryFields.Symbol;
    href: Contentful.EntryFields.Symbol;
    body: Contentful.EntryFields.Text;
}

export type TypeCard = Contentful.Entry<TypeCardFields>;
