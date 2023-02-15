import { Button as ButtonProps } from '@/types';
import Link from 'next/link';
import { Icon } from './Icon';

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <Link
            href={props.href}
            className="inline-flex items-center space-x-3 text-lg text-indigo-500 transition-all duration-300 dark:text-indigo-300 dark:hover:opacity-70 hover:text-indigo-700"
            data-sb-object-id={props._id}
        >
            <span data-sb-field-path="title">{props.title}</span>
            {props.showArrow && (
                <span className="block w-4">
                    <Icon.ArrowRight />
                </span>
            )}
        </Link>
    );
};
