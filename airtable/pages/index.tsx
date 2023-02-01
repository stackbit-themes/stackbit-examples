import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import Head from 'next/head';
import { CMS_NAME } from '../lib/constants';
import Post from '../interfaces/post';
import { getAirtableClient, PostRecordFields, AuthorRecordFields } from '../lib/airtable-client';
import { getLinkedAsset, getLinkedRecord } from '../lib/utils';

type Props = {
    allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);
    const title = `Next.js Blog Example with ${CMS_NAME}`;
    return (
        <>
            <Layout>
                <Head>
                    <title>{title}</title>
                </Head>
                <Container>
                    <Intro />
                    {heroPost && <HeroPost post={heroPost} />}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </Container>
            </Layout>
        </>
    );
}

const airtableClient = getAirtableClient();
const preview = process.env.NODE_ENV === 'development';

export const getStaticProps = async () => {
    const postRecords = await airtableClient.getStatefulRecordsForTable<PostRecordFields>({
        preview,
        tableId: 'Posts',
        sort: [{ field: 'Date', direction: 'desc' }],
        fields: ['Title', 'Date', 'Slug', 'Author', 'CoverImage', 'Excerpt']
    });
    const allPosts: Post[] = [];
    for (const postRecord of postRecords) {
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

        allPosts.push({
            id: postRecord.id,
            title: postRecord.fields.Title,
            date: postRecord.fields.Date,
            slug: postRecord.fields.Slug,
            author: author,
            coverImage: await getLinkedAsset(postRecord.fields['CoverImage'], airtableClient),
            excerpt: postRecord.fields.Excerpt
        });
    }

    return {
        props: { allPosts }
    };
};
