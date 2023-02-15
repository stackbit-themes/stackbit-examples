import { Paragraph as ParagraphProps } from '@/types';

export const Paragraph: React.FC<ParagraphProps> = (props) => {
    return (
        <div className="section" data-sb-object-id={props._id}>
            <p dangerouslySetInnerHTML={{ __html: props.body }} data-sb-field-path="body" />
        </div>
    );
};
