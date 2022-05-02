import * as React from 'react';
import classNames from 'classnames';
import Typist from 'react-typist';
import hash from 'object-hash';
import { TerminalWindow } from './TerminalWindow';

// Convert a single item in the content's elements list field (see models) into one or more React components.
function makeElements(elem, i) {
    let children = [];
    if (elem.delayBefore)
        children.push(
            <Typist.Delay key={`delaybefore-${i}`} ms={elem.delayBefore} />
        );

    if (elem.type === 'TypistTextElement') {
        children.push(
            <span key={i}>
                {elem.text}
                {elem.lineBreak ? <br /> : ''}
            </span>
        );
    } else if (elem.type === 'TypistBackspaceElement') {
        children.push(<Typist.Backspace key={i} count={elem.count} />);
    } else {
        throw new Error(`Unknown element: ${elem}`);
    }
    return children;
}

function getDataAttrs(props) {
    return Object.entries(props).reduce((dataAttrs, [key, value]) => {
        if (key.startsWith('data-')) {
            dataAttrs[key] = value;
        }
        return dataAttrs;
    }, {});
}

export default function TypistSection(props) {
    // Note: react-typist doesn't re-run once the animation has finished, even on changes to children.
    // To have React trigger it, the key is based on the elements hash.
    // See: https://github.com/jstejada/react-typist/issues/6#issuecomment-458473948
    let component = null;
    if (props.elements)
        component = (
            <Typist key={hash(props.elements)}>
                <span>
                    {props.elements.flatMap((elem, i) => makeElements(elem, i))}
                </span>
            </Typist>
        );
    if (props.fixedHeight && props.fixedHeight.startsWith('h-'))
        component = <div className={props.fixedHeight}>{component}</div>;
    if (props.terminalWindow)
        component = <TerminalWindow>{component}</TerminalWindow>;

    const sectionStyles = props.styles?.self || {};
    const colors = props.colors || 'colors-a';
    return (
        <div
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-typist-section',
                colors,
                sectionStyles.margin,
                sectionStyles.padding
            )}
        >
            {component}
        </div>
    );
}
