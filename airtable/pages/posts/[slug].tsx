import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { GetStaticProps } from 'next';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';
import type PostType from '../../interfaces/post';
import { AuthorRecordFields, getAirtableClient, PostRecordFields, StatefulRecord } from '../../lib/airtable-client';
import { getLinkedAsset, getLinkedRecord } from '../../lib/utils';

type Props = {
    post?: PostType;
    morePosts?: PostType[];
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

const airtableClient = getAirtableClient();
const preview = process.env.NODE_ENV === 'development';

type Params = {
    slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const postRecords = await airtableClient.getStatefulRecordsForTable<PostRecordFields>({
        preview,
        tableId: 'Posts',
        filter: {
            Slug: params?.slug
        },
        fields: ['Title', 'Date', 'Slug', 'Author', 'Content', 'OGImage', 'CoverImage']
    });
    const postRecord = postRecords[0] as StatefulRecord<PostRecordFields>;
    if (!postRecord) {
        return { props: {} };
    }
    const authorRecord = await getLinkedRecord<AuthorRecordFields>({
        tableName: 'Authors',
        field: postRecord.fields.Author,
        airtableClient,
        preview
    });
    const author = authorRecord
        ? {
              id: authorRecord.id,
              name: authorRecord.fields.Name,
              picture: await getLinkedAsset(authorRecord.fields.Picture, airtableClient)
          }
        : null;

    const post: PostType = {
        id: postRecord.id,
        title: postRecord.fields.Title,
        date: postRecord.fields.Date,
        slug: postRecord.fields.Slug,
        author: author,
        ogImage: await getLinkedAsset(postRecord.fields['OGImage'], airtableClient),
        coverImage: await getLinkedAsset(postRecord.fields['CoverImage'], airtableClient),
        content: await markdownToHtml(postRecord.fields.Content ?? '')
    };

    return {
        props: {
            post
        }
    };
};

export async function getStaticPaths() {
    const postRecords = await airtableClient.getStatefulRecordsForTable<PostRecordFields>({
        tableId: 'Posts',
        fields: ['Slug'],
        preview
    });

    return {
        paths: postRecords.map((post) => {
            return {
                params: {
                    slug: post.fields.Slug
                }
            };
        }),
        fallback: false
    };
}
