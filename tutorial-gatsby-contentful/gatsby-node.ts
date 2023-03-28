import path from 'path';

import type { GatsbyNode } from 'gatsby';

type ContentfulPage = {
    contentful_id: string;
    slug: string;
};

type PageQueryResult = {
    errors?: any;
    data?: { allContentfulPage: { nodes: ContentfulPage[] } };
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const ComposablePage = path.resolve(`src/templates/composable-page.tsx`);
    const result: PageQueryResult = await graphql(`
        query PageGeneratorQuery {
            allContentfulPage {
                nodes {
                    contentful_id
                    slug
                }
            }
        }
    `);

    result.data?.allContentfulPage.nodes.forEach((edge: ContentfulPage) => {
        createPage({
            path: `${edge.slug}`,
            component: ComposablePage,
            context: { slug: edge.slug }
        });
    });
};
