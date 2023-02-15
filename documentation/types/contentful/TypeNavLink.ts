import * as Contentful from "contentful";
import { TypePageFields } from "./TypePage";

export interface TypeNavLinkFields {
    page: Contentful.Entry<TypePageFields>;
    label?: Contentful.EntryFields.Symbol;
    children?: Contentful.Entry<TypeNavLinkFields>[];
}

export type TypeNavLink = Contentful.Entry<TypeNavLinkFields>;
