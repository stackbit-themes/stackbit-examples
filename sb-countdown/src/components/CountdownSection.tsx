import * as React from 'react';
import classNames from 'classnames';

import mapStyles from '../utils/map-styles';
import { getDataAttrs } from '../utils/get-data-attrs';
import countdown from '../utils/countdown';

interface CountdownProps {
    styles?: any;
    elementId?: string;
    customClass?: string;
    colors?: string;
    endDate: string;
    showYears?: boolean;
    showMonths?: boolean;
    yearsText?: string;
    monthsText?: string;
    daysText?: string;
    hoursText?: string;
    minutesText?: string;
    secondsText?: string;
}

interface Timespan {
    years?: number | undefined;
    months?: number | undefined;
    days?: number | undefined;
    hours?: number | undefined;
    minutes?: number | undefined;
    seconds?: number | undefined;
}

function calculateCountdown(now: Date, end: Date, units: number): Timespan {
    const duration = countdown(now, end, units);
    if (typeof duration !== 'number') {
        return {
            years: duration.years,
            months: duration.months,
            days: duration.days,
            hours: duration.hours,
            minutes: duration.minutes,
            seconds: duration.seconds
        };
    } else {
        throw new Error('unexpected response');
    }
}

function buildUnits(props: CountdownProps): number {
    let units = countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS;
    if (props.showYears) {
        units |= countdown.YEARS;
    }
    if (props.showMonths) {
        units |= countdown.MONTHS;
    }
    return units;
}

function Countdown(props: CountdownProps): JSX.Element {
    const [clientSide, setClientSide] = React.useState(false);
    const [time, setTime] = React.useState(new Date());
    React.useEffect(() => {
        setClientSide(true);
        const handle = setInterval(() => {
            setTime(new Date());
        }, 250);
        return () => clearInterval(handle);
    }, []);

    const duration = calculateCountdown(time, new Date(props.endDate), buildUnits(props));

    if (!clientSide) {
        return null;
    }
    const units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] as const;
    return (
        <div className={classNames('flex', 'flex-row', 'place-items-center')}>
            {units.map((unit) => {
                if (typeof duration[unit] === 'undefined') {
                    return null;
                }
                const propName = `${unit}Text` as const;
                const text = props[propName];
                return (
                    <div key={unit} className={classNames('flex', 'flex-col', 'relative', 'w-28')}>
                        <span className={classNames('text-center', 'text-5xl', 'mb-4')}>{duration[unit]}</span>
                        <span className={classNames('text-center', 'text-xl')} data-sb-field-path={`.${propName}`}>
                            {text}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default function CountdownSection(props: CountdownProps) {
    const cssId = props.elementId || null;
    const cssCustomClass = props.customClass || null;
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const sectionWidth = sectionStyles.width || 'wide';
    const sectionHeight = sectionStyles.height || 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent || 'center';
    const sectionFlexDirection = sectionStyles.flexDirection || 'row';
    const sectionAlignItems = sectionStyles.alignItems || 'center';
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames('sb-component', 'sb-component-section', 'sb-component-cta-section', cssCustomClass, sectionStyles.margin)}
        >
            <div
                className={classNames(
                    colors,
                    'flex',
                    'flex-col',
                    'justify-center',
                    'relative',
                    mapMinHeightStyles(sectionHeight),
                    sectionStyles.padding || 'py-12 px-4',
                    sectionStyles.borderColor,
                    sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none',
                    sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                    sectionStyles.boxShadow ? mapStyles({ boxShadow: sectionStyles.boxShadow }) : null
                )}
                style={{
                    borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null
                }}
            >
                <div className={classNames('relative', 'w-full', 'flex', mapStyles({ justifyContent: sectionJustifyContent }))}>
                    <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
                        <div
                            className={classNames(
                                'flex',
                                mapFlexDirectionStyles(sectionFlexDirection),
                                mapStyles({ alignItems: sectionAlignItems }),
                                'space-y-8',
                                {
                                    'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row'
                                }
                            )}
                        >
                            <Countdown {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapMinHeightStyles(height: string) {
    switch (height) {
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width: string) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}

function mapFlexDirectionStyles(flexDirection: string) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row', 'lg:justify-between'];
        case 'col':
            return ['flex-col'];
    }
    return null;
}
