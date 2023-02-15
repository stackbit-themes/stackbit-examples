import * as Contentful from "contentful";
import { TypeBadgeFields } from "./TypeBadge";
import { TypeButtonFields } from "./TypeButton";

export interface TypeHeroFields {
    title: Contentful.EntryFields.Symbol;
    body: Contentful.EntryFields.Text;
    image: Contentful.Asset;
    badge?: Contentful.Entry<TypeBadgeFields>;
    button: Contentful.Entry<TypeButtonFields>;
}

export type TypeHero = Contentful.Entry<TypeHeroFields>;
