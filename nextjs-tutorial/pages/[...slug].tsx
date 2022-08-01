import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

// import { pagesByType, siteConfig, urlToContent } from '../utils/content';

const Page = ({ page }) => {
  return <div>Hello World</div>;
};

export default Page;

export const getStaticProps: GetStaticProps<{}, { slug: string[] }> = ({
  params,
}) => {
  // const url = '/' + (params?.slug ?? []).join('/');s
  return { props: { page: {} } };
};

export const getStaticPaths: GetStaticPaths = () => {
  // const pages = pagesByType('Page');
  return {
    paths: [],
    fallback: false,
  };
};
