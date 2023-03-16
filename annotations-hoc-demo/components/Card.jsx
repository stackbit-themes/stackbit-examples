import * as React from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { annotations, toFieldPath } from '../utils/annotations.js';

export const Card = (props) => {
    return (
        <Link href={props.url ?? '/'} className="card" {...annotations(props)}>
            {props.heading && (
                <h3 className="card-heading" {...toFieldPath('heading', props)}>
                    {props.heading}
                </h3>
            )}
            {props.subheading && (
                <Markdown className="card-subheading" {...toFieldPath('subheading', props)}>
                    {props.subheading}
                </Markdown>
            )}
        </Link>
    );
};
