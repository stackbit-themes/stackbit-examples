import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { Button } from './Button';
import { annotations, toFieldPath } from '../utils/annotations';

export const HeroSection = (props) => {
    return (
        <div className="hero outer" {...annotations(props)}>
            <div className="hero-container inner">
                {props.heading && (
                    <h1 className="hero-heading" {...toFieldPath('heading', props)}>
                        {props.heading}
                    </h1>
                )}
                {props.subheading && (
                    <Markdown className="hero-subheading" {...toFieldPath('subheading', props)}>
                        {props.subheading}
                    </Markdown>
                )}
                {props.buttons?.length > 0 && (
                    <div className="hero-buttons">
                        {props.buttons.map((button, idx) => (
                            <Button {...button} key={idx} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
