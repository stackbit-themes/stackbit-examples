# Stackbit + Contentlayer Example Project

This project takes [our minimal JavaScript starter](https://github.com/stackbit-themes/nextjs-starter), and presents the following adjustments:

- Adds Contentlayer configuration on top of Stackbit config
- Uses Contentlayer to import content into pages
- Converts project to TypeScript and uses Contentlayer's generated types to add type safety to pages and components
- Automatically loads Stackbit's development environment when running the Next.js development server

## Setup

Use the `create-stackbit-app` command to create a new project:

```txt
npx create-stackbit-app@latest --example contentlayer contentlayer-stackbit-example
```

This will create a new instance of this project in a `contentlayer-stackbit-example` directory, and will install dependencies along the way.

Change into the directory and run the development server.

```txt
cd contentlayer-stackbit-example
npm run dev
```

This outputs your own Stackbit URL. Open this, register or sign in, and you will be directed to Stackbit's visual editor for your new project. [Learn more about local development with Stackbit](https://docs.stackbit.com/how-to-guides/local-development/).

Note that you can also visit localhost:3000 in your browser to see the Next.js project running without Stackbit.

## Support & Feedback

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to provide feedback to us.
