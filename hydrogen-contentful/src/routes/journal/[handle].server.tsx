import {
  useLocalization,
  Seo,
  gql,
  Image,
  CacheShort,
  type HydrogenRouteProps,
  CacheNone,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {useContentfulQuery} from '~/api/useContentfulQuery';

import {CustomFont, Markdown, PageHeader, Section} from '~/components';
import {Layout, NotFound} from '~/components/index.server';
import {ATTR_LOADING_EAGER} from '~/lib/const';
import {Article, ArticleRaw} from '~/models/Article';

const isProd = !import.meta.env.DEV;

export default function Post({params, response}: HydrogenRouteProps) {
  response.cache(isProd ? CacheShort() : CacheNone());
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {handle} = params;

  const {
    data: {
      postLayoutCollection: {items},
    },
  } = useContentfulQuery({
    query: ARTICLE_QUERY,
    variables: {
      locale: 'en-US',
      slug: handle,
    },
  });
  const rawPost = items[0] as ArticleRaw | undefined;

  if (!rawPost) {
    return <NotFound />;
  }

  const {sys, ...cleanPost} = rawPost;
  const {sys: sysAuthor, ...cleanAuthor} = cleanPost.author || {};
  const post = {
    ...cleanPost,
    id: sys.id,
    date: new Intl.DateTimeFormat(`${languageCode}-${countryCode}`, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(cleanPost.date)),
    author: cleanPost.author
      ? {
          ...cleanAuthor,
          id: sysAuthor?.id,
        }
      : undefined,
  } as Article;

  return (
    <Layout>
      <div data-sb-object-id={post.id}>
        {/* Loads Fraunces custom font only on articles */}
        <CustomFont />
        <Suspense>
          <Seo type="page" data={post} />
        </Suspense>
        <PageHeader
          heading={post.title}
          sbFieldPath=".title"
          variant="blogPost"
        >
          <div>
            <span data-sb-field-path=".date">{post.date}</span>
            {post.author && (
              <>
                <span> &middot; </span>
                <span
                  data-sb-object-id={post.author.id}
                  data-sb-field-path=".firstName"
                >
                  {post.author.firstName}
                </span>
              </>
            )}
          </div>
        </PageHeader>
        <Section as="article" padding="x">
          {post.image && (
            <Image
              data-sb-field-path=".image"
              data={post.image}
              className="w-full mx-auto mt-8 md:mt-16 max-w-7xl"
              sizes="90vw"
              widths={[400, 800, 1200]}
              width="100px"
              loading={ATTR_LOADING_EAGER}
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
            />
          )}
          <Markdown className="article" data-sb-field-path=".content">
            {post.content}
          </Markdown>
        </Section>
      </div>
    </Layout>
  );
}

const ARTICLE_QUERY = gql`
  query ($locale: String, $slug: String) {
    postLayoutCollection(locale: $locale, preview: true, where: {slug: $slug}) {
      items {
        title
        slug
        date
        content
        image {
          title
          url
        }
        author {
          firstName
          lastName
          sys {
            id
          }
        }
        sys {
          id
        }
      }
    }
  }
`;
