# Stackbit Tutorial [HTML + Contentful]

ℹ️ This project is used as a starting point for [a getting started tutorial](https://docs.stackbit.com/getting-started/html-contentful) using Contentful as the content source.

## Prerequisites

Before you begin, make sure you have the following:

- Contentful account
- Node v14 or later

## Setup Instructions

The following sections take you through the process of getting this project set up and wired up to Contentful so you can begin the tutorial.

### Create New Project

Use the `create-stackbit-app` command to create a new project:

    npx create-stackbit-app@latest --example tutorial-html-contentful

This will create a new instance of this project in a `tutorial-html-contentful` directory and install dependencies. Change into the new directory.

    cd tutorial-html-contentful

### Create Contentful Space

After signing into Contentful, create a new space. Note that if you already have an active Contentful account, you may want to [create an organization](https://app.contentful.com/account/organizations/new) to place your new space.

### Generate API Tokens

After creating the Contentful space, copy `.env.example` to `.env` and fill in the appropriate values.

```bash
CONTENTFUL_SPACE_ID="..."
CONTENTFUL_DELIVERY_TOKEN="..."
CONTENTFUL_PREVIEW_TOKEN="..."
CONTENTFUL_MANAGEMENT_TOKEN="..."
```

### Import Content

Your new project already contains the content for the tutorial. You can import this into Contentful by running the setup command.

    npx cross-env npm run setup

### Run the Project

Now you should be able to run the Next.js development server and see your content.

    npm run dev

Visit `localhost:3000` and you should see the example content you imported into your new Contentful space. Now you can continue with the tutorial!

## Support

If you get stuck along the way, [drop into our Discord server](https://discord.gg/HUNhjVkznH) and send a message in the `#documentation` or `#help` channels.
