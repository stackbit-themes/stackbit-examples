import type { Entry, EntryFields } from "contentful";
import type { TypeStatItemFields } from "./TypeStatItem";

export interface TypeStatsFields {
    heading: EntryFields.Symbol;
    body: EntryFields.Text;
    theme: "dark" | "primary";
    stats: Entry<TypeStatItemFields>[];
}

export type TypeStats = Entry<TypeStatsFields>;
