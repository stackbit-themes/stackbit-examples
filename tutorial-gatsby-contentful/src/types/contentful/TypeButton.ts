import type { Entry, EntryFields } from "contentful";

export interface TypeButtonFields {
    label: EntryFields.Symbol;
    url: EntryFields.Symbol;
    theme: "default" | "outline";
}

export type TypeButton = Entry<TypeButtonFields>;
