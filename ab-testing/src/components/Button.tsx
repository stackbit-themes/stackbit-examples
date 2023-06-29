import { Component } from '@/components/component-types';
import { ArrowRightIcon } from '@/components/Icon';
import { Testable } from '@/components/Testable';
import { Button as ButtonType } from '@/content/content-types';
import { objectIdAnnotation } from '@/utils/annotations';
import classnames from 'classnames';
import Link from 'next/link';

const buttonThemeClassMap: Record<ButtonType['theme'], string> = {
    default: 'bg-fuchsia-700 text-white px-4 py-3 rounded-md hover:bg-fuchsia-800',
    link: 'text-fuchsia-700 hover:text-fuchsia-800'
};

export function buttonThemeClasses(theme: ButtonType['theme']) {
    return classnames(
        buttonThemeClassMap[theme],
        'inline-flex',
        'items-center',
        'space-x-2',
        'inline-block',
        'transition-colors',
        'duration-500',
        'ease-in-out',
        'font-medium',
        'leading-none'
    );
}

export const Button: Component<ButtonType> = (props) => {
    return (
        <Link href={props.url} className={buttonThemeClasses(props.theme)} {...objectIdAnnotation(props.id)}>
            <Testable id={props.id} field="label" tests={props.tests} tagName="span">
                {props.label}
            </Testable>
            {props.showArrow && (
                <span className="block w-4 h-4">
                    <ArrowRightIcon />
                </span>
            )}
        </Link>
    );
};
