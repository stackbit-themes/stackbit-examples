# Unsplash Asset Source

This project uses Unsplash as a [custom asset source](https://docs.stackbit.com/features/asset-sources).

It builds on [Stackbit's minimal Next.js starter](https://github.com/stackbit-themes/nextjs-starter) by adding an `image` field to the `HeroSection` component, and wiring that field up to the custom image source.

[Learn more about custom asset sources](https://docs.stackbit.com/features/asset-sources).

## Getting Started

The typical development process is to begin by working locally.

### Clone Repo Locally

Create local Stackbit project from this repo:

```txt
npx create-stackbit-app@latest --example unsplash-asset-source
```

### Start Dev Server

Run the Next.js development server:

```txt
cd my-stackbit-site
npm run dev
```

### Start Stackbit App

Install the Stackbit CLI. Then open a new terminal window in the same project directory and run the Stackbit Dev server:

```txt
npm install -g @stackbit/cli
stackbit dev
```

Open `localhost:8090/_stackbit`, register or sign in, and you will be directed to Stackbit's visual editor for your new project.

![Next.js Dev + Stackbit Dev](https://assets.stackbit.com/docs/next-dev-stackbit-dev.png)

## Asset Source

The asset source is a shared resource published to https://unsplash-asset-source.netlify.app. It renders a series of random images from Unsplash.

On clicking one of the images, the site sends a `postMessage` call to the iframe used by the Stackbit application, including a string to be used as the `src` value for the image.

### Example Code

There is a copy of the asset source code in the `asset-source` directory in this repository.

## Other Stackbit Projects

Stackbit has a number of examples that you can use to create a new project or evaluate Stackbit. Run the following command to see a list of available examples:

```txt
npx create-stackbit-app@latest --help
```

You can also visit [our `stackbit-themes` GitHub organization](https://github.com/stackbit-themes)

## Join the Community

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to showcase what you build with this starter.
