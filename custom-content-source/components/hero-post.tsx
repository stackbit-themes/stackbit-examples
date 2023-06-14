import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';
import type Post from '../interfaces/post';
import { postUrlPath } from '../utils/common';

type Props = {
    post: Post;
};

const HeroPost = ({ post: { id, title, coverImage, date, excerpt, author, slug } }: Props) => {
    return (
        <section data-sb-object-id={id}>
            {coverImage && (
                <div className="mb-8 md:mb-16">
                    <CoverImage title={title} asset={coverImage} slug={slug} />
                </div>
            )}
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                        <Link as={postUrlPath(slug)} href="/posts/[slug]" className="hover:underline" data-sb-field-path=".title">
                            {title}
                        </Link>
                    </h3>
                    {date && (
                        <div className="mb-4 md:mb-0 text-lg">
                            <DateFormatter dateString={date} />
                        </div>
                    )}
                </div>
                {(excerpt || author) && (
                    <div>
                        {excerpt && (
                            <p className="text-lg leading-relaxed mb-4" data-sb-field-path=".excerpt">
                                {excerpt}
                            </p>
                        )}
                        {author && <Avatar author={author} />}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroPost;
