import dynamic from 'next/dynamic';
import { Metadata } from '../types/sourcebit';

const componentsMap = {
    // sections
    CardGridSection: dynamic(() => namedComponent(import('./CardGridSection'), 'CardGridSection')),
    HeroSection: dynamic(() => namedComponent(import('./HeroSection'), 'HeroSection'))
};

export const DynamicComponent = (props: Metadata) => {
    const Component = componentsMap[props.__metadata.modelName];
    if (!Component) {
        throw new Error(
            `No component match object with type: '${props.__metadata.modelName}'\nMake sure DynamicComponent.tsx file has an entry for '${props.__metadata.modelName}' in 'componentsMap'`
        );
    }
    return <Component {...props} />;
};

const namedComponent = async (modPromise, exportName) => {
    const mod = await modPromise;
    return mod[exportName];
};
