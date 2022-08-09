import { sourcebitDataClient } from "sourcebit-target-next";

async function allDocuments() {
  return (await sourcebitDataClient.getData()).objects;
}

export async function documentsByType(type) {
  const allDocs = await allDocuments();
  return allDocs.filter((obj) => obj?.__metadata.modelName === type);
}

export async function allPages() {
  return await documentsByType("Page");
}

export async function pageByUrl(url) {
  const pages = await allPages();
  return pages.find((page) => pageUrlPath(page) === url);
}

export async function siteConfig() {
  const docs = await documentsByType("SiteConfig");
  if (docs.length !== 1)
    throw Error("Thou shalt have one site config content file!");
  return docs[0];
}

export function pageUrlPath(page) {
  if (!page || !page.slug) return null;
  return page.slug.startsWith("/") ? page.slug : `/${page.slug}`;
}

export async function navbarItems() {
  const pages = await allPages();
  return pages.map((page) => {
    return { title: page.navbarTitle || page.title, path: pageUrlPath(page) };
  });
}
