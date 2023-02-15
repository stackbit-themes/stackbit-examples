import * as Contentful from "contentful";
import { TypeParagraphFields } from "./TypeParagraph";

export interface TypeListFields {
    title: Contentful.EntryFields.Symbol;
    items: Contentful.Entry<TypeParagraphFields>[];
    listType: "ordered" | "unordered";
}

export type TypeList = Contentful.Entry<TypeListFields>;
