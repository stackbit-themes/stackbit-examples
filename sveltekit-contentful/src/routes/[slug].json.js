import { client } from '$lib/contentfulClient';

export async function GET({ params }) {
    const blog = await client.getEntries({
        'fields.slug': params.slug,
        content_type: 'blog-post'
    });

    if (blog?.items?.length > 0) {
        return {
            body: {
                blog: blog.items[0],
            }
        };
    }

    return {
        status: 404
    };
}
