import { Hero } from './Hero';
import { Stats } from './Stats';

// Map components which are dynamically resolved by content type in the CMS
export const componentMap = {
  hero: Hero,
  stats: Stats,
};
