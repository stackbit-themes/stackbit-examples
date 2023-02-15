import { Image as ImageProps } from '@/types';
import NextImage from 'next/image';

export const Image: React.FC<ImageProps> = (props) => {
    let src = props.image.file.url;
    if (src.startsWith('//')) src = `https:${src}`;

    return (
        <div className="my-8 section" data-sb-object-id={props._id}>
            <NextImage
                src={src}
                alt={props.title}
                width={props.image.file.details.image?.width}
                height={props.image.file.details.image?.height}
                className="overflow-hidden rounded-md"
                data-sb-field-path="image"
            />
            {props.showCaption && props.image.description && (
                <span className="block max-w-md mx-auto mt-2 text-xs text-center text-slate-500 dark:text-slate-300">{props.image.description}</span>
            )}
        </div>
    );
};
