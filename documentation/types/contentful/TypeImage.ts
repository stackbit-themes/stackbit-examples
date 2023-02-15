import * as Contentful from "contentful";

export interface TypeImageFields {
    title: Contentful.EntryFields.Symbol;
    image: Contentful.Asset;
    showCaption?: Contentful.EntryFields.Boolean;
}

export type TypeImage = Contentful.Entry<TypeImageFields>;
