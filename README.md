# Stackbit Examples

A collection of examples that can be used to learn more about Stackbit or to be the basis for your new Stackbit project.

They are broken down into various categories below for easier navigation:

- [Minimal Starters](#minimal-starters): Small, Stackbit-ready sites.
- [Tutorials](#tutorials): Starting point for [getting started tutorials](https://docs.stackbit.com/getting-started).
- [Stack-Specific Demos](#stack-specific-demos): Simple sites, equipped for Stackbit, using various frameworks and content sources, many of which are experimental.
- [Stackbit Features](#stackbit-features): Simple projects designed to highlight a specific Stackbit feature.
- [Use Cases](#use-cases): Projects designed to serve a specific purpose (e.g. documentation).
- [Integrations](#integrations): Examples using various third-party tools within a specific stack.

Have an idea of an example we should add? [Create an issue](https://github.com/stackbit-themes/stackbit-examples/issues/new) or [join us on Discord](https://discord.gg/HUNhjVkznH) to discuss.

## Minimal Starters

Starters are basic Stackbit projects that bring some specific combination of _the basics_. These are good starting points for developers and easy to get around.

| Example                                                                             | Description                                                 |
| :---------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| [`nextjs-starter`](https://github.com/stackbit-themes/nextjs-starter)               | The essential JavaScript building blocks.                   |
| [`ts-mui-nextjs-starter`](https://github.com/stackbit-themes/ts-mui-nextjs-starter) | TypeScript + MUI components.                                |
| [`contentful-starter`](https://github.com/stackbit-themes/contentful-starter)       | Minimal Next.js site with Contentful as the content source. |

## Tutorials

Examples used as starting points for tutorials and other guides in our documentation.

| Example                                                                                                           | Description                                                                                              |
| :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| [Gatsby + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/tutorial-gatsby-contentful)  | Follow the [Gatsby + Contentful tutorial](https://docs.stackbit.com/getting-started/gatsby-contentful).  |
| [HTML + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/tutorial-html-contentful)      | Follow the [HTML + Contentful tutorial](https://docs.stackbit.com/getting-started/html-contentful).      |
| [HTML + JSON](https://github.com/stackbit-themes/stackbit-examples/tree/main/tutorial-html-contentful)            | Follow the [HTML + JSON tutorial](https://docs.stackbit.com/getting-started/html-json).                  |
| [Next.js + Markdown](https://github.com/stackbit-themes/stackbit-examples/tree/main/tutorial-nextjs-files)        | Follow the [Next.js + Markdown tutorial](https://docs.stackbit.com/getting-started/nextjs-markdown).     |
| [Next.js + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/tutorial-nextjs-contentful) | Follow the [Next.js + Contentful tutorial](https://docs.stackbit.com/getting-started/nextjs-contentful). |

## Stack-Specific Demos

These projects are the result of [the tutorials](#tutorials) that are also fully-annotated to provide inline editing capabilities.

| Example                                                                                                                | Description                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Angular + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/angular-contentful)              | Basic Angular and Contentful-based product catalog site.                                                                                                   |
| [Gatsby + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/gatsby-contentful)                | Basic Gatsby site a composable page and a few components, using Contentful as the content source.                                                          |
| [Hydrogen + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/hydrogen-contentful-demo-store) | Built on Shopify's Hydrogen framework & Contentful for editorial content                                                                                   |
| [Next.js + Airtable](https://github.com/stackbit-themes/stackbit-examples/tree/main/airtable-content-source)           | Use Airtable as a content source, built on the Next.js blog example. **Note that the Airtable source is just a demo and is not yet officially supported.** |
| [Nuxt 3 (Preview) + Git CMS](https://github.com/stackbit-themes/stackbit-examples/tree/main/nuxt3-preview)             | A working example with an early version of Nuxt 3, using local files as the content source.                                                                |
| [SvelteKit + Contentful](https://github.com/stackbit-themes/stackbit-examples/tree/main/sveltekit-contentful)          | Basic SvelteKit & Contentful-based content site.                                                                                                           |

## Stackbit Features

These projects showcase a specific Stackbit feature.

| Example                                                                                                      | Description                                                                                                                                                         |
| :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [A/B Testing](https://github.com/stackbit-themes/stackbit-examples/tree/main/ab-testing)                     | A Next.js site that uses middleware to swap content on the page. Content is stored in Contentful, made editable in Stackbit, and ready to deploy to Netlify's edge. |
| [Asset Sources](https://github.com/stackbit-themes/stackbit-examples/tree/main/unsplash-asset-source)        | Uses Unsplash as a custom asset source, rather than storing image locally. Built on the minimal Next.js starter.                                                    |
| [Inline Editing](https://github.com/stackbit-themes/stackbit-examples/tree/main/auto-annotated-portfolio)    | Uses a custom utility to automatically add annotation details to every content object.                                                                              |
| [Localization](https://github.com/stackbit-themes/stackbit-examples/tree/main/i18n-nextjs-contentful)        | Showcases Stackbit's localization (i18n) capabilities using Next.js and Contentful.                                                                                 |
| [Personalization](https://github.com/stackbit-themes/stackbit-examples/tree/main/ninetailed-personalization) | Audience-based personalization with Ninetailed, with built-in support in the visual editor.                                                                         |

## Integrations

Various other implementation and integrations patterns in practice.

| Example                                                                                                                   | Description                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Algolia (search)](https://github.com/stackbit-themes/stackbit-examples/tree/main/algolia-search)                         | On-demand statically generated pages, searchable with Algolia                                                                                        |
| [Chakra UI (components)](https://github.com/stackbit-themes/stackbit-examples/tree/main/chakra-ui)                        | A simple site using [Chakra UI](https://chakra-ui.com/).                                                                                             |
| [Contentlayer (content)](https://github.com/stackbit-themes/stackbit-examples/tree/main/contentlayer)                     | Stackbit's minimal starter project, using [Contentlayer](https://www.contentlayer.dev/) to generate importable content files and types.              |
| [Cloudinary + Contentful (images)](https://github.com/stackbit-themes/stackbit-examples/tree/main/cloudinary-contentful)  | Image management & per-device responsive optimization with Cloudinary.                                                                               |
| [Cloudinary + unpic-img](https://github.com/stackbit-themes/stackbit-examples/tree/main/cloudinary-unpic)                 | Next.js project that uses [unpic-img](https://github.com/ascorbic/unpic-img) with Cloudinary for generating a responsive and optimized image gallery |
| [Ninetailed (personalization)](https://github.com/stackbit-themes/stackbit-examples/tree/main/ninetailed-personalization) | Audience-based personalization with Ninetailed, with built-in support in the visual editor.                                                          |
| [Unsplash (asset source)](https://github.com/stackbit-themes/stackbit-examples/tree/main/unsplash-asset-source)           | Uses Unsplash as a custom asset source, rather than storing image locally. Built on the minimal Next.js starter.                                     |

## Use Cases

Sites built to serve some specific purpose.

| Example                                                                                                        | Description                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| [Documentation](https://github.com/stackbit-themes/stackbit-examples/tree/main/documentation)                  | Documentation site with basic components and a few added features, using Next.js + Contentful.                                           |
| [Onboarding Web Application](https://github.com/stackbit-themes/stackbit-examples/tree/main/onboarding-webapp) | Showcasing advanced capabilities e.g. auth, DB access through API endpoints, and wizard-based onboarding flows with editor-only screens. |
