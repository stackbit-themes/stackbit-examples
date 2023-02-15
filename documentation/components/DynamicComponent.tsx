import { ComposableSection, SectionType } from '@/types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const componentsMap: { [P in ComposableSection as P['_type']]: ComponentType<P> } = {
    callout: dynamic(() => import('./Callout').then((mod) => mod.Callout)),
    cardGrid: dynamic(() => import('./CardGrid').then((mod) => mod.CardGrid)),
    codeBlock: dynamic(() => import('./CodeBlock').then((mod) => mod.CodeBlock)),
    heading: dynamic(() => import('./Heading').then((mod) => mod.Heading)),
    hero: dynamic(() => import('./Hero').then((mod) => mod.Hero)),
    image: dynamic(() => import('./Image').then((mod) => mod.Image)),
    list: dynamic(() => import('./List').then((mod) => mod.List)),
    paragraph: dynamic(() => import('./Paragraph').then((mod) => mod.Paragraph))
};

export const DynamicComponent: React.FC<ComposableSection> = (props) => {
    if (!props._type) {
        throw new Error(`Object does not have the '_type' property required to select a component: ${JSON.stringify(props, null, 2)}`);
    }
    const Component = componentsMap[props._type] as ComponentType<ComposableSection>;
    if (!Component) {
        throw new Error(
            `No component match object with type: '${props._type}'\nMake sure DynamicComponent.tsx file has an entry for '${props._type}' in 'componentsMap'`
        );
    }
    return <Component {...props} />;
};
