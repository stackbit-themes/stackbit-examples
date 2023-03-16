import * as React from 'react';
import Link from 'next/link';
import { annotations, toFieldPath } from '../utils/annotations';

export const Button = (props) => {
    return (
        <Link href={props.url ?? '/'} className={`button theme-${props.theme}`} {...annotations(props)}>
            <span {...toFieldPath('label', props)}>{props.label}</span>
        </Link>
    );
};
