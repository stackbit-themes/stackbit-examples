import fs from 'fs';
import path from 'path';
import glob from 'glob';
import frontmatter from 'front-matter';
import sbConfig from './../stackbit.config';

import { FIELD_PATH_ATTR, OBJECT_ID_ATTR } from './annotations.js';

if (!sbConfig.pagesDir || !sbConfig.dataDir) throw new Error('Invalid Stackbit config file');

export const siteConfigFile = sbConfig.dataDir + '/config.json';

const supportedFileTypes = ['md', 'json'];

function contentFilesInPath(dir) {
    const globPattern = `${dir}/**/*.{${supportedFileTypes.join(',')}}`;
    return glob.sync(globPattern);
}

function annotateObject(object, fieldPath = '') {
    if (!object || typeof object !== 'object') return object;

    if (Array.isArray(object)) {
        object.map((item, index) => annotateObject(item, `${fieldPath}.${index}`));
        return object;
    }

    if (object.__id) object[OBJECT_ID_ATTR] = object.__id;
    if (fieldPath) object[FIELD_PATH_ATTR] = fieldPath.replace(/^\./, '');

    for (const [name, value] of Object.entries(object)) {
        object[name] = annotateObject(value, `${fieldPath}.${name}`);
    }
    return object;
}

function readContent(file) {
    const rawContent = fs.readFileSync(file, 'utf8');
    let content = null;
    switch (path.extname(file).substring(1)) {
        case 'md':
            const parsedMd = frontmatter(rawContent);
            content = {
                ...parsedMd.attributes,
                body: parsedMd.body
            };
            break;
        case 'json':
            content = JSON.parse(rawContent);
            break;
        default:
            throw Error(`Unhandled file type: ${file}`);
    }

    content.__id = file;
    content.__url = fileToUrl(file);
    content = annotateObject(content);
    return content;
}

function fileToUrl(file) {
    if (!file.startsWith(sbConfig.pagesDir)) return null;

    let url = file.slice(sbConfig.pagesDir.length);
    url = url.split('.')[0];
    if (url.endsWith('/index')) {
        url = url.slice(0, -6) || '/';
    }
    return url;
}

function urlToFilePairs() {
    const pageFiles = contentFilesInPath(sbConfig.pagesDir);
    return pageFiles.map((file) => [fileToUrl(file), file]);
}

export function urlToContent(url) {
    const urlToFile = Object.fromEntries(urlToFilePairs());
    const file = urlToFile[url];
    return readContent(file);
}

export function pagesByType(contentType) {
    let result = {};
    for (const [url, file] of urlToFilePairs()) {
        const content = readContent(file);
        if (content.type === contentType) result[url] = content;
    }
    return result;
}

export function siteConfig() {
    return readContent(siteConfigFile);
}
