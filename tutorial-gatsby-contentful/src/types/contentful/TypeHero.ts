import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeButtonFields } from "./TypeButton";

export interface TypeHeroFields {
    heading: EntryFields.Symbol;
    body: EntryFields.Text;
    image: Asset;
    button: Entry<TypeButtonFields>;
    theme: "imgLeft" | "imgRight";
}

export type TypeHero = Entry<TypeHeroFields>;
