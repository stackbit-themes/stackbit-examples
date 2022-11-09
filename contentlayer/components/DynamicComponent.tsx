import { HeroSection } from './HeroSection';
import { CardGridSection } from './CardGridSection';
import * as types from 'contentlayer/generated';

const componentsMap = {
  HeroSection: HeroSection,
  CardGridSection: CardGridSection,
};

export const DynamicComponent: React.FC<
  types.HeroSection | types.CardGridSection
> = (props) => {
  if (!props.type) {
    const propsOutput = JSON.stringify(props, null, 2);
    throw new Error(`Object does not have a 'type' property: ${propsOutput}`);
  }

  switch (props.type) {
    case 'CardGridSection':
      return <CardGridSection {...props} />;
    case 'HeroSection':
      return <HeroSection {...props} />;
    default:
      throw new Error(`No component is registered for type:'${props}`);
  }
};
