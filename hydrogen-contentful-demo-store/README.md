# Hydrogen + Stackbit Demo Store

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

Journal contents coming from Contentful CMS and equipped with visual editing capabilities using Stackbit.

[Check out the Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)

[Check out the Stackbit docs](https://docs.stackbit.com)

## Getting started

**Requirements:**

- Node.js version 16.5.0 or higher
- Contentful account

## Setup Instructions

The following sections take you through the process of getting this project set up and wired up to Contentful so you can begin the tutorial.

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
npx cross-env CONTENTFUL_SPACE_ID={...} CONTENTFUL_MANAGEMENT_TOKEN={...} npm run setup
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

The API keys (both delivery and preview) can be copied from the API screen you see after creating a new key.

![Copy API key values](../tutorial-contentful/docs/copy-api-keys.png)

Note that the `CONTENTFUL_PREVIEW_SECRET` can be any string.

## Running the dev server

Then `cd` into the new directory and run:

```bash
npm install
npm run dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

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

## Importing Contentful Content

If you don't have a Contentful space set up and ready to go, you can import the starting content provided by this project.

1. Create a new Space in Contentful
1. Create new Contentful Personal Access Tokens [here](https://app.contentful.com/account/profile/cma_tokens/).
1. Import the Contentful data stored in the `contentful/export.json` file to the new space by running the following command. Replace the `<management_token>` with your Personal Access Token and the `<space_id>` with the new space ID.

   ```txt
   ./contentful/import.js <management_token> <space_id>
   ```

1. Create **Content Preview API - Access Token** for the new space via Contentful app **Settings** => **API Keys** => **Content delivery / preview tokens** => **Add API Key**. Add these keys to `.env` file(s) as mentioned above.

## Next Steps

Here are a few suggestions on what to do next if you're new to Stackbit:

- Learn [how Stackbit works](https://docs.stackbit.com/conceptual-guides/how-stackbit-works/)
- Follow the [_Getting Started_ tutorial](https://docs.stackbit.com/getting-started/)
- Explore the [how-to guides](https://docs.stackbit.com/how-to-guides/) for help while developing your site

## Other Stackbit Projects

Stackbit has a number of examples that you can use to create a new project or evaluate Stackbit. Run the following command to see a list of available examples:

```txt
npx create-stackbit-app@latest --help
```

You can also visit [our `stackbit-themes` GitHub organization](https://github.com/stackbit-themes)

## Join the Community

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to showcase what you build with this starter.