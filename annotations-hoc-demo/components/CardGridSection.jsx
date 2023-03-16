import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { Card } from './Card';
import { annotations, toFieldPath } from '../utils/annotations.js';

export const CardGridSection = (props) => {
    return (
        <div className="card-grid outer" {...annotations(props)}>
            <div className="card-grid-container inner">
                {props.heading && (
                    <h2 className="card-grid-heading" {...toFieldPath('heading', props)}>
                        {props.heading}
                    </h2>
                )}
                {props.subheading && (
                    <Markdown className="card-grid-subheading" {...toFieldPath('subheading', props)}>
                        {props.subheading}
                    </Markdown>
                )}
                {props.cards?.length > 0 && (
                    <div className="card-grid-cards">
                        {props.cards.map((card, idx) => (
                            <Card {...card} key={idx} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
