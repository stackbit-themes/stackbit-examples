#!/usr/env/bin node

import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

const IS_DEV = process.argv.includes('dev');
const SRC_DIR = path.join(process.cwd(), 'src');
const DIST_DIR = path.join(process.cwd(), 'dist');
const PAGES_DIR = path.join(SRC_DIR, 'content/pages');
const LAYOUTS_DIR = path.join(SRC_DIR, 'layouts');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

// Global refs — they get updated on each build
let layouts = {};
let components = {};

// Prepare dist directory
if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR);

function buildPage(relSrcFilePath) {
  // Parse page and retrieve layout
  const absSrcFilePath = path.join(PAGES_DIR, relSrcFilePath);
  const rawPageContent = fs.readFileSync(absSrcFilePath, 'utf-8').toString();
  const page = JSON.parse(rawPageContent);
  const layout = layouts[page.layout];
  // Add ID value as path from root of project (for inline editing)
  page._id = path.relative(process.cwd(), absSrcFilePath);
  // Escape if layout doesn't exist
  if (!layout) console.error(`Layout "${page.layout}" not found for page "${relSrcFilePath}"`);
  // Get and set urlPath on page from file path
  const urlPath = relSrcFilePath
    .replace(/\.json$/, '/index.html')
    .replace(/\/index\/index\.html$/, '/index.html')
    .replace(/^index\/index\.html$/, 'index.html');
  // Determine destination file path
  const distFilePath = path.join(DIST_DIR, urlPath);
  // Create directory if it doesn't exist
  const dirPath = path.dirname(distFilePath);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  // Run page through EJS layout and write to file
  const html = ejs.render(layout, { page, component: renderComponent });
  fs.writeFileSync(distFilePath, html);
}

function updateLayouts() {
  const layoutFiles = glob.sync('**/*.ejs', { cwd: LAYOUTS_DIR });
  layouts = Object.fromEntries(
    layoutFiles.map((filePath) => {
      const layoutName = path.basename(filePath, '.ejs');
      const layout = fs.readFileSync(path.join(LAYOUTS_DIR, filePath), 'utf-8').toString();
      return [layoutName, layout];
    }),
  );
}

function updateComponents() {
  const componentFiles = glob.sync('**/*.ejs', { cwd: COMPONENTS_DIR });
  components = Object.fromEntries(
    componentFiles.map((filePath) => {
      const componentName = path.basename(filePath, '.ejs');
      const component = fs.readFileSync(path.join(COMPONENTS_DIR, filePath), 'utf-8').toString();
      return [componentName, component];
    }),
  );
}

function renderComponent(props, _fieldPath) {
  return ejs.render(components[props.type], { ...props, _fieldPath });
}

function buildSite() {
  // Update global refs
  updateLayouts();
  updateComponents();
  // Get page files
  const pageFiles = glob.sync('**/*.json', { cwd: PAGES_DIR });
  // Build each page
  pageFiles.forEach(buildPage);
  // Provide feedback
  console.log(`Built ${pageFiles.length} pages`);
}

// In dev mode, watch for changes to content.json and rebuild
if (IS_DEV) fs.watch(SRC_DIR, { recursive: true }, buildSite);

// Do initial build
buildSite();
