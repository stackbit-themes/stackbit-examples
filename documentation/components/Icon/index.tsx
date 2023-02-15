import { PropsWithChildren } from 'react';
import { ArrowRight } from './ArrowRight';
import { GitHub } from './GitHub';
import { Heart } from './Heart';
import { Info } from './Info';
import { Moon } from './Moon';
import { Sun } from './Sun';

export const IconWrapper: React.FC<PropsWithChildren> = (props) => {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {props.children}
        </svg>
    );
};

export const Icon = {
    ArrowRight,
    GitHub,
    Heart,
    Info,
    Moon,
    Sun
};
