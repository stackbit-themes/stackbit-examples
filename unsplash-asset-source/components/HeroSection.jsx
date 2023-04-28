import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { Button } from './Button';
import Image from 'next/image.js';

export const HeroSection = (props) => {
    return (
        <div className="hero outer" data-sb-field-path={props['data-sb-field-path']}>
            <div className={`hero-container inner ${props.image ? 'with-image' : ''}`}>
                {props.image && (
                    <div className="hero-image-container">
                        <Image src={props.image} alt={props.image} fill data-sb-field-path=".image" />
                    </div>
                )}
                <div>
                    {props.heading && (
                        <h1 className="hero-heading" data-sb-field-path=".heading">
                            {props.heading}
                        </h1>
                    )}
                    {props.subheading && (
                        <Markdown className="hero-subheading" data-sb-field-path=".subheading">
                            {props.subheading}
                        </Markdown>
                    )}
                    {props.buttons?.length > 0 && (
                        <div className="hero-buttons" data-sb-field-path=".buttons">
                            {props.buttons.map((button, idx) => (
                                <Button {...button} key={idx} data-sb-field-path={`.${idx}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
