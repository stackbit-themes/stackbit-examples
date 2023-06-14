import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import type Asset from '../interfaces/asset';
import { postUrlPath } from '../utils/common';

type Props = {
    title: string;
    asset: Asset;
    slug?: string;
};

const CoverImage = ({ title, asset, slug }: Props) => {
    const image = (
        <Image
            src={asset.url}
            alt={`Cover Image for ${title}`}
            className={cn('shadow-sm w-full', {
                'hover:shadow-lg transition-shadow duration-200': slug
            })}
            width={asset.width}
            height={asset.height}
            data-sb-field-path=".coverImage"
        />
    );
    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link as={postUrlPath(slug)} href="/posts/[slug]" aria-label={title}>
                    {image}
                </Link>
            ) : (
                image
            )}
        </div>
    );
};

export default CoverImage;
