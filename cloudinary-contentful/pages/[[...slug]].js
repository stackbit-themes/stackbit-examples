import * as React from "react";
import Head from "next/head";
import { toObjectId, toFieldPath } from "@stackbit/annotations";
import { hotContentReload } from "sourcebit-target-next/hot-content-reload";
import { Footer } from "../components/Footer";
import {
  allPages,
  pageByUrl,
  siteConfig,
  pageUrlPath,
  navbarItems,
} from "../utils/sourcebit-utils";
import { contentTypeToComponents as contentTypeToComponent } from "../components";
import { NavBar } from "../components/NavBar";

const Page = ({ page, siteConfig, navbarItems }) => {
  const { title, sections } = page;
  return (
    <div className="page">
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar navbarItems={navbarItems} />
      <div {...toObjectId(page?.__metadata?.id)}>
        {sections && sections.length > 0 ? (
          <PageSections sections={sections} />
        ) : (
          EmptyState()
        )}
      </div>
      <Footer siteConfig={siteConfig} />
    </div>
  );
};

function PageSections({ sections }) {
  return sections.map((section, idx) => {
    const Component = contentTypeToComponent[section.__metadata.modelName ];
    if (!Component)
      throw new Error(`No component for section type: ${section.__metadata.modelName }`);
    return (
      <Component key={idx} {...section} {...toFieldPath(`.sections.${idx}`)} />
    );
  });
}

function EmptyState() {
  return (
    <div className="page-empty-state">
      <h2>
        No components yet.
        <br />
        Add the first one by editing the page.
      </h2>
    </div>
  );
}

const withHotContentReload = hotContentReload();
export default withHotContentReload(Page);

export const getStaticProps = async ({ params }) => {
  const currentUrl = "/" + (params.slug || []).join("/");
  const page = await pageByUrl(currentUrl);
  return {
    props: {
      page,
      navbarItems: await navbarItems(),
      siteConfig: await siteConfig(),
    },
  };
};

export const getStaticPaths = async () => {
  const pages = await allPages();
  return {
    paths: pages.map((page) => pageUrlPath(page)),
    fallback: false,
  };
};
