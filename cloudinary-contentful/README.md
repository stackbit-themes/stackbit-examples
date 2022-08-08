# Cloudinary & Contentful Example

[![Netlify Status](https://api.netlify.com/api/v1/badges/966bc45a-4c7b-471f-9273-ac06c7215795/deploy-status)](https://app.netlify.com/sites/cloudinary-example-7e297/deploys)

**Live demo:** https://cloudinary-example.stackbit.app/ <br/>
*(but seriously, run it locally with the Stackbit editor to get the editing experience)*

## Overview

Stackbit supports inserting images from [Cloudinary](https://cloudinary.com/) with all supported content sources, i.e. currently Git, Contentful and Sanity.

This feature is available in [paid plans](https://www.stackbit.com/pricing/) only, however you're free to test-drive it in [local development](https://docs.stackbit.com/how-to-guides/local-development/).

Beyond selecting images, the power of Stackbit lies in enabling developers build visually-editable components tailored for your content editor's needs. The purpose of this example project is to showcase two such components: 

1. An **image gallery** which is optimized to the device width and resolution and loads images in the relevant size only. Editors can preview different resizing options.
2. An **image with thumbnails** component showing multiple options for scaling an image into a square thumbnail.

## Prerequisites

Before you begin, please make sure you have the following:

- **A Cloudinary account & API Key**
- Contentful account
- Node v16 or later

## Setup Instructions

The following sections take you through the process of getting this project set up and wired up to Contentful.

### Create New Project

Use the `create-stackbit-app` command to create a new project:

```txt
npx create-stackbit-app@latest --example cloudinary-contentful
```

This will create a new instance of this project in a `cloudinary-contentful` directory.

### Create Contentful Space

After signing into Contentful, create a new community (free) space. Note that if you already have an active Contentful account, you may want to [create an organization](https://app.contentful.com/account/organizations/new) to place your new space.

When you're within an organization, you can create a new community space with the web app package.

![Create new Contentful space](./docs/new-community-space.png)

### Generate Personal Access Token

If you don't already have a management token (or _personal access token_), you can generate one. To do so, go into your new empty space, then:

1. Click Settings
1. Chose API Keys
1. Select the Content management tokens tab
1. Click the button to generate a new token

![Generate content management token](./docs/generate-mgmt-token.png)

**⚠️ Take care to store this token as necessary. You will not be able to view again within Contentful.**

### Import Content

Your new project already contains the content for the tutorial. You can import this into Contentful by running the setup command.

```txt
cd tutorial-contentful
npx cross-env CONTENTFUL_SPACE_ID={...} CONTENTFUL_ACCESS_TOKEN={...} npm run import
```

Replace the `{...}` with the appropriate values:

- Space ID can be found in the URL when inside a space.
- Access token is the token you just created (or referenced).

### Generate API Keys

From the same place you generated the personal access token, you can now generate API access keys.

1. Select the content delivery / preview tokens
1. Choose Add API key

![Generate new API keys](./docs/generate-api-keys.png)

### Set Environment Variables

In your project, duplicate `.env.local.example` to `.env.local`. Fill in the values:

```txt
CONTENTFUL_SPACE_ID="..."
CONTENTFUL_ACCESS_TOKEN="..."
CONTENTFUL_PREVIEW_TOKEN="..."
```

### Run the Web Server

Now you should be able to run the Next.js development server and see your content.

```txt
npm run dev
```

Visit localhost:3000 and you should see the example content you imported into your new Contentful space.

### Run the Visual Editor in Local Development Mode

1. Install Stackbit's command-line tools: `npm i -g @stackbit/cli@latest` (once).
1. Run:
```
stackbit dev --cloudinary-cloud-name <cloudinary cloud name> --cloudinary-api-key <api key> --open
```

**Note:** The Cloudinary arguments can be found in the dashboard of the Cloudinary console. If you don't pass these arguments, you will be able to view the website but not select Cloudinary images in the visual editor.

## Support

If you get stuck along the way, [drop into our Discord server](https://discord.gg/HUNhjVkznH) and send a message in the `#documentation` or `#help` channels.
