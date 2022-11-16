import { models } from './.stackbit/models';
import type * as Stackbit from '@stackbit/sdk';

const stackbitConfig: Stackbit.RawConfig = {
  stackbitVersion: '~0.5.0',
  cmsName: 'git',
  ssgName: 'nextjs',
  nodeVersion: '16',
  dataDir: 'content/data',
  pagesDir: 'content/pages',
  models,
  customContentReload: true,
};

export default stackbitConfig;
