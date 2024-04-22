# Stackbit Developer Demo [Gatsby + Contentful]

![Tutorial Screenshot](https://assets.stackbit.com/docs/tutorial-shared-thumb-v2.png)

A demo project to showcase the basics of Stackbit to new developers.

## Prerequisites

Before you begin, please make sure you have the following:

- Contentful account
- Node v18 or later

## Contentful Setup

After cloning the project and installing dependencies, create a new Contentful space.

### Generate API Tokens

Create API tokens for your new space. Then copy `.env.example` to `.env` and fill in the appropriate values.

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

Visit `localhost:8000` and you should see the example content you imported into your new Contentful space. Now you can continue with the tutorial!

## Running Stackbit

Make sure the CLI is installed.

    npm install -g @stackbit/cli

Start the Stackbit development server.

    stackbit dev --port 8000

## Disabling Annotations

Annotations are enabled by default. To disabled set `DISABLE_ANNOTATIONS` in `.env` to any string value. (Note that `DISABLE_ANNOTATIONS="false"` will still disable annotations.)

## Support

If you get stuck along the way, get help in our [support forums](https://answers.netlify.com/).
