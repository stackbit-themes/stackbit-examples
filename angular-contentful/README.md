# Angular & Contentful Starter

Adopted from Contentful's [Product Catalogue demo](https://github.com/contentful-labs/product-catalogue-web.ts).

## Prerequisites

Before you begin, please make sure you have the following:

- Contentful account
- Node v16 or later

## Setup Instructions

The following sections take you through the process of getting this project set up and wired up to Contentful.

### Create New Project

Use the `create-stackbit-app` command to create a new project:

```txt
npx create-stackbit-app@latest --starter angular-starter
```

This will create a new instance of this project in a `angular-starter` directory.

### Create Contentful Space

After signing into Contentful, create a new community (free) space. Note that if you already have an active Contentful account, you may want to [create an organization](https://app.contentful.com/account/organizations/new) to place your new space.

When you're within an organization, you can create a new community space with the web app package.

![Create new Contentful space](./docs/new-community-space.png)

### Generate Management Token

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
npx cross-env CONTENTFUL_SPACE_ID={...} CONTENTFUL_MANAGEMENT_TOKEN={...} npm run import
```

Replace the `{...}` with the appropriate values:

- Space ID can be found in the URL when inside a space.
- Management token is the token you just created (or referenced).

### Generate API Keys

From the same place you generated the management token, you can now generate API access keys.

1. Select the content delivery / preview tokens
1. Choose Add API key

![Generate new API keys](./docs/generate-api-keys.png)

### Set Environment Variables

In your project, duplicate `sample.env` to `.env`. Fill in the values of `CONTENTFUL_SPACE_ID` and `CONTENTFUL_PREVIEW_TOKEN`.

### Run the Project

Now you should be able to run the Next.js development server and see your content.

```txt
npm run dev
```

Visit localhost:3000 and you should see the example content you imported into your new Contentful space.

## Support

If you get stuck along the way, [drop into our Discord server](https://discord.gg/HUNhjVkznH) and send a message in the `#documentation` or `#help` channels.
