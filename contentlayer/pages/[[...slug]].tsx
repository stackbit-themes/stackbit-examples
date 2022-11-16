import Head from 'next/head';

import { DynamicComponent } from '../components/DynamicComponent';
import { Footer } from '../components/Footer';
import { useLiveReload } from 'next-contentlayer/hooks';
import { siteConfig, allPages } from 'contentlayer/generated';
import * as types from 'contentlayer/generated';

const FlexiblePage: React.FC<{
  page: types.Page;
  siteConfig: types.SiteConfig;
}> = ({ page, siteConfig }) => {
  useLiveReload();

  return (
    <div className="page">
      <Head>
        <title>{page.title}</title>
      </Head>
      <div data-sb-object-id={page.stackbitObjectId}>
        {page.sections?.length > 0 && (
          <div data-sb-field-path="sections">
            {page.sections.map((section, index) => (
              <DynamicComponent
                key={index}
                {...section}
                data-sb-field-path={`.${index}`}
              />
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
  const url = '/' + (params.slug ?? []).join('/');
  const page = allPages.find((page) => page.url === url);
  return { props: { page, siteConfig } };
}

export function getStaticPaths() {
  const paths = allPages.map((_) => _.url);
  return { paths, fallback: false };
}
