import React from 'react';
import { graphql, PageProps } from 'gatsby';

import type { ComposablePage } from '../types/app';
import { DynamicComponent } from '../utils/dynamic-component';
import { useContentChange } from '../utils/use-content-change';

export default function ComposablePageTemplate({ data }: PageProps) {
    useContentChange();
    const page = (data as any).contentfulPage as ComposablePage;

    return (
        <div>
            {(page.sections || []).map((section, idx) => {
                return <DynamicComponent key={idx} {...section} />;
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
                        internal {
                            content
                        }
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
                        internal {
                            content
                        }
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
