# A/B Testing with Next.js, Contentful, Netlify, and Stackbit

This project implements a homegrown A/B testing solution using Next.js's server-side middleware capabilities.

The middleware function makes use of Netlify's edge functions and server cookies to choose a random provided value on first page load, and consistently show the same value on subsequent page loads.

The site and test content is stored in Contentful, where tests are attached directly to the component objects to which they apply. Editing the pages, components, and test content is then made more efficient and powerful through Stackbit and a few Next.js tricks.

## Setup

Follow these steps to get the project running locally.

### Clone Project

Clone this project to your local machine using the `create-stackbit-app` command.

    npx create-stackbit-app@latest --example ab-testing

### Install Dependencies

After cloning the repository, change into the directory and install the dependencies.

    npm install

### Setup Contentful Space

Create a new space in Contentful, along with API keys for that space and a personal access token for your user.

Copy `.env.local.sample` to `.env.local` in the root of your project and fill in the appropriate values.

### Import Content

Import content into Contentful by running the import script.

    node contentful/import.js

### Run Development Server

To check that everything is working, run the development server.

    npm run dev

Open localhost:3000 in your browser.

### Run Stackbit

If everything looks good, install Stackbit's CLI.

    npm install -g @stackbit/cli

And start the Stackbit development server.

    stackbit dev

Open localhost:8090/\_stackbit to launch the Stackbit visual editing application. Sign in or register and then you should see your project and be able to edit content!

## Handling Content

To understand how A/B testing works for this example, we have to first have some insight into the content mechanism.

### Avoiding API Limits

All the content lives in Contentful. However, we don't want to fetch all content from Contentful on every page load if it can be prevented. There are strict API usage limits that we want to avoid.

### Transforming Content

In addition, we also need to perform _some_ transformations after fetching content from Contentful. For example, pages have a `slug` field in Contentful, but we want to convert that a `urlPath` property so that we have an absolute link attached to every page.

### Content Caching Mechanism

The mechanism that controls this process is primarily contained within `src/content/contentful.ts`. This file retrieves and transforms content from Contentful, and then caches that content in a single JSON file at the root of the project, `contentful-cache.json`.

The shape of the transformed objects are defined in `src/content/content-types.d.ts`.

### Rebuilding the Content Cache

The cache is rebuilt in the following conditions:

- Starting the dev server with `npm run dev`
- Running a build
- Making a change to a file in `src` while running `npm run dev`
- When running `stackbit dev` and changing content (either within Stackbit or directly in Contentful)

Notice that `npm run dev` also kicks off a parallel `nodemon` server, which is how we're able to rebuild the cache when saving files during development.

### Rendering Pages

The primary page mechanism (`src/pages/[[...slug]].tsx`) accesses content directly from the cache file.

The page will automatically reload when content changes. However, this is one of a few issues at scale, mentioned below.

## How A/B Testing Works

Most of the logic for this A/B testing example can be found in `src/middleware.ts`.

This code uses the content cache to identify whether there are any active tests on the current page.

If there are active tests, it then looks for a cookie with a valid value matching one of the supplied values in the test. If it finds a match, it swaps the content on the page, identifying the content via `data-testable-id` attributes in the DOM.

If it doesn't find a match in a cookie, or if the match is invalid, then it picks one of the supplied values at random. The new value gets stored in a cookie so that subsequent page loads show the same value.

### Enabling A/B Testing

A/B testing (i.e. this middleware function) is disabled when `STACKBIT_PREVIEW` is set to true. When editing within Stackbit, we want to show the raw default value, while also providing a mechanism to adjust attached tests. More on this below.

To test the A/B testing functionality locally, install Netlify Dev (`npm install -g netlify-cli`) and start the development server by running `netlify dev` (not `npm run dev`).

## Editor Hub

When the `STACKBIT_PREVIEW` environment variable is set to true (in `.env.local` when working locally, or automatically by Stackbit in a cloud project), a reserved editor hub is enabled. This page is available at `/__editor_hub__`/.

The components on this page consist of:

- Controller to toggle test mode on or off (more on this below)
- List of all tests in Contentful, with the ability to edit both the test and its attached component

## Test Mode

Test mode is a global state (`testMode`) that toggles various controls. The primary purpose is to highlight all _testable_ items on a page, meaning all representations of a component to which a test can be applied (in Contentful).

When in test mode and a component doesn't have a test, a plus icon appears. Clicking this icon will create a new test and attach it to that component. (It calls `/api/new-test`).

When a test does exist, a pencil icon will appear. Clicking it triggers a modal with the information about that test. This content can be edited directly, which will affect the test.

## Applying at Scale

While this project is thorough, there will be challenges in taking this approach at scale. Here are the important considerations:

- When working with Stackbit, loading content through a JSON file and relying on HMR for page reloads slows with a large quantity of content. Contact us for ways around this.
- A/B testing that targets a specific element on the page can be somewhat brittle. While we're also swapping the props so that hydration works as expected, take caution as the project becomes more complex so that you are confident the proper DOM elements are being swapped.
- The hero component is hard-coded into the composable page to simplify the code. We recommend a more dynamic solution, which you can find in most of our starters (run `npx create-stackbit-app@latest` for an example).

## Support

If you get stuck along the way, [drop into our Discord server](https://discord.gg/HUNhjVkznH) and send a message in the `#documentation` or `#help` channels.
