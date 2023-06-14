import { defineStackbitConfig, SiteMapEntry, SiteMapOptions, DocumentWithSource, DocumentStringLikeFieldNonLocalized } from '@stackbit/types';
import { ExampleContentSource } from './example-content-source/example-content-source';
import { normalizeSlug } from './utils/common';

export default defineStackbitConfig({
    stackbitVersion: '0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    contentSources: [
        new ExampleContentSource({
            projectId: 'example',
            databaseFilePath: process.env.EXAMPLE_DATABASE_FILE
        })
    ],
    modelExtensions: [
        {
            type: 'page',
            name: 'post'
        }
    ],
    siteMap: (options: SiteMapOptions) => {
        const postPages = options.documents
            .filter((document) => {
                return document.modelName === 'post';
            })
            .map((document): SiteMapEntry | null => {
                const slug = getStringField(document, 'slug');
                if (!slug) return null;

                const title = getStringField(document, 'title');
                return {
                    stableId: document.id,
                    label: title,
                    urlPath: `/posts${normalizeSlug(slug)}`,
                    document: {
                        srcType: document.srcType,
                        srcProjectId: document.srcProjectId,
                        modelName: document.modelName,
                        id: document.id
                    }
                };
            })
            .filter(Boolean) as SiteMapEntry[];

        const homepage: SiteMapEntry = {
            urlPath: '/',
            stableId: 'home',
            label: 'Home',
            isHomePage: true
        };

        const pages = [homepage, ...postPages];
        return pages;
    }
});

function getStringField(document: DocumentWithSource, field: string) {
    return (document.fields[field] as DocumentStringLikeFieldNonLocalized)?.value;
}
