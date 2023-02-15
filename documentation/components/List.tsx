import { List as ListProps } from '@/types';
import { Paragraph } from './Paragraph';

const listTagMap: {
    [K in ListProps['listType']]: { tagName: React.ElementType; className: string };
} = {
    ordered: { tagName: 'ol', className: 'list-decimal' },
    unordered: { tagName: 'ul', className: 'list-disc' }
};

export const List: React.FC<ListProps> = (props) => {
    const TagName = listTagMap[props.listType].tagName;

    return (
        <TagName className={`section ml-6 marker:text-slate-400 ${listTagMap[props.listType].className}`} data-sb-object-id={props._id}>
            {props.items.map((item, index) => (
                <li key={index} className="mb-1 last:mb-0" data-sb-object-id={item._id}>
                    <span dangerouslySetInnerHTML={{ __html: item.body }} data-sb-field-path="body" />
                </li>
            ))}
        </TagName>
    );
};
