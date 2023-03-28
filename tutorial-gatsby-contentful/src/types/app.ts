import type { Asset, EntryFields } from 'contentful';

/* ---------- Shared ---------- */

type Markdown<Key extends string> = Record<Key, EntryFields.Text>;

type SystemFields<TypeName> = {
    contentful_id: string;
    __typename: TypeName;
};

/* ---------- Atoms ---------- */

export type Button = SystemFields<'ContentfulButton'> & {
    label: EntryFields.Symbol;
    url: EntryFields.Symbol;
    theme: 'default' | 'outline';
};

export type StatItem = SystemFields<'ContentfulStatItem'> & {
    label: EntryFields.Symbol;
    value: EntryFields.Symbol;
};

/* ---------- Sections ---------- */

export type Stats = SystemFields<'ContentfulStats'> & {
    heading: EntryFields.Symbol;
    body: Markdown<'body'>;
    theme: 'dark' | 'primary';
    stats: StatItem[];
};

export type Hero = SystemFields<'ContentfulHero'> & {
    heading: EntryFields.Symbol;
    body: Markdown<'body'>;
    image: Asset;
    button: Button;
    theme: 'imgLeft' | 'imgRight';
};

/* ---------- Templates ---------- */

export type ComposablePage = SystemFields<'ContentfulPage'> & {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    sections: Array<Hero | Stats>;
};
