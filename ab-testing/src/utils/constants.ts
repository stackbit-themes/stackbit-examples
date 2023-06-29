import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Path helpers
export const ROOT_PATH = process.cwd();

// Environment Variables
dotenv.config({ path: path.join(ROOT_PATH, '.env.local') });

// Environment
export const IS_DEV = process.env.NODE_ENV === 'development';

// Contentful
export const ACCESS_TOKEN = IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN! : process.env.CONTENTFUL_DELIVERY_TOKEN!;
export const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
export const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
export const API_HOST = IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com';
export const CONTENTFUL_CONTENT_CACHE_FILE = path.join(ROOT_PATH, '.contentful-cache.json');
export const CONTENTFUL_POLLING_CACHE_FILE = path.join(ROOT_PATH, 'src/contentful-hwm.txt');

// Prettier
export const PRETTIER_CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT_PATH, '.prettierrc'), 'utf8'));

// Stackbit
export const EDITOR_HUB_PAGE_PATH = '/__editor_hub__';
