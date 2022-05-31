import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';

import { Button } from './Button';
import { IHeroSection } from '../types/sourcebit';

export const HeroSection = (props: IHeroSection) => {
    return (
        <div className="hero outer" {...pickDataAttrs(props)}>
            <div className="hero-container inner">
                {props.subheading && (
                    <h1 className="hero-heading" {...toFieldPath('.heading')}>
                        {props.heading}
                    </h1>
                )}
                {props.subheading && (
                    <Markdown className="hero-subheading" {...toFieldPath('.subheading')}>
                        {props.subheading}
                    </Markdown>
                )}
                {props.buttons?.length > 0 && (
                    <div className="hero-buttons" {...toFieldPath('.buttons')}>
                        {props.buttons.map((button, idx) => (
                            <Button {...button} key={idx} {...toFieldPath(`.${idx}`)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
