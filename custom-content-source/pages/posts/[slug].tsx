import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';
import { CMS_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';
import type Post from '../../interfaces/post';
import { getApiClient, getDocumentById, getAssetById } from '../../lib/api';
import { normalizeSlug } from '../../utils/common';

type Props = {
    post?: Post;
    morePosts?: Post[];
    preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
    const router = useRouter();
    if (!post) {
        return <ErrorPage statusCode={404} />;
    }
    const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;
    return (
        <Layout preview={preview}>
            <Container>
                <Header />
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article className="mb-32" data-sb-object-id={post.id}>
                            <Head>
                                <title>{title}</title>
                                {post.ogImage && <meta property="og:image" content={post.ogImage.url} />}
                            </Head>
                            <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} />
                            {post.content && <PostBody content={post.content} />}
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    );
}

type Params = {
    slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const apiClient = getApiClient();
    const postDocs = await apiClient.getDocuments({ type: 'post', includeEmptyFields: true });
    const postDoc = postDocs.filter((document) => document.fields.slug === params?.slug)[0];
    if (!postDoc) {
        return { props: {} };
    }

    const authorDocument = await getDocumentById(postDoc.fields.author);
    const post: Post = {
        id: postDoc.id,
        title: postDoc.fields.title,
        date: postDoc.fields.date,
        slug: normalizeSlug(postDoc.fields.slug),
        author: authorDocument
            ? {
                  id: authorDocument.id,
                  name: authorDocument.fields.name,
                  picture: await getAssetById(authorDocument.fields.picture)
              }
            : null,
        ogImage: await getAssetById(postDoc.fields.ogImage),
        coverImage: await getAssetById(postDoc.fields.coverImage),
        content: await markdownToHtml(postDoc.fields.content ?? '')
    };

    return {
        props: {
            post
        }
    };
};

export async function getStaticPaths() {
    const apiClient = getApiClient();
    const postDocs = await apiClient.getDocuments({ type: 'post', includeEmptyFields: true });
    const paths = postDocs
        .map((post) => {
            if (post.fields.slug) {
                return {
                    params: {
                        slug: post.fields.slug
                    }
                };
            }
        })
        .filter(Boolean);

    return {
        paths,
        fallback: false
    };
}
