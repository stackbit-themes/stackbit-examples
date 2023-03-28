import { TypePageFields, TypeStatItemFields, TypeHeroFields, TypeStatsFields, TypeButtonFields } from './contentful/index';

/* ---------- Shared ---------- */

type ContentfulEntry<Fields, TypeName> = Fields & {
    contentful_id: string;
    __typename: TypeName;
};

/* ---------- Atoms ---------- */

export type Button = ContentfulEntry<TypeButtonFields, 'ContentfulButton'>;

export type StatItem = ContentfulEntry<TypeStatItemFields, 'ContentfulStatItem'>;

/* ---------- Sections ---------- */

export type Stats = ContentfulEntry<Omit<TypeStatsFields, 'stats'> & { stats: StatItem[] }, 'ContentfulStats'>;

export type Hero = ContentfulEntry<Omit<TypeHeroFields, 'button'> & { button: Button }, 'ContentfulHero'>;

/* ---------- Templates ---------- */

export type ComposablePage = ContentfulEntry<Omit<TypePageFields, 'sections'> & { sections: Array<Hero | Stats> }, 'ContentfulPage'>;
