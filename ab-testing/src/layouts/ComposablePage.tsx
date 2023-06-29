import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FPO } from '@/components/placeholders';
import { Page } from '@/content/content-types';
import { componentPath } from '@/utils/components';

export type ComposablePageProps = {
    page: Page;
    allPages: Page[];
};

export function ComposablePage(props: ComposablePageProps) {
    const { page, allPages } = props;

    return (
        <>
            <Header pages={allPages.sort((a, b) => (a.urlPath > b.urlPath ? 1 : -1))} />
            <main>
                <Hero {...page.hero} {...componentPath('hero')} />
                <FPO.Feature />
            </main>
        </>
    );
}
