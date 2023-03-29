import React, { useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';

import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';

import type { ComposablePage } from '../types/app';

const componentMap = {
    ContentfulHero: Hero,
    ContentfulStats: Stats
};

export default function ComposablePageTemplate({ data }: PageProps) {
    const page = (data as any).contentfulPage as ComposablePage;

    useEffect(() => {
        const handleContentChange = async (event: Event) => {
            event.preventDefault();
            await fetch('/__refresh', { method: 'POST' });
        };

        window.addEventListener('stackbitObjectsChanged', handleContentChange);

        // cleanup this component
        return () => {
            window.removeEventListener('stackbitObjectsChanged', handleContentChange);
        };
    }, []);

    return (
        <div>
            {(page.sections || []).map((section, idx) => {
                const Component = componentMap[section.__typename] as any;
                return <Component key={idx} {...section} />;
            })}
        </div>
    );
}

export const query = graphql`
    query ComposablePageQuery($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
            title
            contentful_id
            slug
            sections {
                ... on ContentfulHero {
                    __typename
                    contentful_id
                    id
                    body {
                        body
                    }
                    button {
                        url
                        theme
                        contentful_id
                        label
                    }
                    heading
                    image {
                        gatsbyImage(layout: FULL_WIDTH, width: 800)
                        title
                    }
                }
                ... on ContentfulStats {
                    __typename
                    contentful_id
                    heading
                    body {
                        body
                    }
                    stats {
                        contentful_id
                        value
                        label
                    }
                    theme
                }
            }
        }
    }
`;
