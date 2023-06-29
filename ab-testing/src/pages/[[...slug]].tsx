import type { Page } from '@/content/content-types';
import { ComposablePage, ComposablePageProps } from '@/layouts/ComposablePage';
import { EditorHub } from '@/layouts/EditorHub';
import { EDITOR_HUB_PAGE_PATH } from '@/utils/constants';
import contentCache from 'content-cache' assert { type: 'json' };

/* ----- Helpers ----- */

async function getAllPages() {
    return contentCache.pages as Page[];
}

/* ----- Query Methods ----- */

export async function getStaticPaths() {
    const allPages = (await getAllPages()).map((page) => page.urlPath);
    let paths = allPages;
    // Special page for the editor hub
    if (process.env.STACKBIT_PREVIEW === 'true') paths.push(EDITOR_HUB_PAGE_PATH);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string[] } }) {
    // Attempt to match the editor hub page
    if (process.env.STACKBIT_PREVIEW === 'true') {
        const slug = '/' + [params.slug].flat().join('/');
        if (slug === EDITOR_HUB_PAGE_PATH) {
            const props: PageProps = { template: 'EditorHub' };
            return { props };
        }
    }
    // Otherwise, look for a page from Contentful
    const allPages = await getAllPages();
    const page = allPages.find((page) => {
        if (!params.slug) return !page.slug;
        return JSON.stringify(page.slug) === JSON.stringify(params.slug);
    });
    if (!page) return { notFound: true };
    const props: PageProps = { template: 'ComposablePage', pageProps: { page, allPages } };
    return { props };
}

/* ----- Page Template ----- */

type PageProps = {
    template: string;
    pageProps?: ComposablePageProps;
};

const pageTemplateComponentMap: Record<string, any> = {
    EditorHub: EditorHub,
    ComposablePage: ComposablePage
};

export default function Page(props: PageProps) {
    const TemplateComponent = pageTemplateComponentMap[props.template];
    if (!TemplateComponent) return null;
    return <TemplateComponent {...props.pageProps} />;
}
