import * as fs from "fs";
import path from "path";
import glob from "glob";
import frontmatter from "front-matter";
import sbConfig from "stackbit.config";
import { Document, SiteConfig } from "./types";

if (!sbConfig.pagesDir || !sbConfig.dataDir)
  throw new Error("Invalid Stackbit config file");

const pagesDir = sbConfig.pagesDir;
const siteConfigFile = sbConfig.dataDir + "/config.json";

const supportedFileTypes = ["md", "json"];

function contentFilesInPath(dir: string) {
  const globPattern = `${dir}/**/*.{${supportedFileTypes.join(",")}}`;
  return glob.sync(globPattern);
}

function readContent(file: string): Document {
  const rawContent = fs.readFileSync(file, "utf8");
  let content = null;
  switch (path.extname(file).substring(1)) {
    case "md":
      const parsedMd = frontmatter<Record<string, any>>(rawContent);
      content = {
        ...parsedMd.attributes,
        body: parsedMd.body,
      };
      break;
    case "json":
      content = JSON.parse(rawContent);
      break;
    default:
      throw Error(`Unhandled file type: ${file}`);
  }

  content.__id = file;
  content.__url = fileToUrl(file);
  return content;
}

function fileToUrl(file: string) {
  if (!file.startsWith(pagesDir)) return null;

  let url = file.slice(pagesDir.length);
  url = url.split(".")[0];
  if (url.endsWith("/index")) {
    url = url.slice(0, -6) || "/";
  }
  return url;
}

export function urlToFileMap(): Record<string, string> {
  const pageFiles = contentFilesInPath(pagesDir);
  return Object.fromEntries(pageFiles.map((file) => [fileToUrl(file), file]));
}

export function urlToContent(url: string) {
  const file = urlToFileMap()[url];
  return readContent(file);
}

export function allPages() {
  let result: Record<string, Document> = {};
  for (const [url, file] of Object.entries(urlToFileMap())) {
    result[url] = readContent(file);
  }
  return result;
}

export function readSiteConfig() {
  return readContent(siteConfigFile) as SiteConfig;
}
