import {
  CacheShort,
  gql,
  type HydrogenRouteProps,
  Seo,
  useLocalization,
  CacheNone,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {useContentfulQuery} from '~/api/useContentfulQuery';

import {ArticleCard, Grid, PageHeader} from '~/components';
import {Layout} from '~/components/index.server';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {Article, ArticleRaw} from '~/models/Article';

const BLOG_HANDLE = 'Journal';

const isProd = !import.meta.env.DEV;

export default function Blog({
  pageBy = PAGINATION_SIZE,
  response,
}: HydrogenRouteProps) {
  response.cache(isProd ? CacheShort() : CacheNone());

  return (
    <Layout>
      <Seo type="page" data={{title: 'All Journals'}} />
      <PageHeader heading={BLOG_HANDLE} className="gap-0">
        <Suspense>
          <JournalsGrid pageBy={pageBy} />
        </Suspense>
      </PageHeader>
    </Layout>
  );
}

function JournalsGrid({pageBy}: {pageBy: number}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {
      postLayoutCollection: {items: posts},
    },
  } = useContentfulQuery({
    query: BLOG_QUERY,
    variables: {
      limit: pageBy,
      locale: 'en-US',
    },
  });

  const articles = posts.map((post: ArticleRaw) => {
    const {date} = post;
    const {sys, ...cleanPost} = post;

    return {
      ...cleanPost,
      id: sys.id,
      date: new Intl.DateTimeFormat(`${languageCode}-${countryCode}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date)),
    };
  }) as Article[];

  if (articles.length === 0) {
    return <p>No articles found</p>;
  }

  return (
    <Grid as="ol" layout="blog" gap="blog">
      {articles.map((article, i) => {
        return (
          <ArticleCard
            blogHandle={BLOG_HANDLE.toLowerCase()}
            article={article}
            key={article.id}
            loading={getImageLoadingPriority(i, 2)}
          />
        );
      })}
    </Grid>
  );
}

const BLOG_QUERY = gql`
  query ($limit: Int, $locale: String) {
    postLayoutCollection(limit: $limit, locale: $locale, preview: true) {
      items {
        title
        slug
        date
        image {
          url
          title
        }
        sys {
          id
        }
      }
    }
  }
`;
