# Hydrogen & Contentful Demo Store

Hydrogen is a React framework by Shopify that you can use to build fast and dynamic custom storefronts.

This site is adopted from the original [demo store](https://github.com/Shopify/hydrogen/tree/main/templates/demo-store) site by Shopify. Journal content has been moved to Contentful CMS for easy visual editing via Stackbit.

[Check out the Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)

[Check out the Stackbit docs](https://docs.stackbit.com)

## Getting started

**Requirements:**

- Node.js version 16 or higher
- Contentful account

## Setup Instructions

The following sections take you through the process of getting this project set up and wired up to Contentful.

### Create New Project

Use the `create-stackbit-app` command to create a new project:

```txt
npx create-stackbit-app@latest --example hydrogen-contentful-demo-store
```

This will create a new instance of this project in a `hydrogen-contentful-demo-store` directory.

### Create Contentful Space

After signing into Contentful, create a new community (free) space. Note that if you already have an active Contentful account, you may want to [create an organization](https://app.contentful.com/account/organizations/new) to place your new space.

When you're within an organization, you can create a new community space with the web app package.

![Create new Contentful space](../tutorial-contentful/docs/new-community-space.png)

### Generate Management Token

If you don't already have a management token (or _personal access token_), you can generate one. To do so, go into your new empty space, then:

1. Click Settings
1. Chose API Keys
1. Select the Content management tokens tab
1. Click the button to generate a new token

![Generate content management token](../tutorial-contentful/docs/generate-mgmt-token.png)

**⚠️ Take care to store this token as necessary. You will not be able to view again within Contentful.**

### Import Content

Your new project already contains the content. You can import this into Contentful by running the setup command.

```txt
cd hydrogen-contentful-demo-store
npx cross-env CONTENTFUL_SPACE_ID={...} CONTENTFUL_MANAGEMENT_TOKEN={...} npm run import
```

Replace the `{...}` with the appropriate values:

- Space ID can be found in the URL when inside a space.
- Management token is the token you just created (or referenced).

### Generate API Keys

From the same place you generated the management token, you can now generate API access keys.

1. Select the content delivery / preview tokens
1. Choose Add API key

![Generate new API keys](../tutorial-contentful/docs/generate-api-keys.png)

### Set Environment Variables

In your project, duplicate `.env.example` to `.env`. Fill in the values:

```txt
CONTENTFUL_SPACE_ID="..."
CONTENTFUL_PREVIEW_TOKEN="..."
```

## Running the dev server

Then `cd` into the new directory and run:

```bash
npm install
npm run dev
```

Optional: to use your own store contents, update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `npm run preview`:

```bash
npm run build
npm run preview
```
