export function normalizeSlug(slug: string) {
    let normalized = slug.startsWith('/') ? slug : '/' + slug;
    if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);
    return normalized;
}

const postPageUrlPrefix = '/posts';

export function postUrlPath(slug: string) {
    return postPageUrlPrefix + normalizeSlug(slug);
}
