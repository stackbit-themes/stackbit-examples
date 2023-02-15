import { Heading as HeadingProps } from '@/types';
import { Badge } from './Badge';

const headingTagMap: {
    [K in HeadingProps['level']]: { tagName: React.ElementType; className: string };
} = {
    '1': { tagName: 'h1', className: 'text-3xl mb-3 mt-12' },
    '2': { tagName: 'h2', className: 'mb-3 mt-10' },
    '3': { tagName: 'h3', className: 'mb-1 mt-8' },
    '4': { tagName: 'h4', className: 'mb-1 mt-6' },
    '5': { tagName: 'h5', className: 'mb-1 mt-5' },
    '6': { tagName: 'h6', className: 'mb-1 mt-5' }
};

export const Heading: React.FC<HeadingProps> = (props) => {
    const TagName = headingTagMap[props.level].tagName;
    return (
        <TagName className={`flex items-center space-x-3 ${headingTagMap[props.level].className}`} id={props._id} data-sb-object-id={props._id}>
            <span className="inline-block" data-sb-field-path="body">
                {props.body}
            </span>
            {props.badge?._id && <Badge {...props.badge} />}
        </TagName>
    );
};
