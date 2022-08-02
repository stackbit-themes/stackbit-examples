import Markdown from 'markdown-to-jsx';
import { getPageFromSlug, getPagePaths } from '../utils/content.js';

export function getStaticPaths() {
  return { paths: getPagePaths(), fallback: false };
}

export function getStaticProps({ params }) {
  const slug = '/' + (params?.slug ?? ['']).join('/');
  const page = getPageFromSlug(slug);
  return { props: { page } };
}

export default function ComposablePage({ page }) {
  return (
    <div>
      <h1>{page.title}</h1>
      <Markdown>{page.body}</Markdown>
    </div>
  );
}
