import * as Contentful from "contentful";

export interface TypeCodeBlockFields {
    title: Contentful.EntryFields.Symbol;
    body: Contentful.EntryFields.Text;
    label?: Contentful.EntryFields.Symbol;
    language: "JavaScript" | "Plain Text" | "TypeScript";
}

export type TypeCodeBlock = Contentful.Entry<TypeCodeBlockFields>;
