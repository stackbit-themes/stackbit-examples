import * as Contentful from "contentful";

export interface TypeBadgeFields {
    title: Contentful.EntryFields.Symbol;
}

export type TypeBadge = Contentful.Entry<TypeBadgeFields>;
