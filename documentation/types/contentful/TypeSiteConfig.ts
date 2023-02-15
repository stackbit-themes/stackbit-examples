import * as Contentful from "contentful";
import { TypeNavLinkFields } from "./TypeNavLink";

export interface TypeSiteConfigFields {
    title: Contentful.EntryFields.Symbol;
    githubUrl?: Contentful.EntryFields.Symbol;
    mainNavigation: Contentful.Entry<TypeNavLinkFields>[];
}

export type TypeSiteConfig = Contentful.Entry<TypeSiteConfigFields>;
