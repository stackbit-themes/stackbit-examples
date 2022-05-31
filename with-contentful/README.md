[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/drkstr101/minimal-contentful-theme)

# [minimal-contentful-theme](https://github.com/drkstr101/minimal-contentful-theme)

Begin a new Stackbit project or learn to add Stackbit to an existing site.

## Getting Started

Get up and running quickly by running the following command:

```txt
npx create-stackbit-app [project-name]
```

Then change into `[project-name]` directory (default: `my-stackbit-site`) and start the Next.js dev server and Stackbit local dev in separate terminal tabs/windows.

```txt
cd [project-name]
npm run dev

# in a separate tab/window
npm run stackbit-dev
```

## Learn the Basics

Follow the [getting started tutorial](https://docs.stackbit.com/getting-started/) while running this project locally to get a feel for how Stackbit works.

Or jump to individual topics [in the docs](https://docs.stackbit.com/).

## Support & Feedback

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to provide feedback to us.

## Contentful Setup

Copy the `.env.example` file to `.env` then fill in the values.

Run `npm run contentful:import` once you have registered an account and created a space.

Run `npm run stackbit-dev` to launch stackbit in local dev mode, or import the theme directly into stackbit to get started!

## References

1. [Notes: adding Contentful to existing project (w/local dev)](https://www.notion.so/stackbit/Notes-adding-Contentful-to-existing-project-w-local-dev-WIP-173eab6a77d2403fa396c30f2cb2b8b0#f49ed497d33f491aa4913c8c908f597c) (I found many of these same issues had already been documented, but without any apparent resolution)
2. [Comparison of changes for contentful source](https://github.com/drkstr101/minimal-contentful-theme/pull/1/files)
