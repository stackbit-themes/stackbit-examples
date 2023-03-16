import Head from 'next/head';

import { DynamicComponent } from '../components/DynamicComponent';
import { Footer } from '../components/Footer';
import { annotations, toFieldPath } from '../utils/annotations';
import { pagesByType, siteConfig, urlToContent } from '../utils/content';

const FlexiblePage = ({ page, siteConfig }) => {
    return (
        <div className="page">
            <Head>
                <title>{page.title}</title>
            </Head>
            <div {...annotations(page)}>
                {page.sections?.length > 0 && (
                    <div {...toFieldPath('sections')}>
                        {page.sections.map((section, index) => (
                            <DynamicComponent key={index} {...section} />
                        ))}
                    </div>
                )}
            </div>
            <Footer siteConfig={siteConfig} />
        </div>
    );
};

export default FlexiblePage;

export function getStaticProps({ params }) {
    const url = '/' + (params.slug || []).join('/');
    return { props: { page: urlToContent(url), siteConfig: siteConfig() } };
}

export function getStaticPaths() {
    const pages = pagesByType('Page');
    return {
        paths: Object.keys(pages),
        fallback: false
    };
}
