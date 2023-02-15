import { Card as CardProps } from '@/types';
import Link from 'next/link';

export const Card: React.FC<CardProps> = (props) => {
    return (
        <Link
            className="block p-5 transition-all duration-300 border rounded-md border-slate-200 dark:border-slate-600 hover:shadow-md dark:shadow-slate-600"
            href={props.href}
            data-sb-object-id={props._id}
        >
            <h3 className="mb-3 text-lg" data-sb-field-path="title">
                {props.title}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: props.body }} className="text-sm" data-sb-field-path="body" />
        </Link>
    );
};
