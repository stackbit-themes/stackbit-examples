import {fetchSync, CacheNone} from '@shopify/hydrogen';
import {CachingStrategy} from '@shopify/hydrogen/types';

export const useContentfulQuery = ({
  query,
  variables,
  cache = CacheNone(),
}: {
  query: string;
  variables: any;
  cache?: CachingStrategy;
}) => {
  const SPACE_ID = Oxygen.env.CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = Oxygen.env.CONTENTFUL_PREVIEW_TOKEN;
  const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

  const response = fetchSync(CONTENTFUL_URL, {
    cache,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
};
