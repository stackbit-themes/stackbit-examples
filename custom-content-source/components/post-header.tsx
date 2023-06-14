import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import PostTitle from './post-title';
import type Author from '../interfaces/author';
import type Asset from '../interfaces/asset';

type Props = {
    title: string;
    coverImage?: Asset | null;
    date?: string;
    author?: Author | null;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            {author && (
                <div className="hidden md:block md:mb-12">
                    <Avatar author={author} />
                </div>
            )}
            {coverImage && (
                <div className="mb-8 md:mb-16 sm:mx-0">
                    <CoverImage title={title} asset={coverImage} />
                </div>
            )}
            {(author || date) && (
                <div className="max-w-2xl mx-auto">
                    {author && (
                        <div className="block md:hidden mb-6">
                            <Avatar author={author} />
                        </div>
                    )}
                    {date && (
                        <div className="mb-6 text-lg">
                            <DateFormatter dateString={date} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default PostHeader;
