import { Button } from './Button';
import { Card } from './Card';
import { CardGridSection } from './CardGridSection';
import { FooterConfig } from './FooterConfig';
import { HeroSection } from './HeroSection';
import { Page } from './Page';
import { SiteConfig } from './SiteConfig';

export const modelConfig = {
  Button,
  Card,
  CardGridSection,
  FooterConfig,
  HeroSection,
  Page,
  SiteConfig,
};

export const models = Object.fromEntries(
  Object.entries(modelConfig).map(([key, value]) => [key, value]),
);
