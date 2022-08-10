import HeroBanner from "./HeroBanner";
import CtaSection from "./CtaSection";
import Button from "./Button";
import Card from "./Card";
import CardsSection from "./CardsSection";
import withPersonalization from "./withPersonalization";

const components = {
  HeroBanner: HeroBanner,
  CtaSection: CtaSection,
  Button: Button,
  Card: Card,
  CardsSection: CardsSection
};

const personalizedComponents = ["HeroBanner", "CtaSection"];

export function getComponent(type) {
  const component = components[type];
  return personalizedComponents.includes(type)
    ? withPersonalization(component)
    : component;
}
