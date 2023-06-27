import Head from 'next/head';
import { Header } from '../components/Header';
import { getPages, getPagePaths, getCurrentBrand, getMultiBrandConfig } from '../utils/content';
import localization from '../utils/localization';
import { IS_DEV, normalizeSlug } from '../utils/common';
import { componentMap } from '../components';
import { Footer } from '../components/Footer';

export default function ComposablePage({ page, multiBrandConfig, brand, headerLinks, locale }) {
  if (!page) {
    return (
      <>
        <Header pageLocale={locale} links={headerLinks} brand={brand} />
        <PreviewOnlyMessage message={`This page does not exist yet (locale: ${locale}, brand: ${brand.name}).`} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>
      <main className="min-h-screen flex flex-col">
        <Header pageLocale={page.locale} links={headerLinks} brand={brand} />
        <div className="flex-grow" data-sb-object-id={page.id}>
          {page.sections?.length ? (
            page.sections.map((section, idx) => {
              const Component = componentMap[section.type];
              return <Component key={idx} {...section} />;
            })
          ) : (
            <PreviewOnlyMessage message="Empty page! add sections." />
          )}
        </div>
        <Footer multiBrandConfig={multiBrandConfig} />
      </main>
    </>
  );
}

function PreviewOnlyMessage({ message }) {
  return IS_DEV ? (
    <div className="flex items-center justify-center w-full py-32">
      <div className="border-4 border-verydark rounded p-16 border-dashed flex flex-col gap-2 items-center">
        <span className="text-2xl">{message}</span>
        <span>Note: this message appears only in preview mode.</span>
      </div>
    </div>
  ) : (
    <></>
  );
}

function EmptyState() {
  return IS_DEV ? (
    <div className="flex items-center justify-center w-full py-32">
      <div className="border-4 border-gray-400 rounded p-16 border-dashed flex flex-col gap-2 items-center">
        <span className="text-2xl">Empty page! add sections.</span>
        <span>(this message does not appear in production)</span>
      </div>
    </div>
  ) : (
    <></>
  );
}

export async function getStaticPaths() {
  const paths = await getPagePaths();
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const slug = '/' + (params?.slug ?? ['']).join('/');
  const pageLocale = locale || localization.defaultLocale;

  const [multiBrandConfig, brand, allPages] = await Promise.all([
    getMultiBrandConfig(pageLocale),
    getCurrentBrand(pageLocale),
    getPages(),
  ]);
  const page = allPages.find((e) => normalizeSlug(e.slug) === slug && e.locale === pageLocale);

  if (!page) {
    if (slug === '/' && IS_DEV) {
      console.log('Using a fallback homepage');
    } else {
      console.warn('Did not find page for:', params, 'parsed slug:', slug, 'locale:', locale);
      return { notFound: true };
    }
  }

  return {
    props: {
      page: page || null, // Undefined can't be serialized by Next.js
      multiBrandConfig,
      brand,
      headerLinks: linksToAllPages(allPages, pageLocale),
      locale: pageLocale,
    },
  };
}

function linksToAllPages(pages, locale) {
  return Object.fromEntries(
    pages.filter((e) => e.locale === locale).map((e) => [e.title, normalizeSlug(e.slug), e.locale]),
  );
}
