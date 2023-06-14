# Stackbit Custom Content Source Example

This example demonstrates how to integrate a custom content source with Stackbit through the [Content Source Interface](https://docs.stackbit.com/reference/content-sources), with full editing capabilities.

The website code is based on Vercel's [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) with the Markdown files storing content replaced by a [single JSON file](./example-cms/database.json) managed via a [client-side API](./example-cms/api-client.ts), simulating a headless CMS. 

This example CMS is integrated with Stackbit thru the [ExampleContentSource](./example-content-source/example-content-source.ts) class, which is loaded in the [stackbit.config.ts](./stackbit.config.ts) file.


## The Example CMS

The code & data for a simple example CMS are located in the [/example-cms](./example-cms/) directory. That code does not depend on Stackbit - rather, it represents an existing 3rd-party data source, or your own custom CMS.

All content (blog posts, authors, assets metadata) along-with the content schema itself are stored in a single file - [/example-cms/database.json](./example-cms/database.json).

Like a real CMS, the content model allows for references between models. For example, the relationship between authors and posts is done by a `reference`-type field that maps the field's value to the referenced document's `id`. This relationship is many-to-one, allowing the same author to be referenced from many posts.

Read and write access to the data is performed via the [ExampleCmsApiClient](./example-cms/api-client.ts) class.

## The Example Content Source

The Content Source class connecting Stackbit to the Example CMS is found in [/example-content-source](./example-content-source/). It does not assume knowledge of the example CMS' internals, only its API. To learn about the full lifecycle of content sources for Stackbit, [see here](https://docs.stackbit.com/reference/content-sources).

## Running Locally

1. Clone this repo and install dependencies (e.g., `npm install`).
1. Run `npm run dev` to start the Next.js dev server. Your blog should be up and running on [http://localhost:3000](http://localhost:3000)
1. Install stackbit CLI (once) by running `npm install -g @stackbit/cli@latest`
4. Open a separate terminal window, navigate to the repo's directory and run `stackbit dev`. Then, click on the link printed in the console (you will need to sign in with Stackbit):
    
    ```
    info: ⚡ Open https://app.stackbit.com/local/... in your browser
    ```

5. You can now edit site content via Stackbit. The [database file](./example-cms/database.json) will update as you edit your content.

## Importing to a Stackbit Cloud Project

After you have successfully run your blog site locally, you can bring the live editing experience of your website online by importing your code into a cloud-based Stackbit project. This will let your teammates collaborate with you on your blog.

1. Publish the cloned repo to your personal GitHub repository.
2. Navigate to https://app.stackbit.com/import, select "Use my repository", and click "Next".
3. Connect GitHub if needed, find and select your repository, and click "Next".
4. In the "Configure" step, choose the project name, add any required environment variables and click "Create Project".

**Note:** this is an example project showing how to implement a custom content source. The content in this example is stored in a JSON file and is not preserved when the Stackbit remote project restarts.
