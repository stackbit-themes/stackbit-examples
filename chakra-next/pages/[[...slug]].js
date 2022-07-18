import Head from 'next/head';

import { DynamicComponent } from '../components/DynamicComponent';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { pagesByType, siteConfig, urlToContent } from '../utils/content';

import { Alert, AlertIcon, Box, Container } from '@chakra-ui/react';

const FlexiblePage = ({ page, siteConfig }) => {
    return (
        <Container maxW="container.xl">
            <Head>
                <title>{page.title}</title>
            </Head>
            {siteConfig.header && <Header {...siteConfig.header} data-sb-field-path={`${siteConfig.__id}:header`} />}

            <Box data-sb-object-id={page.__id}>
                {page.sections?.length > 0 ? (
                    <Box data-sb-field-path="sections">
                        {page.sections.map((section, index) => (
                            <DynamicComponent key={index} {...section} data-sb-field-path={`.${index}`} />
                        ))}
                    </Box>
                ) : (
                    <EmptyState />
                )}
            </Box>
            {siteConfig.footer && <Footer {...siteConfig.footer} data-sb-field-path={`${siteConfig.__id}:footer`} />}
        </Container>
    );
};

export default FlexiblePage;

export const getStaticProps = async ({ params }) => {
    const url = '/' + (params.slug || []).join('/');
    return { props: { page: urlToContent(url), siteConfig: siteConfig() } };
};

export const getStaticPaths = async () => {
    const pages = pagesByType('Page');
    return {
        paths: Object.keys(pages),
        fallback: false
    };
};

const EmptyState = () => {
    return process.env.NODE_ENV === 'development' ? (
        <Alert>
            <AlertIcon />
            Start adding sections by clicking the + button on the page or through the sidebar.
        </Alert>
    ) : null;
};
