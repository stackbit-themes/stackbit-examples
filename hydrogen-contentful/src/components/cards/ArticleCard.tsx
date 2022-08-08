import {Image, Link} from '@shopify/hydrogen';
import {Article} from '~/models/Article';

export function ArticleCard({
  blogHandle,
  article,
  loading,
}: {
  blogHandle: string;
  article: Article;
  loading?: HTMLImageElement['loading'];
}) {
  return (
    <li key={article.id}>
      <Link
        to={`/${blogHandle}/${article.slug}`}
        data-sb-object-id={article.id}
      >
        {article.image && (
          <div className="card-image aspect-[3/2]">
            <Image
              alt={article.title}
              className="object-cover w-full"
              data={article.image}
              height={400}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
              width={600}
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
              data-sb-field-path=".image"
            />
          </div>
        )}
        <h2 className="mt-4 font-medium" data-sb-field-path=".title">
          {article.title}
        </h2>
        <span className="block mt-1" data-sb-field-path=".date">
          {article.date}
        </span>
      </Link>
    </li>
  );
}
