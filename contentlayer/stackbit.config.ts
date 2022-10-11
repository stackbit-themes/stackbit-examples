import type * as Stackbit from '@stackbit/sdk';

// stackbitVersion: ~0.5.0
// cmsName: git
// ssgName: nextjs
// nodeVersion: "16"
// dataDir: content/data
// pagesDir: content/pages
// pageLayoutKey: type
// assets:
//   referenceType: static
//   staticDir: public
//   uploadDir: images
//   publicPath: /
// contentModels:
//   Page:
//     isPage: true
//     urlPath: "/{slug}"
//     newFilePath: "{slug}.md"

const Button: Stackbit.YamlObjectModel = {
  type: 'object',
  labelField: 'label',
  fields: [
    { type: 'string', name: 'label', default: 'Click Me', required: true },
    { type: 'string', name: 'url', label: 'URL', default: '/', required: true },
    {
      type: 'enum',
      name: 'theme',
      controlType: 'button-group',
      label: 'Color Scheme',
      default: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
  ],
};

const Card: Stackbit.YamlObjectModel = {
  type: 'object',
  labelField: 'heading',
  fields: [
    { type: 'string', name: 'heading', default: 'Card Heading' },
    {
      type: 'markdown',
      name: 'subheading',
      default: 'Card description goes here ...',
    },
    { type: 'string', name: 'url', label: 'URL', default: '/' },
  ],
};

const CardGridSection: Stackbit.YamlObjectModel = {
  type: 'object',
  label: 'Card Grid',
  labelField: 'heading',
  groups: ['SectionComponents'],
  fields: [
    { type: 'string', name: 'heading', default: 'Card Grid Heading' },
    { type: 'markdown', name: 'subheading', default: 'Card Grid Subheading' },
    {
      type: 'list',
      name: 'cards',
      items: {
        type: 'model',
        models: ['Card'],
      },
    },
  ],
};

const HeroSection: Stackbit.YamlObjectModel = {
  type: 'object',
  label: 'Hero',
  labelField: 'heading',
  groups: ['SectionComponents'],
  fields: [
    { type: 'string', name: 'heading', default: 'Hero Heading' },
    { type: 'markdown', name: 'subheading', default: 'Hero Subheading' },
    {
      type: 'list',
      name: 'buttons',
      items: {
        type: 'model',
        models: ['Button'],
      },
    },
  ],
};

const Page: Stackbit.YamlPageModel = {
  type: 'page',
  hideContent: true,
  urlPath: '/{slug}',
  fields: [
    {
      type: 'string',
      name: 'title',
      default: 'This is a new page',
      required: true,
    },
    {
      type: 'list',
      name: 'sections',
      items: { type: 'model', groups: ['SectionComponents'] },
    },
  ],
};

const FooterConfig: Stackbit.YamlObjectModel = {
  type: 'object',
  label: 'Footer Config',
  labelField: 'body',
  fields: [{ type: 'markdown', name: 'body', label: 'Footer Text' }],
};

const SiteConfig: Stackbit.YamlDataModel = {
  type: 'data',
  label: 'Site Config',
  singleInstance: true,
  fields: [
    { type: 'string', name: 'title', label: 'Site Title' },
    {
      type: 'model',
      name: 'footer',
      label: 'Footer Config',
      models: ['FooterConfig'],
    },
  ],
};

const stackbitConfig: Stackbit.RawConfig = {
  stackbitVersion: '~0.5.0',
  cmsName: 'git',
  ssgName: 'nextjs',
  nodeVersion: '16',
  // pageLayoutKey: 'type',
  dataDir: 'content/data',
  pagesDir: 'content/pages',
  models: {
    Button,
    Card,
    CardGridSection,
    FooterConfig,
    HeroSection,
    Page,
    SiteConfig,
  },
};

export default stackbitConfig;
