import { client } from '$lib/contentfulClient';

export async function GET() {
    // get all blogs from Contentful
    const blogs = await client.getEntries({
        content_type: 'blog-post'
    });

    if (blogs) {
        return {
            status: 200,
            body: {
                blogs
            }
        };
    }

    return {
        status: 404
    };
}
