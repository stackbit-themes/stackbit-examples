# Documentation Site Example

This is an example of a documentation site built with:

-   [Next.js](https://nextjs.org/) (site framework)
-   [Contentful](https://www.contentful.com/) (content source)
-   [Stackbit](https://www.stackbit.com/) (visual editor)
-   [Tailwind](https://tailwindcss.com/) (CSS framework)

This site is an example of a site that uses a headless CMS (Contentful) to manage the content. Among other benefits, it is easier to account for multiple content editors of varying technical skill levels.

The content modeling here is inspired by [Notion](https://www.notion.so/), which does an excellent job of balancing flexibility and productivity for content editors.

### Features

While this is only a simple example to get started, we've introduced a few features that are worth noting:

-   **Theme Toggle:** A simple switch, along with styles to support both light and dark modes.
-   **Syntax Highlighting:** The `<CodeBlock />` component uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
-   **Composable Pages:** Every page is just a page and can be composed of any number of sections. This allows for a lot of flexibility in how content is organized.
-   **Stackbit-Ready:** Stackbit helps you build sites faster by providing a visual editor for content. This site works with Stackbit out of the box.

## Getting Started

Getting started with this project just takes a few steps.

### Clone the Repository

This is an official example, so you can use `create-stackbit-app` to clone it to your machine:

    npx create-stackbit-app@latest --example documentation stackbit-docs-example

This will create a new project in a `stackbit-docs-example` directory.

### Setup Contentful

This project uses Contentful as a headless CMS. You'll need to do the following to get Contentful ready to go:

1. Create a Contentful account (if you don't have one).
1. Create a new space. This will become the `CONTENTFUL_SPACE_ID` environment variable.
1. Create a new [personal access token](https://www.contentful.com/help/personal-access-tokens/). This will become the `CONTENTFUL_ACCESS_TOKEN` environment variable.
1. [Add an API key](https://training.contentful.com/student/page/1050378-api-keys) to the space. You will need the delivery and preview tokens, which will become the `CONTENTFUL_DELIVERY_TOKEN` and `CONTENTFUL_PREVIEW_TOKEN` environment variables.

Copy `.env.local-sample` to `.env.local` and fill in the environment variables mentioned above.

### Import Content

There is a script ready to import the content model and content into your Contentful space. You can run it with the following command:

    npm run contentful:import -- <CONTENTFUL_ACCESS_TOKEN> <CONTENTFUL_SPACE_ID>

Replace `<CONTENTFUL_ACCESS_TOKEN>` and `<CONTENTFUL_SPACE_ID>` with the values from your Contentful space.

### Run the Server

Now you should be able to run the server:

    npm run dev

You can also run Stackbit's development server in a parallel process. This will allow you to edit content in Stackbit's visual editor locally on your machine.

    npm install -g @stackbit/cli
    stackbit dev

This will output a URL that you can open to view the visual editor.

## Adding a Component

If you want to add a component that can be used in a page, you'll need to do the following:

1. Add the new content type in Contentful with the appropriate fields.
1. Edit the `sections` field in the page model to allow for your new component.
1. Export the content from your space into this project.

    ```txt
    npm run contentful:export
    ```

1. Generate types for the new content type.

    ```txt
    npm run contentful:types
    ```

1. Add new, custom type(s) to `types/index.ts`, which requires:
    1. Adding any new sub-components to the _Atoms_ section.
    1. Add new content type ID to `SectionType` type.
    1. Add a new type based on the generic `Section` type and the automatically-generated type for the new content type.
    1. Add new type to the `ComposableSection` type.
1. Add a new component in the `components` directory. Use the new type from `types/index.ts` as the type for the component's props.
1. Add the new component to `components/DynamicComponent.tsx`.
