import * as Contentful from "contentful";

export interface TypeCalloutFields {
    body: Contentful.EntryFields.Text;
}

export type TypeCallout = Contentful.Entry<TypeCalloutFields>;
