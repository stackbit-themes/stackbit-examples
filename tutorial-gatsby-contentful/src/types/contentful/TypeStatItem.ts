import type { Entry, EntryFields } from "contentful";

export interface TypeStatItemFields {
    label: EntryFields.Symbol;
    value: EntryFields.Symbol;
}

export type TypeStatItem = Entry<TypeStatItemFields>;
