import React from 'react';
import Markdown from 'markdown-to-jsx';

import { Button } from './Button';

import type { Hero as HeroProps } from '../types/app';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const themeClassMap = {
    imgLeft: 'flex-row-reverse',
    imgRight: ''
};

export const Hero = (props: HeroProps) => {
    const image = props.image ? getImage(props.image) : null;

    return (
        <div className="px-12 py-24 bg-gray-100">
            <div className={`flex mx-auto max-w-6xl gap-12 ${themeClassMap[props.theme] ?? themeClassMap['imgRight']}`}>
                <div className="max-w-xl py-20 mx-auto lg:shrink-0">
                    <h1 className="mb-6 text-5xl leading-tight">{props.heading}</h1>
                    {props.body && (
                        <Markdown options={{ forceBlock: true }} className="mb-6 text-lg">
                            {props.body.body}
                        </Markdown>
                    )}
                    {props.button && <Button {...props.button} />}
                </div>
                <div className="relative hidden w-full overflow-hidden rounded-md lg:block">
                    {image && <GatsbyImage image={image} alt={props.image.title} />}
                </div>
            </div>
        </div>
    );
};
