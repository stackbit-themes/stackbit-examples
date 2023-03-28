import type { Entry, EntryFields } from "contentful";
import type { TypeHeroFields } from "./TypeHero";
import type { TypeStatsFields } from "./TypeStats";

export interface TypePageFields {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    sections: Entry<TypeHeroFields | TypeStatsFields>[];
}

export type TypePage = Entry<TypePageFields>;
