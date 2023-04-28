import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

import { Button } from './.stackbit/models/Button';
import { Card } from './.stackbit/models/Card';
import { Page } from './.stackbit/models/Page';
import { CardGridSection } from './.stackbit/models/CardGridSection';
import { FooterConfig } from './.stackbit/models/FooterConfig';
import { HeroSection } from './.stackbit/models/HeroSection';
import { SiteConfig } from './.stackbit/models/SiteConfig';

declare var __dirname: string;

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['content'],
            models: [Button, Card, Page, CardGridSection, FooterConfig, HeroSection, SiteConfig],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ],
    assetSources: [
        {
            name: 'unsplash-asset-source',
            type: 'iframe',
            url: 'https://unsplash-asset-source.netlify.app',
            // transform the value received from iframe if needed
            transform: ({ assetData }) => {
                // console.log('transforming asset data');

                // console.log({ assetData });
                return assetData.unsplashImageUrl;
            },
            // return an object with 'title' and 'image' extracted from
            // the assetData (after any transformations)
            preview: ({ assetData }: { assetData: string }) => {
                // console.log('build preview');
                // console.log({ assetData });

                // if (typeof assetData === 'string') {
                //     assetData = { unsplashImageUrl: assetData } as { unsplashImageUrl: string };
                // }
                return {
                    title: '[ASSET TITLE]',
                    image: assetData
                };
            }
        }
    ]
});
