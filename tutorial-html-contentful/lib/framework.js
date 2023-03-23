#!/usr/env/bin node

import ejs from 'ejs';
import fs from 'fs';
import glob from 'fast-glob';
import liveServer from 'live-server';
import path from 'path';
import prettier from 'prettier';

import { getPages } from './contentful.js';

/* ----- Constants ----- */

const IS_DEV = process.argv.includes('dev');
const DIST_DIR = path.join(process.cwd(), 'dist');
const COMPONENTS_DIR = path.join(process.cwd(), 'components');
const LAYOUT_FILE = path.join(process.cwd(), '_layout.ejs');

/* ----- Setup ----- */

// Remove existing dist directory and built files
if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
// Create new dist directory
fs.mkdirSync(DIST_DIR);

/* ----- Updaters ----- */

/**
 * Callback when a file changes while development server is running.
 *
 * @param {string} fileChanged - Path to file that changed
 * @param {string} watchDir - Absolute path to directory being watched
 */
function updateSite(fileChanged, watchDir) {
    console.log(`[Source Change] ${path.relative(process.cwd(), path.join(watchDir, fileChanged))}`);
    buildSite();
}

/**
 * Update `components` reference. Called on initial build and whenever a
 * components file is changed.
 */
function getComponents() {
    const componentFiles = glob.sync('**/*.ejs', { cwd: COMPONENTS_DIR });
    return Object.fromEntries(
        componentFiles.map((filePath) => {
            const componentName = path.basename(filePath, '.ejs');
            const component = fs.readFileSync(path.join(COMPONENTS_DIR, filePath), 'utf-8').toString();
            return [componentName, component];
        })
    );
}

/* ----- Builders ----- */

/**
 * Retrieve all pages from Contentful and pass them to `buildPage`.
 */
async function buildSite() {
    // Read layout file.
    const layout = fs.readFileSync(LAYOUT_FILE, 'utf-8').toString();
    // Read component files
    const components = getComponents();
    // Get pages from Contentful
    const pages = await getPages();
    // Build each page
    pages.forEach((page) => buildPage(page, layout, components));
    // Provide feedback
    console.log(`Built ${pages.length} pages`);
}

/**
 * Runs transformed Contentful page through the layout, and writes the result to
 * a file in the dist directory.
 *
 * @param {Object} page - Page object from Contentful
 * @param {string} layout - Layout file contents
 * @param {Object} components - Components map with component name as key and
 * component file contents as value
 */
function buildPage(page, layout, components) {
    // Get file path for the page based on the `slug` field.
    const relFilePath = page.slug.replace(/\/$/, '') + '/index.html';
    // Determine destination file path
    const distFilePath = path.join(DIST_DIR, relFilePath);
    // Create directory if it doesn't exist
    const dirPath = path.dirname(distFilePath);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    // Component renderer
    const component = (props) => ejs.render(components[props.type], { ...props });
    // Run page through EJS layout and write to file
    const html = ejs.render(layout, { page, component });
    fs.writeFileSync(distFilePath, prettier.format(html, { parser: 'html' }));
}

/* ----- Watchers / Callers ----- */

if (IS_DEV) {
    // Watch for changes to layout files and rebuild
    fs.watch(LAYOUT_FILE, (_, filename) => updateSite(filename, process.cwd()));
    // Watch for changes to component files and rebuild
    fs.watch(COMPONENTS_DIR, { recursive: true }, (_, filename) => updateSite(filename, COMPONENTS_DIR));
    // Start development server, which serves from and watches for changes in the
    // dist directory
    liveServer.start({
        port: 3000,
        root: path.relative(process.cwd(), DIST_DIR),
        open: false,
        host: 'localhost'
    });
}

// Do the initial build
await buildSite();
