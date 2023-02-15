import { Hero as HeroProps } from '@/types';
import NextImage from 'next/image';
import { Badge } from './Badge';
import { Button } from './Button';

export const Hero: React.FC<HeroProps> = (props) => {
    let imageSrc = props.image.file.url;
    if (imageSrc.startsWith('//')) imageSrc = `https:${imageSrc}`;

    return (
        <div className="mt-12 mb-20" data-sb-object-id={props._id}>
            <div className="flex space-x-12">
                <div>
                    {props.badge && (
                        <span className="block mb-3">
                            <Badge {...props.badge} />
                        </span>
                    )}
                    <h2 className="mb-4" data-sb-field-path="title">
                        {props.title}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: props.body }} className="mb-4" data-sb-field-path="body" />
                    <Button {...props.button} />
                </div>
                <div className="flex-shrink-0 max-w-sm">
                    <NextImage
                        src={imageSrc}
                        alt={props.title}
                        width={props.image.file.details.image?.width}
                        height={props.image.file.details.image?.height}
                        className="overflow-hidden rounded-md"
                        data-sb-field-path="image"
                    />
                </div>
            </div>
        </div>
    );
};
