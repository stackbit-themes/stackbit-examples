import * as Contentful from "contentful";
import { TypeCardFields } from "./TypeCard";

export interface TypeCardGridFields {
    title: Contentful.EntryFields.Symbol;
    cards: Contentful.Entry<TypeCardFields>[];
}

export type TypeCardGrid = Contentful.Entry<TypeCardGridFields>;
