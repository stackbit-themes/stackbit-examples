import { Badge as BadgeProps } from '@/types';

export const Badge: React.FC<BadgeProps> = (props) => {
    return (
        <span
            className="inline-block border leading-none px-2 py-[.125rem] rounded-full text-sm text-indigo-800 bg-indigo-100 border-indigo-200 dark:bg-indigo-700 dark:text-slate-100 dark:border-indigo-500"
            data-sb-object-id={props._id}
        >
            <span data-sb-field-path="title">{props.title}</span>
        </span>
    );
};
