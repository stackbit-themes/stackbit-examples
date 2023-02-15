import * as Contentful from "contentful";
import { TypeBadgeFields } from "./TypeBadge";

export interface TypeHeadingFields {
    body: Contentful.EntryFields.Symbol;
    level: "1" | "2" | "3" | "4" | "5" | "6";
    badge?: Contentful.Entry<TypeBadgeFields>;
}

export type TypeHeading = Contentful.Entry<TypeHeadingFields>;
