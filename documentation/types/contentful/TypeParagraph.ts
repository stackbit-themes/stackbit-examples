import * as Contentful from "contentful";

export interface TypeParagraphFields {
    body: Contentful.EntryFields.Text;
}

export type TypeParagraph = Contentful.Entry<TypeParagraphFields>;
