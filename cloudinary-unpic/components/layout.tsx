import * as React from "react";
import Head from "next/head";
import { Page, Section, SiteConfig } from "utils/types";
import Header, { Links } from "./Header";
import { componentByContentType } from ".";
import * as icons from "./icons";

export type PageLayoutProps = {
  page: Page;
  siteConfig: SiteConfig;
  pageLinks: Links;
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  page,
  siteConfig,
  pageLinks,
}) => {
  return (
    <div data-sb-object-id={page.__id}>
      <Head>
        <title>{siteConfig.title || page.title}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header siteConfig={siteConfig} links={pageLinks} />
        {page.sections?.length ? (
          <PageSections sections={page.sections} />
        ) : (
          EmptyState()
        )}
      </div>
    </div>
  );
};

const PageSections: React.FC<{ sections: Section[] }> = ({ sections }) => {
  return (
    <div className="flex-grow flex justify-center px-6 md:px-10 py-6 md:py-8">
      <div className="flex flex-col w-full items-center max-w-7xl">
        {sections.map((section, idx) => {
          const SectionComponent = componentByContentType[section.type];
          return (
            <SectionComponent
              key={idx}
              {...section}
              data-sb-field-path={`.sections.${idx}`}
            />
          );
        })}
      </div>
    </div>
  );
};

function EmptyState() {
  return (
    <div className="flex-grow flex w-full h-full justify-center items-center">
      <div className="alert shadow-lg max-w-3xl m-6">
        <div>
          <icons.Information />
          <span>
            This page is empty. You can add content visually with Stackbit.
          </span>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm">
            <a
              href="https://docs.stackbit.com/getting-started"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
