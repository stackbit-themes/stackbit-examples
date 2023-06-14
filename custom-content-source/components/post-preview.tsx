import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';
import Post from '../interfaces/post';
import { postUrlPath } from '../utils/common';

type Props = {
    post: Post;
};

const PostPreview = ({ post: { id, title, coverImage, date, excerpt, author, slug } }: Props) => {
    return (
        <div data-sb-object-id={id}>
            {coverImage && (
                <div className="mb-5">
                    <CoverImage slug={slug} title={title} asset={coverImage} />
                </div>
            )}
            <h3 className="text-3xl mb-3 leading-snug">
                <Link data-sb-field-path=".title" as={postUrlPath(slug)} href="/posts/[slug]" className="hover:underline">
                    {title}
                </Link>
            </h3>
            {date && (
                <div className="text-lg mb-4">
                    <DateFormatter dateString={date} />
                </div>
            )}
            {excerpt && (
                <p className="text-lg leading-relaxed mb-4" data-sb-field-path="excerpt">
                    {excerpt}
                </p>
            )}
            {author && <Avatar author={author} />}
        </div>
    );
};

export default PostPreview;
