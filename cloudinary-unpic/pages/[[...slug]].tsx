import * as React from "react";
import { PageLayout, PageLayoutProps } from "components/layout";
import { GetStaticProps } from "next";
import { readSiteConfig, urlToFileMap, allPages } from "utils/content";
import { Page } from "utils/types";

const Page: React.FC<PageLayoutProps> = (props) => {
  return <PageLayout {...props} />;
};

export default Page;

export const getStaticProps: GetStaticProps = ({ params }) => {
  const slug = params?.slug ? (params.slug as string[]) : [];
  const currentUrl = "/" + slug.join("/");

  const pages = allPages();
  const page = pages[currentUrl] as Page;

  const pageLinks = Object.entries(pages).map(([url, page]) => {
    return { title: page.title, path: url };
  });
  const siteConfig = readSiteConfig();

  return {
    props: {
      page,
      pageLinks,
      siteConfig,
    } as PageLayoutProps,
  };
};

export const getStaticPaths = () => {
  const paths = Object.keys(urlToFileMap());
  return {
    paths,
    fallback: false,
  };
};
